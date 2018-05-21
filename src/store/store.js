import Vue from 'vue'
import Vuex from 'vuex'
import beerStore from './beer.store'

Vue.use(Vuex)

export function storeFactory () {
  return new Vuex.Store({
    modules: {
      beerStore
    }
  })
}

const store = storeFactory()

export default store
