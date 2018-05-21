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
    }
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
    }
  },
  actions: {
    async getBeerList ({state, commit}, params) {
      params = params || {}
      params.order = state.order.field
      params.sort = state.order.sort
      Service.getBeerList(params)
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
