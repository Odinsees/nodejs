const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middleware/auth');
const {
  getOrdersForRenderController,
  createNewOrderController,
} = require('../controllers/orderController');

router.get('/', authMiddleware, getOrdersForRenderController);

router.post('/', authMiddleware, createNewOrderController);

module.exports = router;
