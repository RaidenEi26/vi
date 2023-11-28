/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const axios = require('axios');

const handler = async (m, { text }) => {
  try {
    if (!text) {
      throw `Example: .diffusion 1 girl`;
    }

    conn.chatRead(m.chat);
    conn.sendMessage(m.chat, {
      react: {
        text: '🕒',
        key: m.key,
      }
    });
    
    const apiUrl = `https://api.itsrose.life/image/stable/diffusion`;
    const apikey = `${global.rose}`;
    
    const params = {
      apikey: apikey,
      negative_prompt: "nsfw, 3d, bad anatomy",
      ratio: "1:1",
      cfg: 7.5,
      model_id: "anythingv3",
      seed: "-1",
      prompt: text,
      json: true,
    };
    
    const { data } = await axios.get(apiUrl, { params });
    
    const { status, result } = data;
    
    if (!status) {
      throw 'Upps Erorr';
    } else {
      const { base64Image, is_nsfw, mimetype } = result;
      const image_buffer = Buffer.from(base64Image, "base64");
      
      if (is_nsfw) {
        m.reply('The result contains NSFW');
      } else {
        await conn.sendFile(m.chat, image_buffer, 'diffusion.jpg', `*🐱 Result for:* ${text}`, m);
      }
    }
  } catch (e) {
    m.reply('Upps erorr, enter a prompt, for *Example:* .diffusion 1 girl');
  }
};

handler.help = ['diffusion /prompt'];
handler.tags = ['tools'];
handler.command = /^diffusion$/i;

module.exports = handler;
