import { useContext } from "react";
import { ModalsContext } from "../../contexts/modals";

export function useModalsContext() {
  const context = useContext(ModalsContext)
  if (!context) {
    throw new Error('Modals context is missing the provider and cannot be accessed')
  }
  return context
}