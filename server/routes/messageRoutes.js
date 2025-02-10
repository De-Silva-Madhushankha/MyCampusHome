import express from "express";
import { sendMessage, getMessagesByConversation,deleteMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/send", sendMessage);
router.get("/:conversationId", getMessagesByConversation);
router.delete("/:messageId", deleteMessage);

export default router;
