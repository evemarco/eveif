/*
export function someAction (context) {
}
*/
import { LocalStorage } from 'quasar'
import axios from 'axios'

axios.defaults.baseURL = process.env.apiServerAdress
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const checkExpire = async ({ state, commit, dispatch, getters }) => {
  if (state.isAuth) {
    let delai = state.profil.expire - Date.now()
    if (delai < -(12 * 3600 * 1000)) {
      dispatch('logoutProfil')
      throw new Error('error.tokenExpired')
    } else if (delai <= 5000) {
      try {
        const response = await axios.get('/api/v1/refresh_token', getters('headers'))
        console.log('Clef renouvelée : ' + response.data.expire + response.data.token)
        commit('updateExpire', new Date(response.data.expire).getTime())
        commit('updateToken', response.data.token)
      } catch (err) {
        dispatch('logoutProfil')
        throw err
      }
    }
    return true
  } else throw new Error('error.notConnected')
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
  try {
    await dispatch('checkExpire')
  } catch (err) { throw err }
  if (getters['isUser']) return true
  else throw new Error('error.notUser')
}
export const checkTrader = async ({ state, dispatch, getters }) => {
  try {
    await dispatch('checkExpire')
  } catch (err) { throw err }
  if (getters['isTrader']) return true
  else throw new Error('error.notTrader')
}
export const checkScammer = async ({ state, dispatch, getters }) => {
  try {
    await dispatch('checkExpire')
  } catch (err) { throw err }
  if (getters['isScammer']) return true
  else throw new Error('error.notScammer')
}
export const checkAdmin = async ({ state, dispatch, getters }) => {
  try {
    await dispatch('checkExpire')
  } catch (err) { throw err }
  if (getters['isAdmin']) return true
  else throw new Error('error.notAdmin')
}
