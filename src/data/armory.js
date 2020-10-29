/* eslint-disable no-console */

import axios from '../../node_modules/axios'
import config from './config'


export default {
  apiRoot: config.apiRoot,

  pingHeartbeat() {
    return "ba-dum"//axios.get(this.apiRoot + `/api/characters/heartbeat`)
  },

  getCharacter(name, realm) {
    return axios.get(this.apiRoot + `/api/characters/${realm}/${name}`)
  },
  
}
