/* eslint-disable import/no-anonymous-default-export */
import { AxiosError, AxiosResponse } from 'axios'
import { GameFilterData, GameFilterDataQuery, UploadGameData } from '../models/types'
import { apiClient } from './GeneralApi'
import { PlayedGame } from '../models/PlayedGame'
import { PlayedGamesStats } from '../models/Stats'

export default {
  getPlayedGames(
    userid: string, 
    page = 1, 
    limit = 50, 
    filterData: GameFilterDataQuery, 
    callback: (response: AxiosResponse) => void , 
    errorFunction: (error: AxiosError) => void
  ) {
    // Delete falsey values from filter data so they don't affect the filter
    if (filterData) {
      Object.keys(filterData).forEach(key => {
        // @ts-ignore
        if (!filterData[key]) {
          // @ts-ignore
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
  getPlayedGameById(
    gameid: string, 
    callback: (response: AxiosResponse<PlayedGame>) => void, 
    errorFunction: (error: AxiosError) => void
  ) {
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
  getAllPlayedGames(
    callback: (response: AxiosResponse<PlayedGame[]>) => void, 
    errorFunction: (error: AxiosError) => void
  ) {
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
  postPlayedGame(game: UploadGameData, callback: (response: AxiosResponse<PlayedGame>) => void) {
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
  patchPlayedGame(game: UploadGameData, callback: (response: AxiosResponse<PlayedGame>) => void) {
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
  deletePlayedGame(id: string, callback: () => void) {
    apiClient
      .request({
        method: 'delete',
        url: `PlayedGames/${id}`,
      })
      .then((response) => {
        callback()
      })
  },
  getPlayingGames(callback: (response: AxiosResponse<PlayedGame>) => void) {
    apiClient
      .request({
        method: 'get',
        url: `PlayedGames/playing/`,
      })
      .then((response) => {
        callback(response)
      })
  },
  getStats(userid: string, callback: (response: AxiosResponse<PlayedGamesStats>) => void ) {
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
