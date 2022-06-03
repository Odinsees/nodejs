const {
  getDevicesService,
  findDevicesByIdService,
  isOwnerService,
  postEditDeviceByIdService,
  postRemoveDeviceService,
} = require('../services/devicesServices');

const { validationResult } = require('express-validator');

async function getDevicesController(req, res) {
  try {
    const fixedDevices = await getDevicesService();
    res.render('devices', {
      title: 'DEVICES',
      isDevices: true,
      devices: fixedDevices,
      userId: req.user ? req.user._id.toString() : null,
    });
  } catch (err) {
    console.log(err);
  }
}

async function getEditDevicesController(req, res) {
  if (!req.query.allow) {
    return res.redirect('/');
  }
  try {
    const id = req.params.id;
    const device = await findDevicesByIdService({ id });
    const deviceId = device.userId.toString();
    const userId = req.user._id.toString();
    if (!isOwnerService({ deviceId, userId })) {
      return res.redirect('/devices');
    }
    res.render('device-edit', {
      title: `Edit device info ${device.type}`,
      device: device.toObject(),
    });
  } catch (err) {
    console.log(err);
  }
}

async function getDeviceController(req, res) {
  try {
    const device = await findDevicesByIdService(req);
    res.render('device', {
      layout: 'empty',
      title: `Device ${device.type}`,
      device: device.toObject(),
    });
  } catch (err) {
    console.log(err);
  }
}

async function postEditDeviceController(req, res) {
  const { id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).redirect(`/devices/${id}/edit?allow=true`);
  }
  try {
    const device = await findDevicesByIdService({ id });
    const deviceId = device.userId.toString();
    const userId = req.user._id.toString();
    if (!isOwnerService({ deviceId, userId })) {
      return res.redirect('/devices');
    }
    const newDeviceInfo = {
      type: req.body.type,
      price: req.body.price,
      img: req.body.img,
    };
    await postEditDeviceByIdService({ id, newDeviceInfo });
    res.redirect('/devices');
  } catch (err) {
    console.log(err);
  }
}

async function postRemoveDevice(req, res) {
  try {
    const deviceId = req.body._id;
    const userId = req.user._id;
    await postRemoveDeviceService({ deviceId, userId });
    res.redirect('/devices');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getDevicesController,
  getEditDevicesController,
  getDeviceController,
  postEditDeviceController,
  postRemoveDevice,
};
