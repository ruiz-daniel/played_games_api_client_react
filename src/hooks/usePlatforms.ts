import { useState, useEffect } from "react";
import api from '../services/IApi'
import { Platform } from "../models/Platform";
import { AxiosResponse } from "axios";
import { useErrorHandling } from "./useErrorHandling";

export function usePlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const { handleError } = useErrorHandling()

  const getPlatform = (id: string, name: string) => {
    return platforms.find(platform => platform._id === id || platform.name === name)
  }

  const getPlatforms = async () => {
    const response = await api.GeneralApi.getPlatforms()
    if ("data" in response) {
      setPlatforms(response.data)
    } else {
      handleError(response)
    }
  }

  useEffect(() => {
    getPlatforms()
  }, [])

  return { platforms, getPlatform }
}