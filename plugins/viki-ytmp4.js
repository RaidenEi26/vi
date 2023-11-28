/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const axios = require('axios');
const { fnctions } = require("../lib/fnctions");

const handler = async (m, { text, conn }) => {
  if (!text) throw '*Example:* .ytmp4 https://youtube.com/xxxxxx';

  const isDoc = text.includes('--doc');
  const apiUrl = `https://sazumiyt.onrender.com/api/youtube?type=video&q=${encodeURIComponent(text.replace('--doc', '').trim())}`;
  conn.chatRead(m.chat);
  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });
  try {
    const { data } = await axios.get(apiUrl);
    if (!await fnctions()) return;
    if (data && data.video && data.video.downloadLinks) {
      const downloadLinks = data.video.downloadLinks;
      const highestQuality = Object.keys(downloadLinks)[0];
      const fileSizeMB = downloadLinks[highestQuality].fileSize / (1024 * 1024);
      
      if (fileSizeMB > 300) {
        m.reply('🐱 Videos reach 300mb');
        return;
      }
      
      const videoInfo = `– *YOUTUBE - MP4*\n\n*◦ Title :* ${data.title}\n*◦ Views :* ${data.views}\n*◦ Size  :* ${downloadLinks[highestQuality].fileSizeH}`;
      const buffer = await axios.get(downloadLinks[highestQuality].download, { responseType: 'arraybuffer' });
      
      if (isDoc) {
        await conn.sendMessage(m.chat, {
          document: buffer.data,
          mimetype: 'video/mp4',
          fileName: `${data.title}.mp4`,
          caption: videoInfo
        }, { quoted: m });
      } else {
        await conn.sendFile(m.chat, buffer.data, 'video.mp4', videoInfo, m);
      }
    } else {
      throw '🐱 Failed to retrieve video information.';
    }
  } catch (error) {
    console.error(error);
    m.reply('🐱 Failed to retrieve video information.');
  }
};

handler.help = ['ytmp4'];
handler.tags = ['downloader', 'tools'];
handler.command = /^(ytmp4)$/i;

module.exports = handler;