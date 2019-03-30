// import something here
import VueTimeago from 'vue-timeago'

// leave the export, even if you don't use it
export default async ({ app, router, Vue }) => {
  // something to do
  Vue.use(VueTimeago, {
    name: 'Timeago', // Component name, `Timeago` by default
    locale: 'en', // Default locale
    // We use `date-fns` under the hood
    // So you can use all locales from it
    locales: {
      'fr': require('date-fns/locale/fr'),
      'en': require('date-fns/locale/en')
    },
    converterOptions: {
      includeSeconds: true
      // addSuffix: true
    }
  })
}
