/* eslint-disable import/no-anonymous-default-export */
import { AxiosError } from 'axios'
import { apiClient } from './GeneralApi'
import { NewSingleList, SingleList } from '../models/SingleList'

const apiUrl = "singleLists"

export default {
  async getLists() {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: `${apiUrl}/`,
        })
      return response
    } catch (error: any) {
      return error as AxiosError
    }
    
  },
  async getListById(listId: string) {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: `${apiUrl}/${listId}`,
        })
      return response
    } catch (error: any) {
      return error as AxiosError
    }
  },
  async postList(list: NewSingleList) {
    try {
      const response = await apiClient
        .request({
          method: 'post',
          url: `${apiUrl}/`,
          data: list,
        })
      return response
    } catch (error) {
      return error as AxiosError
    }
  },
  async patchList(list: NewSingleList) {
    try {
      const response = await apiClient
        .request({
          method: 'patch',
          url: `${apiUrl}/`,
          data: list,
        })
      return response
    } catch (error) {
      return error as AxiosError
    }
    
  },
  async deleteList(listId: string) {
    try {
      const response = await apiClient
        .request({
          method: 'delete',
          url: `${apiUrl}/${listId}`,
        })
      return response
    } catch (error) {
      return error as AxiosError
    }
    
  },
}
