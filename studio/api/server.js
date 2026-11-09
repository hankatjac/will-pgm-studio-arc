import express from "express";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import eventRoute from "./routes/event.route.js";
import todoRoute from "./routes/todo.route.js";
import commentRoute from "./routes/comment.route.js";
import likeRoute from "./routes/like.route.js";
import imgRoute from "./routes/img.route.js";
import contactRoute from "./routes/contact.route.js";
import db from "./models/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

process.on("uncaughtException", (err) => {
  if (err.code == "PROTOCOL_CONNECTION_LOST") {
    console.log("db connction lost");
  }
});

var corsOptions = {
  origin: [
    "https://hankatjac.github.io",
    "http://localhost:3000",
    "http://localhost:5173",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/event", eventRoute);
app.use("/api/todo", todoRoute);
app.use("/api/comment", commentRoute);
app.use("/api/like", likeRoute);
app.use("/api/img", imgRoute);
app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to will-pgm-studio application." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

// Connecting to DB
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Synchronize models with the database without dropping tables
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Database synchronized.");
//     // initial(); // Uncomment if you need to seed initial data
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });
