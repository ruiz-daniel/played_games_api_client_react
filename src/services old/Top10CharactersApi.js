/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

export default {
  getTop10Characters(top10name, callback) {
    apiClient
      .request({
        method: 'get',
        url: 'Top10Characters/' + top10name,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  postTop10Character(character, top10name, callback) {
    apiClient
      .request({
        method: 'post',
        url: 'Top10Characters/' + top10name,
        data: character,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  putTop10Character(character, callback) {
    apiClient
      .request({
        method: 'put',
        url: 'Top10Characters/' + character.id,
        data: character,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  deleteTop10Character(id, callback) {
    apiClient
      .request({
        method: 'delete',
        url: 'Top10Characters/' + id,
        data: { id: id },
      })
      .then((response) => {
        callback(response.data)
      })
  },
}
