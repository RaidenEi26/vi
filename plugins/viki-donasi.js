/* Owner: Sazumi Viki */
/* Asisten: Ayaka Ai */
/* Instagram: @moe.sazumiviki */
/* Facebook: Sazumi Viki */
/* Github: SazumiVicky */
/* Buy Sc Update: +6285236226786 */
/* Source Code: https://github.com/SazumiVicky/AyakaV2 */


let handler = async (m, { conn }) => {
  let image = 'https://link.sazumiviki.me/rjFujS';
  let description = `Thank you for donating support to the Anos AI. Your contribution means a lot to us to continue to improve the quality of the services we provide. We really appreciate your help. Thank You!\n\n• *Dana* : 081267905243\n• *Pulsa* : 081275753048 (Telkomsel) \n• *Pulsa* : 089503559714 (Tri)\n• *Gopay* : 081267905243`;

  conn.sendFile(m.chat, image, 'donation.jpg', description, m);
};

handler.help = ['donasi'];
handler.tags = ['info'];
handler.command = /^(donasi|donate|payment)$/i;

module.exports = handler;