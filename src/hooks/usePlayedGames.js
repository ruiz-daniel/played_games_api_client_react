/* eslint-disable eqeqeq */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMessages } from "./useMessages";
import api from '../services/IApi'

let gamesBackup = []
// Keep the filtered games when component unmounts
let filteringGames = []

export function usePlayedGames() {
  const dispatch = useDispatch()
  const games = useSelector((state) => state.playedGames)
  const { message } = useMessages()

  const setGames = (data) => {
    dispatch({
      type: "playedGames/setGames",
      payload: data
    })
  }
  const getGames = (callback) => {
    api.PlayedGamesApi.getPlayedGames(
      localStorage.getItem('userid'),
      (response) => {
        if (filteringGames.length) {
          setGames(filteringGames)
        } else {
          setGames(response.data)
        }
        gamesBackup = response.data
      },
      (error) => {
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
  const localFilter = (value) => {
    const filtered = []
    gamesBackup.forEach((game) => {
      let found = false
      Object.keys(game).forEach((key) => {
        if (!['played_hours', 'id', '_id'].includes(key)) {
          if (['completion', 'platform'].includes(key)) {
            if (game[key].name == value) {
              found = true
            }
          } else if (typeof game[key] === 'string') {
            if (game[key].includes(value)) {
              found = true
            }
          } else if (game[key].length) {
            // Array
            if (game[key].toString().includes(value)) {
              found = true
            }
          } else {
            if (game[key] == value) {
              found = true
            }
          }
        }
      })
      if (found) {
        filtered.push(game)
      }
    })
    filteringGames = filtered
    setGames(filtered)
  }


  const externalFilter = (data) => {
    let filtered = []

    gamesBackup.forEach((game) => {
      // Compare filters using include. Empty filters will not have effect
      if (
        compareIgnoreCase(game.name, data.name) &&
        compareIgnoreCase(game.developers.toString(), data.developer) &&
        compareIgnoreCase(game.publishers.toString(), data.publisher) &&
        compare(data.year, game.release_year) &&
        compare(data.played_year, game.played_year) &&
        compare(data.played_hoursMin, game.played_hours, 'le') &&
        compare(data.played_hoursMax, game.played_hours, 'ge') &&
        compareIgnoreCase(game.genres.toString(), data.genre) &&
        compare(data.score, game.score) &&
        compareIgnoreCase(
          game.platform.name,
          data.platform
            ? typeof data.platform === 'string'
              ? data.platform
              : data.platform.name
            : '',
        ) &&
        compareIgnoreCase(
          game.completion.name,
          data.completion ? (typeof data.completion === 'string' ? data.completion : data.completion.name) : '',
        )
      ) {
        filtered.push(game)
        // Immediately pop out if it matches a filter-out condition
        if (
          (data.nameOut !== '' && compareIgnoreCase(game.name, data.nameOut)) ||
          (data.developerOut !== '' && compareIgnoreCase(game.developers.toString(), data.developerOut)) ||
          (data.publisherOut !== '' &&
            compareIgnoreCase(game.publishers.toString(), data.publisherOut)) ||
          (data.yearOut !== '' && (game.release_year?.includes(data.yearOut) || !game.release_year)) ||
          (data.played_yearOut !== '' &&
            (game.played_year?.includes(data.played_yearOut) ||
              !game.played_year)) ||
          (data.genreOut !== '' && compareIgnoreCase(game.genres.toString(), data.genreOut)) ||
          (data.scoreOut !== '' && game.score == data.scoreOut) ||
          (data.platformOut !== undefined &&
            compareIgnoreCase(
              game.platform.name,
              typeof platformOut === 'string' ? data.platformOut : data.platformOut.name,
            )) ||
          (data.completionOut !== undefined &&
            compareIgnoreCase(
              game.completion.name,
              typeof completionOut === 'string' ? data.completionOut : data.completionOut.name,
            ))
        )
          filtered.pop()
      }
    })
    filteringGames = filtered
    setGames(filtered)
  }

  const compareIgnoreCase = (stringA, stringB) => {
    if (stringA === undefined || stringB === undefined) {
      return false
    }
    return stringA.toUpperCase().includes(stringB.toUpperCase())
  }
  const compare = (valueA, valueB, comparison) => {
    // Active filter but no value on game -> filter out
    if (valueA && !valueB) {
      return false
    }
    // No Active filter -> filter in
    if (valueA === '') {
      return true
    }
    switch (comparison) {
      case 'lt':
        return Number(valueA) < Number(valueB)
        
      case 'le':
        return Number(valueA) <= Number(valueB)

      case 'gt':
        return Number(valueA) > Number(valueB)

      case 'ge':
        return Number(valueA) >= Number(valueB)

      default:
        break
    }
    return valueA == valueB
  }

  const resetFilter = () => {
    filteringGames = []
    setGames(gamesBackup)
  }

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
      const updatedGames = [...games, response.data]
      setGames(updatedGames)
      gamesBackup = updatedGames
      callback && callback()
    })
  }

  const updateGame = (game, callback) => {
    api.PlayedGamesApi.patchPlayedGame(game, (response) => {
      message('info', "Game Updated Successfully")
      const updatedGames = games.map((game) => 
        game._id === response.data._id ? response.data : game
      )
      setGames(updatedGames)
      gamesBackup = updatedGames
      callback && callback()
    })
  }

  const getGame = (id) => {
    return games.find(game => game._id === id)
  }

  const removeGame = (id, callback) => {
    api.PlayedGamesApi.deletePlayedGame(id, (response) => {
      message('info', "Game Deleted Successfully")
      const updatedGames = games.filter(game => game._id !== id)
      setGames(updatedGames)
      gamesBackup = updatedGames
      callback && callback()
    })
  }

  useEffect(() => {
    !games.length > 0 && getGames()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    games,
    localFilter, 
    externalFilter, 
    resetFilter, 
    uploadGame,
    updateGame,
    getGame,
    removeGame,
    handleImages
  }
}