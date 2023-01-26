import express from "express";
import { getEmployee, getEmployeeByID, saveEmployee, updateEmployee, deleteEmployee } from "../controllers/EmployeeController.js";
// import { getEmployees } from "../redis/index.js";
import { auth } from "../middleware/AuthMiddleware.js";
import validationDaftar from "../middleware/EmployeeValidator.js";

const router = express.Router();

router.get("/getInfoEmployee", getEmployee);
router.get("/api/v1/employee", auth, getEmployee);
// router.get("/api/v1/employee/:id", auth, getEmployeeByID);
router.get("/api/v1/employee/:id", getEmployeeByID);
// router.post("/api/v1/employee", validationDaftar, auth, saveEmployee);
router.post("/api/v1/employee", validationDaftar, saveEmployee);
// router.patch("/api/v1/employee/:id", validationDaftar, auth, updateEmployee);
router.patch("/api/v1/employee/:id", validationDaftar, updateEmployee);
// router.delete("/api/v1//employee/:id", auth, deleteEmployee);
router.delete("/api/v1//employee/:id", deleteEmployee);

export default router;
