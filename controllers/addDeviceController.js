const { postAddDeviceService } = require('../services/addDeviceService.js');
const { validationResult } = require('express-validator');

function getAddDeviceController(req, res) {
  res.render('add', {
    title: 'ADD DEVICES',
    isAdd: true,
  });
}

async function postAddDeviceController(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // ???
    return res.status(422).render('add', {
      title: 'ADD DEVICES',
      isAdd: true,
      error: errors.array()[0].msg,
      data: {
        type: req.body.type,
        price: req.body.price,
        img: req.body.img,
      },
    });
  }

  const { type, price, img } = req.body;
  const userId = req.user;

  try {
    await postAddDeviceService(
      {
        type,
        price,
        img,
      },
      userId,
    );

    res.redirect('/devices');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAddDeviceController,
  postAddDeviceController,
};
