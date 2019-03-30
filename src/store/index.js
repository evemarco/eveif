import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import localForage from 'localforage'

// import example from './module-example'
import profil from './Profil'
import scam from './Scam'

// import VuexPersistPatch from './vuex-persist-patch'

Vue.use(Vuex)

// first define a plugin that emits when the state has been persisted
const vuexPersistEmitter = () => {
  return store => {
    store.subscribe(mutation => {
      if (mutation.type === 'RESTORE_MUTATION') {
        store._vm.$root.$emit('storageReady')
      }
    })
  }
}

const vuexLocalForageProfil = new VuexPersist({
  key: 'profil',
  storage: localForage,
  asyncStorage: true,
  strictMode: true,
  reducer: (state) => ({ profil: state.profil })
  // filter: (mutation) => mutation.type !== 'profil/isAuth'
})
const vuexLocalForageScam = new VuexPersist({
  key: 'scam',
  storage: localForage,
  asyncStorage: true,
  reducer: (state) => ({ scam: state.scam })
  // filter: (mutation) => mutation.type !== 'profil/isAuth'
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      profil,
      scam
    },
    mutations: {
      RESTORE_MUTATION: vuexLocalForageProfil.RESTORE_MUTATION
    },
    plugins: [vuexLocalForageProfil.plugin, vuexLocalForageScam.plugin, vuexPersistEmitter()]
  })

  return Store
}
