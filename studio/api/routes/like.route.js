import express from "express";
import { getLikes, addLike, deleteLike } from "../controllers/like.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getLikes);
router.post("/", verifyToken, addLike);
router.delete("/", verifyToken, deleteLike);

export default router;
