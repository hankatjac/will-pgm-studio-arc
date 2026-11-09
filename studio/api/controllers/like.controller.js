import db from "../models/index.js";
const Post = db.post;
const User = db.user;
const Like = db.like;

// Get all userIds who liked a post
export const getLikes = async (req, res) => {
  try {
    const postId = req.query.postId;
    if (!postId) return res.status(400).json("postId is required");
    const likes = await Like.findAll({
      where: { postId },
    });
    return res.status(200).json(likes.map((like) => like.userId));
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

// Add a like
export const addLike = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");

    const post = await Post.findOne({
      where: { id: req.body.postId },
    });

    if (userId === post.uid) {
      return res.status(403).json("You cannot like your own post.");
    }

    await Like.create({
      userId,
      postId: req.body.postId,
    });
    
    // Optionally, you can also increment the like count on the post
    // await Post.increment('likeCount', { where: { id: req.body.postId } });
    // Note: If you want to track the number of likes, you might need to add a likeCount field to the Post model
    // and update it accordingly.
    // await Post.update({ likeCount: Sequelize.literal('likeCount + 1') }, { where: { id: req.body.postId } });

    return res.status(200).json("Post has been liked.");
  } catch (err) {
    // Prevent duplicate likes
    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json("Already liked.");
    }
    return res.status(500).json(err.message || "Server error");
  }
};

// Delete a like
export const deleteLike = async (req, res) => {
  try {
    const userId = req.userId; // Replace with your actual user ID logic
    if (!userId) return res.status(401).json("Unauthorized");
    const deleted = await Like.destroy({
      where: { userId, postId: req.query.postId },
    });
    if (deleted) return res.status(200).json("Post has been disliked.");
    return res.status(404).json("Like not found.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};
