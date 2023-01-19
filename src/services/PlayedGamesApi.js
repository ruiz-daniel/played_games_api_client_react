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
        url: `PlayedGames/game/${gameid}`,
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
  patchPlayedGame(game, callback) {
    apiClient
      .request({
        method: 'patch',
        url: 'PlayedGames/',
        data: game,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  deletePlayedGame(id, callback) {
    apiClient
      .request({
        method: 'delete',
        url: `PlayedGames/${id}`
      })
      .then((response) => {
        callback(response.data)
      })
  },
  getPlayingGames(callback) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/playing/`,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  getUserGamesInfo(userid, callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/gamesinfo/${userid}`,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
}
