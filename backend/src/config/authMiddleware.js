import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
   
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET );
    req.user = { id: decoded.userId };
    next(); 
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid or expired" });
  }
}