"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | BLOG API
------------------------------------------------------- */
// passwordEncrypt(password:string):
// kripto modülü ile bir parolanın hashini oluşturma, kripto modülü node.jsin yerleşik modülüdür.
// fonksiyon pbkdf2Sync metodunu kullanıyor

const crypto = require("node:crypto"),
  // keykode ile env dosyasından secret keyimizi alıyoruz.
  keyCode = process.env.SECRET_KEY,
  loopCount = 10_000,
  //   hashin sonucunda oluşacak olan karakter sayısı
  charCount = 32,
  //   hash algoritmasının türü
  encType = "sha512";

module.exports = function (password) {
  return crypto
    .pbkdf2Sync(password, keyCode, loopCount, charCount, encType)
    .toString("hex");
};

// hash: verileri sabit boyutta benzersiz bir diziye dönüştürme işlemi için kullanılır. Bu işlem, bir hash fonksiyonu aracılığıyla gerçekleştirilir ve amacı, herhangi bir boyuttaki girdi (input) için sabit uzunlukta bir çıktı (output) üretmektir.