import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from 'fs';

// require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
    // cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.use("/api/upload", express.static("upload"));

app.post("/api/upload", upload.single("photo"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.delete("/api/photos/:imgname", (req, res) => {
  const fileName = req.params.imgname;
  const directoryPath = "./upload/";

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to blog backend application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
