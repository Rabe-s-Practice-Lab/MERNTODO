import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const hasToken = authHeader && authHeader.startsWith("Bearer ");

  if (!hasToken) {
    return res.status(404).json({ message: "No Token Found! " });
  }

  const token = req.headers.authorization.split("Bearer ").pop().trim();

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Invalid Token! " });
    }
    req.User = decoded; // can be accessible in the next fn (req.User.id)
    next();
  });
};

export default verifyToken;
