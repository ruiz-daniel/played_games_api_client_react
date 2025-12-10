/* eslint-disable import/no-anonymous-default-export */
import { AxiosError, AxiosResponse } from 'axios'
import { apiClient, handleError } from './GeneralApi'
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
      return response as AxiosResponse<SingleList[]>
    } catch (error: any) {
      return handleError(error)
    }
    
  },
  async getListById(listId: string) {
    try {
      const response = await apiClient
        .request({
          method: 'get',
          url: `${apiUrl}/${listId}`,
        })
      return response as AxiosResponse<SingleList>
    } catch (error: any) {
      return handleError(error as AxiosError)
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
      return response as AxiosResponse<SingleList>
    } catch (error) {
      return handleError(error as AxiosError)
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
      return response as AxiosResponse<SingleList>
    } catch (error) {
      return handleError(error as AxiosError)
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
      return handleError(error as AxiosError)
    }
    
  },
}
