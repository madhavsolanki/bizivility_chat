import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
      const token =  jwt.sign({userId}, process.env.JWT_SECRET_KEY, {expiresIn:"7d"});
      
      return token;
  } catch (error) {
    console.log("Token Generation Error: ", error);
  }
};

export default genToken;