/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
import NProgress from 'nprogress'

export const apiClient = axios.create({
  baseURL: 'https://localhost:5001/drgapi/',
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('access_token_v1')}`,
  },
})

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

export default {
  getPlatforms(callback) {
    apiClient
      .request({
        method: 'get',
        url: 'PlayedGames/platforms',
      })
      .then((response) => {
        callback(response.data)
      })
  },
  getStatuses(callback) {
    apiClient
      .request({
        method: 'get',
        url: 'PlayedGames/statuses',
      })
      .then((response) => {
        callback(response.data)
      })
  },
  fetchPlatforms() {
    return apiClient.get('PlayedGames/platforms')
  },
  fetchStatuses() {
    return apiClient.get('PlayedGames/statuses')
  },
  uploadImage(gameImage, userid) {
    const formData = new FormData()

    formData.append('image', gameImage)
    return apiClient.post(`Images/${userid}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
  },
}
