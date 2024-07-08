import { createSlice } from "@reduxjs/toolkit";
import { getFormattedMessage } from "@/utils/conversation";

const userId = () => {
  if (typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem("userId");
};

const initialState = {
  conversations: [],
  current_conversation: null,
  current_messages: [],
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    displayAllConversation(state, action) {
      state.conversations = action.payload;
      console.log("All conversations:", state.conversations);
    },
    setCurrentConversation(state, action) {
      state.current_conversation = action.payload;
      console.log("Current conversation:", state.current_conversation);
    },
    fetchCurrentMessages(state, action) {
      const messages = action.payload.messages;
      const formatted_messages = messages.map((el) =>
        getFormattedMessage(el, userId())
      );
      state.current_messages = formatted_messages;
      console.log("Formatted messages:", state.current_messages);
    },
    addDirectMessage(state, action) {
      state.current_messages.push(
        getFormattedMessage(action.payload.message, userId())
      );
      const newPage = Math.ceil(state.current_messages.length / 20);
    },
    resetConversationState(state) {
      Object.assign(state, initialState);
      console.log("Conversation state has been reset");
    },
  },
});

// Actions
export const {
  displayAllConversation,
  setCurrentConversation,
  fetchCurrentMessages,
  addDirectMessage,
  resetConversationState,
} = conversationSlice.actions;

// Reducer
export default conversationSlice.reducer;
