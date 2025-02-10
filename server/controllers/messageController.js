import Message from "../models/messageModel.js";
import Conversation from "../models/conversationModel.js";
//import  { createConversation } from "../controllers/conversationController.js";


// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] },
    });

    if (!conversation) {
      conversation = new Conversation({ participants: [sender, receiver] });
      await conversation.save();
    } else {
      // ✅ Update the conversation's last activity timestamp
      conversation.updatedAt = new Date();
      await conversation.save();
    }

    const newMessage = new Message({
      conversationId: conversation._id,
      sender,
      receiver,
      message,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

// successfully send message //check using postman





// Get messages of a conversation
export const getMessagesByConversation = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};


export const deleteMessage = async (req, res) => {
  try {
    const { userId } = req.body; // Get user ID from request body
    const { messageId } = req.params;
    

    const message = await Message.findById(messageId);

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    // Ensure that only the sender can delete the message
    if (message.sender.toString() !== userId) {
      return res.status(403).json({ success: false, message: "You can only delete your own messages" });
    }

    await Message.findByIdAndDelete(messageId);
    res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
