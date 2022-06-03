const dotenv = require('dotenv');
dotenv.config();

const EMAIL_FROM = process.env.FROM_EMAIL;
const BASE_URL = process.env.BASE_URL;

module.exports = function (toEmail) {
  return {
    to: toEmail,
    from: EMAIL_FROM,
    subject: 'Account has been created',
    html: `
    <h1>Have a nice day!</h1>
    <p>Your account has been created, from ${toEmail}</p>
    <hr />
    <a href="${BASE_URL}">Devices shop</a>
    `,
  };
};
