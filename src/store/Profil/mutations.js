/*
export function someMutation (state) {
}
*/
import { LocalStorage } from 'quasar'

export const updateAuth = (state, auth) => {
  console.log(auth)
  state.isAuth = auth
}
export const updateCharacterID = (state, id) => {
  console.log(id)
  state.profil.characterID = id
  LocalStorage.set('profil', state.profil)
}
export const updateCharacterName = (state, name) => {
  console.log(name)
  state.profil.characterName = name
  LocalStorage.set('profil', state.profil)
}
export const updateRole = (state, role) => {
  console.log(role)
  state.profil.role = role
  LocalStorage.set('profil', state.profil)
}
export const updateToken = (state, token) => {
  console.log(token)
  state.profil.token = token
  LocalStorage.set('profil', state.profil)
}
export const updateExpire = (state, expire) => {
  console.log(expire)
  state.profil.expire = expire
  LocalStorage.set('profil', state.profil)
}
export const updateScopes = (state, scopes) => {
  console.log(scopes)
  state.profil.scopes = scopes
  LocalStorage.set('profil', state.profil)
}
export const updateProfil = (state, response) => {
  state.profil.characterID = response.characterID
  state.profil.characterName = response.characterName
  state.profil.token = response.token
  state.profil.expire = new Date(response.expire).getTime()
  state.profil.role = response.role
  state.profil.scopes = response.scopes
  state.isAuth = true
  LocalStorage.set('profil', state.profil)
}
