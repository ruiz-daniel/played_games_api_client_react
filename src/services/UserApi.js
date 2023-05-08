/* eslint-disable import/no-anonymous-default-export */
import { apiClient, updateClient, defaultErrorFunction } from './GeneralApi'

const handleUserData = (data) => {
  // local persistance
  localStorage.setItem('userid', data._id)
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('username', data.username)
  localStorage.setItem('display_name', data.display_name)
  localStorage.setItem('profile_picture', data.profile_picture)

  // update api client with new JWT Token
  updateClient()
  // delete JWT token from response data
  delete data.access_token
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
  getUser(userid, callback, errorFunction = defaultErrorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `users/${userid}`,
      })
      .then((response) => {
        callback(response)
      })
      .catch(error => {
        errorFunction(error)
      })
  },
  updateUser(user, callback, errorFunction = defaultErrorFunction) {
    apiClient
      .request({
        method: 'patch',
        url: `users`,
        data: user,
      })
      .then((response) => {
        callback(response)
      })
      .catch(error => {
        errorFunction(error)
      })
  },
  register(user, callback, errorFunction = defaultErrorFunction) {
    apiClient
      .request({
        method: 'post',
        url: 'users',
        data: user,
      })
      .then((response) => {
        callback(response)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
}
