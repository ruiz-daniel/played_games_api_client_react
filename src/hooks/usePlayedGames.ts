/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useMessages } from "./useMessages";
import api from '../services/IApi'
import { useLoading } from "./useLoading";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addGame, setGames, updateGame as updateGameStore, removeGame as removeGameStore } from "../store/store";
import { AxiosError } from "axios";
import { PlayedGame } from "../models/PlayedGame";
import { GameFilterData, GameFilterDataQuery, GameImagesObject, UploadGameData } from "../models/types";
import { useErrorHandling } from "./useErrorHandling";

export function usePlayedGames() {
  const dispatch = useAppDispatch()
  const games = useAppSelector(state => state.playedGames.games)
  const page = useAppSelector(state => state.playedGames.page)
  const max = useAppSelector(state => state.playedGames.max)
  const [filterData, setFilterData] = useState<GameFilterDataQuery>()
  const { handleError } = useErrorHandling()
  const { message } = useMessages()
  const { setLoading } = useLoading()

  const getGames = async (page: number, forceFilter = filterData) => {
    setLoading(true)
    const response = await api.PlayedGamesApi.getPlayedGames(
      localStorage.getItem('userid') as string,
      page,
      50,
      forceFilter,
    )
    setLoading(false)
    if (response && "data" in response) {
      dispatch(setGames({
        games: response.data.games,
        page: response.data.page,
        max: response.data.max
      }))
    } else {
      handleError(response)
    }
    
  }
  // Filters..................................................

  const handleRangeForQuery = (data: any, filterData: GameFilterDataQuery, queryKey: string, minValueKey: string, maxValueKey: string) => {
    /**
     * Check the data containing the filters for a min and max values key
     * then depending on which one exists, give the filter data key a range or a single value
     * 
     * data: the one that comes from the form
     * filterData: the one to be sent to the api
     */
    if (data[minValueKey] && data[maxValueKey]) {
      // @ts-ignore
      filterData[queryKey] = {
        $lte: data[maxValueKey], $gte: data[minValueKey] 
      }
    } else if (data[minValueKey]) {
      // @ts-ignore
      filterData[queryKey] = {
        $gte: data[minValueKey] 
      }
    } else if (data[maxValueKey]) {
      // @ts-ignore
      filterData[queryKey] = {
        $lte: data[maxValueKey]
      }
    }
  }

  // Prepare filter for mongoose in the backend
  const externalFilter = (data: GameFilterData) => {
    const filterData: GameFilterDataQuery = {
      ...data,
      name: data.name && { $regex: data.name },
      developers: data.developers && { $regex: data.developers },
      publishers: data.publishers && { $regex: data.publishers },
      tags: data.tags && { $regex: data.tags },
    }
    // Handle played hours, years and score possible range for mongoose query
    handleRangeForQuery(data, filterData, 'played_hours', 'played_hours_min', 'played_hours_max')
    handleRangeForQuery(data, filterData, 'played_year', 'played_year_min', 'played_year_max')
    handleRangeForQuery(data, filterData, 'release_year', 'release_year_min', 'release_year_max')
    handleRangeForQuery(data, filterData, 'score', 'score_min', 'score_max')

    setFilterData(filterData)
  }

  const resetFilter = () => {
    setFilterData(undefined)
  // Force get games with no filter
    getGames(1)
  }
  //......................................................

  const uploadImageRecursive = async (gallery: string[], files: File[], index: number) => {
    if (index === files.length) return
    const image = await api.GeneralApi.uploadImage(files[index])
    gallery.push(image.data)
    return uploadImageRecursive(gallery, files, index + 1)
  }

  const handleImages = async (images: GameImagesObject, game: UploadGameData | PlayedGame) => {
    if (images?.coverURL) {
      game.cover = images.coverURL;
    }
    else if (images?.cover) {
      const cover = await api.GeneralApi.uploadImage(images.cover)
      game.cover = cover.data
    }
    if (images?.coverBoxURL) {
      game.cover_box = images.coverBoxURL
    }
    else if (images?.coverBox) {
      const coverBox = await api.GeneralApi.uploadImage(images.coverBox)
      game.cover_box = coverBox.data
    }
    if (images?.gallery?.length > 0) {
      game.gallery = []
      await uploadImageRecursive(game.gallery, images.gallery, 0)
    }
  }

  const uploadGame = async (game: UploadGameData, callback: Function) => {
    if (game.images) {
      await handleImages(game.images, game)
      delete game.images
    }
    const response = await api.PlayedGamesApi.postPlayedGame(game)
    if (response && "data" in response) {
      message('info', "Game Uploaded Successfully")
      addGame(response.data)
      callback && callback(response.data)
    } else {
      handleError(response)
    }
  }

  const updateGame = async (game: UploadGameData, callback: Function) => {
    if (game.images) {
      await handleImages(game.images, game)
      delete game.images
    }
    const response = await api.PlayedGamesApi.patchPlayedGame(game)
    if (response && "data" in response) {
      message('info', "Game Updated Successfully")
      updateGameStore(response.data)
      callback && callback()
    } else {
      handleError(response)
    }
  }

  const getGame = (id: string) => {
    return games.find(game => game._id === id)
  }

  const removeGame = async (id: string, callback: Function) => {
    const response = await api.PlayedGamesApi.deletePlayedGame(id)
    if (response?.status && response.status < 300) {
      message('info', "Game Deleted Successfully")
      removeGameStore({_id: id})
      callback && callback()
    } else {
      handleError(response as AxiosError)
    }
  }

  useEffect(() => {
    if (games.length === 0)
      getGames(1)
  }, [])

  useEffect(() => {
    filterData && Object.keys(filterData)?.length && getGames(1)
  }, [filterData])

  return {
    games,
    getGames,
    externalFilter, 
    resetFilter,
    filterData, 
    uploadGame,
    updateGame,
    getGame,
    removeGame,
    handleImages,
    page,
    max
  }
}