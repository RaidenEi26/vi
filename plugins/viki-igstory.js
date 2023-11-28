/* Owner: Sazumi Viki */
/* Asisten: Ayaka Ai */
/* Instagram: @moe.sazumiviki */
/* Facebook: Sazumi Viki */
/* Github: SazumiVicky */
/* Buy Sc Update: +6285236226786 */
/* Source Code: https://github.com/SazumiVicky/AyakaV2 */


const axios = require('axios');

let handler = async (m, { conn, text }) => {
  if (!text) {
    throw '*Example:* .igstory moe.sazumiviki';
  }

  let username = text.trim();

  try {
    let api = `https://api.lolhuman.xyz/api/igstory/${username}?apikey=${global.lolkey}`;
    let { data } = await axios.get(api);

    if (data.status !== 200 || data.result.length === 0) {
      throw '🐱 No Instagram story found for the given user.';
    }

    let mediaUrls = data.result;
	conn.chatRead(m.chat)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})

    for (let url of mediaUrls) {
      await conn.sendFile(m.chat, url, '', '', m);
    }
  } catch (error) {
    console.log(error);
    throw '🐱 An error occurred while retrieving Instagram story.';
  }
};

handler.help = ['igstory'];
handler.premium = true;
handler.tags = ['downloader', 'premium'];
handler.command = /^igstory$/i;

module.exports = handler;