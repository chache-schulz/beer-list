import { storeFactory } from '@/store/store'
import Service from '@/components/beer/beer.service'
import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies)
chai.spy.on(Service, ['getBeerList', 'searchBeers'])
const store = storeFactory()

describe('BeerStore', () => {
  let state = store.state.beerStore

  it('should set beer store', (done) => {
    expect(state.pagination).to.eql({
      currentPage: 0,
      numberOfPages: 0,
      totalResults: 0
    })
    expect(state.beers).to.eql([])
    expect(state.nameSearch).to.eql('')
    done()
  })

  it('should set and get the values', (done) => {
    store.commit('setBeers', [{id: 1}, {id: 2}])
    expect(state.beers).to.eql([{id: 1}, {id: 2}])
    store.commit('setPagination', {
      currentPage: 1,
      numberOfPages: 3,
      totalResults: 4
    })
    expect(state.pagination).to.eql({
      currentPage: 1,
      numberOfPages: 3,
      totalResults: 4
    })
    store.commit('setOrder', { field: 'name1', sort: 'DESC' })
    expect(state.order).to.eql({ field: 'name1', sort: 'DESC' })
    store.commit('setNameSearch', 'test')
    expect(state.nameSearch).to.eql('test')
    done()
  })

  it('should call getBeerList if the nameSearch is not sent', (done) => {
    store.commit('setNameSearch', '')
    store.dispatch('getBeerList', {})
    chai.expect(Service.getBeerList).to.have.been.called()
    done()
  })

  it('should call searchBeers if the nameSearch is not sent', (done) => {
    store.commit('setNameSearch', 'test')
    store.dispatch('getBeerList')
    chai.expect(Service.searchBeers).to.have.been.called()
    done()
  })
})
