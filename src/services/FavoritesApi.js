/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

export default {
  getLists(callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `favoriteLists/`,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => errorFunction(error))
  },
  getListById(listId, callback) {
    apiClient
      .request({
        method: 'get',
        url: `favoriteLists/${listId}`,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  postList(list, callback) {
    apiClient
      .request({
        method: 'post',
        url: `favoriteLists/`,
        data: list,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  postTier(tier, callback) {
    apiClient
      .request({
        method: 'post',
        url: `favoriteLists/tier`,
        data: tier,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  patchList(list, callback) {
    apiClient
      .request({
        method: 'patch',
        url: `favoriteLists/`,
        data: list,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  patchTier(tier, callback) {
    apiClient
      .request({
        method: 'patch',
        url: `favoriteLists/tier`,
        data: tier,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  deleteList(listId, callback) {
    apiClient
      .request({
        method: 'delete',
        url: `favoriteLists/${listId}`,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  deleteTier(tierId, callback) {
    apiClient
      .request({
        method: 'delete',
        url: `favoriteLists/tier/${tierId}`,
      })
      .then((response) => {
        callback(response.data)
      })
  },
}
