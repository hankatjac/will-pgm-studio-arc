import express from "express";

import { contactUs, willpgmContact } from "../controllers/contact.controller.js";

const router = express.Router();

router.post("/", contactUs);
router.post("/willpgm", willpgmContact);

export default router;
