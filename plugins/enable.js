let handler = async (m, {
	conn,
	usedPrefix,
	command,
	args,
	isOwner,
	isAdmin,
	isROwner
}) => {
	let isEnable = /true|enable|(turn)?on|1/i.test(command)
	let chat = global.db.data.chats[m.chat]
	let user = global.db.data.users[m.sender]
	let type = (args[0] || '').toLowerCase()
	let isAll = false
	let isUser = false
	switch (type) {
		case 'welcome':
			if (!m.isGroup) {
				if (!isOwner) {
					global.dfail('group', m, conn)
					throw false
				}
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			}
			chat.welcome = isEnable
			break
		case 'detect':
			if (!m.isGroup) {
				if (!isOwner) {
					global.dfail('group', m, conn)
					throw false
				}
			} else if (!isAdmin) {
				global.dfail('admin', m, conn)
				throw false
			}
			chat.detect = isEnable
			break
		case 'delete':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.delete = isEnable
			break
		case 'antidelete':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.delete = !isEnable
			break
		case 'autodelvn':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.autodelvn = isEnable
			break
		case 'document':
			chat.useDocument = isEnable
			break
		case 'public':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['self'] = !isEnable
			break
		case 'antilink':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiLink = isEnable
			break
		case 'antisticker':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiSticker = isEnable
			break
		case 'autosticker':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.stiker = isEnable
			break
		case 'toxic':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiToxic = !isEnable
			break
		case 'antitoxic':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiToxic = isEnable
			break
		case 'autolevelup':
			isUser = true
			user.autolevelup = isEnable
			break
		case 'mycontact':
		case 'mycontacts':
		case 'whitelistcontact':
		case 'whitelistcontacts':
		case 'whitelistmycontact':
		case 'whitelistmycontacts':
			if (!isOwner) {
				global.dfail('owner', m, conn)
				throw false
			}
			conn.callWhitelistMode = isEnable
			break
		case 'restrict':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['restrict'] = isEnable
			break
		case 'nyimak':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['nyimak'] = isEnable
			break
		case 'autoread':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['autoread'] = isEnable
			break
		case 'pconly':
		case 'privateonly':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['pconly'] = isEnable
			break
		case 'gconly':
		case 'grouponly':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['gconly'] = isEnable
			break
		case 'swonly':
		case 'statusonly':
			isAll = true
			if (!isROwner) {
				global.dfail('rowner', m, conn)
				throw false
			}
			global.opts['swonly'] = isEnable
			break
		case 'antiporn':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.antiPorn = isEnable
			break
		case 'chatbot':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.chatbot = isEnable
			break
		case 'simi':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.simi = isEnable
			break
		case 'openai':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.Ai = isEnable
			break
		case 'viewonce':
			if (m.isGroup) {
				if (!(isAdmin || isOwner)) {
					global.dfail('admin', m, conn)
					throw false
				}
			}
			chat.viewonce = isEnable
			break
		default:
			if (!/[01]/.test(command)) return m.reply(`
•  List Option:

┌  ◦  welcome
│  ◦  delete
│  ◦  openai
│  ◦  chatbot
│  ◦  simi
│  ◦  antiporn
│  ◦  public
│  ◦  antilink
│  ◦  antidelete
│  ◦  antisticker
│  ◦  autosticker
│  ◦  autolevelup
│  ◦  detect
│  ◦  viewonce
│  ◦  document
│  ◦  whitelistmycontacts
│  ◦  restrict
│  ◦  nyimak
│  ◦  autoread
│  ◦  pconly
│  ◦  gconly
└  ◦  swonly

•  Example:

┌  ◦  ${usedPrefix}enable welcome
└  ◦  ${usedPrefix}disable welcome
`.trim())
			throw false
	}
	m.reply(`
🐱 *${type}* Succeeded in ${isEnable ? 'turn it on' : 'turn'} off ${isAll ? 'for these bots' : isUser ? '' : 'for this chat'}
`.trim())
}
handler.help = ['en', 'dis'].map(v => v + 'able <option>')
handler.tags = ['group', 'owner']
handler.owner = false
handler.command = /^((en|dis)able|(tru|fals)e|(turn)?o(n|ff)|[01])$/i

module.exports = handler