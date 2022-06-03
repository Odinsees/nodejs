const { Router } = require('express');
const router = Router();
const authMiddleware = require('../middleware/auth');
const { deviceValidators } = require('../utils/validators');

const {
  getDevicesController,
  getEditDevicesController,
  getDeviceController,
  postEditDeviceController,
  postRemoveDevice,
} = require('../controllers/devicesControllers');

router.get('/', getDevicesController);

router.get('/:id/edit', authMiddleware, getEditDevicesController);

router.get('/:id', getDeviceController);

router.post(
  '/edit',
  authMiddleware,
  deviceValidators,
  postEditDeviceController,
);

router.post('/remove', authMiddleware, postRemoveDevice);

module.exports = router;
