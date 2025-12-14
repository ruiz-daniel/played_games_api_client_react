/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError, AxiosResponse } from "axios";
import { handleError } from "./GeneralApi";

// @ts-ignore
const steamApiKey = import.meta.env.VITE_RAPID_API_KEY

const apiClient = axios.create({
  baseURL: "https://steam2.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": steamApiKey,
    "X-RapidAPI-Host": "steam2.p.rapidapi.com",
  },
});

export default {
  async getSteamGames(searchTerm: string) {
    try {
      const response = await apiClient
        .request({
          method: "GET",
          url: `search/${searchTerm}/page/%7Bpage%7D`,
        })
      return response
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async getGameDetails(steamAppID: string) {
    try {
      const response = await apiClient
      .request({
        method: "GET",
        url: `https://steam2.p.rapidapi.com/appDetail/${steamAppID}`,
      })
      return response
    } catch (error) {
      return handleError(error as AxiosError)
    }
  }
};
