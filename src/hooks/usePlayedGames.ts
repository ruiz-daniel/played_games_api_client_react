/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useMessages } from "./context hooks/useMessages";
import api from '../services/IApi'
import { useLoading } from "./context hooks/useLoading";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addGame, setGames, updateGame as updateGameStore, removeGame as removeGameStore } from "../store/store";
import { AxiosError } from "axios";
import { PlayedGame } from "../models/PlayedGame";
import { GameFilterDataQuery, GameFilterDataUrl, GameImagesObject, UploadGameData } from "../models/types";
import { useErrorHandling } from "./useErrorHandling";
import { useSearchParams } from "react-router-dom";
import { prepareFilterMongoose } from "../utils/Filter";

export function usePlayedGames() {
  const dispatch = useAppDispatch()
  const games = useAppSelector(state => state.playedGames.games)
  const page = useAppSelector(state => state.playedGames.page)
  const max = useAppSelector(state => state.playedGames.max)
  const { handleError } = useErrorHandling()
  const { message } = useMessages()
  const { setLoading } = useLoading()
  let [searchParams] = useSearchParams();

  const getGames = async (page: number) => {
    const filterData: GameFilterDataUrl = {}
    searchParams.forEach((value, key) => {
      filterData[key as keyof GameFilterDataUrl] = value
    });
    const filter = prepareFilterMongoose(filterData)
    setLoading(true)
    const response = await api.PlayedGamesApi.getPlayedGames(
      page,
      50,
      filter,
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

  const getGame = async (id: string) => {
    const response = await api.PlayedGamesApi.getPlayedGameById(id)
    if ('data' in response) {
      return response.data
    } else {
      const localGame = games.find(game => game._id === id)
      return localGame ?? handleError(response)
    }
    
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
    getGames(1)
  }, [searchParams])

  return {
    games,
    getGames,
    uploadGame,
    updateGame,
    getGame,
    removeGame,
    handleImages,
    page,
    max
  }
}