import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    status: { type: String, enum : ['sent', 'delivered', 'read'], default: 'sent' }
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
