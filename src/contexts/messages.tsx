import React from "react";
import { useRef, createContext } from "react";
import { toast } from "@/components/ui/toast";
import { MessageType } from "../models/types";

interface IMessagesContext {
  message: (type: MessageType, title: string) => void;
}

const defaultValue: IMessagesContext = {
  message: () => {},
};

export const MessagesContext = createContext<IMessagesContext>(defaultValue);

// @ts-ignore
export function MessagesProvider({ children }) {
  const message: IMessagesContext["message"] = (type, title) => {
    toast.add({
      title,
    });
  };

  return (
    <MessagesContext.Provider value={{ message }}>
      {children}
    </MessagesContext.Provider>
  );
}
