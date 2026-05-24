import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  // Header එකෙන් Authorization Token එක ගන්නවා
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided, authorization denied" });
  }

  // "Bearer TOKEN_HERE" කෑල්ලෙන් Token එක විතරක් වෙන් කර ගන්නවා
  const token = authHeader.split(" ")[1];

  try {
    // Access Token එක Validate කරනවා
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || "ACCESS_SECRET_123");
    
    // 🛠️ පට්ටම වැදගත් තැන: Request එක ඇතුළට userId එක සෙට් කරනවා. 
    // එතකොට ඉස්සරහට එන Controller එකට බලාගන්න පුළුවන් මේ Request එක එවුවේ කවුද කියලා.
    req.userId = decoded.userId; 
    
    next(); // ඊළඟ පියවරට (Controller එකට) යන්න දෙනවා
  } catch (error) {
    // Access Token එක Expire වෙලා නම් Frontend එකට 401ක් දෙනවා (එතකොට Frontend එකෙන් Refresh Token එක එවලා අලුත් එකක් ගනීවි)
    return res.status(401).json({ message: "Token is not valid or expired" });
  }
}