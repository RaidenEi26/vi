/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const axios = require('axios');

const handler = async (m, { text }) => {
  if (!text) {
    throw '*Example*: .igstalk moe.sazumiviki';
  }

  const apiUrl = `https://api.lolhuman.xyz/api/stalkig/${encodeURIComponent(text)}?apikey=${global.lolkey}`;

  try {
	conn.chatRead(m.chat);
	conn.sendMessage(m.chat, {
	  react: {
		text: '🕒',
		key: m.key,
	  }
	});
    const { data } = await axios.get(apiUrl);
    const { photo_profile, username, fullname, posts, followers, following, bio } = data.result;
    const caption = `*Username:* ${username}\n*Full Name:* ${fullname}\n*Posts:* ${posts}\n*Followers:* ${followers}\n*Following:* ${following}\n*Bio:* ${bio}`;

    await conn.sendFile(m.chat, photo_profile, 'profile.jpg', caption, m);
  } catch (error) {
    console.error(error);
    throw '🐱 Erorr';
  }
};

handler.help = ['igstalk /username'];
handler.tags = ['internet'];
handler.command = /^(igstalk)$/i;

module.exports = handler;
