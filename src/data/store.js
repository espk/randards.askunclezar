/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import armory from "../data/armory"


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
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
      ],

    },


    mutations: {
      clearData(state) {
        while (state.raid.length > 0) {
          state.raid.pop()
        }
      },
      setLoading(state, payload) {
        if (payload) {
          state.loadState.loading = payload
        } else {
          state.loadState.loading = (state.loadState.loadingCount !== 0)
        }
      },
      incrementLoading(state) {
        state.loadState.loadingCount += 1
      },
      decrementLoading(state) {
        state.loadState.loadingCount -= 1
      },
      addCharacter(state, payload) {
        state.raid.push(payload)
      },
      removeCharacter(state, payload) {
        var index = state.raid.findIndex(e => { return ((e.name === payload.name) && (e.realm === payload.realm)) })
        state.raid.splice(index, 1)
      },
      calculateStatistics(state) {
        state.raid.forEach((character) => {

          nonOffHandEquipmentSlots.forEach(slot => {
            state.statistics.datapoints.push(character.items[slot].itemLevel)
          });
         
          if (character.items.offHand) state.statistics.datapoints.push(character.items.offHand.itemLevel)
        })
        state.statistics.datapoints.sort()
    
        state.statistics.min = state.statistics.datapoints[0]
        state.statistics.max = state.statistics.datapoints[state.statistics.datapoints.length - 1]
    
        var count = state.statistics.datapoints.length
        var oulierLength = Math.floor(count * 0.1)

        state.statistics.curveBottom = state.statistics.datapoints[oulierLength]
        state.statistics.curveTop = state.statistics.datapoints[count - oulierLength]

        helpers.applyPercentile(state)
        helpers.sortResults(state)
      },
      shuffleText(state) {
        var selection = Math.floor(Math.random() * Math.floor(state.flavorText.length))
        state.currentFlavorText = state.flavorText[selection]
      },
    },


    actions: {
      getCurrentRaid(context) {
        context.commit('clearData')
    
        currentRaid.forEach(member => {
          context.dispatch('loadSingleCharacter', { character: member.name, realm: member.realm })
        });
      },
      loadSingleCharacter(context, payload) {

        context.commit('incrementLoading')
        context.commit('setLoading')
        
        if (payload.realm === '') { payload.realm = 'whisperwind' }
    
        armory.getCharacter(payload.character, payload.realm)
            .then(result => { 
              context.commit('addCharacter', result.data)
              context.commit('calculateStatistics')
                  
              context.commit('decrementLoading')
              context.commit('setLoading')
            })
            .catch(error => console.log(error))
      },
      pingApi() {
        armory.pingHeartbeat()
      }
    }
  })



  const helpers = {
    applyPercentile(state) {
      state.raid.forEach(character => {

        character.items = {...character.items, averageItemLevelPercentile: this.getPercentileForItemLevel(state, character.items.averageItemLevel) }
        character.items = {...character.items, averageItemLevelEquippedPercentile: this.getPercentileForItemLevel(state, character.items.averageItemLevelEquipped) }
        
        nonOffHandEquipmentSlots.forEach(slot => {
          character.items[slot].itemLevelPercentile = this.getPercentileForItemLevel(state, character.items[slot].itemLevel)
        });
  
        if (character.items.offHand) 
          character.items.offHand.itemLevelPercentile = this.getPercentileForItemLevel(state, character.items.offHand.itemLevel)
  
      })
    },
  
    sortResults(state) {
      state.raid.sort((a, b) => { return b.items.averageItemLevel - a.items.averageItemLevel })
    },
    
    getPercentileForItemLevel(state, itemLevel) {
           
      var percentile = Math.floor(100 * ((itemLevel - state.statistics.curveBottom) / (state.statistics.curveTop - state.statistics.curveBottom)))
  
      if (percentile > 100) return 100
      if (percentile < 0) return 0

      return percentile
    },
  }

  const currentRaid = [
  {
    name: 'Vija',
    realm: 'Whisperwind'
  },
  {
    name: 'Subtext',
    realm: 'Whisperwind'
  },
  {
    name: 'Guillak',
    realm: 'Dentarg'
  },
  {
    name: 'Tehx',
    realm: 'Whisperwind'
  },
  {
    name: 'Khajitzak',
    realm: 'Whisperwind'
  },
  {
    name: 'Tavalilyn',
    realm: 'Whisperwind'
  },
  {
    name: 'Lucinde',
    realm: 'Whisperwind'
  },
  {
    name: 'Cretan',
    realm: 'Whisperwind'
  },
  {
    name: 'Garnrock',
    realm: 'Whisperwind'
  },
  {
    name: 'Niven',
    realm: 'Whisperwind'
  },
  {
    name: 'Forcas',
    realm: 'Dentarg'
  },
  {
    name: 'Cizrena',
    realm: 'Dentarg'
  },
  {
    name: 'Zaraea',
    realm: 'Dentarg'
  },
  {
    name: 'Gorht',
    realm: 'Whisperwind'
  },
  {
    name: 'Mowglii',
    realm: 'Whisperwind'
  },
  {
    name: 'Winchu',
    realm: 'Whisperwind'
  },
  {
    name: 'Arthricia',
    realm: 'Whisperwind'
  },
  {
    name: 'Melisandraa',
    realm: 'Whisperwind'
  },
  {
    name: 'Zarjani',
    realm: 'Whisperwind'
  }
]

const nonOffHandEquipmentSlots = ['head','neck','shoulder','back','chest','wrist','hands','waist','legs','feet','finger1','finger2','trinket1','trinket2','mainHand']