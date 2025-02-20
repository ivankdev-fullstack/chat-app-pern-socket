import express from "express";
import { login, logout, me, signup } from "../controllers/auth.controller.js";
import protectRoute from "../middlewares/protect-route.middleware.js";

const router = express.Router();

router.get("/me", protectRoute, me);
router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;
