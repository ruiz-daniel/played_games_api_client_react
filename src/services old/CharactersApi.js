/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

export default {
  getCharacters(callback) {
    apiClient
      .request({
        method: 'get',
        url: 'Characters',
      })
      .then((response) => {
        callback(response.data)
      })
  },
  postCharacter(character, callback) {
    apiClient
      .request({
        method: 'post',
        url: 'Characters',
        data: character,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  putCharacter(character, callback) {
    apiClient
      .request({
        method: 'put',
        url: 'Characters/' + character.id,
        data: character,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  deleteCharacter(character, callback) {
    apiClient
      .request({
        method: 'delete',
        url: 'Characters/' + character.id,
        data: character,
      })
      .then((response) => {
        callback(response.data)
      })
  },
}
