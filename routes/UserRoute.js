import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { auth } from "../middleware/AuthMiddleware.js";
import validate from "../middleware/UserValidator.js";

const router = express.Router();

router.get("/users", auth, verifyToken, getUsers);
router.post("/users", validate, Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

export default router;
