/*
◦ Code By : Vladimir Ages
◦ Contact : wa.me/6281381217265
*///ww.js
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {};
  let id = m.chat;

  if (werewolf[id] && werewolf[id].status === "playing") {
    m.reply("🐺 Game Werewolf saat ini sedang berlangsung!\nketik *.wwjoin* untuk bergabung dalam permainan.");
    return;
  }

  werewolf[id] = {
    status: "playing",
    players: {},
    villagers: [],
    wolves: [],
    votes: {},
    phase: "join",
    owner: m.sender,
    timeout: setTimeout(() => {
      if (werewolf[id].phase === "join") {
        m.reply('*Waktu habis!* Sesi game werewolf telah dihapus.');
        delete werewolf[id];
      }
    }, 560000),
    lastPhaseTime: new Date().getTime()
  };
  global.db.data.werewolf = werewolf;
  m.reply(`*🐺 Game Werewolf telah dimulai.*\nSilakan ketik *'.wwjoin'* untuk bergabung dalam permainan.\n\n${global.footer}`);
};

handler.help = ['ww'];
handler.tags = ['game'];
handler.command = /^ww$/i;
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;