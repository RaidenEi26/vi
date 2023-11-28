/*
* Nama Pengembang: Sazumi Viki
* Kontak Whatsapp: wa.me/6285236226786
* Kontak Telegram: t.me/sazumiviki
* Akun Github: github.com/SazumiVicky
* Catatan: tolong laporkan kepada saya ketika anda menemukan ada yang menjual script ini
*/

const fetch = require('node-fetch');
const FormData = require('form-data');
const { fromBuffer } = require('file-type');

/**
 * Upload file to URL
 * Supported mimetypes:
 * - `image/jpeg`
 * - `image/jpg`
 * - `image/png`
 * - `video/mp4`
 * - `heic`
 * - `heif`
 * - `avif`
 * - `tile`
 * - `dz`
 * - `raw`
 * - `tiff`
 * - `tif`
 * - `webp`
 * - `gif`
 * - `jp2`
 * - `jpx`
 * - `j2k`
 * - `j2c`
 * - `jxl`
 * - `opus`
 * - `ptt`
 * @param {Buffer} buffer File Buffer
 */

module.exports = async buffer => {
  let { ext } = await fromBuffer(buffer);
  if (!ext) {
    throw new Error('Unsupported file format');
  }
  
  let bodyForm = new FormData();
  bodyForm.append("file", buffer, "file." + ext);

  try {
    let res = await fetch("https://cdn.sazumi.moe/upload", {
      method: "post",
      body: bodyForm,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    let data = await res.text();
    let resultUrl = data.trim() || '';
    return resultUrl;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload the file');
  }
}