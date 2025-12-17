/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import PlayedGamesApi from "../services/PlayedGamesApi";
import { useLoading } from "./context hooks/useLoading";
import { PlayedGamesStats } from "../models/Stats";
import { useErrorHandling } from "./useErrorHandling";
import { GameFilterDataUrl } from "../models/types";
import { prepareFilterMongoose } from "../utils/Filter";
import { useSearchParams } from "react-router-dom";

export function usePlayedStats() {

  const [stats, setStats] = useState<PlayedGamesStats>()
  const [totalGames, setTotalGames] = useState(0)
  const [avgScore, setAvgScore] = useState(0)
  
  const [searchParams] = useSearchParams()

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
    const filterData: GameFilterDataUrl = {}
    searchParams.forEach((value, key) => {
      filterData[key as keyof GameFilterDataUrl] = value
    });
    const filter = prepareFilterMongoose(filterData)
    setLoading(true)
    const response = await PlayedGamesApi.getStats(filter)
    if ("data" in response) {
      setStats(response.data)
    } else {
      handleError(response)
    }
    setLoading(false)
    
  }

  useEffect(() => {
    getStats()
  },[searchParams])

  useEffect(() => {
    if(stats) {
      setTotalGames(stats.totalGames)
      getAvgScore()
    }
  }, [stats])

  return { stats, totalGames, avgScore }
  
}