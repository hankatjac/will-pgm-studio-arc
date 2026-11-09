import db from "../models/index.js";
const Post = db.post;

const Comment = db.comment;
const User = db.user;

// Get comments for a post
export const getComments = async (req, res) => {
  try {
    const postId = req.query.postId;
    if (!postId) return res.status(400).json("postId is required");
    const comments = await Comment.findAll({
      where: { postId },
      include: [{ model: User, as: "user", attributes: ["username"] }],
      order: [["createdAt", "DESC"]],
    });
    // Flatten username into comment object
    const result = comments.map((c) => ({
      ...c.toJSON(),
      username: c.user?.username,
    }));
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Add a comment
export const addComment = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");

    //check if user already commented on this post
    const existingComment = await Comment.findOne({
      where: { userId, postId: req.body.postId },
    });
    if (existingComment) {
      return res.status(409).json("You have already commented on this post.");
    }

    await Comment.create({
      desc: req.body.desc,
      userId,
      postId: req.body.postId,
      createdAt: new Date(),
    });
    return res.status(200).json("Comment has been created.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    const deleted = await Comment.destroy({
      where: { id: req.params.id, userId },
    });
    if (deleted) return res.json("Comment has been deleted!");
    return res.status(403).json("You can delete only your comment!");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};
