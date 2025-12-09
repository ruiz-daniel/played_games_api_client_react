/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosResponse } from "axios";

const apiClient = axios.create({
  baseURL: "https://steam2.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": "dca28310b3mshfbd163116670cb2p14ade0jsn0af52adf2076",
    "X-RapidAPI-Host": "steam2.p.rapidapi.com",
  },
});

export default {
  getSteamGames(searchTerm: string, callback: (response: AxiosResponse) => void) {
    apiClient
      .request({
        method: "GET",
        url: `search/${searchTerm}/page/%7Bpage%7D`,
      })
      .then((response) => {
        callback(response);
      });
  },
  getGameDetails(steamAppID: string, callback: (response: AxiosResponse) => void) {
    apiClient
      .request({
        method: "GET",
        url: `https://steam2.p.rapidapi.com/appDetail/${steamAppID}`,
      })
      .then((response) => {
        callback(response);
      });
  }
};
