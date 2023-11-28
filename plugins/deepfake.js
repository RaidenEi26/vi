const axios = require('axios');
const uploadImage = require('../lib/uploadImage.js');

const handler = async (m, { conn, text }) => {
  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';

  if (!mime.startsWith('image/')) {
    throw '🐱 Reply to an image with a caption .deepfake */styles*';
  }
  
  const startFetchTime = Date.now();

  conn.sendMessage(m.chat, {
    react: {
      text: '🕒',
      key: m.key,
    }
  });

  const media = await q.download();
  const imageUrl = await uploadImage(media);
  const styleId = `${text}`

  const apiData = {
    init_image: imageUrl,
    style: styleId
  };

  const { data } = await axios.post(`https://api.itsrose.life/deep_fake/video?apikey=${global.rose}`, apiData);

  if (data.status && data.result.video.length > 0) {
    const videoUrl = data.result.video;
    const metadata = data.result.metadata;

    const fetchTime = Date.now() - startFetchTime;

    conn.sendFile(m.chat, videoUrl, 'deepfake.mp4', `*🐱 Fetching:* ${fetchTime} ms`, m);
  } else {
    throw '🐱 Failed to generate Deep Fake video.';
  }
};

handler.help = ['deepfake'];
handler.tags = ['tools'];
handler.command = /^(deepfake)$/i;

module.exports = handler;