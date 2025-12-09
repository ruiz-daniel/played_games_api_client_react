/* eslint-disable import/no-anonymous-default-export */
import axios, { AxiosError, AxiosResponse } from 'axios'
import NProgress from 'nprogress'
import { Platform } from '../models/Platform'
import { Completion } from '../models/Completion'

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

export const defaultErrorFunction = (error: AxiosError) => {
  console.log(error)
}

export default {
  getPlatforms(callback: (response: AxiosResponse<Platform[]>) => void, errorFunction = defaultErrorFunction) {
    apiClient
      .request({
        method: 'get',
        url: '/platforms',
      })
      .then((response) => {
        callback(response)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
  getCompletions(callback: (response: AxiosResponse<Completion[]>) => void, errorFunction = defaultErrorFunction) {
    apiClient
      .request({
        method: 'get',
        url: '/completions',
      })
      .then((response) => {
        callback(response)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
  fetchPlatforms() {
    return apiClient.get('/platforms')
  },
  fetchStatuses() {
    return apiClient.get('/completions')
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
