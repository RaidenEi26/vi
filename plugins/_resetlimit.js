let cron = require('node-cron');
let handler = m => m;
let messageSent = false; 

handler.before = async function (m) {
  cron.schedule('00 12 * * *', () => {
    let users = global.db.data.users;

    let resetUsers = Object.entries(users).filter(([user, data]) => data.limit < 10000000);

    if (resetUsers.length > 0 && !messageSent) {
      let limit = 100;

      resetUsers.forEach(([user, data]) => {
        data.limit = limit;
      });
      console.log('Reset Limit');

      const q = {
        key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net', fromMe: false, id: '' },
        message: { conversation: 'Successfully reset user limit' }
      };
      conn.sendMessage(`6281267905243@s.whatsapp.net`, { text: '🐱 *[Anos Ai Notif]* Limit Reset.' }, { quoted: q });

      messageSent = true; 
    }
  }, {
    scheduled: true,
    timezone: 'Asia/Jakarta'
  });
};

module.exports = handler;