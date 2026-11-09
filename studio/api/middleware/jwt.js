import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token)
    return res.status(401).json({ message: "You are not authenticated! Please login" });

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.json({ message: "Token is not valid!" });
    req.userId = payload.id;
    next();
  });
};

export const initValidate = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  jwt.verify(token, process.env.JWT_KEY, (err) => {
    if (err) return res.status(403).json({ message: "Token invalid" });
    res.status(200).json({ message: "Token valid" });
  });
};
