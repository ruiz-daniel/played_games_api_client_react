/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

const handleUserData = (data) => {
  localStorage.setItem('userid', data._id)
  localStorage.setItem('access_token', data.access_token)
  delete data.access_token
}

const defaultErrorFunction = (error) => {
  console.log(error)
}

export default {
  login(credentials, callback, errorFunction = defaultErrorFunction) {
    apiClient
      .request({
        method: 'post',
        url: 'users/login',
        data: credentials,
      })
      .then((response) => {
        handleUserData(response.data)
        callback(response)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
  getUser(userid, callback) {
    apiClient
      .request({
        method: 'get',
        url: `users/${userid}`,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  updateUser(user, callback) {
    apiClient
      .request({
        method: 'patch',
        url: `users`,
        data: user,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  register(user, callback, errorFunction) {
    apiClient
      .request({
        method: 'post',
        url: 'users',
        data: user,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
}
