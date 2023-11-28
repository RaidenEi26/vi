const { sticker1, sticker5 } = require('../lib/sticker')
const WSF = require('wa-sticker-formatter')
const { fnctions } = require('../lib/fnctions');

let handler = async (m, { conn }) => {
  if (!await fnctions()) return;
  let stiker = false
  try {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (/webp/.test(mime) || /gif/.test(mime)) {
      let img = await q.download()
      if (!img) throw `reply sticker with command s`
      let wsf = new WSF.Sticker(img, {
        pack: global.packname,
        author: global.author,
        crop: false,
      })
      await wsf.build()
      stiker = await wsf.get()
    } else if (/image/.test(mime)) {
      let img = await q.download()
      if (!img) throw `reply image with command s`
      stiker = await sticker5(img, false, packname, author)
    } else if (/video/.test(mime)) {
      if ((q.msg || q).seconds > 11) return m.reply('maksimal 10 detik!')
      let img = await q.download()
      if (!img) throw `reply video with command s`
      let wsf = new WSF.Sticker(img, {
        pack: global.packname,
        author: global.author,
        crop: false,
      })
      await wsf.build()
      stiker = await wsf.get()
    } else if (m.quoted.text) {
      if (isUrl(m.quoted.text)) stiker = await sticker(false, m.quoted.text, packname, author)
      else throw 'URL is not valid! end with jpg/gif/png'
    }
  } catch (e) {
    throw e
  } finally {
    if (stiker) {
      m.reply(stiker_wait)
      await conn.sendFile(m.chat, stiker, '', '', m)
    } else {
      throw 0
    }
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = /^(stiker|s|colong|sticker)$/i
handler.limit = 3
handler.register = true

module.exports = handler

const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4)/, 'gi'))
}
