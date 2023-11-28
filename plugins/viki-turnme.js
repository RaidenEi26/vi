/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const axios = require('axios');
const uploadImage = require('../lib/uploadImage.js');
const { fnctions } = require('../lib/fnctions');

const handler = async (m, { conn, text }) => {
  if (!await fnctions()) return;

  if (text && !m.quoted) {
    throw 'Please reply image';
  } else if (!text) {
    const stylesList = [
      "┌ ◦ anime",
      "│ ◦ pixar",
      "│ ◦ jojo",
      "│ ◦ retro",
      "│ ◦ spirited",
      "│ ◦ cyberpunk",
      "│ ◦ synthwave",
      "│ ◦ horror",
      "│ ◦ zombie",
      "│ ◦ rdr",
      "│ ◦ pixel",
      "│ ◦ thunderstruck",
      "│ ◦ onepiece",
      "│ ◦ onfire",
      "│ ◦ gtav",
      "│ ◦ aether",
      "│ ◦ impasto",
      "│ ◦ barbie",
      "│ ◦ airbender",
      "│ ◦ block",
      "└ ◦ heroes"
    ].join('\n');
    
    throw `*🐱 L I S T - S T Y L E S*\n\n${stylesList}\n\n*Example:* .turnme anime`;
  }

  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  const apikey = `${global.rose}`;
  const apiUrl = `https://api.itsrose.life/image/turnMe?apikey=${apikey}`;

  const styles = [
    "anime",
    "pixar",
    "jojo",
    "retro",
    "spirited",
    "cyberpunk",
    "synthwave",
    "horror",
    "zombie",
    "rdr",
    "pixel",
    "thunderstruck",
    "onepiece",
    "onfire",
    "gtav",
    "aether",
    "impasto",
    "barbie",
    "airbender",
    "block",
    "heroes"
  ];

  const style = text.toLowerCase();

  if (!styles.includes(style)) {
    throw '🐱 Style not exist. Available styles:\n' + styles.join(', ');
  }

  const imageUrl = await uploadImage((m.quoted ? await m.quoted.download() : await conn.downloadAndSaveMedia(m)), 'turnme', 'image');

  const body = {
    "init_image": imageUrl,
    "style": style,
    "image_num": 1,
    "width": 648,
    "height": 864
  };

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  const start = Date.now();
  const { data } = await axios.post(apiUrl, body, { headers });
  const totalMs = Date.now() - start;

  const { status, result } = data;

  if (!status) {
    throw '🐱 Failed to process image.';
  } else {
    const { images } = result;
    for (const image of images) {
      await conn.sendFile(m.chat, image, 'turnme.jpg', `*🐱 Fetching:* ${totalMs}ms`, m);
    }
  }
};

handler.help = ['turnme /styles'];
handler.tags = ['tools'];
handler.command = /^turnme$/i;

module.exports = handler;
