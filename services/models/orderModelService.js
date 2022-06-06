const Order = require('../../models/order');

async function findOrdersByIdModelService(data) {
  const { userId } = data;
  return await Order.find({
    'user.userId': userId,
  }).populate('user.userId');
}

async function newOrderModelService(data) {
  const { name, userId, devices } = data;
  return new Order({
    user: {
      name,
      userId,
    },
    devices,
  });
}

async function saveOrderModuleService(data) {
  const { order } = data;
  return await order.save();
}

module.exports = {
  findOrdersByIdModelService,
  newOrderModelService,
  saveOrderModuleService,
};
