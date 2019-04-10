// Configuration for your app

module.exports = function (ctx) {
  let version = '2.0'
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'i18n',
      'axios',
      'markdown',
      'timeago',
      'autonumeric',
      'clipboard'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      // 'material-icons' // optional, you are not bound to it
      // 'ionicons-v4',
      // 'mdi-v3',
      'fontawesome-v5',
      // 'eva-icons'
    ],

    // framework: 'all', // --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QBtnGroup',
        'QBtnToggle',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QBadge',
        'QChip',
        'QAvatar',
        'QSelect',
        'QCarousel',
        'QCarouselControl',
        'QCarouselSlide',
        'QImg',
        'QDialog',
        'QVideo',
        'QCard',
        'QCardActions',
        'QCardSection',
        'QOptionGroup',
        'QTable',
        'QTh',
        'QTr',
        'QTd',
        'QLinearProgress',
        'QSpinner',
        'QTooltip',
        'QInput',
        'QCheckbox',
        'QSpace'
      ],

      directives: [
        'Ripple',
        'CloseDialog'
      ],
      
      // Quasar plugins
      plugins: [
        'Notify',
        'Meta',
        'LocalStorage'
      ],
      config: {
        notify: { position: 'top', timeout: '2500' }
      },
      iconSet: 'fontawesome-v5',
      lang: 'fr' // Quasar language
    },

    supportIE: true,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      env: ctx.dev
        ? { // so on dev we'll have
          version: JSON.stringify(version + 'dev'),
          API: JSON.stringify('https://dev.api.com'),
          loginServerBaseURL: JSON.stringify('login.eveonline.com'),
          redirectURI: JSON.stringify('http://localhost:8080/oauth-callback'),
          // change the client ID with your
          clientID: JSON.stringify('XXXX'),
          apiServerAdress: JSON.stringify('http://localhost:3000')
        }
        : { // and on build (production):
          version: JSON.stringify(version),
          API: JSON.stringify('https://prod.api.com'),
          loginServerBaseURL: JSON.stringify('login.eveonline.com'),
          redirectURI: JSON.stringify('http://localhost:8080/oauth-callback'),
          // change the client ID with your
          clientID: JSON.stringify('XXXX'),
          apiServerAdress: JSON.stringify('http://localhost:3000')
        },
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/EIF-128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/EIF-192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/EIF-256.png',
            'sizes': '256x256',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
