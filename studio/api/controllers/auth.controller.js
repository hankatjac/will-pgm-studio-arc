import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const User = db.user;

export const register = async (req, res) => {
  try {
    // Check if user exists
    const existingUser = await User.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { email: req.body.email },
          { username: req.body.username },
        ],
      },
    });

    if (existingUser) {
      return res.status(409).json("User already exists!");
    }

    // Hash password and create user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    return res.status(200).json("User has been created.");
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) return res.status(404).json("User not found!");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "1440m",
    });

    const { password, ...other } = user.toJSON();

    res
      .cookie("access_token", token, {
        sameSite: "none",
        secure: true,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json(other);
  } catch (err) {
    return res.status(500).json(err.message || "Server error");
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json("User has been logged out.");
};


