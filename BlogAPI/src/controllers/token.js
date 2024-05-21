"use strict";

/* -------------------------------------------------------
    NODEJS EXPRESS | BLOG API
------------------------------------------------------- */
// 1- modeli çağır 2- modülü export et 3- crud işlemlerini yap. crud işlemleri async'dur. içeriye swagger entegrasyonu yapmayı unutma

// TOKEN CONTROLLER

const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    //bu api endpointini dokümantasyona dahil etme, yani swaggerUi tarafında gösterme
    /* 
        #swagger.ignore = true
    */

    // tokenı getirdik, eğer geldiyse yanıt olarak 200 durum kodu ve diğer bilgileri yolla
    // getModelList olmasaydı const data = await Token.find() res.status vs. aynı devam ederdi.
    const data = await res.getModelList(Token);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      data,
    });
  },
  //   create adında req ve res parametrelerini alan bir fonksiyon oluştur.
  create: async (req, res) => {
    /*
        #swagger.ignore = true
    */
    const data = await Token.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.ignore = true
    */
    const data = Token.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /* 
        #swagger.ignore = true
    */
    const data = await Token.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await Token.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /* 
        #swagger.ignore = true
    */

    // deletedCount, MongoDB'den gelen bir yanıtın bir parçasıdır ve deleteOne() veya deleteMany() metodları kullanıldığında dönüş değeri içinde bulunur.

    const data = Token.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
