/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const { createHash } = require('crypto');
const nodemailer = require('nodemailer');
const config = require('../config.json');
const { fnctions } = require("../lib/fnctions");

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;
let handler = async function(m, { text, usedPrefix }) {
  if (!await fnctions()) return;

  let user = global.db.data.users[m.sender];
  if (user.registered === true) throw `You are already registered\nWant to register again? ${usedPrefix}unreg 90259a21exxxxxx`;
  if (!text) throw `*Example*: ${usedPrefix}regmail hi@sazumiviki.me`;
  let user_email = text.trim();
  if (!isValidEmail(user_email)) throw '🐱 Invalid email format';
  let verificationCode = generateVerificationCode();
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.email,
      pass: config.password,
    }
  });
  let mailOptions = {
    from: config.email,
    to: user_email,
    subject: config.email_subject,
    html: `
      <div style="border: 1px dashed #ccc; padding: 20px; font-family: monospace; text-align: center;">
        <h1 style="font-size: 24px; margin-bottom: 20px;">🐱 Verify Your Email</h1>
        <p style="font-size: 16px; margin-bottom: 20px;">Dear ${user_email.split('@')[0]}, your verification code is <strong>${verificationCode}</strong></p>
        <p style="font-size: 14px; margin-bottom: 0;">This code will expire in 10 minutes</p>
        <hr style="border: none; border-top: 1px dashed #ccc; margin-top: 20px; margin-bottom: 20px;">
        <p style="font-size: 12px;">&copy; 2008 - 2023 ${config.wm_regmail}</p>
      </div>
    `
  };
  try {
    conn.chatRead(m.chat);
    conn.sendMessage(m.chat, {
      react: {
        text: '🕒',
        key: m.key,
      }
    });
    await transporter.sendMail(mailOptions);
    user.email = user_email;
    user.verificationCode = verificationCode;
    user.verificationExp = +new Date() + 600000;
    user.regTime = +new Date();
    user.registered = false;
    global.db.data.users[m.sender] = user;
    m.reply('🐱 Sent, verify by *.vercode xxxxx*');
  } catch (e) {
    console.log(e);
    m.reply('❌ SMTP ERORR');
  }
};

handler.help = ['regmail'];
handler.tags = ['start'];
handler.command = /^regmail$/i;

module.exports = handler;

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateVerificationCode() {
  return Math.floor(Math.random() * 90000) + 10000;
}
