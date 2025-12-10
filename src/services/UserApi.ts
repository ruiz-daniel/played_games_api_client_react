/* eslint-disable import/no-anonymous-default-export */
import { AxiosError, AxiosResponse } from 'axios'
import { UserCredentials } from '../models/types'
import { apiClient, updateClient, handleError } from './GeneralApi'
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
  async login(
    credentials: UserCredentials
  ) {
    try {
      const response = await apiClient
        .request({
          method: 'post',
          url: 'users/login',
          data: credentials,
        })
      handleUserData(response.data)
      return response as AxiosResponse<User>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async getUser(userid: string,) {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: `users/${userid}`,
        })
      return response as AxiosResponse<User>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
  async updateUser(user: User) {
    try {
      const response = await apiClient
        .request({
          method: 'patch',
          url: `users`,
          data: user,
        })
      return response as AxiosResponse<User>
    } catch (error) {
      return handleError(error as AxiosError)
    }
    
  },
  async register(user: NewUser) {
    try {
      const response = await apiClient
        .request({
          method: 'post',
          url: 'users',
          data: user,
        })
      return response as AxiosResponse<User>
    } catch (error) {
      return handleError(error as AxiosError)
    }
  },
}
