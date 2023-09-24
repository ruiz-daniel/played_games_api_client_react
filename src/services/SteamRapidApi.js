/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://steam2.p.rapidapi.com/",
  headers: {
    "X-RapidAPI-Key": "dca28310b3mshfbd163116670cb2p14ade0jsn0af52adf2076",
    "X-RapidAPI-Host": "steam2.p.rapidapi.com",
  },
});

export default {
  getSteamGames(searchTerm, callback) {
    apiClient
      .request({
        method: "GET",
        url: `search/${searchTerm}/page/%7Bpage%7D`,
      })
      .then((response) => {
        callback(response);
      });
  },
  getGameDetails(steamAppID, callback) {
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
