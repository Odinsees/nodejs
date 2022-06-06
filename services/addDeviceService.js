const {
  createNewDeviceModuleService,
  saveDeviceModuleService,
} = require('../services/models/devicesModelService');

async function postAddDeviceService(data, userId) {
  const { type, price, img } = data;
  const device = await createNewDeviceModuleService({
    type,
    price,
    img,
    userId,
  });

  return await saveDeviceModuleService({ device });
}

module.exports = {
  postAddDeviceService,
};
