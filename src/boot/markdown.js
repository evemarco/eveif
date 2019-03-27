// import something here
import VueMarkdown from 'vue-markdown'

// leave the export, even if you don't use it
export default async ({ Vue }) => {
  Vue.component('VueMarkdown', VueMarkdown)
}
