const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const {
  postAddToCardController,
  deleteFromCardController,
  getCardInfoController,
} = require('../controllers/cardController');

const router = Router();

router.post('/add', authMiddleware, postAddToCardController);
router.delete('/remove/:id', authMiddleware, deleteFromCardController);
router.get('/', authMiddleware, getCardInfoController);

module.exports = router;
