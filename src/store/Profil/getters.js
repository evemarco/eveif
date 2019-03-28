/*
export function someGetter (state) {
}
*/
export const isAuth = (state) => {
  return state.isAuth
}
export const character = (state) => {
  return { id: state.characterID, name: state.characterName }
}
export const isUser = (state) => {
  const roles = ['user', 'trader', 'scammer', 'admin']
  return (state.isAuth && roles.some((el) => el === state.role))
}
export const isTrader = (state) => {
  const roles = ['trader', 'scammer', 'admin']
  return (state.isAuth && roles.some((el) => el === state.role))
}
export const isScammer = (state) => {
  const roles = ['scammer', 'admin']
  return (state.isAuth && roles.some((el) => el === state.role))
}
export const isAdmin = (state) => {
  const roles = ['admin']
  return (state.isAuth && roles.some((el) => el === state.role))
}
export const checkScopeOpenWindow = (state) => {
  if (state.isAuth) {
    const scope = 'esi-ui.open_window.v1'
    return state.scopes.split(' ').some((el) => el === scope)
  } else return false
}
export const checkScopeWriteWaypoint = (state) => {
  if (state.isAuth) {
    const scope = 'esi-ui.write_waypoint.v1'
    return state.scopes.split(' ').some((el) => el === scope)
  } else return false
}
export const headers = (state) => {
  return { headers: { Authorization: 'Bearer ' + state.profil.token } }
}
