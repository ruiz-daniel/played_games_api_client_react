import { useState } from "react";
import IgdbApi from "../services/IgdbApi";
import { useLoading } from "./context hooks/useLoading";
import { handleError } from "../services/GeneralApi";
import { IgdbGameData } from "../models/IgdbGameData";

export const useIgdbGames = () => {
  const [results, setResults] = useState<IgdbGameData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setLoading } = useLoading();

  const handleSearch = async (
    searchName: string,
    exactMatch: boolean = false,
  ) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("igdbToken");
    if (!token) {
      setError("Invalid igdb request");
      return;
    }
    try {
      const response = await IgdbApi.getGamesByName(
        searchName,
        token,
        exactMatch,
      );
      if (response && "data" in response) {
        setResults(response.data);
      }
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const getCredentials = async () => {
    setLoading(true);
    setError(null);
    const response = await IgdbApi.getCredentials();
    if (response && "data" in response) {
      const credentials = response.data;
      localStorage.setItem("igdbToken", credentials.access_token);
      localStorage.setItem(
        "igdbTokenExpiration",
        (new Date().getTime() - credentials.expires_in).toString(),
      );
      setLoading(false);
    } else {
      handleError(response);
    }
  };

  const getGameCoverImg = async (gameId: string) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("igdbToken");
    if (!token) {
      setError("Invalid igdb request");
      return;
    }
    const response = await IgdbApi.getGameCoverImg(gameId, token);
    if (response && "data" in response) {
      setLoading(false);
      return response.data;
    } else {
      handleError(response);
      return;
    }
  };

  const getGameArtworks = async (gameId: string) => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("igdbToken");
    if (!token) {
      setError("Invalid igdb request");
      return;
    }
    const response = await IgdbApi.getGameArtworks(gameId, token);
    if (response && "data" in response) {
      setLoading(false);
      return response.data;
    } else {
      handleError(response);
      return;
    }
  };

  return {
    results,
    error,
    getCredentials,
    handleSearch,
    getGameCoverImg,
    getGameArtworks,
  };
};
