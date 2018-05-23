import BeerService from '@/components/beer/beer.service'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

var mock = new MockAdapter(axios)

describe('BeerService', () => {
  it('should define BeerService functions', (done) => {
    expect(BeerService.getBeerList).to.be.a('function')
    expect(BeerService.searchBeers).to.be.a('function')
    done()
  })

  it('should call axios and get beers data', (done) => {
    mock.onGet().reply(200, {
      beers: ['beer1', 'beer2']
    })

    BeerService.getBeerList({})
      .then((response) => {
        expect(response.data.beers).to.be.eql(['beer1', 'beer2'])
        done()
      })
      .catch(done)
  })

  it('should call axios and do a search', (done) => {
    mock.onGet().reply(200, {
      beers: ['beer3', 'beer4']
    })

    BeerService.searchBeers({})
      .then((response) => {
        expect(response.data.beers).to.be.eql(['beer3', 'beer4'])
        done()
      })
      .catch(done)
  })
})
