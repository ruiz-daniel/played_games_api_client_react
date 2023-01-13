/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

export default {
  getTop10Names(userid, callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `Top10Names/user/${userid}`,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
  postTop10Name(data, callback, errorFunction) {
    apiClient
      .request({
        method: 'post',
        url: 'Top10Names/',
        data,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => errorFunction(error))
  },
  deleteTop10Name(id, callback, errorFunction) {
    apiClient
      .request({
        method: 'delete',
        url: `Top10Names/${id}`,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => {
        errorFunction(error)
      })
  },
}
