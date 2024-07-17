import React, { useState, useEffect, useRef } from "react";
import {
  ChatCircleText,
  PaperPlaneRight,
  Smiley,
  X,
} from "@phosphor-icons/react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import io from "socket.io-client";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import {
  setCurrentConversation,
  fetchCurrentMessages,
  addDirectMessage,
  displayAllConversation,
} from "@/redux/features/conversation/conversationSlice";

interface ChatMessage {
  chatroomId: string;
  senderId: string;
  text: string;
  type: "msg";
  incoming: string;
  outgoing: string;
}

const ChatPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [openPicker, setOpenPicker] = useState(false);
  const [socket, setSocket] = useState<any>(null);
  const [aId, setAId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const conversations = useAppSelector(
    (state) => state.conversation.conversations
  );
  const role = useAppSelector((state) => state.auth.user?.role);
  const roomId = useAppSelector(
    (state) => state.conversation.current_conversation?._id
  );
  const current_messages = useAppSelector(
    (state) => state.conversation.current_messages
  );
  const userIdFromStorage = window.localStorage.getItem("userId");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    const storedAdmins = window.localStorage.getItem("admins");

    if (storedAdmins) {
      try {
        const admins = JSON.parse(storedAdmins);
        setAId(admins);
      } catch (error) {
        console.error("Error parsing admins from localStorage:", error);
      }
    } else {
      fetchAdmins();
    }
    setUserId(userIdFromStorage);
  }, []);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SERVER_DOMAIN);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", userIdFromStorage);

    socket.on("incomingMessage", (message: ChatMessage) => {
      dispatch(addDirectMessage({ message }));
    });

    return () => {
      socket.off("incomingMessage");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    if (role === "admin" && userId) {
      fetchChatroomByUserId(userId);
    }
  }, [role, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [current_messages, isOpen]);

  useEffect(() => {
    if (isOpen && roomId) {
      fetchMessagesByChatRoomId(roomId);
    }
  }, [isOpen, roomId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchAdmins = async () => {
    try {
      const response = await axiosInstance.get("/api/user/admin");
      const adminsData = response.data.metadata;
      setAId(adminsData);
      window.localStorage.setItem("admins", JSON.stringify(adminsData));
    } catch (error) {
      console.error("Failed to fetch admin users:", error);
    }
  };

  const createChatRoom = async () => {
    try {
      const response = await axiosInstance.post("/api/chatroom", {
        room_participant_ids: [userId, aId],
      });
      dispatch(setCurrentConversation(response.data));
    } catch (error) {
      console.error("Failed to create chat room:", error);
    }
  };

  const fetchChatroomByUserId = async (userId: string) => {
    try {
      const response = await axiosInstance.get(`/api/chatroom/user/${userId}`);
      dispatch(displayAllConversation(response.data));
    } catch (error) {
      console.error("Failed to fetch chat rooms for user ID:", userId, error);
    }
  };

  const fetchMessagesByChatRoomId = async (roomId: string) => {
    try {
      const response = await axiosInstance.get(`/api/message/${roomId}`);
      dispatch(fetchCurrentMessages({ messages: response.data }));
    } catch (error) {
      console.error("Failed to fetch messages by Chat Room ID:", error);
    }
  };

  const toggleChat = async () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      return;
    }

    if (!roomId) {
      await createChatRoom();
    }
   else  {
   await fetchMessagesByChatRoomId(roomId);
  }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "" && roomId && userId && aId) {
      if (role === "admin") {
        const currentConversation = conversations.find(
          (conversation) => conversation._id === roomId
        );
        if (currentConversation) {
          currentConversation.room_participant_ids.forEach((participant) => {
            if (participant._id !== userId) {
              const newMessage: ChatMessage = {
                chatroomId: roomId,
                senderId: userId,
                text: message,
                type: "msg",
                incoming: participant._id,
                outgoing: userId,
              };

              socket.emit("sendMessage", { message: newMessage });
              dispatch(addDirectMessage({ message: newMessage }));
            }
          });
        }
      } else {
        const newMessage: ChatMessage = {
          chatroomId: roomId,
          senderId: userId,
          text: message,
          type: "msg",
          incoming: aId,
          outgoing: userId,
        };

        socket.emit("sendMessage", { message: newMessage });
        dispatch(addDirectMessage({ message: newMessage }));
      }
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    setMessage(message + emoji.native);
  };

  const handleConversationClick = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    dispatch(setCurrentConversation({ _id: conversationId }));
    fetchMessagesByChatRoomId(conversationId);
  };

  return (
    <div>
      {!isOpen && (
        <button
          className="fixed bottom-0 right-5 bg-purple-600 text-white border-none py-2 px-4 cursor-pointer rounded z-50 w-28 h-12"
          onClick={toggleChat}
        >
          <div className="flex items-center">
            <ChatCircleText className="mr-1" size={22} /><p className="text-lg">Chat</p> 
          </div>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-0 right-5 z-50">
          <div className="bg-purple-600 text-white p-2 rounded-t font-bold flex justify-between items-center">
            <p>Chat with us!</p>
            <X className="cursor-pointer" onClick={toggleChat} size={25} />
          </div>
          <div className="flex">
            {role === "admin" && (
              <div className="bg-gray-200 w-44 h-[450px] shadow-lg rounded-b overflow-y-scroll">
                <p className="text-lg font-bold p-2">Chat Rooms</p>
                {conversations.map((conversation, index) => (
                  <div
                    key={index}
                    className={`p-2 border-b cursor-pointer flex items-center ${selectedConversationId === conversation._id ? 'bg-gray-300' : ''} ${roomId===conversation._id ? 'bg-gray-300' : ''}`  }
                    onClick={() => handleConversationClick(conversation._id)} 
                  >
                    <img 
                      src={conversation.room_participant_ids[0].avatar}
                      width={35}
                      height={35}
                      className="rounded-full mr-2"
                      alt="Avatar"
                    />
                    <div className="flex flex-col">
                      <p className="text-gray-800 text-sm font-bold truncate "style={{maxWidth: '100px'}}>
                        {conversation.room_participant_ids[0].username}
                      </p>
                      <p className="text-gray-800 text-sm truncate "  style={{maxWidth: '100px'}}>
                        {conversation?.room_last_msg.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-white border border-gray-300 rounded shadow-lg w-96 h-[450px] flex flex-col flex-grow">
              <div className="overflow-y-auto h-[450px] p-2">
                {current_messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.incoming ? "justify-start" : "justify-end"
                    }`}
                  >
                    <p
                      className={`p-2 my-1 rounded max-w-xs ${
                        msg.incoming
                          ? "bg-gray-200 text-left"
                          : "bg-purple-100 text-right"
                      }`}
                    >
                      {msg.text}
                    </p>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {openPicker && (
                <div className="absolute bottom-20 right-5">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
              <div className="p-2 border-t border-gray-300 flex items-center">
                <button
                  onClick={() => setOpenPicker(!openPicker)}
                  className="mr-2"
                >
                  <Smiley size={32} />
                </button>
                <input
                  type="text"
                  onKeyDown={handleKeyDown}
                  value={message}
                  onChange={handleMessageChange}
                  className="flex-grow p-2 border border-gray-300 rounded-l"
                  placeholder="Type your message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-purple-600 text-white px-4 py-2 rounded-xl ml-2"
                >
                  <PaperPlaneRight size={32} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
