import db from "../models/index.js";
import { Op } from "sequelize";
const Post = db.post;
const User = db.user;

// Get all posts (optionally by category)
export const getPosts = async (req, res) => {
  try {
    const where = req.query.cat ? { cat: req.query.cat } : {};
    // If search query is provided, filter by title or description
    if (req.query.search) {
      const search = req.query.search.toLowerCase();
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { desc: { [Op.like]: `%${search}%` } },
      ];
    }
    const posts = await Post.findAll({
      where,
      include: [{ model: User, as: "user", attributes: ["username"] }], // <-- add as: "user"
      order: [["date", "desc"]],
    });
    // Flatten username into post object
    const result = posts.map((post) => ({
      ...post.toJSON(),
      username: post.user?.username,
    }));
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  try {
    // const post = await Post.findOne({
    //   where: { id: req.params.id },
    //   include: [{ model: User, as: "user", attributes: ["username"] }], // <-- add as: "user"
    // });
    const post = await Post.findByPk(req.params.id, {
      include: [{ model: User, as: "user", attributes: ["username"] }],
    });
    if (!post) return res.status(404).json("Post not found");
    const { user, ...postData } = post.toJSON();
    return res.status(200).json({ ...postData, username: user?.username });
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Add a new post
export const addPost = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    await Post.create({
      title: req.body.title,
      desc: req.body.desc,
      imgUrl: req.body.imgUrl,
      imgId: req.body.imgId,
      cat: req.body.cat,
      date: req.body.date,
      uid: userId,
    });
    return res.json("Post has been created.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    const deleted = await Post.destroy({
      where: { id: req.params.id, uid: userId },
    });
    if (!deleted) return res.status(403).json("You can delete only your post!");
    return res.json("Post has been deleted!");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Update a post
export const updatePost = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    const [updated] = await Post.update(
      {
        title: req.body.title,
        desc: req.body.desc,
        imgUrl: req.body.imgUrl,
        imgId: req.body.imgId,
        cat: req.body.cat,
      },
      {
        where: { id: req.params.id, uid: userId },
      }
    );
    if (!updated) return res.status(403).json("You can update only your post!");
    return res.json("Post has been updated.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};
