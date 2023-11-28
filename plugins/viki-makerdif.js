const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
const uploadImage = require('../lib/uploadImage.js');
const { fnctions } = require('../lib/fnctions.js');

const handler = async (m, { conn, usedPrefix, command, args, text }) => {
  let style = (args[0] || '').toLowerCase();
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  let listStyle = `┌ ◦ Use Format: *.${command} <style>*
└ ◦ Example: *.${command} anime*

*— L I S T - S T Y L E*

┌ ◦ anime
│ ◦ manhwa
│ ◦ manhwa_female
│ ◦ manhwa_male
│ ◦ idol
│ ◦ cg
│ ◦ makima
│ ◦ princess
│ ◦ gracefull
│ ◦ azure_sky
│ ◦ summer
│ ◦ cold
│ ◦ manga
│ ◦ angel
│ ◦ fresh
│ ◦ comic
└ ◦ cat_ears

*Note:* Reply/Send Image with caption .${command} <style>`;

  try {
    if (/makerdiff|jadi|makerdif/i.test(command)) {
      if (!(await fnctions())) return;

      switch (style) {
        case 'anime':
        case 'cg':
        case 'manhwa_female':
        case 'manhwa_male':
        case 'princess':
        case 'idol':
        case 'fresh':
        case 'makima':
        case 'manhwa':
        case 'gracefull':
        case 'cold':
        case 'manga':
        case 'azure_sky':
        case 'cat_ears':
        case 'summer':
        case 'comic':
        case 'angel':
          if (!mime) throw `Send/Reply Images with captions .${command} ${style ? style : 'anime'}`;
          conn.chatRead(m.chat);
          conn.sendMessage(m.chat, {
            react: {
              text: '🕒',
              key: m.key,
            }
          });
          let media = await q.download();
          let url = await uploadImage(media);

          const queryParams = {
            style: style,
            json: false, 
          };

          const response = await fetch(url);
          const buffer = await response.buffer();

          const form = new FormData();
          form.append('file', buffer, {
            filename: 'image.jpg',
            contentType: 'image/jpeg',
            knownLength: buffer.length,
          });

          const { data } = await axios
            .request({
              baseURL: 'https://api.itsrose.life',
              url: '/image/differentMe',
              method: 'POST',
              params: {
                ...queryParams,
                apikey: global.rose,
              },
              data: form,
              responseType: 'arraybuffer',
            })
            .catch((e) => e.response.data);

          if (!data) {
            throw 'Failed to process image.';
          }

          const resultBuffer = Buffer.from(data, 'binary');
          return conn.sendFile(m.chat, resultBuffer, 'ppk.jpg', `STYLE: ${style.toUpperCase()}`, m);
        default:
          return conn.sendMessage(m.chat, {
            text: listStyle,
            contextInfo: {
              externalAdReply: {
                title: "M A K E R D I F F",
                body: 'The following styles are available',
                thumbnailUrl: "https://cdn.jsdelivr.net/gh/SazumiVicky/MakeMeow-Storage@main/20230619_095103.jpg",
                sourceUrl: `${global.sourceUrl}`,
                mediaType: 1,
                renderLargerThumbnail: true
              }
            }
          });
      }
    } else {
      m.reply('Invalid command');
    }
  } catch (e) {
    m.reply('error');
    console.log(e);
  }
};

handler.tags = ['tools', 'premium'];
handler.premium = true;
handler.command = /^(makerdif|jadi|makerdiff)$/i;
handler.help = ['makerdiff'];
handler.limit = true;

module.exports = handler;