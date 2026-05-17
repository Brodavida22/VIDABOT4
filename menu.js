
module.exports = {
name: "menu",
prefix: ".",
execute: async (conn, m) => {
await conn.sendMessage(m.key.remoteJid, {
text: "Queen Vida V3 Bot Active"
})
}
}
