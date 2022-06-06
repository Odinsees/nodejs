const User = require('../../models/user');

async function findUserByEmailService(email) {
  return await User.findOne({ email });
}

async function findUserByIdModuleService(data) {
  const { userId } = data;
  return await User.findById(userId);
}

async function findUserByValidTokenService(data) {
  const { token } = data;
  return await User.findOne({
    resetPasswordToken: token,
    resetPasswordTokenExp: { $gt: Date.now() },
  });
}

async function findUserByIdAndValidTokenService(data) {
  const { userId, token } = data;
  return await User.findOne({
    _id: userId,
    resetPasswordToken: token,
    resetPasswordTokenExp: { $gt: Date.now() },
  });
}

async function saveUserService(data) {
  const { user } = data;
  return await user.save();
}

async function saveNewUserData(data) {
  const { user, toChange } = data;
  Object.assign(user, toChange);
  await user.save();
}

async function createNewUserService(data) {
  const { email, name, password, cart } = data;
  return await new User({
    email,
    name,
    password,
    cart,
  });
}

async function populateUserModelService(data) {
  const { user, option } = data;
  return await user.populate(option);
}

async function clearCardModuleService(data) {
  const { user } = data;
  return await user.clearCard();
}

module.exports = {
  findUserByEmailService,
  findUserByValidTokenService,
  findUserByIdAndValidTokenService,
  saveUserService,
  createNewUserService,
  populateUserModelService,
  clearCardModuleService,
  findUserByIdModuleService,
  saveNewUserData,
};
