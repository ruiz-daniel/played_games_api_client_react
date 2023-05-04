/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'
import oldApi from '../services old/IApi'

export default {
  getPlayedGames(userid, callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/user/${userid}`,
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
  getUserGamesInfo(userid, callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/gamesinfo/${userid}`,
      })
      .then((response) => {
        callback(response)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
  loginVersion1(oldCredentials, callback) {
    oldApi.UserApi.login(
      oldCredentials,
      (data) => {
        sessionStorage.setItem('access_token_v1', data.access_token)
        sessionStorage.setItem('userid_v1', data.userid)
        window.location.reload()
      },
      (error) => {
        console.log(error.message)
      },
    )
  },
  importFromVersion1(userid) {
    oldApi.PlayedGamesApi.getPlayedGames(
      sessionStorage.getItem('userid_v1'),
      (data) => {
        data.forEach((game) => {
          this.postPlayedGame(
            {
              name: game.name,
              developers: game.developer.split(', '),
              publishers: game.publisher.split(', '),
              release_year: game.year,
              score: game.rating,
              description: game.description,
              steam_page: game.steam_page || undefined,
              played_hours: game.played_hours || undefined,
            },
            () => {},
          )
        })
      },
    )
  },
}
