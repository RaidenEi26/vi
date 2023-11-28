let handler = async (m, { conn, text }) => {
  if (!text) {
    throw 'Masukkan jumlah limit yang ingin dikurangi pada pengguna. Contoh: .dellbalance @user 10';
  }

  let mentionedJid = m.mentionedJid[0];
  if (!mentionedJid) {
    throw 'Tag pengguna yang ingin dikurangi balancenya. Contoh: .dellbalance @user 10';
  }

  let pointsToSubtract = parseInt(text.split(' ')[1]);
  if (isNaN(pointsToSubtract)) {
    throw 'Jumlah balance yang dimasukkan harus berupa angka. Contoh: .dellbalance @user 10';
  }

  let users = global.db.data.users;
  if (!users[mentionedJid]) {
    users[mentionedJid] = {
      limit: 0,
      exp: 0,
      lastclaim: 0
    };
  }

  users[mentionedJid].balance -= pointsToSubtract;
  if (users[mentionedJid].balance < 0) {
    users[mentionedJid].balance = 0;
  }

  conn.reply(m.chat, `Berhasil mengurangi ${pointsToSubtract} balance untuk @${mentionedJid.split('@')[0]}.`, m, {
    mentions: [mentionedJid]
  });
};

handler.help = ['dellbalance @user <jumlah balance>'];
handler.tags = ['xp'];
handler.command = /^dellbalance$/i;
handler.owner = true;

module.exports = handler;