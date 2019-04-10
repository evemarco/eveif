/*
export function someGetter (state) {
}
*/

export const pourcentAccountingSeller = (state) => {
  return (20 - (2 * state.skillAccountingSeller)) / 10
}
export const pourcentBrokerRelationsSeller = (state) => {
  return (30 - state.skillBrokerRelationsSeller) / 10
}
export const pourcentAccountingScammer = (state) => {
  return (20 - (2 * state.skillAccountingScammer)) / 10
}
export const pourcentBrokerRelationsScammer = (state) => {
  return (30 - state.skillBrokerRelationsScammer) / 10
}
export const pourcentMarginTradingScammer = (state) => {
  return Math.pow(0.75, state.skillMarginTradingScammer) * 100
}
