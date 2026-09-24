import { AxiosError, AxiosResponse } from "axios";
import { apiClient, handleError } from "./GeneralApi";
import { IgdbCredentials } from "../models/IgdbCredentials";
import { IgdbGameData } from "../models/IgdbGameData";

export default {
  async getCredentials() {
    try {
      const response = await apiClient.request({
        method: "get",
        url: `igdbApi/credentials`,
      });
      return response as AxiosResponse<IgdbCredentials>;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
  async getGamesByName(
    name: string,
    igdbToken: string,
    exactMatch: boolean = false,
    limit?: string,
  ) {
    try {
      const response = await apiClient.request({
        method: "get",
        url: `igdbApi/${name}`,
        params: {
          access_token: igdbToken,
          limit,
          exact: exactMatch,
        },
      });
      return response as AxiosResponse<IgdbGameData[]>;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
  async getGameCoverImg(gameId: string, igdbToken: string) {
    try {
      const response = await apiClient.request({
        method: "get",
        url: `igdbApi/cover/${gameId}`,
        params: {
          access_token: igdbToken,
        },
      });
      return response as AxiosResponse<{ url: string; image_id: string }[]>;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
  async getGameArtworks(gameId: string, igdbToken: string) {
    try {
      const response = await apiClient.request({
        method: "get",
        url: `igdbApi/artworks/${gameId}`,
        params: {
          access_token: igdbToken,
        },
      });
      return response as AxiosResponse<{ url: string; image_id: string }[]>;
    } catch (error) {
      return handleError(error as AxiosError);
    }
  },
};
