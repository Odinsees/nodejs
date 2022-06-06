const {
  findOrdersByIdService,
  createNewOrderService,
} = require('../services/orderServices');

async function getOrdersForRenderController(req, res) {
  try {
    const userId = req.user.id;
    const orders = await findOrdersByIdService({ userId });
    res.render('order', {
      title: 'Order',
      isOrder: true,
      orders,
    });
  } catch (err) {
    console.log(err);
  }
}

async function createNewOrderController(req, res) {
  try {
    const user = req.user;
    createNewOrderService({ user });
    res.redirect('order');
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getOrdersForRenderController, createNewOrderController };
