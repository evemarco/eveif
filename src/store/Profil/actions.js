/*
export function someAction (context) {
}
*/
import { LocalStorage } from 'quasar'
import axios from 'axios'
axios.defaults.baseURL = process.env.apiServerAdress
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const checkExpire = ({ state, commit }) => {
  return new Promise((resolve, reject) => {
    if (state.isAuth) {
      let delai = Date.now() - state.profil.expire
      console.log('CheckExpire ! - delai : ' + delai)
      // Si on dépasse 12 heures, on se delog
      if (delai >= (12 * 3600 * 1000)) {
        commit('updateAuth', false)
      } else if (delai >= 0) { // sinon on renouvelle la clef si elle a dépassé les 1 heure
        // axios.defaults.baseURL = process.env.apiServerAdress
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + state.token
        // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
        axios.get('/api/v1/refresh_token', { headers: { Authorization: 'Bearer ' + state.profil.token } })
          .then((response) => { // on recup la nouvelle clef
            console.log('Clef renouvelée : ' + response.data.expire + response.data.token)
            commit('updateExpire', new Date(response.data.expire).getTime())
            commit('updateToken', response.data.token)
            resolve()
          })
          .catch(() => { // si ca échoue, on delog
            console.log('refresh clef echoué')
            commit('updateExpire', Date.now())
            commit('updateAuth', false)
            reject(new Error('refresh clef echoué'))
          })
      } else {
        console.log('check clef OK : ' + delai)
        resolve()
      }
    } else {
      // non connecté, iln'y a rien à faire
      resolve()
      // reject(new Error('non connecté'))
    }
  })
}

export const logoutProfil = ({ state, commit }) => {
  commit('updateExpire', Date.now())
  commit('updateAuth', false)
}

export const saveProfil = ({ state, commit }) => {
  LocalStorage.set('profil', state.profil)
}

export const initProfil = ({ state, commit }) => {
  if (LocalStorage.has('profil')) {
    let profil = LocalStorage.getItem('profil')
    commit('updateCharacterID', profil.characterID)
    commit('updateCharacterName', profil.characterName)
    commit('updateRole', profil.role)
    commit('updateToken', profil.token)
    commit('updateExpire', profil.expire)
    commit('updateScopes', profil.scopes)
    let delai = profil.expire - Date.now()
    console.log('delai = ', delai)
    if (delai >= 0) commit('updateAuth', true)
  }
}
