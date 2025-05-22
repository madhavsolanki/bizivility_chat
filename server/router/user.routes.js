import express from "express";
import isUserAuthenticated from "../middlewares/authenticate.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/current", isUserAuthenticated, getCurrentUser);

export default router;