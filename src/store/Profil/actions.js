/*
export function someAction (context) {
}
*/
import axios from 'axios'

axios.defaults.baseURL = process.env.apiServerAdress
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export const checkExpire = async ({ state, commit, dispatch, getters }) => {
  if (getters['isAuth']) {
    let delai = state.expire - Date.now()
    if (delai < -(12 * 3600 * 1000)) {
      dispatch('logoutProfil')
      throw new Error('error.tokenExpired')
    } else if (delai <= 5000) {
      try {
        const response = await axios.get('/api/v1/refresh_token', getters['headers'])
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

export const initProfil = ({ state, commit }) => {
  let delai = state.expire - Date.now()
  commit('updateAuth', (delai > 0))
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
