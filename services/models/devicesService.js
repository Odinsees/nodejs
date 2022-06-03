const Devices = require('../../models/devices');

async function findDeviceByIdService(data) {
  const { id } = data;
  return await Devices.findById(id);
}

async function findDeviceByIdAndUpdateService(data) {
  const { id, newDeviceInfo } = data;
  return await Devices.findByIdAndUpdate(id, newDeviceInfo);
}

async function deleteDeviceService(data) {
  const { deviceId, userId } = data;
  return await Devices.deleteOne({
    _id: deviceId,
    userId,
  });
}

module.exports = {
  findDeviceByIdService,
  findDeviceByIdAndUpdateService,
  deleteDeviceService,
};
