import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const id = req.userId;

    let user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({success:false, message: "User not found" });
    }

    return res.status(200).json({success:true, user }); 

  } catch (error) {
    return res.status(500).json({success:false, message: "Something went wrong", error: error.message});  
  }
};


// export const 

