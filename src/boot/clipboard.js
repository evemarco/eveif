// import something here
import VueClipboard from 'vue-clipboard2'

// leave the export, even if you don't use it
export default async ({ app, router, Vue }) => {
  // something to do
  VueClipboard.config.autoSetContainer = true
  Vue.use(VueClipboard)
}
