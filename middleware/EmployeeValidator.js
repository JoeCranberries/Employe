import { check, validationResult } from "express-validator";
import Employee from "../models/EmployeeModel.js";

const validationDaftar = [
  check("username").notEmpty().withMessage("can not be empty"),
  check("username").custom(async (value) => {
    return await Employee.findOne({ username: value }).then((employee) => {
      if (employee) {
        return Promise.reject("username already in use");
      }
    });
  }),
  check("emailaddress").isEmail().withMessage({
    message: "Not an email",
  }),
  check("emailaddress").custom(async (value) => {
    return await Employee.findOne({ emailaddress: value }).then((employee) => {
      if (employee) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validationDaftar;
