/* eslint-disable import/no-anonymous-default-export */
import { AxiosError, AxiosResponse } from 'axios'
import { GameFilterData, GameFilterDataQuery, PlayedGamesResponse, UploadGameData } from '../models/types'
import { apiClient, handleError } from './GeneralApi'
import { PlayedGame } from '../models/PlayedGame'
import { PlayedGamesStats } from '../models/Stats'

const removeFalseyValues = (filterData: GameFilterDataQuery) => {
  Object.keys(filterData).forEach(key => {
        // @ts-ignore
        if (!filterData[key]) {
          // @ts-ignore
          delete filterData[key]
        }
      })
}

export default {
  async getPlayedGames(
    page = 1, 
    limit = 50, 
    filterData?: GameFilterDataQuery
  ) {
    // Delete falsey values from filter data so they don't affect the filter
    if (filterData) {
      removeFalseyValues(filterData)
    }
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: `playedGames?page=${page}&limit=${limit}
            &filterData=${JSON.stringify(filterData) ?? JSON.stringify({})}`,
        })
      return response as AxiosResponse<PlayedGamesResponse>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async getPlayedGameById(
    gameid: string,
  ) {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: `playedGames/game/${gameid}`,
        })
      return response as AxiosResponse<PlayedGame>
    } catch (error) {
      return handleError(error as AxiosError)
    }
    
  },
  async getAllPlayedGames() {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: `playedGames`,
        })
      return response as AxiosResponse<PlayedGame[]>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async postPlayedGame(game: UploadGameData) {
    try {
      const response = await apiClient
        .request({
          method: 'post',
          url: 'playedGames',
          data: game,
        })
      return response as AxiosResponse<PlayedGame>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async patchPlayedGame(game: UploadGameData) {
    try {
      const response = await apiClient
        .request({
          method: 'patch',
          url: 'playedGames/',
          data: game,
        })
      return response as AxiosResponse<PlayedGame>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async deletePlayedGame(id: string) {
    try {
      const response = await apiClient
        .request({
          method: 'delete',
          url: `playedGames/${id}`,
        })
      return response
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async getPlayingGames() {
    try {
      const response = await apiClient
      .request({
        method: 'get',
        url: `playedGames/playing/`,
      })
      return response as AxiosResponse<PlayedGame[]>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async getStats(filterData?: GameFilterDataQuery) {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: `playedGames/stats?filterData=${JSON.stringify(filterData) ?? JSON.stringify({})}`
        })
      return response as AxiosResponse<PlayedGamesStats>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
}
