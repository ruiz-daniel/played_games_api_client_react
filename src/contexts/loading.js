import { createContext, useState } from "react"
import { BlockUI } from "primereact/blockui"

export const LoadingContext = createContext()

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
            <BlockUI blocked={loading} template={template}>
                {children}
            </BlockUI>
        </LoadingContext.Provider>
    )
}