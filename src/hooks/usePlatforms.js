import { useState, useEffect } from "react";
import api from '../services/IApi'

export function usePlatforms() {
  const [platforms, setPlatforms] = useState([])

  const getPlatform = (id) => {
    return platforms.find(platform => platform._id === id)
  }

  useEffect(() => {
    api.GeneralApi.getPlatforms((response) => {
      setPlatforms(response.data)
    })
  }, [])

  return { platforms, getPlatform }
}