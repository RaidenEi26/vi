/*
Code by: Vladimir Ages
Contact: wa.me/6281381217265
*///wwvote.js
let handler = async (m, { conn }) => {
  let werewolf = global.db.data.werewolf || {};
  let id = m.chat;
  if (!werewolf[id] || !werewolf[id].players || Object.keys(werewolf[id].players).length === 0) {
    m.reply(`🐺 Tidak ada pemain dalam game.\nketik *.wwjoin* untuk bergabung.\n\n${global.footer}`);
    return;
  }
  if (!werewolf[id].players[m.sender]) {
    m.reply(Func.texted('bold', "🐺 Anda bukan peserta dalam game ini!"));
    return;
  }
  if (werewolf[id].phase !== "vote") {
    m.reply(Func.texted('bold', "🐺 Anda hanya dapat vote selama fase pemungutan suara."));
    return;
  }
  let voteIndex = parseInt(m.text.split(" ")[1]);
  if (!voteIndex || voteIndex < 1 || voteIndex > Object.keys(werewolf[id].players).length) {
    conn.reply(m.chat, `🐺 Harap masukkan nomor pemain yang valid untuk dipilih.\nketik *.wwplayer* untuk melihat list pemain.\n\n${global.footer}`, m);
    return;
  }

  let players = Object.keys(werewolf[id].players);
  let votedPlayer = players[voteIndex - 1];
  if (votedPlayer === m.sender) {
    m.reply("*Anda tidak dapat memilih diri sendiri.*");
    return;
  }

  werewolf[id].votes = werewolf[id].votes || {};
  werewolf[id].votes[m.sender] = votedPlayer;

  let votedPlayers = Object.values(werewolf[id].votes);
  let numPlayers = Object.keys(werewolf[id].players).length;

  if (votedPlayers.length >= 3 && votedPlayers.filter(player => player === "werewolf")) {
    // Villagers win
    m.reply("*Selamat! Villagers memenangkan permainan! 🎉🎉*");
    let villagerList = "Villagers:\n";
    for (let player in werewolf[id].players) {
      if (werewolf[id].players[player] === "villager") {
        let playerName = conn.getName(player);
        villagerList += `  ◦  @${player.split`@`[0]}\n`;
        global.db.data.users[player].balance += 1000000;
        global.db.data.users[player].limit += 10;
      }
    }

    conn.reply(m.chat, `🐺 Werewolf berhasil dibunuh!\n\n${villagerList}\n\nMasing-masing mendapatkan *[ +1.000.000 balance ]* dan *[ +10 limit ]*`, m);

    let werewolfIdentity = '';
    for (let player in werewolf[id].players) {
      if (werewolf[id].players[player] === "werewolf") {
        let playerName = conn.getName(player);
        werewolfIdentity += `@${player.split`@`[0]}`;
        global.db.data.users[player].balance += 1000000;
        global.db.data.users[player].limit += 10;
      }
    }

    conn.reply(m.chat, `🐺 ${werewolfIdentity} Berhasil dibunuh!!`, m);
    delete werewolf[id];
    global.db.data.werewolf = werewolf;
    return;
  }

  if (votedPlayers.length < numPlayers) {
    let voteList = "*SUARA SAAT INI:*\n";
    for (let player in werewolf[id].votes) {
      let votedPlayer = werewolf[id].votes[player];
      let playerName = conn.getName(player);
      let votedPlayerName = conn.getName(votedPlayer);
      voteList += `◦ @${player.split`@`[0]} ➠ @${votedPlayer.split`@`[0]}\n`;
    }
    conn.reply(m.chat, `${voteList}\n🐺 Masih ada pemain yang belum melakukan voting. Harap tunggu hingga semua pemain melakukan voting.`, m);
    return;
  }

  let correctVotes = votedPlayers.filter(player => player === votedPlayer).length;

  if (correctVotes >= 3 && votedPlayer === "werewolf") {
    // Villagers win
    m.reply("*Selamat! Villagers memenangkan permainan! 🎉🎉*");
    let villagerList = "Villagers:\n";
    for (let player in werewolf[id].players) {
      if (werewolf[id].players[player] === "villager") {
        let playerName = conn.getName(player);
        villagerList += `  ◦  @${player.split`@`[0]}\n`;
        global.db.data.users[player].balance += 1000000;
        global.db.data.users[player].limit += 10;
      }
    }

    conn.reply(m.chat, `🐺 Werewolf berhasil dibunuh!\n\n${villagerList}\n\nMasing-masing mendapatkan *[ +1.000.000 balance ]* dan *[ +10 limit ]*`, m);

    let werewolfIdentity = '';
    for (let player in werewolf[id].players) {
      if (werewolf[id].players[player] === "werewolf") {
        let playerName = conn.getName(player);
        werewolfIdentity += `@${player.split`@`[0]}`;
        global.db.data.users[player].balance += 1000000;
        global.db.data.users[player].limit += 10;
      }
    }

    conn.reply(m.chat, `🐺 ${werewolfIdentity} Berhasil dibunuh!!`, m);
    delete werewolf[id];
  } else {
    // Werewolves win
    m.reply("*🐺 Ups salah, Werewolves memenangkan permainan! 🎉🎉*");

    let werewolfIdentity = '';
    for (let player in werewolf[id].players) {
      if (werewolf[id].players[player] === "werewolf") {
        let playerName = conn.getName(player);
        werewolfIdentity += `@${player.split`@`[0]}`;
        global.db.data.users[player].balance += 1000000;
        global.db.data.users[player].limit += 10;
      }
    }

    conn.reply(m.chat, `🐺 Selamat ${werewolfIdentity}!🎉\nKamu adalah Werewolf yang berhasil memenangkan permainan.\nKamu mendapatkan hadiah *[ +1.000.000 balance. ]* dan *[ +10 limit ]*`, m);
    delete werewolf[id];
  }

  let voteList = "*SUARA SAAT INI:*\n";
  for (let player in werewolf[id].votes) {
    let votedPlayer = werewolf[id].votes[player];
    let playerName = conn.getName(player);
    let votedPlayerName = conn.getName(votedPlayer);
    voteList += `◦ @${player.split`@`[0]} ➠ @${votedPlayer.split`@`[0]}\n`;
  }
  conn.reply(m.chat, `${voteList}\n${global.footer}`, m);
  global.db.data.werewolf = werewolf;
};

handler.help = ['wwvote'];
handler.tags = ['game'];
handler.command = /^wwvote|vote$/i;
handler.group = true;
handler.limit = true;
handler.register = true;

module.exports = handler;