"use client";

import React, { useEffect, useState } from "react";
import ChatPopup from "@/components/chat/page";
import { useAppSelector } from "@/redux/hook";

const ChatPopupWrapper: React.FC = () => {
  const userId = useAppSelector((state) => state.auth.userId);

  return userId ? <ChatPopup /> : null;
};

export default ChatPopupWrapper;
