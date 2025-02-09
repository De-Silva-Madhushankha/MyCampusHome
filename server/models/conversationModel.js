import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, // Add this line
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
