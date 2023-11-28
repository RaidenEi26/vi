/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

let didyoumean = require('didyoumean');
let similarity = require('similarity');

Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = Object.freeze({
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  });
  var replacer = [];
  xStr.map((v, i) => replacer.push({
    original: v,
    convert: yStr[style].split('')[i]
  }));
  var str = text.toLowerCase().split('');
  var output = [];
  str.map(v => {
    const find = replacer.find(x => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

let handler = m => m;

handler.before = function (m, { match, usedPrefix }) {
  if ((usedPrefix = (match[0] || '')[0])) {
    let noPrefix = m.text.replace(usedPrefix, '').trim();
    let alias = Object.values(global.plugins).filter(v => v.help && !v.disabled).map(v => v.help).flat(1);
    let mean = didyoumean(noPrefix, alias);
    let sim = similarity(noPrefix, mean);
    let similarityPercentage = parseInt(sim * 100);

    if (mean && noPrefix.toLowerCase() !== mean.toLowerCase()) {
      let response = Styles(`The command you entered seems wrong, here are the recommended commands for the same:\n\n➠  *${usedPrefix + mean}*\n➠  *Similar results:* ${similarityPercentage}%`, 1);

      this.reply(m.chat, response, m, {
        contextInfo: {
          externalAdReply: {
            title: `${global.namebot}`,
            thumbnailUrl: 'https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/anang.jpeg',
            sourceUrl: 'https://chat.whatsapp.com/GSGo630lZlJB9Sr6hKaxSl',
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      });
    }
  }
}

module.exports = handler;
