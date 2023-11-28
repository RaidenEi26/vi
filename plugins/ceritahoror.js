/*
* Whatsapp: +6285236226786
* Developer: Sazumi Viki
* Instagram: @moe.sazumiviki
* Source: https://github.com/SazumiVicky/sazumi-bot
*/

const axios = require('axios');

let handler = async (m, { conn }) => {
  try {
    m.reply('Wait a moment..');

    let response = await axios.get(`https://api.lolhuman.xyz/api/ceritahoror?apikey=${global.lolkey}`);
    let result = response.data.result;

    let thumbnail = result.thumbnail;
    let caption = `*${result.title}*\n\n${result.desc}\n\n${result.story}`;

    conn.sendFile(m.chat, thumbnail, 'sazumiviki.jpg', caption, m);
  } catch (error) {
    console.log(error);
    m.reply('An error occurred while fetching the horror story.');
  }
};

handler.help = ['ceritahoror'];
handler.tags = ['internet'];
handler.command = /^ceritahoror$/i;

module.exports = handler;