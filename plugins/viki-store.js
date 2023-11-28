/*
* Whatsapp: +6285236226786
* Developer: Sazumi Viki
* Instagram: @moe.sazumiviki
* Source: https://github.com/SazumiVicky/sazumi-bot
*/


let handler = async (m, { conn, text, command, usedPrefix, isOwner }) => {
  let image = 'https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/20230516_195311.jpg'
  let store = global.db.data.store || {}
  
  switch (command) {
    case 'store':
      let caption = ''
      for (let category in store) {
        caption += `• *${category.toUpperCase()}*\n`
        for (let list of store[category]) {
          caption += `  ◦ ${list}\n`
        }
        caption += '\n'
      }
      conn.sendFile(m.chat, image, 'store.jpg', caption, m)
      break
      
    case 'addcategory':
      if (!isOwner) return conn.reply(m.chat, 'Sorry, only the owner can use this command', m)
      if (!text) return conn.reply(m.chat, `Usage: ${usedPrefix}addcategory <category name>`, m)
      store[text.toLowerCase()] = []
      global.db.data.store = store
      conn.reply(m.chat, 'Category has been added successfully', m)
      break
      
    case 'rcategory':
      if (!isOwner) return conn.reply(m.chat, 'Sorry, only the owner can use this command', m)
      if (!text) return conn.reply(m.chat, `Usage: ${usedPrefix}rcategory <category name>`, m)
      if (!store[text.toLowerCase()]) return conn.reply(m.chat, 'Category not found', m)
      delete store[text.toLowerCase()]
      global.db.data.store = store
      conn.reply(m.chat, 'Category has been removed successfully', m)
      break
      
    case 'addlist':
      if (!text) return conn.reply(m.chat, `Usage: ${usedPrefix}addlist <list name> | <category name>`, m)
      let [list, category] = text.split("|").map(v => v.trim())
      if (!(category && list)) return conn.reply(m.chat, `Usage: ${usedPrefix}addlist <list name> | <category name>`, m)
      if (!store[category.toLowerCase()]) store[category.toLowerCase()] = []
      store[category.toLowerCase()].push(list)
      global.db.data.store = store
      conn.reply(m.chat, 'List has been added successfully', m)
      break
      
    case 'rlist':
      if (!text) return conn.reply(m.chat, `Usage: ${usedPrefix}rlist <list name>`, m)
      for (let category in store) {
        let index = store[category].findIndex(list => list.toLowerCase() === text.toLowerCase())
        if (index !== -1) {
          store[category].splice(index, 1)
          global.db.data.store = store
          conn.reply(m.chat, 'List has been removed successfully', m)
          return
        }
      }
      conn.reply(m.chat, 'List not found', m)
      break
  }
}

handler.help = ['store', 'addcategory <category name>', 'rcategory <category name>', 'addlist <list name> | <category name>', 'rlist <list name>']
handler.tags = ['store']

handler.command = /^(store|addcategory|rcategory|addlist|rlist)$/i
handler.owner = true

handler.admin = false
handler.mods = false
handler.premium = false
handler.group = false

module.exports = handler