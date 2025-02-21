import express from "express";
import {
  getMessagesByConversation,
  getSidebarUsers,
  sendMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protect-route.middleware.js";

const router = express.Router();

router.get("/conversations", protectRoute, getSidebarUsers);
router.get("/:id", protectRoute, getMessagesByConversation);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
