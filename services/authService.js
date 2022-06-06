const bcrypt = require('bcryptjs');
const { sendMail } = require('../utils/sendingMail');
const { SENDMAIL_ACTIONS } = require('../constant');
const {
  findUserByEmailService,
  findUserByValidTokenService,
  findUserByIdAndValidTokenService,
  saveUserService,
  createNewUserService,
} = require('../services/models/userModelService');

const getRandomBytes = require('../utils/getRandomBytes');

async function authFindUserByEmailService(data) {
  const { email } = data;
  return await findUserByEmailService(email);
}

async function getAuthResetPasswordUserTokenService(data) {
  const { token } = data;
  return await findUserByValidTokenService({ token });
}

async function postAuthLoginPasswordCheckService(data) {
  const { password, candidatePassword } = data;
  return await bcrypt.compare(password, candidatePassword);
}

async function postAuthRegisterNewUserService(data) {
  const { name, email, password } = data;
  const hashPassword = await bcrypt.hash(password, 10);
  const newUserData = {
    email,
    name,
    password: hashPassword,
    cart: {
      items: [],
    },
  };
  const user = await createNewUserService(newUserData);
  return await saveUserService({ user });
}

async function postAuthRegisterSendMailService(data) {
  const { email } = data;
  const sendingData = {
    action: SENDMAIL_ACTIONS.REGISTRATION,
    email: email,
  };
  return await sendMail(sendingData);
}

async function postAuthResetPasswordFindUserService(data) {
  const { userId, token } = data;
  return await findUserByIdAndValidTokenService({ userId, token });
}

async function postAuthResetChangePasswordService(data) {
  const { user, password } = data;
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExp = undefined;
  return await saveUserService({ user });
}

// class HTTPError extends Error {
//   constructor(message, httpCode) {
//     super(message);
//     this.httpCode = httpCode;
//   }
// }

async function postResetPasswordService({ email }) {
  const candidate = await authFindUserByEmailService({ email });

  if (!candidate) {
    throw new Error('User not found');
  }

  const buffer = await getRandomBytes({ bytes: 32 });
  const token = buffer.toString('hex');
  candidate.resetPasswordToken = token;
  candidate.resetPasswordTokenExp = Date.now() + 60 * 60 * 1000;
  await saveUserService({ user: candidate });
  const sendingData = {
    action: SENDMAIL_ACTIONS.RESET_PASSWORD,
    email: candidate.email,
    token: token,
  };
  await sendMail(sendingData);
  return;
}

module.exports = {
  authFindUserByEmailService,
  postAuthLoginPasswordCheckService,
  postAuthRegisterNewUserService,
  postAuthRegisterSendMailService,
  getAuthResetPasswordUserTokenService,
  postAuthResetPasswordFindUserService,
  postAuthResetChangePasswordService,
  postResetPasswordService,
};
