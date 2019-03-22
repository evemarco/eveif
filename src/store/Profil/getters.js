/*
export function someGetter (state) {
}
*/
export const isAuth = (state) => {
  return state.isAuth
}
export const character = (state) => {
  return { id: state.profil.characterID, name: state.profil.characterName }
}
export const isUser = (state) => {
  if (state.isAuth) {
    const roles = ['user', 'trader', 'scammer', 'admin']
    return roles.some((el) => el === state.profil.role)
  } else {
    return false
  }
}
export const isTrader = (state) => {
  if (state.isAuth) {
    const roles = ['trader', 'scammer', 'admin']
    return roles.some((el) => el === state.profil.role)
  } else {
    return false
  }
}
export const isScammer = (state) => {
  if (state.isAuth) {
    const roles = ['scammer', 'admin']
    return roles.some((el) => el === state.profil.role)
  } else {
    return false
  }
}
export const isAdmin = (state) => {
  if (state.isAuth) {
    const roles = ['admin']
    return roles.some((el) => el === state.profil.role)
  } else {
    return false
  }
}
export const checkScopeOpenWindow = (state) => {
  if (state.isAuth) {
    const scope = 'esi-ui.open_window.v1'
    return state.profil.scopes.split(' ').some((el) => el === scope)
  } else {
    return false
  }
}
export const checkScopeWriteWaypoint = (state) => {
  if (state.isAuth) {
    const scope = 'esi-ui.write_waypoint.v1'
    return state.profil.scopes.split(' ').some((el) => el === scope)
  } else {
    return false
  }
}
export const headers = (state) => {
  return { headers: { Authorization: 'Bearer ' + state.profil.token } }
}
