const {
  findUserByIdModuleService,
  saveNewUserData,
} = require('../services/models/userModelService');

async function changeProfileInfoService(data) {
  const { userId, name, file } = data;
  const user = await findUserByIdModuleService({ userId });
  const toChange = {
    name,
  };
  if (file) {
    toChange.avatarUrl = file.path;
  }
  await saveNewUserData({ user, toChange });
}

module.exports = {
  changeProfileInfoService,
};
