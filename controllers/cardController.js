const {
  addToCardService,
  deleteFromCardService,
  getCardInfoService,
} = require('../services/cardService');

async function postAddToCardController(req, res) {
  await addToCardService(req);
  res.redirect('/card');
}

async function deleteFromCardController(req, res) {
  const card = await deleteFromCardService(req);
  res.status(200).json(card);
}

async function getCardInfoController(req, res) {
  const { devices, sumPrice } = await getCardInfoService(req);
  res.render('card', {
    title: 'Basket',
    isCard: true,
    devices: devices,
    sumPrice: sumPrice,
  });
}

module.exports = {
  postAddToCardController,
  deleteFromCardController,
  getCardInfoController,
};
