/* eslint-disable no-console */
import Vue from 'vue'
import Vuex from 'vuex'
import armory from "../data/armory"
import globals from "../data/globals"


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    raid: [],
    itemLevels: {},
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
    currentView: 'ilvl',

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
    setCurrentView(state, payload) {
      state.currentView = payload
    },
    calculateStatistics(state) {
      state.raid.forEach((character) => {

        nonOffHandEquipmentSlots.forEach(slot => {
          if (character.items[slot].quality !== "Legendary")
            state.statistics.datapoints.push(character.items[slot].itemLevel)
        });

        if (character.items.offHand && character.items.offHand.itemLevel) state.statistics.datapoints.push(character.items.offHand.itemLevel)
      })
      state.statistics.datapoints.sort()

      state.statistics.min = state.statistics.datapoints[0]
      state.statistics.max = state.statistics.datapoints[state.statistics.datapoints.length - 1]

      var count = state.statistics.datapoints.length
      var outlierLength = Math.floor(count * 0.1)

      state.statistics.curveBottom = state.statistics.datapoints[outlierLength]
      state.statistics.curveTop = state.statistics.datapoints[count - outlierLength]

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
    getGuild(context) {
      context.commit('clearData')

      var guild = []

      armory.getGuild()
        .then(result => {
          
          result.data.members.forEach(toon => { 
            
            if (toon.character.level === 70) {
              console.log(toon)
              guild.push({ name: toon.character.name, realm: toon.character.realm.slug }) 
            }
          })

          guild.forEach(member => {
            context.dispatch('loadSingleCharacter', { character: member.name, realm: member.realm })
          })

        })
        .catch(error => {
          console.log(error)
        })

      guild.forEach(member => {
        context.dispatch('loadSingleCharacter', { character: member.name, realm: member.realm })
      });
    },
    loadSingleCharacter(context, payload) {

      context.commit('incrementLoading')
      context.commit('setLoading')

      if (payload.realm === '') { payload.realm = 'whisperwind' }

      armory.getCharacter(payload.character, payload.realm)
        .then(result => {
          context.commit('addCharacter', helpers.mapCharacterStructure(result.data))
          context.commit('calculateStatistics')

          context.commit('decrementLoading')
          context.commit('setLoading')
        })
        .catch(error => {
          console.log(error)

          context.commit('decrementLoading')
          context.commit('setLoading')
        })
    },
    removeCharacter(context, payload) {
      context.commit('removeCharacter', payload)
      context.commit('calculateStatistics')
    },
    pingApi() {
      armory.pingHeartbeat()
    }
  }
})



const helpers = {

  mapCharacterStructure(wowApiResult) {

    var mapped = {};

    mapped.id = wowApiResult.character.id;
    mapped.name = wowApiResult.character.name;
    mapped.realm = wowApiResult.character.realm.name;
    mapped.class = wowApiResult.character.character_class.id;
    mapped.race = wowApiResult.character.race.id;
    mapped.level = wowApiResult.character.level;

    mapped.items = {};

    mapped.items.averageItemLevel = wowApiResult.character.average_item_level;
    mapped.items.averageItemLevelEquipped = wowApiResult.character.equipped_item_level;

    mapped.items.head = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Head'));
    mapped.items.neck = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Neck'));
    mapped.items.shoulder = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Shoulders'));
    mapped.items.back = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Back'));
    mapped.items.chest = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Chest'));
    mapped.items.shirt = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Shirt'));
    mapped.items.tabard = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Tabard'));
    mapped.items.wrist = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Wrist'));
    mapped.items.hands = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Hands'));
    mapped.items.waist = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Waist'));
    mapped.items.legs = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Legs'));
    mapped.items.feet = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Feet'));
    mapped.items.finger1 = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Ring 1'));
    mapped.items.finger2 = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Ring 2'));
    mapped.items.trinket1 = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Trinket 1'));
    mapped.items.trinket2 = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Trinket 2'));
    mapped.items.mainHand = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Main Hand'));
    mapped.items.offHand = helpers.mappedItem(wowApiResult.equipment.equipped_items.find(item => item.slot.name === 'Off Hand'));

    mapped.media = {};

    if (wowApiResult.media.assets) {
      mapped.media.avatar = wowApiResult.media.assets.find(asset => asset.key === 'avatar').value;
      mapped.media.inset = wowApiResult.media.assets.find(asset => asset.key === 'inset').value;
      mapped.media.mainRaw = wowApiResult.media.assets.find(asset => asset.key === 'main-raw').value;
    }

    return mapped;
  },

  mappedItem(item) {
    if (item === undefined) { return {} }

    var upgradeIds = globals.itemBonusIds()

    var mapped = {
      id: item.item.id,
      quality: item.quality.name,
      itemLevel: item.level.value,
      isTier: (item.set !== undefined),
      sockets: [],
      bonus: [],
      upgradable: false,
      upgradeLevel: '0/0',
      maxUpgrade: 0
    };

    if (item.slot.name === 'Main Hand') {
      mapped.weaponType = item.inventory_type.name;
    }

    if (item.azerite_details) {
      mapped.azeriteEmpoweredItem = { azeritePowers: [] };
      if (item.azerite_details.selected_powers) {
        item.azerite_details.selected_powers.forEach(power => { mapped.azeriteEmpoweredItem.azeritePowers.push({ id: power.id }) });
      }
    }

    if (item.bonus_list) {
      mapped.bonus = item.bonus_list
    }

    if (item.sockets !== undefined && item.sockets.length > 0) {
      item.sockets.forEach(socket => {
        if (socket.item !== undefined) { 
          mapped.sockets.push({ id: socket.item.id, name: socket.item.name, displayString: socket.display_string })
        } 
        else {
          mapped.sockets.push({ id: null, name: "", displayString: "no gem"})
        }
      })
    }

    mapped.bonus.forEach(id => {
      var match = upgradeIds.find(f => f === id)
      if (match != undefined) {
        var lookup = globals.itemBonuses.find(f => f.id === match)

        mapped.upgradable = true
        mapped.upgradeLevel = `${lookup.upgrade.level}/${lookup.upgrade.max}`
        mapped.upgradeTrack = lookup.upgrade.name
        mapped.maxUpgrade = globals.upgradeMax(lookup.upgrade.name)
      }

    })

    return mapped
  },

  applyPercentile(state) {
    state.raid.forEach(character => {
      var characterId = `${character.name}-${character.realm}`

      if (!state.itemLevels[characterId]) {
        Vue.set(state.itemLevels, characterId, this.getNewMapping())
      }

      character.items = { ...character.items, averageItemLevelPercentile: this.getPercentileForItemLevel(state, character.items.averageItemLevel) }
      state.itemLevels[characterId].averageItemLevel = this.getPercentileForItemLevel(state, character.items.averageItemLevel)

      character.items = { ...character.items, averageItemLevelEquippedPercentile: this.getPercentileForItemLevel(state, character.items.averageItemLevelEquipped) }
      state.itemLevels[characterId].averageItemLevelEquipped = this.getPercentileForItemLevel(state, character.items.averageItemLevelEquipped)

      nonOffHandEquipmentSlots.forEach(slot => {
        character.items[slot] = { ...character.items[slot], itemLevelPercentile: this.getPercentileForItemLevel(state, character.items[slot].itemLevel) }
        state.itemLevels[characterId][slot] = this.getPercentileForItemLevel(state, character.items[slot].itemLevel)
      });

      if (character.items.offHand)
        character.items.offHand = { ...character.items.offHand, itemLevelPercentile: this.getPercentileForItemLevel(state, character.items.offHand.itemLevel) }
        state.itemLevels[characterId].offHand = this.getPercentileForItemLevel(state, character.items.offHand.itemLevel)
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

  getNewMapping() {
    return {
      averageItemLevel: -1, 
      averageItemLevelEquipped: -1,
      head: -1,
      neck: -1,
      shoulder: -1,
      back: -1,
      chest: -1,
      shirt: -1,
      tabard: -1,
      wrist: -1,
      hands: -1,
      waist: -1,
      legs: -1,
      feet: -1,
      finger1: -1,
      finger2: -1,
      trinket1: -1,
      trinket2: -1,
      mainHand: -1,
      offHand: -1,
    }
  },

  getCharacterTemplate() {
    return
  }
}



const currentRaid = [
  {
    name: 'Ackroma',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Actherion',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Arthricia',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Cizrena',
    realm: 'Dentarg'
  },
  
  {
    name: 'Cretan',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Forcas',
    realm: 'Dentarg'
  },
  
  {
    name: 'Guenevere',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Guillak',
    realm: 'Dentarg'
  },
  
  {
    name: 'Harribel',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Karris',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Khajitzak',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Lucinde',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Monklezar',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Nikkoh',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Pallypants',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Vija',
    realm: 'Whisperwind'
  },
  
  {
    name: 'Winchu',
    realm: 'Whisperwind'
  },
  
]

const nonOffHandEquipmentSlots = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2', 'mainHand']