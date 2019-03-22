import axios from 'axios'

export default async ({ Vue }) => {
  axios.defaults.baseURL = process.env.apiServerAdress
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  Vue.prototype.$axios = axios
}
