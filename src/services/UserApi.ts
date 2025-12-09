/* eslint-disable import/no-anonymous-default-export */
import { AxiosResponse } from 'axios'
import { UserCredentials } from '../models/types'
import { apiClient, updateClient, defaultErrorFunction } from './GeneralApi'
import { NewUser, User, UserResponse } from '../models/User'

const handleUserData = (data: UserResponse) => {
  // local persistance
  localStorage.setItem('userid', data._id)
  localStorage.setItem('access_token', data.access_token)
  localStorage.setItem('username', data.username)
  localStorage.setItem('display_name', data.display_name)
  localStorage.setItem('profile_picture', data.profile_picture)

  // update api client with new JWT Token
  updateClient()
  // delete JWT token from response data
  // @ts-ignore
  delete data.access_token
}

export default {
  login(
    credentials: UserCredentials, 
    callback: (response: AxiosResponse<User>) => void, 
    errorFunction = defaultErrorFunction
  ) {
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
  getUser(userid: string, callback: (response: AxiosResponse<User>) => void, errorFunction = defaultErrorFunction) {
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
  updateUser(user: User, callback: (response: AxiosResponse<User>) => void, errorFunction = defaultErrorFunction) {
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
  register(user: NewUser, callback: (response: AxiosResponse<User>) => void, errorFunction = defaultErrorFunction) {
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
