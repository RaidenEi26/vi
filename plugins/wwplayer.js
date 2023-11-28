/*
◦ Code By : Vladimir Ages
◦ Contact : wa.me/6281381217265
*///wwplayer.js
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  let id = m.chat
  if (!werewolf[id] || !werewolf[id].players || Object.keys(werewolf[id].players).length === 0) {
    m.reply(`🐺 Tidak ada pemain dalam game.\nketik *.wwjoin* untuk bergabung.\n\n${global.footer}`);
    return
  }
  let players = Object.keys(werewolf[id].players)
  let playerList = ""
  for (let i = 0; i < players.length; i++) {
    let player = players[i]
    let playerName = conn.getName(player)
    playerList += `${i + 1}. @${player.split`@`[0]}\n`
  }
  conn.reply(m.chat, `*[ L I S T - P L A Y E R ]*\n\nAda ${players.length} pemain dalam game ini:\n\n${playerList}\n${global.footer}`, m, { contextInfo: { mentionedJid: [werewolf[id].players] }})
}
handler.help = ['wwplayer']
handler.tags = ['game']
handler.command = /^wwplayer|listplayer$/i
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;