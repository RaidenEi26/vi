/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Code by: Ages
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

let levelling = require('../lib/levelling')
const canvafy = require("canvafy");
let fetch = require("node-fetch");
const canvacord = require("canvacord")

let handler = async (m, { conn, command }) => {
  let user = global.db.data.users[m.sender]
  if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
    let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
    let ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://cdn.jsdelivr.net/gh/SazumiVicky/MakeMeow-Storage@main/levelup.jpg");
    let pp = await (await fetch(ppUrl)).buffer();
    let curr = user.exp - min
    let minxp = max - user.exp
    let textinfo = `*❑ L E V E L - U P*

Level *➠ ${user.level}*
Less than *➠ ${max - user.exp}(XP) more!*`.trim()
    const rank = new canvacord.Rank()
            .setAvatar(pp)
            .setCurrentXP(curr)
            .setLevel(user.level, "RANK", true)
            .setRank(user.level, "LEVEL", true)
            .setLevelColor("#2B2E35", "#2B2E35")
            .setRankColor("#FFFFFF", "#6636E5")
            .setRequiredXP(xp)
            .setStatus("streaming")
            .setProgressBar("#6636E5", "COLOR")
            .setProgressBarTrack("#FFFFFF")
            .setUsername(user.name)
            .setDiscriminator(`0001`)
            .setFontSize(1.5)
        
        rank.build()
            .then(data => {
                conn.sendFile(m.chat, data, "RankCard.png", textinfo, m)
            })
  }
  let before = user.level * 1
	while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
	if (before !== user.level) {
	const levelUp = await new canvafy.LevelUp()
    .setAvatar(pp)
    .setBackground("image", "https://telegra.ph/file/3f02ef79a183e515398c7.jpg")
    .setUsername(user.name)
    .setBorder("#000000")
    .setAvatarBorder("#ff0000")
    .setOverlayOpacity(0.7)
    .setLevels(before,user.level)
    .build();
   let ages = `*❑ L E V E L - UP*

From: *[ ${before} ]* ➠ *[ ${user.level} ]*
Congrulations, you have leveled up!🎉🎉`.trim()
                await conn.sendFile(m.chat, levelUp, 'lvlup.jpg', ages, m)
        }
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = /^level(|up)|lvl(|up)$/i

module.exports = handler