/*
export function someMutation (state) {
}
*/

export const updateAuth = (state, auth) => {
  console.log(auth)
  state.isAuth = auth
}
export const updateCharacterID = (state, id) => {
  console.log(id)
  state.characterID = id
}
export const updateCharacterName = (state, name) => {
  console.log(name)
  state.characterName = name
}
export const updateRole = (state, role) => {
  console.log(role)
  state.role = role
}
export const updateToken = (state, token) => {
  console.log(token)
  state.token = token
}
export const updateExpire = (state, expire) => {
  console.log(expire)
  state.expire = expire
}
export const updateScopes = (state, scopes) => {
  console.log(scopes)
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
