/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

const handleUserData = (data) => {
  sessionStorage.setItem('username', data.username)
  sessionStorage.setItem('userid', data._id)
  sessionStorage.setItem('display_name', data.display_name)
  sessionStorage.setItem('premium', data.premium)
  sessionStorage.setItem('admin', data.admin)
  sessionStorage.setItem('userpfp', data.profile_picture)
}

export default {
  login(credentials, callback, errorFunction) {
    apiClient
      .request({
        method: 'post',
        url: 'users/login',
        data: credentials,
      })
      .then((response) => {
        sessionStorage.setItem('access_token', response.data.access_token)
        handleUserData(response.data)
        callback(response.data)
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
        handleUserData(response.data)
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
