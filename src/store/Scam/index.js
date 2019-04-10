import state from './state'
// import * as getters from './getters'
import { pourcentAccountingSeller, pourcentBrokerRelationsSeller, pourcentAccountingScammer, pourcentBrokerRelationsScammer, pourcentMarginTradingScammer } from './getters'
// import * as mutations from './mutations'
import * as actions from './actions'
import { getField, updateField } from 'vuex-map-fields'

export default {
  namespaced: true,
  state,
  getters: { getField, pourcentAccountingSeller, pourcentBrokerRelationsSeller, pourcentAccountingScammer, pourcentBrokerRelationsScammer, pourcentMarginTradingScammer }, //, getters },
  mutations: { updateField },
  // , mutations },
  actions
}
