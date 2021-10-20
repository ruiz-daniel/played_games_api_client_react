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
  deletePlayedGame(game, callback) {
    apiClient
      .request({
        method: "delete",
        url: "PlayedGames/" + game.id,
        data: game,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  getPlayingGames(callback) {
    apiClient
      .request({
        method: "get",
        url: "PlayedGames/status/3",
      })
      .then((response1) => {
        apiClient
          .request({
            method: "get",
            url: "PlayedGames/status/6",
          })
          .then((response2) => {
            apiClient
              .request({
                method: "get",
                url: "PlayedGames/status/4",
              })
              .then((response3) => {
                callback(
                  response1.data.concat(response2.data.concat(response3.data))
                );
              });
          });
      });
  },
  getCharacters(callback) {
    apiClient
      .request({
        method: "get",
        url: "PlayedGames/characters",
      })
      .then((response) => {
        callback(response.data);
      });
  },
  postCharacter(character, callback) {
    apiClient
      .request({
        method: "post",
        url: "PlayedGames/characters",
        data: character,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  putCharacter(character, callback) {
    apiClient
      .request({
        method: "put",
        url: "PlayedGames/characters/" + character.id,
        data: character,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  deleteCharacter(character, callback) {
    apiClient
      .request({
        method: "delete",
        url: "PlayedGames/characters/" + character.id,
        data: character,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  getTop10Games(top10name, callback) {
    apiClient
      .request({
        method: "get",
        url: "PlayedGames/top10games/" + top10name,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  postTop10Game(game, top10name, callback) {
    apiClient
      .request({
        method: "post",
        url: "PlayedGames/top10games/" + top10name,
        data: game,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  putTop10Game(game, callback) {
    apiClient
      .request({
        method: "put",
        url: "PlayedGames/top10games/" + game.id,
        data: game,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  deleteTop10Game(id, callback) {
    apiClient
      .request({
        method: "delete",
        url: "PlayedGames/top10games/" + id,
        data: { id: id },
      })
      .then((response) => {
        callback(response.data);
      });
  },
  getTop10Characters(top10name, callback) {
    apiClient
      .request({
        method: "get",
        url: "PlayedGames/top10characters/" + top10name,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  postTop10Character(character, top10name, callback) {
    apiClient
      .request({
        method: "post",
        url: "PlayedGames/top10characters/" + top10name,
        data: character,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  putTop10Character(character, callback) {
    apiClient
      .request({
        method: "put",
        url: "PlayedGames/top10characters/" + character.id,
        data: character,
      })
      .then((response) => {
        callback(response.data);
      });
  },
  deleteTop10Character(id, callback) {
    apiClient
      .request({
        method: "delete",
        url: "PlayedGames/top10character/" + id,
        data: { id: id },
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
