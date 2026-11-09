import express from "express";
import {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/", getEvents);
router.post("/", verifyToken, addEvent);
router.delete("/:id", verifyToken, deleteEvent);
router.put("/:id", verifyToken, updateEvent);

export default router;
