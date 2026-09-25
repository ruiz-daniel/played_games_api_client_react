import { createContext, useState } from "react";
import React from "react";

interface ILoadingContext {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultValue: ILoadingContext = {
  loading: false,
  setLoading: () => {},
};

export const LoadingContext = createContext<ILoadingContext>(defaultValue);

// @ts-ignore
export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const template = () => {
    return (
      <div className="w-full h-full items-center justify-center flex z-10 bg-gray-500/25">
        <i className="pi pi-spin pi-spinner text-6xl font-extrabold text-cyan-300" />
      </div>
    );
  };

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
