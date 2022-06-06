const { changeProfileInfoService } = require('../services/profileService');

async function changeProfileInfoController(req, res) {
  try {
    const changeData = {
      userId: req.user._id,
      name: req.body.name,
      file: req.file,
    };
    await changeProfileInfoService(changeData);
    res.redirect('/profile');
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  changeProfileInfoController,
};
