import { createContext, useState } from "react"
import { BlockUI } from "primereact/blockui"

interface ILoadingContext  {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultValue: ILoadingContext = {
  setLoading: () => {}
}

export const LoadingContext = createContext<ILoadingContext>(defaultValue)

// @ts-ignore
export function LoadingProvider({children}) {
    const [loading, setLoading] = useState(false)

    const template = () => {
        return (
            <div className="Loading-template">
                <i className="loading-icon pi pi-spin pi-spinner" />
            </div>
        )
    }
    
    return (
        <LoadingContext.Provider value={{setLoading}}>
            <BlockUI blocked={loading} template={template} fullScreen>
                {children}
            </BlockUI>
        </LoadingContext.Provider>
    )
}