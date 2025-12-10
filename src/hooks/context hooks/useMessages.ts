import { useContext } from "react";
import { MessagesContext } from "../../contexts/messages";

export function useMessages() {
  const context = useContext(MessagesContext)
  if (!context) {
    throw new Error('Messages context is missing the provider and cannot be accessed')
  }
  return context
}