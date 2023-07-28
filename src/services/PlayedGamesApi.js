/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

export default {
  getPlayedGames(userid, page = 1, limit = 50, filterData, callback, errorFunction) {
    // Delete falsey values from filter data so they don't affect the filter
    if (filterData) {
      Object.keys(filterData).forEach(key => {
        if (!filterData[key]) {
          delete filterData[key]
        }
      })
    }
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/user/${userid}?page=${page}&limit=${limit}
          &filterData=${JSON.stringify(filterData) ?? JSON.stringify({})}`,
      })
      .then((response) => {
        callback(response)
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
        callback(response)
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
        callback(response)
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
        callback(response)
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
        callback(response)
      })
  },
  deletePlayedGame(id, callback) {
    apiClient
      .request({
        method: 'delete',
        url: `PlayedGames/${id}`,
      })
      .then((response) => {
        callback(response)
      })
  },
  getPlayingGames(callback) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/playing/`,
      })
      .then((response) => {
        callback(response)
      })
  },
  getStats(userid, callback) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/stats/${userid}`
      })
      .then((response) => {
        callback(response)
      })
      .catch((error) => {
        console.log(error)
      })
  },
}
