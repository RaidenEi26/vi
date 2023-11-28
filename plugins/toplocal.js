const { fnctions } = require("../lib/fnctions");

let handler = async (m, { conn, participants }) => {
  if (!await fnctions()) return;

  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  let member = participants.map(u => u.id);
  let kontol = {};
  for (let i = 0; i < member.length; i++) {
    if (typeof global.db.data.users[member[i]] != 'undefined' && member[i] != conn.user.jid && member[i] != conn.user.jid.split('@')[0] + '@s.whatsapp.net') {
      kontol[member[i]] = {
        balance: global.db.data.users[member[i]].balance,
        level: global.db.data.users[member[i]].level,
        limit: global.db.data.users[member[i]].limit
      };
    }
  }
  let balance = Object.entries(kontol).sort((a, b) => b[1].balance - a[1].balance);
  let limit = Object.entries(kontol).sort((a, b) => b[1].limit - a[1].limit);
  let rankbalance = balance.map(v => v[0]);
  let rankLimit = limit.map(v => v[0]);
  let isbalance = Math.min(10, balance.length);
  let isLimit = Math.min(10, limit.length);
  let teks = `*[ 🚩 ] T O P - L O C A L*\n`;
  teks += `*[ 🏆 ] You : ${rankbalance.indexOf(m.sender) + 1}* of *${member.length}*\n`;
  teks += `*[ 🔥 ] Group : ${await conn.getName(m.chat)}*\n\n`;
  teks += balance.slice(0, isbalance).map(([user, data], i) => (i + 1) + '. @' + user.split`@`[0] + '\n   ◦  *Balance : ' + formatNumber(data.balance) + '*\n   ◦  *Level️ : ' + data.level + '*').join('\n');
  teks += `\n\n${global.footer}`;
  m.reply(teks);
};

handler.command = /^toplokal|toplocal$/i;
handler.tags = ["xp", "main"];
handler.help = ["toplocal"];
handler.register = true;
handler.group = true;

module.exports = handler;

function formatNumber(num) {
  let formatted = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return formatted;
}
