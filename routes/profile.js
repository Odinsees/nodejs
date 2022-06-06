const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const router = Router();

const {
  changeProfileInfoController,
} = require('../controllers/profileController');

router.get('/', authMiddleware, async (req, res) => {
  res.render('profile', {
    title: 'Profile',
    isProfile: true,
    user: req.user.toObject(),
  });
});

router.post('/', authMiddleware, changeProfileInfoController);

module.exports = router;
