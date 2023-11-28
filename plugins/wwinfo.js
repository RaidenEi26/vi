/*
◦ Code By : Vladimir Ages
◦ Contact : wa.me/6281381217265
*///wwinfo.js
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  let id = m.chat
  if (!werewolf[id] || werewolf[id].status !== "playing") {
    m.reply(`🐺 Tidak ada game Werewolf yang sedang berlangsung.\n\n${global.footer}`);
    return
  }

  let players = Object.keys(werewolf[id].players)
  let villagerCount = players.filter(player => werewolf[id].players[player] === "villager").length
  let werewolfCount = players.filter(player => werewolf[id].players[player] === "werewolf").length

  let playerList = "*👤 PLAYERS:*\n"
  for (let player of players) {
    let playerName = conn.getName(player)
    playerList += `  ◦  @${player.split`@`[0]}\n`
  }

  let infoText = `*🐺 WEREWOLF GAME INFO*\n` +
    `  ◦  *Status:* ${werewolf[id].phase.toUpperCase()} Phase\n` +
    `  ◦  *Players:* ${players.length}\n` +
    `  ◦  *Villagers:* ${villagerCount}\n` +
    `  ◦  *Werewolves:* ${werewolfCount}\n\n` +
    `${playerList}`

  m.reply(infoText)
}
handler.help = ['wwinfo']
handler.tags = ['game']
handler.command = /^wwinfo|infoww$/i
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;