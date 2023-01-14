/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

export default {
  login(credentials, callback, errorFunction) {
    apiClient
      .request({
        method: 'post',
        url: 'users/login',
        data: credentials,
      })
      .then((response) => {
        sessionStorage.setItem('username', response.data.username)
        sessionStorage.setItem('userid', response.data._id)
        sessionStorage.setItem('display_name', response.data.display_name)
        sessionStorage.setItem('access_token', response.data.access_token)
        sessionStorage.setItem('premium', response.data.premium)
        sessionStorage.setItem('admin', response.data.admin)
        sessionStorage.setItem('userpfp', response.data.profile_picture)
        callback(response.data)
      })
      .catch((error) => {
        errorFunction(error)
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
