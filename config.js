global.owner = ['6281267905243','6289509443783'];
global.mods = ['6281267905243'];
global.prems = ['6281267905243'];

global.nameowner = 'Anang';
global.numberowner = '6281267905243';
global.mail = 'anangfauzan26@gmail.com';

global.namebot = 'Anos Ai';
global.gc = 'https://chat.whatsapp.com/HUBS21L2XLH1yAlbxqnevw';
global.web = 'https://chat.whatsapp.com/HUBS21L2XLH1yAlbxqnevw';
global.instagram = 'https://instagram.com/anang_zxz';

global.lolkey = 'Viki-Ganteng';
global.sazumiviki_title = 'Anos Ai'
global.sazumiviki_thumb = 'https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/anang.jpeg'
global.sazumiviki_source = 'https://instagram.com/anang_zxz'
global.sazumiviki_profile = 'https://cdn.jsdelivr.net/gh/SazumiVicky/Storage@main/anang.jpeg'
global.sig = 'https://instagram.com/anang_zxz'
global.sazumi_version = '© Anos Ai'
global.footer = 'ᴀɴᴏꜱ ᴀɪ'
global.wm = 'Anos Ai';
global.watermark = wm;
global.wait = 'Wait a moment..';
global.sazumiviki_imgur = 'Client-ID 5f98ee8de4fa3c5';
global.rose = 'Rk-anang_ganteng';
global.xzn = 'sazumiviki';
global.sourceUrl = 'https://Instagram.com/anang_zxz';

global.stiker_wait = 'Wait a moment..';
global.packname = 'Euphilia Magenta';
global.author = 'Punya Anang\n';

global.htki =  '⬣───「' // Hiasan kiri
global.htka = '」───⬣' // Hiasan kanan
global.htjava = '•' // Hiasan

global.APIs = {
  lolhuman: 'https://api.lolhuman.xyz',
  rose: 'https://api.itsrose.life',
  skizo: 'https://xzn.wtf/',
  sazumiviki: 'https://api.sazumiviki.me'
};

global.APIKeys = {
  'https://api.sazumiviki.me': 'sazumiviki',
  'https://xzn.wtf/': 'sazumiviki',
  'https://api.itsrose.life': 'Rs-lojembot',
  'https://api.lolhuman.xyz': 'ayakaviki',
};

global.multiplier = 45;
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      exp: '✉️',
      money: '💵',
      potion: '🥤',
      diamond: '💎',
      common: '📦',
      uncommon: '🎁',
      mythic: '🗳️',
      legendary: '🗃️',
      pet: '🎁',
      sampah: '🗑',
      armor: '🥼',
      sword: '⚔️',
      kayu: '🪵',
      batu: '🪨',
      string: '🕸️',
      kuda: '🐎',
      kucing: '🐈',
      anjing: '🐕',
      petFood: '🍖',
      gold: '👑',
      emerald: '💚'
    };
    let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
    if (!results.length) return '';
    else return emot[results[0][0]];
  }
};

let fs = require('fs');
let chalk = require('chalk');
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  delete require.cache[file];
  require(file);
});