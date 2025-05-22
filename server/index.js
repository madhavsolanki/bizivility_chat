import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./router/auth.routes.js";
import userRoutes from "./router/user.routes.js";

const app = express();
dotenv.config();

connectDB();

// Required Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get("/", (_, res)=>{
    res.send("Health is OK");
});

// Custom APIS of Application
app.use("/bizivility-chat/auth", authRoutes);
app.use("/bizivility-chat/user", userRoutes);


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});

