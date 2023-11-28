/*
◦ Code By : Vladimir Ages
◦ Contact : wa.me/6281381217265
*///wwkick.js
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {};
  let id = m.chat;
  
  if (!werewolf[id] || werewolf[id].status !== "playing") {
    m.reply("🐺 Tidak ada permainan Werewolf yang sedang berlangsung.");
    return;
  }
  
  if (m.sender !== werewolf[id].owner) {
    m.reply("🐺 Hanya Owner game yang dapat mengeluarkan pemain.");
    return;
  }
  
  let mentionedJid = m.mentionedJid;
  
  if (mentionedJid.length === 0) {
    m.reply("🐺 Harap mention pemain yang ingin dikeluarkan dari permainan.");
    return;
  }
  
  for (let jid of mentionedJid) {
    if (werewolf[id].players[jid]) {
      delete werewolf[id].players[jid];
      
      let index = werewolf[id].villagers.indexOf(jid);
      if (index !== -1) {
        werewolf[id].villagers.splice(index, 1);
      }
      
      index = werewolf[id].wolves.indexOf(jid);
      if (index !== -1) {
        werewolf[id].wolves.splice(index, 1);
      }
    }
  }
  
  global.db.data.werewolf = werewolf;
  
  m.reply("Pemain-pemain yang dikeluarkan telah berhasil dihapus dari permainan Werewolf.");
};

handler.help = ["wwkick @mention"];
handler.tags = ["game"];
handler.command = /^wwkick$/i;
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;