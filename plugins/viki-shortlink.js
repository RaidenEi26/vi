/*
* Whatsapp: +6285236226786
* Developer: Sazumi Viki
* Instagram: @moe.sazumiviki
* Source: https://github.com/SazumiVicky/sazumi-bot
*/

const fetch = require('node-fetch');
const { readFileSync } = require('fs');

const config = JSON.parse(readFileSync('config.json'));

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    throw `*Example:* .${command} https://sazumiviki.me`;
  }

  try {
    const token = config.apiToken;
    const url = 'https://t.ly/api/v1/link/shorten';
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    const body = {
      'long_url': text,
      'domain': 'https://t.ly/',
      'public_stats': true,
    };
    
    conn.chatRead(m.chat);
	conn.chatRead(m.chat)
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });
    const data = await response.json();
    
    m.reply(`🐱 Here's your shortened link: ${data.short_url}`);
  } catch (error) {
    console.log(error);
    m.reply('🐱 Sorry, there was an error while shortening the link, please try again later!');
  }
};

handler.help = ['short', 'shortlink'].map(v => v + ' <link>');
handler.tags = ['tools'];
handler.command = /^(short|shortlink)$/i;
handler.limit = 1;

module.exports = handler;