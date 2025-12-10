import { useRef, createContext } from "react";
import { Toast, ToastMessage } from "primereact/toast";
import { MessageType } from "../models/types";

interface IMessagesContext  {
  message: (type: MessageType, title: string) => void
}

const defaultValue: IMessagesContext = {
  message: () => {}
}

export const MessagesContext = createContext<IMessagesContext>(defaultValue)

// @ts-ignore
export function MessagesProvider({ children }) {
  const toast = useRef<Toast>(null)

  const message: IMessagesContext['message'] = (type, title) => {
    toast?.current?.show({
      severity: type,
      summary: title,
      life: 3000,
    })
  }


  return (
    <MessagesContext.Provider value={{message}}>
      <Toast ref={toast} />
      {children}
    </MessagesContext.Provider>
  )
}