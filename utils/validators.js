const { body } = require("express-validator");
const User = require("../models/user");

exports.registerValidators = [
  body("email")
    .isEmail()
    .withMessage("Type correct email")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("This email is already in use");
        }
      } catch (err) {
        console.log(err);
      }
    }),
  body("password", "Password must be min 6 symbols with letter and number")
    .isLength({ min: 6, max: 20 })
    .isAlphanumeric()
    .trim(),
  body("confirm")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("password must match");
      }
      return true;
    })
    .trim(),
  body("name", "Name must be min 3 symbol").isLength({ min: 3 }).trim(),
];

exports.deviceValidators = [
  body("type")
    .isLength({ min: 3 })
    .withMessage("Min length of type is 3 symbols")
    .trim(),
  body("price").isNumeric().withMessage("Type correct price"),
  body("img", "type correct url").isURL(),
];
