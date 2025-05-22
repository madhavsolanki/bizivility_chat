import jwt from "jsonwebtoken";

const isUserAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token || typeof token !== "string") {
      return res.status(401).json({ success: false, message: "Unauthorized: No valid token provided" });
    }
    
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("JWT Error:", error);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default isUserAuthenticated;
