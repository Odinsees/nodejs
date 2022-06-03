const {
  postAuthLoginPasswordCheckService,
  postAuthRegisterNewUserService,
  postAuthResetChangePasswordService,
  postAuthRegisterSendMailService,
  postResetPasswordService,
  getAuthResetPasswordUserTokenService,
  authFindUserByEmailService,
  postAuthResetPasswordFindUserService,
} = require('../services/authService');

const { validationResult } = require('express-validator');

//LOGIN

function getAuthLoginController(req, res) {
  res.render('auth/login', {
    title: 'Autorisation',
    isLogin: true,
    registerError: req.flash('registerError'),
    loginError: req.flash('loginError'),
  });
}

async function postAuthLoginController(req, res) {
  try {
    const { email, password } = req.body;
    const candidate = await authFindUserByEmailService({ email });
    if (candidate) {
      const areSame = await postAuthLoginPasswordCheckService({
        password,
        candidatePassword: candidate.password,
      });
      if (areSame) {
        req.session.user = candidate;
        req.session.isAuthenticated = true;
        req.session.save(err => {
          if (err) {
            throw err;
          }
          res.redirect('/');
        });
      } else {
        req.flash('loginError', 'Check password');
        res.redirect('/auth/login#login');
      }
    } else {
      req.flash('loginError', 'There is no such user');
      res.redirect('/auth/login#login');
    }
  } catch (err) {
    console.log(err);
  }
}

//LOGOUT

function getAuthLogOutController(req, res) {
  req.session.destroy(() => {
    res.redirect('/auth/login#login');
  });
}

//REGISTER

async function postAuthRegisterController(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('registerError', errors.array()[0].msg);
      return res.status(422).redirect('/auth/login#register');
    }
    const { name, email, password } = req.body;
    await postAuthRegisterNewUserService({ name, email, password });
    res.redirect('/auth/login#login');
    await postAuthRegisterSendMailService({ email });
  } catch (err) {
    console.log(err);
  }
}

//RESET PASSWORD

function getAuthResetPasswordController(req, res) {
  res.render('auth/reset', {
    title: 'Reset password',
    error: req.flash('error'),
  });
}

async function getAuthResetPasswordWithTokenController(req, res) {
  const token = req.params.token;
  if (!token) {
    return res.redirect('auth/login');
  }
  try {
    const user = await getAuthResetPasswordUserTokenService({ token });
    if (user) {
      res.render('auth/password', {
        title: 'New password',
        error: req.flash('error'),
        userId: user._id.toString(),
        token: req.params.token,
      });
    } else {
      res.redirect('/auth/login');
    }
  } catch (err) {
    console.log(err);
  }
}

async function postAuthChangePasswordController(req, res) {
  try {
    const { userId, token } = req.body;
    const user = await postAuthResetPasswordFindUserService({ userId, token });
    if (user) {
      await postAuthResetChangePasswordService({
        user,
        password: req.body.password,
      });
      res.redirect('/auth/login');
    } else {
      req.flash(
        'loginError',
        'the token has expired, try to restore the password again',
      );
      res.redirect('auth/login');
    }
  } catch (err) {
    console.log(err);
  }
}

async function postResetPasswordController(req, res) {
  try {
    await postResetPasswordService({ email: req.body.email });
    res.redirect('/auth/login');
  } catch (err) {
    req.flash('error', err.message);
    return res.redirect('/auth/reset');
  }
}

module.exports = {
  getAuthLoginController,
  getAuthLogOutController,
  postAuthLoginController,
  postAuthRegisterController,
  getAuthResetPasswordController,
  getAuthResetPasswordWithTokenController,
  postAuthChangePasswordController,
  postResetPasswordController,
};
