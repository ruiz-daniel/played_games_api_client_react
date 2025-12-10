/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError, AxiosResponse } from 'axios'
import NProgress from 'nprogress'
import { Platform } from '../models/Platform'
import { Completion } from '../models/Completion'
import { useMessages } from '../hooks/context hooks/useMessages'
import { useNavigation } from '../hooks/useNavigation'
import { useLoading } from '../hooks/context hooks/useLoading'

// @ts-ignore
const apiURL = import.meta.env.VITE_API_HOST || "https://game-shelf-backend.onrender.com"

export let apiClient = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
  },
})

export const updateClient = () => {
  apiClient = axios.create({
    baseURL: apiURL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  })
}

// Interceptors to initiate and stop progress bar during axios requests
apiClient.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(
  (response) => {
    NProgress.done()
    return response
  },
  function (error) {
    NProgress.done()
    return Promise.reject(error)
  },
)

export const handleError = (error: AxiosError) => {
  console.log(error.response?.data || error.message)
  return error
}

export default {
  async getPlatforms() {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: '/platforms',
        })
      return response as AxiosResponse<Platform[]>
    } catch (error) {
      return handleError(error as AxiosError)
    }
    
  },
  async getCompletions() {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: '/completions',
        })
      return response as AxiosResponse<Completion[]>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  uploadImage(gameImage: string | Blob) {
    const formData = new FormData()
    formData.append('image', gameImage,)

    return apiClient.post(`/images/${localStorage.getItem('userid')}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    })
  },
}
