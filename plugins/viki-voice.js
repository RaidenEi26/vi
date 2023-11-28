/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const axios = require('axios');

let handler = async (m, { text }) => {
  if (!text) {
    const voiceOptions = [
      "elon_musk",
      "steve_jobs",
      "joe_rogan",
      "taylor_swift",
      "selena_gomez",
      "meryl_streep",
      "jennifer_lawrence",
      "morgan_freeman",
      "jordan_peterson",
      "snoop_dogg",
      "rachel",
      "joe_biden",
      "donald_trump",
      "barack_obama",
      "domi",
      "bella",
      "antoni"
    ];

    const voiceList = voiceOptions.map((voice) => `◦ ${voice}`).join('\n');

    await m.reply(`*List of Available Voice IDs:*\n\n${voiceList}\n\n🐱 Enter the Voice ID\n*Example:* .voice bella im use anos-ai`);
    return;
  }

  const [voiceId, ...message] = text.split(' ');

  if (!voiceId || !message.length) throw 'Enter the correct format. *Example:* .voice bella i use sazumi bot';

  const voiceOptions = [
    "elon_musk",
    "steve_jobs",
    "joe_rogan",
    "taylor_swift",
    "selena_gomez",
    "meryl_streep",
    "jennifer_lawrence",
    "morgan_freeman",
    "jordan_peterson",
    "snoop_dogg",
    "rachel",
    "joe_biden",
    "donald_trump",
    "barack_obama",
    "domi",
    "bella",
    "antoni"
  ];

  if (!voiceOptions.includes(voiceId)) {
    throw '🐱 Invalid Voice ID. Choose from: ' + voiceOptions.join(', ');
  }

  const apiKey = `${global.rose}`;
  const apiUrl = `https://api.itsrose.life/tools/tts?text=${encodeURIComponent(message.join(' '))}&voice_id=${voiceId}&apikey=${apiKey}`;

  try {
  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

    const { data } = await axios.get(apiUrl, {
      responseType: 'arraybuffer'
    });

    await conn.sendFile(m.chat, Buffer.from(data), 'audio.mp3', '', m);
  } catch (error) {
    const errorMessage = `🐱 Upps Erorr: ${error.message}`;
    throw errorMessage;
  }
};

handler.help = ['voice [voice_id] <teks>'];
handler.tags = ['tools'];
handler.command = /^voice$/i;

module.exports = handler;
