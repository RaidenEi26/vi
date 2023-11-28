/*
* Whatsapp: +6285236226786
* Developer: Sazumi Viki
* Instagram: @moe.sazumiviki
* Source: https://github.com/SazumiVicky/sazumi-bot
*/


const axios = require('axios');

let handler = async (m, { text }) => {
  if (!text) {
    throw '*Example*: .simi Hai Simi!';
  }

  let message = encodeURIComponent(text);
  let level = 12;
  let lc = 'id';
  let callName = 'frieren';
  let apiKey = '${global.rose}';
  let apiUrl = `https://api.itsrose.life/others/simi?message=${message}&level=${level}&lc=${lc}&call_name=${callName}&apikey=${apiKey}`;

  try {
    let response = await axios.get(apiUrl);
    let data = response.data;

    if (data.status === true) {
      let result = data.result;
      let simiSentence = result.simi.sentence;
      m.reply(simiSentence);
    } else {
      throw '🐱 Failed to get a response from Simi.';
    }
  } catch (error) {
    console.error(error);
    m.reply('🐱 There was an error communicating with Simi.');
    m.reply(`Detail Error:\n\n${error.message}`);
  }
};

handler.help = ['simi'];
handler.tags = ['internet'];
handler.command = /^simi$/i;

module.exports = handler;