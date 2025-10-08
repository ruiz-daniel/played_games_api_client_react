import { useRef, createContext } from "react";
import { Toast } from "primereact/toast";

export const MessagesContext = createContext()

export function MessagesProvider({ children }) {
  const toast = useRef(null)

  const message = (type, title, subtitle, ) => {
  toast.current.show({
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