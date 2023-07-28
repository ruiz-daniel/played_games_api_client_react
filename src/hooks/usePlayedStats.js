/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PlayedGamesApi from "../services/PlayedGamesApi";
import { useLoading } from "./useLoading";

export function usePlayedStats() {

  const [stats, setStats] = useState()
  const [totalGames, setTotalGames] = useState()
  const [avgScore, setAvgScore] = useState(0)

  const { setLoading } = useLoading()

  const getAvgScore = () => {
    let totalScore = 0
    Object.keys(stats.scoreDatasets).forEach((key) => {
      totalScore += stats.scoreDatasets[key] * Number(key)
    })
    setAvgScore(totalScore / stats.totalGames)
  }

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

  useEffect(() => {
    if(stats) {
      setTotalGames(stats.totalGames)
      getAvgScore()
    }
  }, [stats])

  return { stats, totalGames, avgScore }
  
}