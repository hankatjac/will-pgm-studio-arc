import express from "express";
import {
  // upload,
  // uploadImagesToS3,
  deleteImagesInCloudinary,
  // getImages,
  // deleteImagesInS3,
} from "../controllers/img.controller.js";

const router = express.Router();

// router.post("/s3/upload", upload.array("photo", 1), uploadImagesToS3);
router.post("/cloudinary/delete", deleteImagesInCloudinary);
// router.post("/s3/delete", deleteImagesInS3);
// router.get("/:filename", getImages);

export default router;
