1- ilk olarak kütüphaneler yüklendi
/_
cp .env-sample .env
npm init -y
npm i express dotenv mongoose express-async-errors
npm i morgan swagger-autogen swagger-ui-express redoc-express
mkdir logs
nodemon
https://www.toptal.com/developers/gitignore/
node yazdık
_/
2- index.js, .env, gitignore dosyaları oluşturuldu.
3- Anadizinde src klasörü oluşturuldu
4- database bağlantısı için config klasörü içerisinde dbConnection dosyası oluşturuldu
5- index.jsde çevre değişkenleri içe aktarılırken .env yi de require edip config işlemi yapılmalıdır. require("dotenv").config()
6- Homepath yazıldı
7- ERD referans alınarak model, controller, routes klasörleri oluşturuldur.
8- User model, controller ve route dosyaları oluşturuldu.
9- routes klasörü içerisinde index.js olşuturuldu.
10- ana dizindeki index dosyasına routes/index bağlandı.
11- her yerden gelen hataları yakalayabilmek için bir hata yakalama middleware'i oluşturuldu.
12- ErrorHandler, bütün api çalıştıktan sonra tüm hataları yakalayabilmek için index.js'de app.listen önce require edildi, çalıştırıldı.


{
    "username": "admin",
    "password": "Bruce123*",
    "email": "admin@site.com",
    "isAdmin": true
}