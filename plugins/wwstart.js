/*
◦ Code By : Vladimir Ages
◦ Contact : wa.me/6281381217265
*///wwstart.js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {};
  let id = m.chat;
  if (!werewolf[id] || werewolf[id].status !== "playing") {
    m.reply(`🐺 Tidak ada game Werewolf yang sedang berlangsung.\n\n${global.footer}`);
    return;
  }
  if (m.sender !== werewolf[id].owner) {
    m.reply(`🐺 Hanya owner game yang dapat memulai game.\n*Owner game:* @${werewolf[id].owner.split('@')[0]}`);
    return;
  }
  if (werewolf[id].phase !== "join") {
    m.reply(Func.texted('bold', "🐺 Maaf, Anda tidak dapat memulai permainan saat ini."));
    return;
  }
  if (Object.keys(werewolf[id].players).length < 5) {
    m.reply(Func.texted('bold', "🐺 Setidaknya 5 pemain diperlukan untuk memulai permainan."));
    return;
  }
  if (werewolf[id].phase !== "join") {
    m.reply(Func.texted('bold', "Permainan sudah dimulai."));
    return;
  }

  let numWerewolves = 1;
  let players = Object.keys(werewolf[id].players);
  let wolves = [];
  while (wolves.length < numWerewolves) {
    let wolf = players[Math.floor(Math.random() * players.length)];
    if (werewolf[id].players[wolf] === "villager") {
      werewolf[id].players[wolf] = "werewolf";
      werewolf[id].wolves.push(wolf);
      wolves.push(wolf);
    }
  }
  werewolf[id].phase = "vote";
  werewolf[id].guessedWerewolf = null;

  let targetPlayerIndex = Math.floor(Math.random() * players.length);
  let targetPlayer = players[targetPlayerIndex];
  let targetPlayerName = conn.getName(targetPlayer);
  werewolf[id].killedPlayer = targetPlayer;
  conn.reply(m.chat, `🐺 Permainan telah dimulai. Werewolf telah membunuh @${targetPlayer.split('@')[0]}.`);

  for (let player in werewolf[id].players) {
    let role = werewolf[id].players[player];
    let roleName = role === "werewolf" ? "Werewolf" : "Villager";
    let playerName = conn.getName(player);
    let message = `Anda adalah ${roleName}. Misi Anda adalah untuk tetap tidak terdeteksi dan meyakinkan penduduk desa bahwa Anda bukan manusia serigala. Semoga berhasil!`;
    m.reply(`@${player.split`@`[0]}, ${message}\n\n${global.footer}`, player, { mentionedJid: [player] });
  }
  
  global.db.data.werewolf = werewolf;
  
  await delay(200);
  await conn.reply(m.chat, `🐺 Permainan werewolf dimulai. Silakan periksa pesan pribadi Anda untuk melihat peran Anda\n\n${global.footer}`);
  
  let villagerList = "";
  let villagerNumber = 1;
  for (let villager of werewolf[id].villagers) {
    let playerName = global.db.data.users[villager].name;
    villagerList += `*${villagerNumber}. ${playerName}*\n`;
    villagerNumber++;
  }
  
  await delay(400);
  let pilih = `Silakan pilih salah satu pemain di bawah ini untuk menentukan siapa werewolf-nya.\nGunakan format: .wwvote <no player>\n\n${villagerList}\n*Contoh:* .wwvote 1`;
  await conn.sendMessage(m.chat, {
  text: pilih,
  contextInfo: {
    externalAdReply: {
      title: '🗳️ Voting Phase',
      body: `🐺 There's a werewolf inside`,
      thumbnailUrl: 'https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/20230716_133314.jpg',
      sourceUrl: 'https://Instagram.com/@moe.sazumiviki',
      mediaType: 1,
      renderLargerThumbnail: true
    }}}, {})
};

handler.help = ['wwstart'];
handler.tags = ['game'];
handler.command = /^wwstart|startww$/i;
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;