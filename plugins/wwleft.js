/*
◦ Code By : Vladimir Ages
◦ Contact : wa.me/6281381217265
*///wwleft.js
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  let id = m.chat
  if (!werewolf[id] || werewolf[id].status !== "playing") {
    m.reply(`🐺 Tidak ada game Werewolf yang sedang berlangsung.\n\n${global.footer}`);
    return
  }
  if (werewolf[id].phase !== "join") {
    m.reply(Func.texted('bold', "🐺 Maaf, Anda tidak dapat keluar dari game saat ini."))
    return
  }
  if (!werewolf[id].players[m.sender]) {
    m.reply(Func.texted('bold', "🐺 Kamu bukan peserta dalam game ini."))
    return
  }
  delete werewolf[id].players[m.sender]
    conn.chatRead(m.chat);
    conn.sendMessage(m.chat, {
      react: {
        text: '❌',
        key: m.key,
      }
    });
  let index = werewolf[id].villagers.indexOf(m.sender)
  if (index >= 0) {
    werewolf[id].villagers.splice(index, 1)
  }
  index = werewolf[id].wolves.indexOf(m.sender)
  if (index >= 0) {
    werewolf[id].wolves.splice(index, 1)
  }
  let remainingPlayers = Object.keys(werewolf[id].players).length
  m.reply(`🐺 @${m.sender.split`@`[0]} telah meninggalkan permainan.\nPlayer tersisa: ${remainingPlayers}`)
}
handler.help = ['wwleft']
handler.tags = ['game']
handler.command = /^wwleft|leftww$/i
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;