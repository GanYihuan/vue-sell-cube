import request from 'api/request'

export default class ApiServer {
  static getSeller(params) {
    const url = `seller.json`
    return request({
      url: url,
      method: 'get',
      params: params
    })
  }
  static getGoods(params) {
    const url = `goods.json`
    return request({
      url: url,
      method: 'get',
      params: params
    })
  }
  static getRatings(params) {
    const url = `ratings.json`
    return request({
      url: url,
      method: 'get',
      params: params
    })
  }
}
