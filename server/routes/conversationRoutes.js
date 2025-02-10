import express from "express";
import { createConversation, getUserConversations,searchConversation,deleteConversation } from "../controllers/conversationController.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/:userID", getUserConversations);
router.get('/search/:userId', searchConversation);
router.delete("/:conversationId", deleteConversation);

export default router;
