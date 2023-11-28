/*
◦ Code By : Vladimir Ages
◦ Contact : wa.me/6281381217265
*///wwjoin.js
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {}
  let id = m.chat
  if (!werewolf[id] || werewolf[id].status !== "playing") {
     m.reply(`🐺 Tidak ada game Werewolf yang sedang berlangsung.\n\n${global.footer}`);
    return
  }
  if (werewolf[id].phase !== "join") {
    m.reply(Func.texted('bold', "🐺 Maaf, saat ini Anda tidak dapat bergabung dalam permainan."))
    return
  }
  if (werewolf[id].players[m.sender]) {
    m.reply("🐺 Anda telah bergabung dalam permainan! Ketik *'.wwleft'* jika ingin keluar dari game.")
    return
  }
  
  werewolf[id].players[m.sender] = "villager"
  werewolf[id].villagers.push(m.sender)
  
    conn.chatRead(m.chat);
    conn.sendMessage(m.chat, {
      react: {
        text: '🐺',
        key: m.key,
      }
    });
  let remainingPlayers = Object.keys(werewolf[id].players).length
  let maxPlayers = 5 
  let playersNeeded = maxPlayers - remainingPlayers
  if (playersNeeded > 0) {
  m.reply(`🐺 @${m.sender.split`@`[0]} telah bergabung dengan game.\nMenunggu ${playersNeeded} pemain lainnya untuk memulai game.`)
  return
} else if (playersNeeded === 0) {
  m.reply(`🐺 @${m.sender.split`@`[0]} telah bergabung dalam permainan.\nSemua pemain sudah lengkap!\nketik '.wwstart' untuk memulai permainan!\n\n${global.footer}`)
} else {
  m.reply(Func.texted('bold', "🐺 Jumlah pemain minimal untuk memulai permainan adalah 5."))
  return
}

}
handler.help = ['wwjoin']
handler.tags = ['game']
handler.command = /^wwjoin|joinww$/i
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;