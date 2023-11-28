/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

let handler = async (m, { conn, text, usedPrefix }) => {
    let sender = m.sender
    let name = conn.getName(sender)
    let mention = '@' + m.sender.split`@`[0];
    let caption = `🐱 Halo ${mention}, You can get the sazumi-bot script via Sazumi Viki official github

◦ Github: https://github.com/SazumiVicky/sazumi-bot
◦ Buy Script Update sazumi-bot: https://wa.me/+6286236226786

*Question:*

• *What's the difference between paid sc and free ones?*
◦ The difference is that 80% of the scripts are ENC, and it's rare to get updates.

• *Where can I buy the sazumi-bot sc update?*
◦ You can buy sc sazumi-bot via telegram or WhatsApp, the official owner of sazumi-bot.
◦ Telegram: https://t.me/sazumiviki
◦ Whatsapp: https://wa.me/+6285236226786

• *How to get sazumi-bot sc update?*
◦ For those who have purchased the sazumi-bot sc, we will add them to a special group.`;

    m.reply(caption);
};

handler.help = ['script', 'sc', 'kode', 'source', 'sourcecode'];
handler.tags = ['tools'];
handler.command = /^(script|sc|kode|source|sourcecode)$/i;
handler.register = true;

module.exports = handler;
