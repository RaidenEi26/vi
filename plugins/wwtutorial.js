/*
Code by: Vladimir Ages
Contact: wa.me/6281381217265
*///wwtutor.js
let handler = async (m, { conn }) => {
  const tutorialText = `*Tutorial Werewolf Game*

*1. Start Game:*
Memulai permainan Werewolf.
◦ Cara menggunakan: Ketik *.ww* di grup chat.
◦ Contoh penggunaan: *.ww*

*2. Join Game:*
Bergabung dalam permainan Werewolf yang sedang berlangsung.
◦ Cara menggunakan: Ketik *.wwjoin* di grup chat.
◦ Contoh penggunaan: *.wwjoin*

*3. Leave Game:*
Keluar dari permainan Werewolf yang sedang berlangsung.
◦ Cara menggunakan: Ketik *.wwleft* di grup chat.
◦ Contoh penggunaan: *.wwleft*

*3. Kick Player:*
Mengeluarkan player dari permainan.
◦ Cara menggunakan: Ketik *.wwkick @mention* di grup chat.
◦ Contoh penggunaan: *.wwkick @${m.sender.split`@`[0]}*

*4. List Players:*
Menampilkan daftar pemain dalam permainan Werewolf yang sedang berlangsung.
◦ Cara menggunakan: Ketik *.wwplayer* di grup chat.
◦ Contoh penggunaan: *.wwplayer*

*5. Game Info:*
Menampilkan informasi permainan Werewolf yang sedang berlangsung.
◦ Cara menggunakan: Ketik *.wwinfo* di grup chat.
◦ Contoh penggunaan: *.wwinfo*

*6. Start Voting:*
Memulai fase pemungutan suara dalam permainan Werewolf.
◦ Cara menggunakan: Ketik *.wwstart* di grup chat.
◦ Contoh penggunaan: *.wwstart*

*7. Vote:*
Memilih pemain dalam permainan Werewolf saat fase pemungutan suara.
◦ Cara menggunakan: Ketik *.wwvote [nomor player]* di grup chat.
◦ Contoh penggunaan: *.wwvote 1*

*8. Vote Info:*
Menampilkan informasi suara pemain dalam permainan Werewolf saat fase pemungutan suara.
◦ Cara menggunakan: Ketik *.voteinfo* di grup chat.
◦ Contoh penggunaan: *.voteinfo*

Selamat bermain Werewolf! 🐺🌕`;

  m.reply(tutorialText);
};

handler.help = ["wwtutorial"];
handler.tags = ["game"];
handler.command = /^wwtutorial|wwtutor|tutorww$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;

module.exports = handler;