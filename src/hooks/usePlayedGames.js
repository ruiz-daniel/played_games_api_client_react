/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMessages } from "./useMessages";
import api from '../services/IApi'
import { useLoading } from "./useLoading";

export function usePlayedGames() {
  const dispatch = useDispatch()
  const games = useSelector((state) => state.playedGames.games)
  const page = useSelector((state) => state.playedGames.page)
  const max = useSelector((state) => state.playedGames.max)
  const [filterData, setFilterData] = useState()
  const { message } = useMessages()
  const { setLoading } = useLoading()

  // Store Actions...............................
  const setGamesAction = (data) => {
    dispatch({
      type: "playedGames/setGames",
      payload: data
    })
  }
  const addGameAction = (data) => {
    dispatch({
      type: "playedGames/addGame",
      payload: data
    })
  }
  const updateGameAction = (data) => {
    dispatch({
      type: "playedGames/updateGame",
      payload: data
    })
  }
  const removeGameAction = (data) => {
    dispatch({
      type: "playedGames/removeGame",
      payload: data
    })
  }
  //...............................................

  const getGames = (page, callback) => {
    setLoading(true)
    api.PlayedGamesApi.getPlayedGames(
      localStorage.getItem('userid'),
      page,
      50,
      filterData,
      (response) => {
        setLoading(false)
        setGamesAction({
          games: response.data.games,
          page: response.data.page,
          max: response.data.max
        })
      },
      (error) => {
        setLoading(false)
        if (error.response.status === 403 || error.response.status === 401) {
          message('warn', 'Session Expired. Please Login')
        } else {
          console.log(
          '🚀 ~ file: PlayedGamesList.js ~ line 56 ~ useEffect ~ error',
          error,
          )
          message('error', error.message)
        }
      }
    )
  }
  // Filters..................................................

  const handleRangeForQuery = (data, filterData, queryKey, minValueKey, maxValueKey) => {
    /**
     * Check the data containing the filters for a min and max values key
     * then depending on which one exists, give the filter data key a range or a single value
     * 
     * data: the one that comes from the form
     * filterData: the one to be sent to the api
     */
    if (data[minValueKey] && data[maxValueKey]) {
      filterData[queryKey] = {
        $lte: data[maxValueKey], $gte: data[minValueKey] 
      }
    } else if (data[minValueKey]) {
      filterData[queryKey] = {
        $gte: data[minValueKey] 
      }
    } else if (data[maxValueKey]) {
      filterData[queryKey] = {
        $lte: data[maxValueKey]
      }
    }
  }

  // Prepare filter for mongoose in the backend
  const externalFilter = (data) => {
    const filterData = {
      ...data,
      name: data.name && { $regex: data.name },
      developers: data.developers && { $regex: data.developers },
      publishers: data.publishers && { $regex: data.publishers },
    }
    // Handle played hours, years and score possible range for mongoose query
    handleRangeForQuery(data, filterData, 'played_hours', 'played_hours_min', 'played_hours_max')
    handleRangeForQuery(data, filterData, 'played_year', 'played_year_min', 'played_year_max')
    handleRangeForQuery(data, filterData, 'release_year', 'release_year_min', 'release_year_max')
    handleRangeForQuery(data, filterData, 'score', 'score_min', 'score_max')

    setFilterData(filterData)
  }

  const resetFilter = () => {
    setFilterData(null)
    getGames()
  }
  //......................................................

  const uploadImageRecursive = async (gallery, files, index) => {
    if (index === files.length) return
    const image = await api.GeneralApi.uploadImage(files[index])
    gallery.push(image.data)
    return uploadImageRecursive(gallery, files, index + 1)
  }

  const handleImages = async (images, game) => {
    if (images?.cover) {
      const cover = await api.GeneralApi.uploadImage(images.cover)
      game.cover = cover.data
    }
    if (images?.coverBox) {
      const coverBox = await api.GeneralApi.uploadImage(images.coverBox)
      game.cover_box = coverBox.data
    }
    if (images?.gallery?.length) {
      game.gallery = []
      await uploadImageRecursive(game.gallery, images.gallery, 0)
    }
  }

  const uploadGame = async (game, callback) => {
    if (game.images) {
      await handleImages(game.images, game)
      delete game.images
    }
    api.PlayedGamesApi.postPlayedGame(game, (response) => {
      message('info', "Game Uploaded Successfully")
      addGameAction(response.data)
      callback && callback()
    })
  }

  const updateGame = (game, callback) => {
    api.PlayedGamesApi.patchPlayedGame(game, (response) => {
      message('info', "Game Updated Successfully")
      updateGameAction(response.data)
      callback && callback()
    })
  }

  const getGame = (id) => {
    return games.find(game => game._id === id)
  }

  const removeGame = (id, callback) => {
    api.PlayedGamesApi.deletePlayedGame(id, (response) => {
      message('info', "Game Deleted Successfully")
      removeGameAction({_id: id})
      callback && callback()
    })
  }

  useEffect(() => {
    !games.length > 0 && getGames()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    filterData && Object.keys(filterData)?.length && getGames()
  }, [filterData])

  return {
    games,
    getGames,
    externalFilter, 
    resetFilter, 
    uploadGame,
    updateGame,
    getGame,
    removeGame,
    handleImages,
    page,
    max
  }
}