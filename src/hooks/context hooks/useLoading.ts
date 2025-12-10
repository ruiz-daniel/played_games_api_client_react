import { useContext } from "react";
import { LoadingContext } from "../../contexts/loading";

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error('Loading context is missing the provider and cannot be accessed')
  }
  return context
}