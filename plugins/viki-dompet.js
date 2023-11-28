/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

let handler = async (m, { conn, args }) => {
  let target = m.mentionedJid[0] || m.sender
  let user = global.db.data.users[target]
  let name = user.name

  let exp = user.exp
  let limit = user.limit
  let balance = user.balance
  let premium = user.premium ? 'Yes' : 'No'
  let atm = user.atm

  let caption = `┌  ◦  *Dompet :* ${target === m.sender ? 'Saya' : '@' + name}
│  ◦  *Exp :* ${exp}
│  ◦  *Limit :* ${limit}
│  ◦  *Balance :* ${balance}
│  ◦  *Premium :* ${premium}
│  ◦  *Atm Balance :* ${atm}
╰──  –`

  conn.reply(m.chat, caption, m, {
    contextInfo: {
      externalAdReply: {
        title: `${global.namebot}`,
        body: "Ini adalah informasi saldo Anda.",
        thumbnailUrl: "https://cdn.jsdelivr.net/gh/SazumiVicky/MakeMeow-Storage@main/20230528_122926.jpg",
        sourceUrl: `${global.sourceUrl}`,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  })
}

handler.help = ['balance', 'balance @user']
handler.tags = ['info']
handler.owner = false
handler.command = /^(balance|dompet)$/i

module.exports = handler