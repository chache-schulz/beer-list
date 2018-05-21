import axios from 'axios'

const baseUri = 'http://api.brewerydb.com/v2/'
const key = '' // Copy your API KEY here

/**
 * Beers
 * This function interacts with beer API
 * @param {Object} params - params
 * @return {Promise}
 */
const getBeerList = function (params) {
  params.key = key
  return axios({
    method: 'get',
    url: baseUri + 'beers',
    params: params
  })
}

/**
 * Search
 * This function interacts with beer API
 * @param {Object} params - params
 * @return {Promise}
 */
const searchBeers = function (params) {
  params.key = key
  return axios({
    method: 'get',
    url: baseUri + 'search',
    params: params
  })
}

// EXPORT PUBLIC
export default {
  getBeerList,
  searchBeers
}
