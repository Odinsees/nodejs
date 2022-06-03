const Devices = require("../models/devices.js");

// no req, no res
async function postAddDeviceService(data, userId) {
  const { type, price, img } = data;
  const device = new Devices({
    type,
    price,
    img,
    userId,
  });

  return device.save();
}

module.exports = {
  postAddDeviceService,
};
