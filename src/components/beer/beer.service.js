import axios from 'axios'

const baseUri = 'http://api.brewerydb.com/v2/'
const key = ''

/**
 * Beers
 * This function interacts with beer API
 * @param {Object} params - params
 * @return {Promise}
 */
const getBeerList = function (params) {
  params = params || {}
  params.key = key
  return axios({
    method: 'get',
    url: baseUri + 'beers',
    params: params
  })
}

// EXPORT PUBLIC
export default {
  getBeerList
}
