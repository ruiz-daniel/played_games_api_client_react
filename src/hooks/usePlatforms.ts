import { useState, useEffect } from "react";
import api from '../services/IApi'
import { Platform } from "../models/Platform";
import { AxiosResponse } from "axios";

export function usePlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([])

  const getPlatform = (id: string, name: string) => {
    return platforms.find(platform => platform._id === id || platform.name === name)
  }

  useEffect(() => {
    api.GeneralApi.getPlatforms((response: AxiosResponse<Platform[]>) => {
      setPlatforms(response.data)
    })
  }, [])

  return { platforms, getPlatform }
}