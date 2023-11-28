let handler = async(m, { conn, usedPrefix, command }) => {
	
let time = global.db.data.users[m.sender].lastmulung + 1800000
  if (new Date - global.db.data.users[m.sender].lastmulung< 1800000) throw `Anda sudah bermain tebak bom\nTunggu selama ${msToTime(time - new Date())} lagi`
      conn.tebakbom = conn.tebakbom ? conn.tebakbom : {}
global.db.data.users[m.sender].lastmulung = new Date * 1
      let id = m.chat,
         timeout = 180000
      if (id in conn.tebakbom) return conn.reply(m.chat, '*^ sesi ini belum selesai!*', conn.tebakbom[id][0])
      const bom = ['💥', '✅', '✅', '✅', '✅', '✅', '✅', '✅', '✅'].sort(() => Math.random() - 0.5)
      const number = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
      const array = []
      bom.map((v, i) => array.push({
         emot: v,
         number: number[i],
         position: i + 1,
         state: false
      }))
      let teks = `${htki}  *B O M B* ${htka}\n\n`
      teks += `Kirim angka *1* - *9* untuk membuka *9* kotak nomor di bawah ini :\n\n`
      teks += array.slice(0, 3).map(v => v.state ? v.emot : v.number).join('') + '\n'
      teks += array.slice(3, 6).map(v => v.state ? v.emot : v.number).join('') + '\n'
      teks += array.slice(6).map(v => v.state ? v.emot : v.number).join('') + '\n\n'
      teks += `Timeout : [ *${((timeout / 1000) / 60)} menit* ]\n`
      teks += ` `
      conn.tebakbom[id] = [
         await conn.reply(m.chat, teks, m),
         array,
         setTimeout(() => {
            let v = array.find(v => v.emot == '💥')
            if (conn.tebakbom[id]) conn.reply(m.chat, `*Waktu habis!*, Bom berada di kotak nomor ${v.number}.`, conn.tebakbom[id][0])
            delete conn.tebakbom[id]
         }, timeout)
      ]
setTimeout(() => {
					conn.reply(m.chat, `Yuk waktunya tebakbom lagi 😄`, m)
					}, timeout)
   }
handler.help = ["tebakbom"]
handler.tags = ["game"]
handler.command = /^(tebakbom|bomb)$/i
handler.register = true
handler.group = true
module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}