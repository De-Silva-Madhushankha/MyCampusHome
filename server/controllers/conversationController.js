import Conversation from "../models/conversationModel.js";
import User  from "../models/userModel.js";
import Message from "../models/messageModel.js";

// Create a new conversation (if it doesn't exist)
export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({ participants: [senderId, receiverId] });
      await conversation.save();
    }

    res.status(201).json(conversation); // Send response
  } catch (error) {
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

// success






// Get all conversations of a user
// like  get my all contacts in whatsapp

export const getUserConversations = async (req, res) => {
  try {
    const { userID } = req.params;
    if (!userID) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const conversations = await Conversation.find({
      participants: userID,
    }).populate("participants", "email firstname lastname")
      .sort({ updatedAt: -1 });;
    
    //console.log(conversations);

    res.json(conversations);
    

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

// success fetch all conversations of users--postman



// In your conversation controller or routes file


// API route for searching conversations
export const searchConversation = async (req, res) => {
  const { userId } = req.params;
  const { searchQuery } = req.query;

  try {
    // Find the conversations where the participants match the search query
    const conversations = await Conversation.find({
      participants: { $in: [userId] }
    })
      .populate('participants')  // Populate the participants field with user data
      .exec();

    const filteredConversations = conversations.filter(conv => {
      // Search for a match in participants' email or name
      return conv.participants.some(
        (p) => p.email.toLowerCase().includes(searchQuery.toLowerCase()) || p.firstname?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    res.status(200).json(filteredConversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to search conversations' });
  }
};


// delete conveesations with their corresponding messages

export const deleteConversation = async (req, res) => {
  const { conversationId } = req.params;

  try {
    // Find the conversation by ID
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Delete all messages related to this conversation
    await Message.deleteMany({ conversationId });

    // Delete the conversation itself
    await Conversation.findByIdAndDelete(conversationId);

    res.status(200).json({ message: "Conversation and its messages deleted successfully" });
  } catch (error) {
    console.error("Error deleting conversation:", error);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
};