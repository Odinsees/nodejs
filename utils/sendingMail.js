const nodemailer = require('nodemailer');
const regEmail = require('../emails/registration');
const resetPassword = require('../emails/resetPassword');
const dotenv = require('dotenv');
const { SENDMAIL_ACTIONS } = require('../constant');

dotenv.config();

const API_MAILER = process.env.SP_API_MAILER;
const API_USER = process.env.SP_API_USER;
const API_PASSWORD = process.env.SP_API_PASSWORD;

const transporter = nodemailer.createTransport({
  service: API_MAILER,
  auth: {
    user: API_USER,
    pass: API_PASSWORD,
  },
});

async function sendMail(data) {
  const { action, email, token } = data;
  if (action === SENDMAIL_ACTIONS.RESET_PASSWORD) {
    await transporter.sendMail(resetPassword(email, token));
    return;
  }
  if (action === SENDMAIL_ACTIONS.REGISTRATION) {
    await transporter.sendMail(regEmail(email));
    return;
  }
  return;
}

module.exports = {
  sendMail,
};
