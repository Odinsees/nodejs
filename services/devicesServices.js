const Devices = require('../models/devices');

const {
  findDeviceByIdService,
  findDeviceByIdAndUpdateService,
  deleteDeviceService,
} = require('./models/devicesModelService');

async function getDevicesService() {
  const devices = await Devices.find()
    .populate('userId', 'email name')
    .select('price type img');
  return devices.map(i => i.toObject());
}

async function findDevicesByIdService(data) {
  const { id } = data;
  return await findDeviceByIdService({ id });
}

async function postEditDeviceByIdService(data) {
  const { id, newDeviceInfo } = data;
  return await findDeviceByIdAndUpdateService({ id, newDeviceInfo });
}

async function postRemoveDeviceService(data) {
  const { deviceId, userId } = data;
  return await deleteDeviceService({
    deviceId,
    userId,
  });
}

function isOwnerService(data) {
  const { deviceId, userId } = data;
  return deviceId === userId;
}

module.exports = {
  getDevicesService,
  findDevicesByIdService,
  isOwnerService,
  postEditDeviceByIdService,
  postRemoveDeviceService,
};
