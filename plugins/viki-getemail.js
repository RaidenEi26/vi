/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const axios = require('axios');

const handler = async (m, { text }) => {
  let name = text || 'sazumiviki';
  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  const apiKey = `${global.rose}`;
  const apiUrl = `https://api.itsrose.life/tools/tempMail/new?name=${encodeURIComponent(name)}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const { status, config, email } = response.data;

    if (status) {
      const emailMessage = `${email}`;
      m.reply(emailMessage);
    } else {
      throw '🐱 It looks like something went wrong';
    }
  } catch (error) {
    throw '🐱 It looks like something went wrong';
  }
};

handler.help = ['tempmail', '.tempmail /query'];
handler.tags = ['tools'];
handler.premium = true;
handler.command = /^tempmail$/i;

module.exports = handler;