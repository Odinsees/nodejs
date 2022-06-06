const {
  findOrdersByIdModelService,
  newOrderModelService,
  saveOrderModuleService,
} = require('./models/orderModelService');

const {
  populateUserModelService,
  clearCardModuleService,
} = require('../services/models/userModelService');

async function findOrdersByIdService(data) {
  const { userId } = data;
  const orders = await findOrdersByIdModelService({ userId });
  return orders.map(order => {
    return {
      ...order._doc,
      price: order.devices.reduce((total, item) => {
        return (total += item.count * item.device.price);
      }, 0),
    };
  });
}

async function createNewOrderService(data) {
  const { user } = data;
  const populateUserData = {
    user,
    option: 'card.items.deviceId',
  };
  const devicesToAdd = await populateUserModelService(populateUserData);
  const devices = devicesToAdd.card.items.map(item => ({
    count: item.count,
    device: { ...item.deviceId._doc },
  }));
  const newOrderData = {
    name: user.name,
    userId: user,
    devices,
  };
  const order = await newOrderModelService(newOrderData);
  await saveOrderModuleService({ order });
  await clearCardModuleService({ user });
  return;
}

module.exports = {
  findOrdersByIdService,
  createNewOrderService,
};
