import { useEffect, useState } from "react";
import PlayedGamesApi from "../services/PlayedGamesApi";
import { useLoading } from "./useLoading";

export function usePlayedStats() {

  const [stats, setStats] = useState()
  const { setLoading } = useLoading()

  useEffect(() => {
    setLoading(true)
    PlayedGamesApi.getStats(
      localStorage.getItem('userid'),
      (response) => {
        setLoading(false)
        setStats(response.data)
      }
    )
  },[])

  return { stats }
  
}