const Devices = require('../models/devices');

function mapCardItems(card) {
  return card.items.map(item => ({
    ...item.deviceId._doc,
    count: item.count,
    id: item.deviceId.id,
  }));
}

function computePrices(devices) {
  return devices.reduce((total, device) => {
    return (total += device.price * device.count);
  }, 0);
}

async function addToCardService(data) {
  const { id } = data.body;
  const device = await Devices.findById(id);
  return await data.user.addToCard(device);
}

async function deleteFromCardService(data) {
  await data.user.removeFromCard(data.params.id);
  const user = await data.user.populate('card.items.deviceId');
  const devices = mapCardItems(user.card);
  const price = +computePrices(devices);
  const card = {
    devices,
    sumPrice: price,
  };
  return card;
}

async function getCardInfoService(data) {
  const user = await data.user.populate('card.items.deviceId');
  const devices = mapCardItems(user.card);
  const sumPrice = computePrices(devices);
  return {
    devices,
    sumPrice,
  };
}

module.exports = {
  mapCardItems,
  computePrices,
  addToCardService,
  deleteFromCardService,
  getCardInfoService,
};
