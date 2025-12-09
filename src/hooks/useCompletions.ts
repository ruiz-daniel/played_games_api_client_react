import { useState, useEffect } from "react";
import api from '../services/IApi'
import { Completion } from "../models/Completion";

export function useCompletions() {
  const [completions, setCompletions] = useState<Completion[]>([])

  const getCompletion = (id: string) => {
    return completions.find(completion => completion._id === id)
  }

  useEffect(() => {
    api.GeneralApi.getCompletions((response) => {
      setCompletions(response.data)
    })
  }, [])

  return { completions, getCompletion }
}