import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", verifyToken, addComment);
router.delete("/:id", verifyToken, deleteComment);

export default router;
