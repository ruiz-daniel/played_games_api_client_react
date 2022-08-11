/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

export default {
  getPlayedGames(userid, callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/user/${userid}`,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
  getPlayedGameById(gameid, callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/${gameid}`,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
  getAllPlayedGames(callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames`,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
  postPlayedGame(game, callback) {
    apiClient
      .request({
        method: 'post',
        url: 'PlayedGames',
        data: game,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  putPlayedGame(game, callback) {
    apiClient
      .request({
        method: 'put',
        url: 'PlayedGames/' + game.id,
        data: game,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  deletePlayedGame(game, callback) {
    apiClient
      .request({
        method: 'delete',
        url: 'PlayedGames/' + game.id,
        data: game,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  getPlayingGames(callback) {
    apiClient
      .request({
        method: 'get',
        url: 'PlayedGames/status/3',
      })
      .then((response1) => {
        apiClient
          .request({
            method: 'get',
            url: 'PlayedGames/status/6',
          })
          .then((response2) => {
            apiClient
              .request({
                method: 'get',
                url: 'PlayedGames/status/4',
              })
              .then((response3) => {
                callback(
                  response1.data.concat(response2.data.concat(response3.data)),
                )
              })
          })
      })
  },
}
