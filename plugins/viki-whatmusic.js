/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const axios = require('axios');
const FormData = require('form-data');
const { fnctions } = require("../lib/fnctions");
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'dothq3dq5', 
  api_key: '482973297947392', 
  api_secret: 'JcNTxEVPzFaFzVcwjdfQ8cjD05A' 
});

const uploadToCloudinary = async (audioBuffer) => {
  const cloudinaryResponse = await cloudinary.uploader.upload('data:audio/mpeg;base64,' + audioBuffer.toString('base64'), {
    resource_type: 'auto',
    folder: 'audios',
  });

  return cloudinaryResponse.secure_url;
};

const cooldown = new Set();

let handler = async (m, { conn }) => {
  try {
    if (!await fnctions()) return;
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';

    if (/audio/.test(mime)) {
      if (cooldown.has(m.sender)) {
        m.reply('Please wait *10 seconds* before using this command again.');
        return;
      }

      let audioBuffer = await q.download();

      let audioUrl = await uploadToCloudinary(audioBuffer);

      const form = new FormData();
      form.append('url', audioUrl);
      form.append('api_token', 'd291aec7e5fbdcca794ba9874aee16fe');

      conn.chatRead(m.chat);
      conn.sendMessage(m.chat, {
        react: {
          text: '🕒',
          key: m.key,
        }
      });

      const { data } = await axios.post('https://api.audd.io/', form, {
        headers: form.getHeaders(),
      });

      if (data.status === 'success') {
        let title = data.result.title;
        let artist = data.result.artist;
        let album = data.result.album;

        let replyText = `*🐱 Audio Result*\n\n• *TITLE:* ${title}\n• *ARTIST:* ${artist}\n• *ALBUM:* ${album}`;

        m.reply(replyText); 

      } else {
        m.reply('❌ Song detection failed.');
      }

      cooldown.add(m.sender);
      setTimeout(() => {
        cooldown.delete(m.sender);
      }, 10000);

    } else {
      m.reply('🐱 Please reply to an audio file');
    }
  } catch (e) {
    m.reply(`Error: ${e}`);
  }
};

handler.help = ['whatmusic'];
handler.tags = ['tools'];
handler.command = /^whatmusic$/i;

module.exports = handler;
