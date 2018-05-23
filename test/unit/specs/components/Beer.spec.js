import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import { storeFactory } from '@/store/store'
import BeerComponent from '@/components/beer/beer'
import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies)

Vue.use(Vuex)
Vue.use(ElementUI)

const store = storeFactory()
chai.spy.on(store, ['dispatch'], returns => true)
let Constructor = Vue.extend(BeerComponent)

describe('BeerComponent', () => {
  let vm
  beforeEach(() => {
    vm = new Constructor({ store })
    chai.spy.on(vm, ['setOrder', 'setNameSearch'])
  })

  after(() => {
    vm.$mount()
  })

  it('on mount should set initial values', (done) => {
    vm = vm.$mount()
    Vue.nextTick()
      .then(() => {
        expect(vm.nameSearch).to.be.equal('')
        expect(vm.beerList).to.be.an('array').that.have.lengthOf(0)
        expect(vm.setOrder).to.be.a('function')
        expect(vm.setNameSearch).to.be.a('function')
        expect(vm.pagination).to.eql({
          currentPage: 0,
          numberOfPages: 0,
          totalResults: 0
        })
        chai.expect(store.dispatch).to.have.been.called.with('getBeerList')
      })
      .then(() => {
        done()
      })
      .catch(done)
  })

  it('should not change sort if there is no order set', (done) => {
    Vue.nextTick()
      .then(() => {
        vm.changeSort({})
      })
      .then(() => {
        chai.expect(vm.setOrder).not.to.have.been.called()
        chai.expect(store.dispatch).to.have.been.called.once.with('getBeerList')
        done()
      })
      .catch(done)
  })

  it('should change sort if there is order set', (done) => {
    Vue.nextTick()
      .then(() => {
        vm.changeSort({ prop: 'header', order: 'ascending' })
      })
      .then(() => {
        vm.changeSort({ prop: 'header', order: 'descending' })
      })
      .then(() => {
        chai.expect(vm.setOrder).to.have.been.called()
        chai.expect(store.dispatch).to.have.been.called.exactly(3).with('getBeerList')
        done()
      })
      .catch(done)
  })

  it('should set the next page', (done) => {
    Vue.nextTick()
      .then(() => {
        vm.nextPage()
      })
      .then(() => {
        chai.expect(store.dispatch).to.have.been.called.with('getBeerList', { p: 1 })
        done()
      })
      .catch(done)
  })

  it('should set the previous page', (done) => {
    Vue.nextTick()
      .then(() => {
        vm.previousPage()
      })
      .then(() => {
        chai.expect(store.dispatch).to.have.been.called.with('getBeerList', { p: -1 })
        done()
      })
      .catch(done)
  })

  it('should do the search', (done) => {
    Vue.nextTick()
      .then(() => {
        vm.search('something')
      })
      .then(() => {
        chai.expect(vm.setNameSearch).to.have.been.called()
        chai.expect(store.dispatch).to.have.been.called.with('getBeerList', { p: 1 })
        done()
      })
      .catch(done)
  })
})
