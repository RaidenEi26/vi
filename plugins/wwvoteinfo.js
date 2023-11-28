/*
◦ Code By : Vladimir Ages
◦ Contact : wa.me/6281381217265
*///wwvoteinfo.js
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  let id = m.chat
  if (!werewolf[id] || !werewolf[id].players || Object.keys(werewolf[id].players).length === 0) {
    m.reply(`🐺 Tidak ada pemain dalam game.\nketik *.wwjoin* untuk bergabung.\n\n${global.footer}`);
    return
  }
  if (werewolf[id].phase !== "vote") {
    m.reply("*🐺 Anda hanya dapat memeriksa info suara selama fase pemungutan suara.*")
    return
  }

  let voteInfo = "*VOTE INFO:*\n"
  for (let player in werewolf[id].votes) {
    let votedPlayer = werewolf[id].votes[player]
    let playerName = conn.getName(player)
    let votedPlayerName = conn.getName(votedPlayer)
    voteInfo += `◦ @${player.split`@`[0]} ➠ @${votedPlayer.split`@`[0]}\n`
  }

  conn.reply(m.chat, `${voteInfo}\n${global.footer}`, m)
}
handler.help = ['voteinfo']
handler.tags = ['game']
handler.command = /^voteinfo|infovote|votinginfo$/i
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;