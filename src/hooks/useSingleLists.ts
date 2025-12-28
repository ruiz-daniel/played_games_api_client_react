import { useEffect, useState } from "react"
import SingleListsApi from "../services/SingleListsApi"
import { NewSingleList, SingleList } from "../models/SingleList"
import { useErrorHandling } from "./useErrorHandling"
import { AxiosError } from "axios"
import { PlayedGame } from "../models/PlayedGame"

export const useSingleLists = () => {
  const [lists, setLists] = useState<SingleList[]>([])
  const {handleError} = useErrorHandling()

  const getLists = async () => {
    const listsResponse = await SingleListsApi.getLists()
    if ("data" in listsResponse) {
      setLists(listsResponse.data)
    } else {
      handleError(listsResponse)
    }
  }

  const getListById = async (listId: string) => {
    const listResponse = await SingleListsApi.getListById(listId)
    if ("data" in listResponse) {
      return listResponse.data
    } else {
      handleError(listResponse)
    }
  }

  const deleteList = async (listId: string) => {
    const response = await SingleListsApi.deleteList(listId)
    if (response.status && response.status < 300) {
      getLists()
    } else {
      handleError(response as AxiosError)
    }
  }

  const createList = async (list: NewSingleList) => {
    const response = await SingleListsApi.postList(list)
    if ("data" in response) {
      await getLists()
    } else {
      handleError(response)
    }
  }

  const updateListName = async (newName: string, listId: string) => {
    const list = lists.find(l => l._id === listId)
    if (!list)
      handleError(new AxiosError('There was an error updating this list: List not found', "404"))
    else {
      const patchResponse = await SingleListsApi.patchList({...list, games: list.games.map(game => game._id), name: newName})
      if ("data" in patchResponse) {
        getLists()
      } else {
        handleError(patchResponse)
      }
    }
  }

  const addToList = async (game: PlayedGame, listId: string) => {
    console.log({game, listId})
    const list = lists.find(l => l._id === listId)
    if (!list)
      handleError(new AxiosError('There was an error updating this list: List not found', "404"))
    else {
      list.games.push(game)
      const patchResponse = await SingleListsApi.patchList({...list, games: list.games.map(game => game._id)})
      if ("data" in patchResponse) {
        getLists()
      } else {
        handleError(patchResponse)
      }
    }
  }

  const moveGameInList = async (gameId: string, listId: string, direction: "left" | "right") => {
    const list = lists.find(l => l._id === listId)
    if (!list) {
      handleError(new AxiosError('There was an error updating this list: List not found', "404"))
      return
    }
    else {
      const updatedGamesList = list.games
      const gameToMove = updatedGamesList.find(g => g._id === gameId)
      let currentIndex
      if (!gameToMove) {
        handleError(new AxiosError('There was an error updating this list: Game not found', "404"))
        return
      } else {
        currentIndex = updatedGamesList.indexOf(gameToMove)
      }
      switch (direction) {
        case "left":
          updatedGamesList[currentIndex] = updatedGamesList[currentIndex - 1]
          updatedGamesList[currentIndex - 1] = gameToMove
          break;
        case "right":
          updatedGamesList[currentIndex] = updatedGamesList[currentIndex + 1]
          updatedGamesList[currentIndex + 1] = gameToMove
          break;
      }
      const patchResponse = await SingleListsApi.patchList({...list, games: updatedGamesList.map(game => game._id)})
      if ("data" in patchResponse) {
        getLists()
      } else {
        handleError(patchResponse)
      }
    }
  }

  const removeGameFromList = async (gameId: string, listId: string) => {
    const list = lists.find(l => l._id === listId)
    if (!list) {
      handleError(new AxiosError('There was an error updating this list: List not found', "404"))
      return
    }
    else {
      const updatedGamesList = list.games.filter(game => game._id !== gameId)
      const patchResponse = await SingleListsApi.patchList({...list, games: updatedGamesList.map(game => game._id)})
      if ("data" in patchResponse) {
        getLists()
      } else {
        handleError(patchResponse)
      }
    }
  }

  useEffect(() => {
    getLists()
  }, [])

  return {
    lists,
    getListById,
    deleteList,
    createList,
    addToList,
    updateListName,
    moveGameInList,
    removeGameFromList
  }
}