import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import io from "socket.io-client";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { TrashIcon } from "@heroicons/react/24/solid";

const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const Chat = () => {
  const { conversationId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const location = useLocation();

  const { accomodationUserId, message } = location.state || {};

  const receiver = state?.receiver || { _id: accomodationUserId };

  // Get userID from local storage
  const userDataString = localStorage.getItem("persist:root");
  let userId = null;
  if (userDataString) {
    const persistedData = JSON.parse(userDataString);
    const userData = JSON.parse(persistedData.user);
    userId = userData.currentUser._id;
  }

  useEffect(() => {
    const fetchConversations = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const url = searchQuery
          ? `/api/conversations/search/${userId}?searchQuery=${searchQuery}`
          : `/api/conversations/${userId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load conversations");
        const data = await res.json();

        setConversations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [userId, navigate, conversationId, searchQuery]);

  useEffect(() => {
    if (!conversationId) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages/${conversationId}`);
        if (!response.ok) throw new Error("Failed to fetch messages");
        setMessages(await response.json());
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("receiveMessage", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
    });

    socket.on("messageDeleted", (messageId) => {
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("messageDeleted");
    };
  }, []);

  const sendMessage = async () => {
    if (!newMessage.trim() || !receiver) return;
    const messageData = { sender: userId, receiver: receiver._id, message: newMessage };
    try {
      const response = await fetch("/api/messages/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      if (!response.ok) throw new Error("Failed to send message");
      const sentMessage = await response.json();
      setMessages((prev) => [...prev, sentMessage]);
      socket.emit("sendMessage", sentMessage);
      setNewMessage("");

      if (!conversationId) {
        const updatedConversations = await fetch(`/api/conversations/${userId}`);
        if (!updatedConversations.ok) throw new Error("Failed to fetch conversations");
        const conversationsData = await updatedConversations.json();

        const newConversation = conversationsData.find((conv) =>
          conv.participants.some((p) => p._id === receiver._id)
        );

        if (newConversation) {
          navigate(`/newchat/${userId}/${newConversation._id}`, {
            state: { receiver },
          });
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) throw new Error("Failed to delete message");

      const result = await response.json();
      if (result.success) {
        setMessages(messages.filter((msg) => msg._id !== messageId));
      }
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  useEffect(() => {
    if (!state?.receiver && accomodationUserId) {
      setNewMessage(message);
      sendMessage(message);
    }
  }, [accomodationUserId]);

  const handleSelectConversation = (convId, userID, otherUser) => {
    navigate(`/newchat/${userID}/${convId}`, {
      state: {
        receiver: otherUser,
        accomodationUserId: otherUser?._id,
        message: "",
      },
    });

    setNewMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const deleteConversation = async (convId, userID) => {
    try {
      const response = await fetch(`/api/conversations/${convId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete conversation");

      setConversations((prev) => prev.filter((conv) => conv._id !== convId));

      navigate(`/newchat/${userID}`, { state: { receiver: null } });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = [];
    let currentDate = null;

    messages.forEach((msg) => {
      const messageDate = new Date(msg.createdAt);
      const formattedDate = format(messageDate, "yyyy-MM-dd");

      if (formattedDate !== currentDate) {
        currentDate = formattedDate;
        groupedMessages.push({
          date: formattedDate,
          messages: [msg],
        });
      } else {
        groupedMessages[groupedMessages.length - 1].messages.push(msg);
      }
    });

    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-gray-100 md:flex-row">
      {/* Back Button */}
      {/* Back Button - Now visible on all screen sizes */}
<div className="flex items-center justify-start p-4 transition-all duration-500 ease-in-out bg-indigo-500 border border-gray-200 rounded-lg hover:bg-gray-300">
  <button
    onClick={() => navigate('/')}
    className="flex items-center px-6 py-3 font-semibold text-indigo-600 transition-all duration-300 ease-in-out transform bg-white border border-indigo-600 shadow-md rounded-xl hover:bg-indigo-600 hover:text-white hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
  >
    <span className="mr-2 text-lg">&larr;</span> Back to Home
  </button>
</div>


      {/* Conversations Sidebar */}
      <div className="w-full p-4 bg-white border-r md:w-1/3">
        <h2 className="mb-4 text-xl font-bold">Chats</h2>
        <input
          type="text"
          placeholder="Search chats..."
          className="w-full p-2 mb-4 border-2 border-indigo-600 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {loading ? (
          <p className="text-gray-500">Loading chats...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-2">
            {conversations.map((conv) => {
              const otherUser = conv.participants?.find((p) => p._id !== userId);
              const isSelected = conversationId === conv._id;

              return (
                <div
                  key={conv._id}
                  onClick={() => handleSelectConversation(conv._id, userId, otherUser)}
                  className={`flex items-center justify-between p-3 rounded cursor-pointer 
                    hover:bg-gray-300 ${isSelected ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                >
                  <p className="font-medium">{otherUser?.email || "Unknown User"}</p>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteConversation(conv._id, userId);
                    }}
                    className="p-1 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Chat Window */}
      <div className="flex flex-col w-full h-screen p-4 overflow-hidden md:w-2/3">
        <h2 className="p-2 mb-4 text-xl font-bold text-center bg-indigo-400 rounded shadow-md">
          {receiver?.email || "Select a conversation"}
        </h2>

        <div className="flex flex-col flex-grow gap-2 p-4 overflow-y-auto bg-white rounded shadow-md no-scrollbar">
          {groupedMessages.map((group) => (
            <div key={group.date} className="space-y-2">
              <div className="text-xs font-semibold text-center text-gray-500">
                {format(new Date(group.date), "MMMM dd, yyyy")}
              </div>
              {group.messages.map((msg, index) => {
                const formattedTime = format(new Date(msg.createdAt), "hh:mm a");
                return (
                  <div
                    key={index}
                    className={`p-3 rounded-lg max-w-xs text-white shadow-md relative 
                      ${msg.sender === userId ? "bg-indigo-600 ml-auto" : "bg-gray-500 mr-auto"}`}
                  >
                    <p>{msg.message}</p>
                    <span className="text-xs text-gray-300">{formattedTime}</span>

                    {msg.sender === userId && (
                      <button
                        className="absolute text-xs text-red-400 top-1 right-1 hover:text-red-600"
                        onClick={() => deleteMessage(msg._id)}
                      >
                        ❌
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="flex items-center p-2 mt-4 bg-white border-indigo-600 rounded-lg shadow-md">
          <input
            type="text"
            className="flex-grow p-3 text-gray-800 bg-gray-200 border-indigo-600 border-none rounded-lg outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="flex items-center justify-center p-3 ml-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
          >
            <PaperAirplaneIcon className="w-6 h-6 transform rotate-45" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;