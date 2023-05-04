import { useState, useEffect } from "react";
import api from '../services/IApi'

export function useCompletions() {
  const [completions, setCompletions] = useState([])

  const getCompletion = (id) => {
    return completions.find(completion => completion._id === id)
  }

  useEffect(() => {
    api.GeneralApi.getCompletions((response) => {
      setCompletions(response.data)
    })
  }, [])

  return { completions, getCompletion }
}