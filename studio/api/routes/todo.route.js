import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", verifyToken, getTodos);
router.get("/:id", verifyToken, getTodo);
router.post("/", verifyToken, addTodo);
router.delete("/:id",verifyToken, deleteTodo);
router.put("/:id", verifyToken, updateTodo);

export default router;
