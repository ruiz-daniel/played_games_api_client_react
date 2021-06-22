/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import NProgress from "nprogress";

const apiClient = axios.create({
  baseURL: "https://localhost:5001/api/",
});

// Interceptors to initiate and stop progress bar during axios requests
apiClient.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

apiClient.interceptors.response.use((response) => {
  NProgress.done();
  return response;
});

export default {
  getPlayedGames(callback) {
    apiClient
      .request({
        method: "get",
        url: "PlayedGames",
      })
      .then((response) => {
        callback(response.data);
      });
  },
  postPlayedGame(game, callback) {
    apiClient
      .request({
        method: "post",
        url: "PlayedGames",
        data: game,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  putPlayedGame(game, callback) {
    apiClient
      .request({
        method: "put",
        url: "PlayedGames/" + game.id,
        data: game,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  getPlatforms(callback) {
    apiClient
      .request({
        method: "get",
        url: "PlayedGames/platforms",
      })
      .then((response) => {
        callback(response.data);
      });
  },
  getStatuses(callback) {
    apiClient
      .request({
        method: "get",
        url: "PlayedGames/statuses",
      })
      .then((response) => {
        callback(response.data);
      });
  },
  fetchPlatforms() {
    return apiClient.get("PlayedGames/platforms");
  },
  fetchStatuses() {
    return apiClient.get("PlayedGames/statuses");
  },
  uploadImage(gameImage) {
    const formData = new FormData();

    formData.append("image", gameImage);
    return apiClient.post("PlayedGames/gameImage", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  },
};
