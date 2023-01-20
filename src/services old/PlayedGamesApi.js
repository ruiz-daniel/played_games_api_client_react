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
  getPlayingGames(userid, callback) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/playing/${userid}`,
      })
      .then((response) => {
        callback(response.data.sort((a, b) => a.statusid - b.statusid))
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