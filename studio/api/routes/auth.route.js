import express from "express";
import { register, login, logout } from "../controllers/auth.controller.js";
import { initValidate } from "../middleware/jwt.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/validate", initValidate);

export default router;
