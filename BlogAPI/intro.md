1- ilk olarak kütüphaneler yüklendi
/*
    cp .env-sample .env
    npm init -y
    npm i express dotenv mongoose express-async-errors
    npm i morgan swagger-autogen swagger-ui-express redoc-express
    mkdir logs
    nodemon
    https://www.toptal.com/developers/gitignore/
    node yazdık
*/
2- index.js, .env, gitignore dosyaları oluşturuldu.
3- Anadizinde src klasörü oluşturuldu
4- database bağlantısı için config klasörü içerisinde dbConnection dosyası oluşturuldu
5- index.jsde çevre değişkenleri içe aktarılırken .env yi de require edip config işlemi yapılmalıdır. require("dotenv").config()
