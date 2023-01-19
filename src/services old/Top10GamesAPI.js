/* eslint-disable import/no-anonymous-default-export */
import { apiClient } from './GeneralApi'

export default {
  getTop10Games(top10name, userid, callback, errorFunction) {
    apiClient
      .request({
        method: 'get',
        url: `Top10Games/user/${userid}/${top10name}`,
      })
      .then((response) => {
        callback(response.data)
      })
      .catch((error) => errorFunction(error))
  },
  postTop10Game(game, top10name, callback) {
    apiClient
      .request({
        method: 'post',
        url: 'Top10Games/' + top10name,
        data: game,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  putTop10Game(game, callback) {
    apiClient
      .request({
        method: 'put',
        url: 'Top10Games/' + game.id,
        data: game,
      })
      .then((response) => {
        callback(response.data)
      })
  },
  deleteTop10Game(id, callback) {
    apiClient
      .request({
        method: 'delete',
        url: 'Top10Games/' + id,
        data: { id: id },
      })
      .then((response) => {
        callback(response.data)
      })
  },
}
