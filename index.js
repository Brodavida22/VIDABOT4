
const fs = require('fs')
const express = require('express')
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")

const app = express()
app.use(express.json())

let sessions = {}

app.get('/', (req,res)=>res.send("Queen Vida V3 Multi Bot Running"))

app.post('/pair', async (req,res)=>{
  const number = req.body.number
  if(!number) return res.json({error:"Number required"})

  const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${number}`)
  const conn = makeWASocket({ auth: state })

  conn.ev.on('creds.update', saveCreds)

  const code = await conn.requestPairingCode(number)

  sessions[number] = conn

  res.json({ code })
})

function loadPlugins(){
  return fs.readdirSync('./plugins').map(f=>require(`./plugins/${f}`))
}

app.listen(3000, ()=>console.log("Server running"))

