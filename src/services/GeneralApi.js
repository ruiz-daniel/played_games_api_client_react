/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import NProgress from 'nprogress'

const apiURL = process.env.REACT_APP_API_HOST || "https://game-shelf-backend.onrender.com"

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

export const defaultErrorFunction = (error) => {
  console.log(error)
}

export default {
  getPlatforms(callback, errorFunction = defaultErrorFunction) {
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
  getCompletions(callback, errorFunction = defaultErrorFunction) {
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
  uploadImage(gameImage) {
    const formData = new FormData()
    formData.append('image', gameImage,)

    return apiClient.post(`/images/${localStorage.getItem('userid')}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      }
    })
  },
}
