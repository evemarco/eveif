import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import localForage from 'localforage'

// import example from './module-example'
import profil from './Profil'

Vue.use(Vuex)

const vuexLocalForageProfil = new VuexPersist({
  key: 'profil',
  storage: localForage,
  asyncStorage: true,
  reducer: (state) => ({ profil: state.profil })
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      profil
    },
    plugins: [vuexLocalForageProfil.plugin]
  })

  return Store
}
