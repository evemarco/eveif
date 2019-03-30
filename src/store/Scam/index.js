import state from './state'
// import * as getters from './getters'
// import * as mutations from './mutations'
import * as actions from './actions'
import { getField, updateField } from 'vuex-map-fields'

export default {
  namespaced: true,
  state,
  getters: { getField },
  // , getters },
  mutations: { updateField },
  // , mutations },
  actions
}
