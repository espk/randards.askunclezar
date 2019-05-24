/* eslint-disable no-console */

import axios from '../../node_modules/axios'
import config from './config'


export default {
  apiRoot: config.apiRoot,
  data: [],
  promises: [],
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

  getCurrentRaid() {
    this.clearData()
    this.loadState.loading = true

    this.raid.forEach(member => {
      this.loadSingleCharacter(member.name, member.realm)
    });
  },

  loadSingleCharacter(character, realm) {
    this.loadState.loadingCount += 1
    this.loadState.loading = true
    
    if (realm === '') { realm = 'whisperwind' }

    this.getCharacter(character, realm)
        .then(result => { 
          this.data.push(result.data)
          this.calculateStatistics()

          this.loadState.loadingCount -= 1
          this.loadState.loading = (this.loadState.loadingCount !== 0)
        })
        .catch(error => console.log(error))
  },

  pingHeartbeat() {
    return axios.get(this.apiRoot + `/api/characters/heartbeat`)
  },

  clearData() {
    while (this.data.length > 0) {
      this.data.pop()
    }
  },

  removeCharacter(character) {
    var index = this.data.findIndex(e => { return ((e.name === character.name) && (e.realm === character.realm)) })

    this.data.splice(index, 1)
  },

  getCharacter(name, realm) {
    return axios.get(this.apiRoot + `/api/characters/${realm}/${name}`)
  },

  getPercentileForItemLevel(itemLevel) {
    var percentile = Math.floor(100 * ((itemLevel - this.statistics.curveBottom) / (this.statistics.curveTop - this.statistics.curveBottom)))

    if (percentile > 100) return 100
    if (percentile < 0) return 0

    return percentile
  },

  calculateStatistics() {
    this.data.forEach((character) => {
      this.statistics.datapoints.push(character.items.head.itemLevel)
      this.statistics.datapoints.push(character.items.neck.itemLevel)
      this.statistics.datapoints.push(character.items.shoulder.itemLevel)
      this.statistics.datapoints.push(character.items.back.itemLevel)
      this.statistics.datapoints.push(character.items.chest.itemLevel)
      this.statistics.datapoints.push(character.items.wrist.itemLevel)
      this.statistics.datapoints.push(character.items.hands.itemLevel)
      this.statistics.datapoints.push(character.items.waist.itemLevel)
      this.statistics.datapoints.push(character.items.legs.itemLevel)
      this.statistics.datapoints.push(character.items.feet.itemLevel)
      this.statistics.datapoints.push(character.items.finger1.itemLevel)
      this.statistics.datapoints.push(character.items.finger2.itemLevel)
      this.statistics.datapoints.push(character.items.trinket1.itemLevel)
      this.statistics.datapoints.push(character.items.trinket2.itemLevel)

      this.statistics.datapoints.push(character.items.mainHand.itemLevel)
      if (character.items.offHand) this.statistics.datapoints.push(character.items.offHand.itemLevel)
    })
    this.statistics.datapoints.sort()

    this.statistics.min = this.statistics.datapoints[0]
    this.statistics.max = this.statistics.datapoints[this.statistics.datapoints.length - 1]

    var count = this.statistics.datapoints.length
    var fifteenPercent = Math.floor(count * 0.1)
    this.statistics.curveBottom = this.statistics.datapoints[fifteenPercent]
    this.statistics.curveTop = this.statistics.datapoints[count - fifteenPercent]

    this.applyPercentile()
    this.sortResults()
  },

  applyPercentile() {
    this.data.forEach(character => {
      character.items.averageItemLevelPercentile = this.getPercentileForItemLevel(character.items.averageItemLevel)
      character.items.averageItemLevelEquippedPercentile = this.getPercentileForItemLevel(character.items.averageItemLevelEquipped)
      
      var slots = ['head','neck','shoulder','back','chest','wrist','hands','waist','legs','feet','finger1','finger2','trinket1','trinket2','mainHand']

      slots.forEach(slot => {
        character.items[slot].itemLevelPercentile = this.getPercentileForItemLevel(character.items[slot].itemLevel)
      });

      if (character.items.offHand) 
        character.items.offHand.itemLevelPercentile = this.getPercentileForItemLevel(character.items.offHand.itemLevel)

    })
  },

  sortResults() {
    this.data.sort((a, b) => { return b.items.averageItemLevel - a.items.averageItemLevel })
  },

  raid: [
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
}
