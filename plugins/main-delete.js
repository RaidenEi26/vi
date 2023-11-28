let handler = async (m, {
	conn,
	usedPrefix,
	command
}) => {

	if (!m.quoted) throw `🐱 Reply the message you want to delete`
	try {
		let delet = m.message.extendedTextMessage.contextInfo.participant
		let bang = m.message.extendedTextMessage.contextInfo.stanzaId
		return conn.sendMessage(m.chat, {
			delete: {
				remoteJid: m.chat,
				fromMe: false,
				id: bang,
				participant: delet
			}
		})
	} catch {
		return conn.sendMessage(m.chat, {
			delete: m.quoted.vM.key
		})
	}
}
handler.help = ['delete']
handler.tags = ['tools']
handler.command = /^del|delete|unsend ?$/i
handler.group = false
handler.limit = true
handler.register = true
handler.admin = true
handler.botAdmin = true

module.exports = handler