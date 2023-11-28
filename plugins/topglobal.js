const { fnctions } = require("../lib/fnctions");

function formatBalance(balance) {
  const suffixes = ['', 'k', 'm', 'b', 't', 'q', 'Q', 's', 'S', 'o', 'n', 'd', 'U', 'D', 'Td', 'qd', 'Qd', 'sd', 'Sd', 'od', 'nd', 'V', 'Uv', 'Dv', 'Tv', 'qv', 'Qv', 'sv', 'Sv', 'ov', 'nv', 'T', 'UT', 'DT', 'TT', 'qt', 'QT', 'st', 'ST', 'ot', 'nt'];
  const suffixIndex = Math.floor(Math.log10(balance) / 3);
  const suffix = suffixes[suffixIndex];
  const scaledBalance = balance / Math.pow(10, suffixIndex * 3);
  return scaledBalance.toFixed(2) + suffix;
}

let handler = async (m, { conn, participants }) => {
  if (!await fnctions()) return;

  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  let balance = Object.entries(global.db.data.users).sort((a, b) => b[1].balance - a[1].balance);
  let getUser = balance.map(v => v[0]);
  let show = Math.min(10, balance.length);
  let rankbalance = balance.map(([user, data]) => user);
  let teks = `[ 🌐 ] *T O P - G L O B A L*\n`;
  teks += `[ 🏆 ] *You:* *${rankbalance.indexOf(m.sender) + 1}* of *${getUser.length}*\n\n`;
  teks += balance
    .slice(0, show)
    .map(([user, data], i) => 
      (i + 1) + '. @' + user.split`@`[0] + '\n' +
      '   ◦ *Balance* : *' + formatBalance(data.balance) + '*\n' +
      '   ◦ *Level* : *' + data.level + '*'
    )
    .join('\n');
  teks += `\n\n${global.footer}`;
  m.reply(teks);
};

handler.command = ["topglobal"];
handler.tags = ["xp", "main"];
handler.help = ["topglobal"];
handler.register = true;

module.exports = handler;
