/*
* Whatsapp: +6285236226786
* Developer: Sazumi Viki
* Instagram: @moe.sazumiviki
* Source: https://github.com/SazumiVicky/sazumi-bot
*/


const axios = require('axios')
const FileType = require('file-type')
const fs = require('fs')

let handler = async (m, { conn, args, command }) => {
  let username = args[0]
  if (!username) throw `Gunakan format: ${command} <username>`
  let apikey = `${global.lolkey}`
  let res = await axios.get(`https://api.lolhuman.xyz/api/stalktiktok/${encodeURIComponent(username)}?apikey=${apikey}`)
  let data = res.data
  if (data.status !== 200) {
    throw `Terjadi kesalahan saat mengambil data dari API. Status code: ${data.status}`
  }
  let caption = `Username: ${data.result.username}\nNickname: ${data.result.nickname}\nBio: ${data.result.bio}\nFollowers: ${data.result.followers}\nFollowing: ${data.result.followings}\nLikes: ${data.result.likes}\nVideo: ${data.result.video}`
  let imageBuffer = await axios.get(data.result.user_picture, { responseType: 'arraybuffer' })
  let fileType = await FileType.fromBuffer(imageBuffer.data)
  let fileName = `profile.${fileType.ext}`
  fs.writeFileSync(fileName, Buffer.from(imageBuffer.data, 'binary'))
  await conn.sendFile(m.chat, fileName, fileName, caption, m)
  fs.unlinkSync(fileName)
}

handler.help = ['ttstalk', 'tiktokstalk'].map(v => v + ' <username>')
handler.tags = ['tools']
handler.command = /^(ttstalk|tiktokstalk)$/i
handler.premium = false
handler.register = true
handler.limit = true

module.exports = handler