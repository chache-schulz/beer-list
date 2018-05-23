import Vue from 'vue'
import Router from 'vue-router'
import Beer from '@/components/beer/beer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/beers',
      name: 'beers',
      component: Beer
    }
  ]
})
