let handler = async (m, { conn, args, command }) => {
	let group = m.chat
        await m.reply('Sayonara , , ! (≧ω≦)ゞ', m.chat) 
        await  conn.groupLeave(group)
        }
handler.help = ['leavegc', 'out']
handler.tags = ['owner']
handler.command = /^(out|leavegc)$/i

handler.rowner = true
handler.owner = false
handler.group = true

module.exports = handler