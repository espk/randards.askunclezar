import { mutations } from '@/data/store'

describe('Clearing data', () => {

  it('does nothing when it was empty to begin with', () => {
    var state = helpers.getInitialState()

    mutations.clearData(state)
    expect(state.raid.length).toEqual(0)
  })

  it('removes a single item', () => {
    var state = helpers.getInitialState()
    state.raid = [
      { id: 'test-id-1' }
    ]

    mutations.clearData(state)
    expect(state.raid.length).toEqual(0)
  })

  it('removes all the items', () => {
    var state = helpers.getInitialState()
    state.raid = [
      { id: 'test-id-1' },
      { id: 'test-id-2' },
      { id: 'test-id-3' },
      { id: 'test-id-4' },
      { id: 'test-id-5' },
      { id: 'test-id-6' },
    ]

    mutations.clearData(state)
    expect(state.raid.length).toBe(0)
  })
})

describe('the loading indicator', () => {

  it('is off when the loading queue is empty', () => {
    var state = helpers.getInitialState()

    mutations.setLoading(state)

    expect(state.loadState.loading).toBe(false)
  })

  it('is on when a single item is in the queue', () => {
    var state = helpers.getInitialState()
    state.loadState.loadingCount = 1

    mutations.setLoading(state)

    expect(state.loadState.loading).toBe(true)
  })

  it('is on when many items are in the queue', () => {
    var state = helpers.getInitialState()
    state.loadState.loadingCount = 6

    mutations.setLoading(state)

    expect(state.loadState.loading).toBe(true)
  })
})

describe('the character list', () => {

  it('increases its size when adding a character to the empty list', () => {
    var state = helpers.getInitialState()

    mutations.addCharacter(state, { name: 'Bob', realm: 'Walden'} )

    expect(state.raid.length).toBe(1)
  })

  it('decreases its size when a character in the list is removed', () => {
    var state = helpers.getInitialState()
    state.raid = [ { name: 'Bob', realm: 'Walden', itemLevel: 124 } ]

    mutations.removeCharacter(state, { name: 'Bob', realm: 'Walden'} )
    expect(state.raid).toEqual([])
  })

  it('removes only the correct item when there are multiple with the same name', () => {
    var state = helpers.getInitialState() 
    state.raid = [ { name: 'Bob', realm: 'Walden', itemLevel: 124 },
                   { name: 'Bob', realm: 'Pond', itemLevel: 124 }]

    mutations.removeCharacter(state, { name: 'Bob', realm: 'Walden'} )
    expect(state.raid).toEqual([{ name: 'Bob', realm: 'Pond', itemLevel: 124} ])
  })

  it('removes only the correct item when there are multiple with the same realm', () => {
    var state = helpers.getInitialState() 
    state.raid = [ { name: 'Bob', realm: 'Walden', itemLevel: 124 },
                   { name: 'Ada', realm: 'Walden', itemLevel: 124 }]

    mutations.removeCharacter(state, { name: 'Bob', realm: 'Walden'} )
    expect(state.raid).toEqual([{ name: 'Ada', realm: 'Walden', itemLevel: 124} ])
  })

  it('does not remove one when there is no match', () => {
    var state = helpers.getInitialState() 
    state.raid = [ { name: 'Bob', realm: 'Walden', itemLevel: 124 }]

    mutations.removeCharacter(state, { name: 'Ada', realm: 'Pond'} )
    expect(state.raid).toEqual([{ name: 'Bob', realm: 'Walden', itemLevel: 124} ])
  })
})

describe('the flavor text', () => {

  it('increases its size when adding a character to the empty list', () => {
    var state = helpers.getInitialState()

    mutations.addCharacter(state, { name: 'Bob', realm: 'Walden'} )

    expect(state.raid.length).toBe(1)
  })
})

var helpers = {
  getInitialState: function () {
    return {
      raid: [],
      statistics: {
        min: 0,
        max: 0,
        datapoints: [],
        curveTop: 0,
        curveBottom: 0
      },
      loadState: {
        loading: false,
        loadingCount: 0
      },

      character: '',
      realm: '',

      currentFlavorText: 'rolling tranq...',

      flavorText: [
        'rolling tranq...',
        'afk steak...',
        'looking up alcohol pics on discord...',
        'blaming Randy...',
        'herding cats...'
      ]
    }
  }
}