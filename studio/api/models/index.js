import Sequelize from "sequelize";
import fs from "fs";
import userModel from "./user.model.js";
import eventModel from "./event.model.js";
import todoModel from "./todo.model.js";
import postModel from "./post.model.js";
import commentModel from "./comment.model.js";
import likeModel from "./like.model.js";
import mysql2 from "mysql2";

// Build dialectOptions with optional TLS/SSL config (for Aiven or other managed DBs)
const dialectOptions = {};
if (process.env.DB_SSL === "true" || process.env.DB_SSL === "1") {
  const ssl = {
    rejectUnauthorized: !["false", "0", "no"].includes(
      (process.env.DB_SSL_REJECT_UNAUTHORIZED || "").toLowerCase(),
    ),
  };

  if (process.env.DB_SSL_CA_PATH) {
    try {
      // Read CA file and pass as Buffer for tls
      const caText = fs.readFileSync(process.env.DB_SSL_CA_PATH, "utf8");
      ssl.ca = Buffer.from(caText);
    } catch (err) {
      // Log and continue; Sequelize will fail to connect if CA is required but missing
      // eslint-disable-next-line no-console
      console.error("Failed to read DB_SSL_CA_PATH:", err.message);
    }
  } else if (process.env.DB_SSL_CA) {
    ssl.ca = Buffer.from(process.env.DB_SSL_CA.replace(/\\n/g, "\n"));
  }

  dialectOptions.ssl = ssl;
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    dialect: "mysql",
    dialectModule: mysql2,
    dialectOptions,
    define: {
      timestamps: false,
      freezeTableName: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = userModel(sequelize, Sequelize);
db.todo = todoModel(sequelize, Sequelize);
db.post = postModel(sequelize, Sequelize);
db.event = eventModel(sequelize, Sequelize);
db.comment = commentModel(sequelize, Sequelize);
db.like = likeModel(sequelize, Sequelize);

db.todo.belongsTo(db.user, {
  foreignKey: "uid",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.post.belongsTo(db.user, {
  foreignKey: "uid",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Define associations
db.event.belongsTo(db.user, {
  foreignKey: "uid",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.comment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.comment.belongsTo(db.post, {
  foreignKey: "postId",
  as: "post",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
db.post.hasMany(db.comment, {
  foreignKey: "postId",
  as: "comments",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

db.like.belongsTo(db.user, { foreignKey: "userId", as: "user" });
db.like.belongsTo(db.post, { foreignKey: "postId", as: "post" });
db.post.hasMany(db.like, { foreignKey: "postId", as: "likes" });

export default db;
