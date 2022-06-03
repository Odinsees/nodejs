const dotenv = require('dotenv');
dotenv.config();

const EMAIL_FROM = process.env.FROM_EMAIL;
const BASE_URL = process.env.BASE_URL;

// ejs
// hbs

module.exports = function (toEmail, token) {
  return {
    to: toEmail,
    from: EMAIL_FROM,
    subject: 'Change password',
    html: `
    <h1>Have a nice day!</h1>
    <p>You have been forgot password on account from ${toEmail}</p>
    <p>If not, ignore this link:</p>
    <p><a href="${BASE_URL}auth/password/${token}">Reset password</a></p>
    <hr />
    <a href="${BASE_URL}">Devices shop</a>
    `,
  };
};
