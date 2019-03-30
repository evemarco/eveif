/*
export function someMutation (state) {
}
*/
// export const RESTORE_MUTATIONS = 'RESTORE_MUTATIONS'
export const updateAuth = (state, auth) => {
  state.isAuth = auth
}
export const updateCharacterID = (state, id) => {
  state.characterID = id
}
export const updateCharacterName = (state, name) => {
  state.characterName = name
}
export const updateRole = (state, role) => {
  state.role = role
}
export const updateToken = (state, token) => {
  state.token = token
}
export const updateExpire = (state, expire) => {
  state.expire = expire
}
export const updateScopes = (state, scopes) => {
  state.scopes = scopes
}
export const updateProfil = (state, response) => {
  state.characterID = response.characterID
  state.characterName = response.characterName
  state.token = response.token
  state.expire = new Date(response.expire).getTime()
  state.role = response.role
  state.scopes = response.scopes
  state.isAuth = true
}
