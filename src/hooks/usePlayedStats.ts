/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PlayedGamesApi from "../services/PlayedGamesApi";
import { useLoading } from "./context hooks/useLoading";
import { PlayedGamesStats } from "../models/Stats";
import { useErrorHandling } from "./useErrorHandling";

export function usePlayedStats() {

  const [stats, setStats] = useState<PlayedGamesStats>()
  const [totalGames, setTotalGames] = useState(0)
  const [avgScore, setAvgScore] = useState(0)

  const { setLoading } = useLoading()
  const { handleError } = useErrorHandling()

  const getAvgScore = () => {
    let totalScore = 0
    if (stats) {
      Object.keys(stats.scoreDatasets).forEach((key) => {
        totalScore += stats.scoreDatasets[key] * Number(key)
      })
      setAvgScore(totalScore / stats.totalGames)
    }
  }

  const getStats = async () => {
    setLoading(true)
    const response = await PlayedGamesApi.getStats()
    if ("data" in response) {
      setStats(response.data)
    } else {
      handleError(response)
    }
    setLoading(false)
    
  }

  useEffect(() => {
    getStats()
  },[])

  useEffect(() => {
    if(stats) {
      setTotalGames(stats.totalGames)
      getAvgScore()
    }
  }, [stats])

  return { stats, totalGames, avgScore }
  
}