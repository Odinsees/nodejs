const { Router } = require("express");
const { deviceValidators } = require("../utils/validators");
const { getAddDeviceController, postAddDeviceController } = require('../controllers/addDeviceController');

const router = Router();

router.get("/", getAddDeviceController);
router.post("/", deviceValidators, postAddDeviceController);

module.exports = router;
