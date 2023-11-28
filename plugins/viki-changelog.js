/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

let handler = async (m, { conn, text, command, usedPrefix, isOwner }) => {
  let image = 'https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/20230805_114236.jpg'
  let caption = ''
  let changelogs = global.db.data.changelog || []

  switch (command) {
    case 'changelog':
    case 'log':
      if (!changelogs.length) return conn.reply(m.chat, 'There are no changelogs yet', m)
      caption = changelogs.map(changelog => {
        let [date, ...items] = changelog.split(' - ')
        return `• ${date}\n${items.map(item => `  ◦ ${item}`).join('\n')}`
      }).join('\n\n')
      conn.reply(m.chat, caption, m, {
        contextInfo: {
          externalAdReply: {
            title: `${global.namebot}`,
            body: "C H A N G E L O G",
            thumbnailUrl: image,
            sourceUrl: `${global.sourceUrl}`,
            mediaType: 1,
            renderLargerThumbnail: true
          }
        }
      })
      break;

    case 'addchangelog':
      if (!isOwner) return m.reply('🐱 Sorry, only the owner can use this command')
      if (!text) return m.reply(`Usage: ${usedPrefix}addchangelog <text>`)
      changelogs.unshift(`${new Date().toDateString()} - ${text}`)
      global.db.data.changelog = changelogs
      m.reply('🐱 Changelog has been added successfully')
      break;

    case 'rchangelog':
      if (!isOwner) return m.reply('🐱 Sorry, only the owner can use this command')
      if (!text) return m.reply(`Usage: ${usedPrefix}rchangelog <text>`)
      let index = changelogs.findIndex(changelog => changelog.includes(text))
      if (index === -1) return m.reply('🐱 Changelog not found')
      changelogs.splice(index, 1)
      global.db.data.changelog = changelogs
      m.reply('🐱 Changelog has been removed successfully')
      break;

    default:
      m.reply('Unknown command. Use !help to see available commands.')
      break;
  }
}

handler.help = ['changelog', 'log', 'addchangelog', 'rchangelog']
handler.tags = ['info']
handler.premium = false

handler.command = /^(changelog|log|addchangelog|rchangelog)$/i
handler.owner = false

module.exports = handler
