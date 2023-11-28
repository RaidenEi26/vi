/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const axios = require('axios');

const handler = async (m, { text }) => {
  if (!text) {
    throw '*Example*: .myemail sazumiviki@xxxx.com';
  }
  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  const apiKey = `${global.rose}`;
  const apiUrl = `https://api.itsrose.life/tools/tempMail/messages?email=${encodeURIComponent(text)}&apikey=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    const { status, message, mails } = response.data;

    if (status) {
      if (mails.length === 0) {
        m.reply('🐱 There are no messages in the Email');
        return;
      }

      let messageText = '🐱 *MESSAGE IN EMAIL:*\n\n';

      for (const email of mails) {
        messageText += `*ID:* ${email.id}\n`;
        messageText += `*FROM:* ${email.from}\n`;
        messageText += `*SUBJEK:* ${email.subject}\n`;
        messageText += `*MESSAGES:* ${email.body_text}\n\n`;
      }

      m.reply(messageText);
    } else {
      throw `🐱 It looks like something went wrong`;
    }
  } catch (error) {
    throw `🐱 It looks like something went wrong`;
  }
};

handler.help = ['mess /email'];
handler.tags = ['tools'];
handler.command = /^mess$/i;

module.exports = handler;