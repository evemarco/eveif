/*
export function someAction (context) {
}
*/
import { LocalStorage } from 'quasar'
import axios from 'axios'

axios.defaults.baseURL = process.env.apiServerAdress
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const checkExpire = ({ state, commit, dispatch, getters }) => {
  return new Promise((resolve, reject) => {
    if (state.isAuth) {
      let delai = state.profil.expire - Date.now()
      // Si on dépasse 12 heures, on se delog
      if (delai < -(12 * 3600 * 1000)) {
        dispatch('logoutProfil')
        reject(new Error('Token de 12 heures périmé'))
      } else if (delai <= 5000) { // sinon on renouvelle la clef si elle est proche de l'expiration (1 heure)
        axios.get('/api/v1/refresh_token', getters('headers'))
          .then((response) => { // on recup la nouvelle clef
            console.log('Clef renouvelée : ' + response.data.expire + response.data.token)
            commit('updateExpire', new Date(response.data.expire).getTime())
            commit('updateToken', response.data.token)
            resolve()
          })
          .catch(() => { // si ca échoue, on delog
            console.log('refresh clef echoué')
            dispatch('logoutProfil')
            reject(new Error('refresh clef echoué'))
          })
      } else {
        console.log('check clef OK : ' + delai)
        resolve()
      }
    } else {
      // non connecté, il n'y a rien à faire
      resolve()
      // reject(new Error('non connecté'))
    }
  })
}

export const logoutProfil = async ({ state, commit }) => {
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

export const checkUser = async ({ state, dispatch, getters }) => {
  await dispatch('checkExpire')
  return new Promise((resolve, reject) => {
    if (getters.isUser) resolve()
    else reject()
  })
}
export const checkTrader = async ({ state, dispatch, getters }) => {
  await dispatch('checkExpire')
  return new Promise((resolve, reject) => {
    if (getters.isTrader) resolve()
    else reject()
  })
}
export const checkScammer = async ({ state, dispatch, getters }) => {
  await dispatch('checkExpire')
  return new Promise((resolve, reject) => {
    if (getters.isScammer) resolve()
    else reject()
  })
}
export const checkAdmin = async ({ state, dispatch, getters }) => {
  await dispatch('checkExpire')
  return new Promise((resolve, reject) => {
    if (getters.isAdmin) resolve()
    else reject()
  })
}
