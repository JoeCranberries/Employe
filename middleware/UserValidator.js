import { check, validationResult } from "express-validator";
import User from "../models/UserModel.js";

const validate = [
  check("name").notEmpty().withMessage("can not be empty"),
  check("name").custom(async (value) => {
    return await User.findOne({ name: value }).then((user) => {
      if (user) {
        return Promise.reject("username already in use");
      }
    });
  }),
  check("email").isEmail().withMessage({
    message: "Not an email",
  }),
  check("email").custom(async (value) => {
    return await User.findOne({ email: value }).then((user) => {
      if (user) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  check("password").isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validate;
