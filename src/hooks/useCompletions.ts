import { useState, useEffect } from "react";
import api from '../services/IApi'
import { Completion } from "../models/Completion";
import { useErrorHandling } from "./useErrorHandling";

export function useCompletions() {
  const [completions, setCompletions] = useState<Completion[]>([])
  const { handleError } = useErrorHandling()

  const getCompletion = (id: string) => {
    return completions.find(completion => completion._id === id)
  }

  const getCompletions = async () => {
    const response = await api.GeneralApi.getCompletions()
    if ("data" in response) {
      setCompletions(response.data)
    } else {
      handleError(response)
    }
  }

  useEffect(() => {
    getCompletions()
  }, [])

  return { completions, getCompletion }
}