import Service from '../components/beer/beer.service'

export default {
  state: {
    pagination: {
      currentPage: 0,
      numberOfPages: 0,
      totalResults: 0
    },
    beers: [],
    beerSelected: {},
    order: {
      field: 'name',
      sort: 'ASC'
    },
    nameSearch: ''
  },
  getters: {
    beerList: state => {
      return state.beers
    },
    pagination: state => {
      return state.pagination
    },
    order: state => {
      return state.order
    },
    nameSearch: state => {
      return state.nameSearch
    }
  },
  mutations: {
    setBeers: (state, beers) => {
      state.beers = beers
    },
    setPagination: (state, params) => {
      state.pagination.currentPage = params.currentPage
      state.pagination.numberOfPages = params.numberOfPages
      state.pagination.totalResults = params.totalResults
    },
    setOrder: (state, order) => {
      state.order = order
    },
    setNameSearch: (state, name) => {
      state.nameSearch = name
    }
  },
  actions: {
    async getBeerList ({state, commit}, params) {
      var promise
      params = params || {}
      params.order = state.order.field
      params.sort = state.order.sort

      if (state.nameSearch) {
        params.q = state.nameSearch
        params.type = 'beer'
        promise = Service.searchBeers
      } else {
        promise = Service.getBeerList
      }

      promise(params)
        .then((response) => {
          commit('setBeers', response.data.data)
          commit('setPagination', response.data)
          return response
        })
        .catch((error) => {
          throw error
        })
    }
  }
}
