<template lang="pug">
  q-layout(view="hHh Lpr lFf")
    q-header(elevated).glossy
      q-toolbar.bg-black
        q-btn(flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu")
          q-icon(name="fas fa-bars")
        q-toolbar-title
          q-btn-group
            q-btn(flat dense @click="$router.push('/')")
              q-icon(name="fas fa-home")
            q-btn(flat dense size="lg" no-caps @click="$router.push('/')") EveIF.fr
              q-badge(color="primary" @click.stop="$router.push('/' + lang + '/changelog')").on-right.bmarge {{ version }}
        // v-if="this.$store.state.app.isAuth" this.$store.state.app.characterID this.$store.state.app.characterName
        q-chip(v-if="isAuth" color="dark text-white").q-mr-md
          q-avatar
            img(:src="`https://imageserver.eveonline.com/Character/${character.id}_64.jpg`")
          | {{ character.name }}
        q-select(v-model="lang" @input="$router.push('/' + lang + $route.path.slice(3))" :options="langOptions" dark dense borderless emit-value map-options options-dense).on-left
        q-btn(flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Session")
          q-icon(name="fas fa-bars")
    // Left menu
    q-drawer(v-model="leftDrawerOpen" side="left" bordered content-class="bg-black" :width="260" :mini="miniLeftDrawerOpen" @mouseover="miniLeftDrawerOpen = false" @mouseout="miniLeftDrawerOpen = true")
      q-list
        //- q-item-label(header) {{ $t('menu.title') }}
        q-item(v-for="item in menu" :key="item.path" clickable tag="a" :href="`/${lang}/${item.path}`" @click.prevent="$router.push(`/${lang}/${item.path}`)")
          q-item-section(avatar)
            q-icon(:name="item.icon")
          q-item-section
            q-item-label {{ item.label }}
            q-item-label(caption v-if="item.desc") {{ item.desc }}
    // Right menu
    q-drawer(v-model="rightDrawerOpen" side="right" bordered content-class="bg-black" :width="200" :mini="miniRightDrawerOpen" @mouseover="miniRightDrawerOpen = false" @mouseout="miniRightDrawerOpen = true")
      q-list
        //- q-item-label(header) {{ $t('session.title') }}
        q-item(clickable @click="login")
          q-item-section(avatar)
            q-icon(name="fas fa-sign-in-alt")
          q-item-section
            q-item-label {{ $t('session.login') }}
        q-item(clickable @click="logout")
          q-item-section(avatar)
            q-icon(name="fas fa-sign-out-alt")
          q-item-section
            q-item-label {{ $t('session.logout') }}
        q-item(clickable @click="admin")
          q-item-section(avatar)
            q-icon(name="fas fa-tasks")
          q-item-section
            q-item-label {{ $t('session.admin') }}
    // Connection screen
    q-dialog(v-model="loginPage")
      q-card(dark style="height: 80vh+1px; min-width: 80vw;").login.bg-black
        .content.text-center
          h1.text-h3 {{ $t('login.title') }}
          h2.text-h4 {{ $t('login.subtitle') }}
          .row.justify-center
            q-option-group.col-auto.text-left(type="toggle" color="blue-12" dark v-model="scopes" :options="options")
          br
          .row.justify-center
            q-icon(name="fas fa-angle-double-right" size="30px")
            a(:href="`https://${loginServerBaseURL}/oauth/authorize?response_type=${responseType}&redirect_uri=${redirectURI}&client_id=${clientID}&scope=${scopesStr}&state=${state}`")
              img(src="/statics/EVE_SSO_Login_Buttons_Small_White.png")
            q-icon(name="fas fa-angle-double-left" size="30px")
          br
    q-page-container
      router-view
</template>

<script>
import { openURL, uid, format } from 'quasar'
import { mapActions, mapGetters } from 'vuex'
// destructuring to keep only what is needed
const { humanStorageSize } = format

export default {
  name: 'MyLayout',
  data () {
    return {
      loginPage: false,
      langOptions: [{ label: 'Français', value: 'fr' }, { label: 'English', value: 'en' }],
      lang: this.$route.params.lang,
      version: process.env.version,
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: false,
      miniLeftDrawerOpen: true,
      miniRightDrawerOpen: true,
      scopes: [
        'publicData',
        'esi-universe.read_structures.v1',
        'esi-markets.structure_markets.v1',
        'esi-ui.open_window.v1',
        'esi-ui.write_waypoint.v1'
      ],
      loginServerBaseURL: process.env.loginServerBaseURL,
      responseType: 'code',
      redirectURI: encodeURIComponent(process.env.redirectURI),
      clientID: process.env.clientID,
      state: ''
    }
  },
  computed: {
    menu () {
      return [
        { path: 'guide', icon: 'fas fa-book', label: this.$t('menu.guide.label'), desc: this.$t('menu.guide.desc') },
        { path: 'fittings', icon: 'fas fa-wrench', label: this.$t('menu.fittings.label'), desc: this.$t('menu.fittings.desc') },
        { path: 'trade', icon: 'fas fa-chart-line', label: this.$t('menu.trade.label'), desc: this.$t('menu.trade.desc') },
        { path: 'trade/tools/transport', icon: 'fas fa-truck', label: this.$t('menu.transport.label'), desc: this.$t('menu.transport.desc') },
        { path: 'trade/tools/station', icon: 'fas fa-money-bill-alt', label: this.$t('menu.station.label'), desc: this.$t('menu.station.desc') },
        { path: 'trade/scam', icon: 'fas fa-cart-arrow-down', label: this.$t('menu.scam.label'), desc: this.$t('menu.scam.desc') },
        { path: 'about', icon: 'fas fa-question-circle', label: this.$t('menu.about.label'), desc: this.$t('menu.about.desc') },
        { path: 'changelog', icon: 'fas fa-code', label: this.$t('menu.changelog.label'), desc: this.$t('menu.changelog.desc') },
        { path: 'contact', icon: 'fas fa-envelope', label: this.$t('menu.contact.label'), desc: this.$t('menu.contact.desc') }
      ]
    },
    options () {
      return [
        { label: this.$t('login.option1'), value: 'esi-universe.read_structures.v1' },
        { label: this.$t('login.option2'), value: 'esi-markets.structure_markets.v1' },
        { label: this.$t('login.option3'), value: 'esi-ui.open_window.v1' },
        { label: this.$t('login.option4'), value: 'esi-ui.write_waypoint.v1' }
      ]
    },
    scopesStr () {
      return this.scopes.join('+')
    },
    ...mapGetters({ isAuth: 'profil/isAuth', character: 'profil/character' })
  },
  methods: {
    openURL,
    uid,
    ...mapActions({ checkAdmin: 'profil/checkAdmin', initProfil: 'profil/initProfil', logoutProfil: 'profil/logoutProfil' }),
    initState () {
      this.state = uid()
      this.$q.localStorage.set('state', this.state)
      console.log(this.state)
    },
    logout () {
      this.$q.notify({ color: 'negative', message: this.$t('logout.message') })
      this.logoutProfil()
    },
    login () {
      this.$q.localStorage.set('lastPath', this.$route.path)
      this.initState()
      this.loginPage = true
    },
    admin () {
      this.checkAdmin()
        .then(() => { this.$q.notify({ color: 'positive', message: this.$t('admin.message') }) })
        .catch((err) => { this.$q.notify({ color: 'negative', message: this.$te(err.message) ? this.$t(err.message) : err.message }) })
    }
  },
  watch: {
    lang (lang) {
      let setLang = (this.lang === 'en') ? 'en-us' : this.lang
      this.$i18n.locale = setLang
      import(`quasar/lang/${setLang}`).then(lang => {
        this.$q.lang.set(lang.default)
      })
    }
  },
  created () {
    this.initProfil()
    this.$i18n.locale = (this.$route.params.lang === 'en') ? 'en-us' : this.$route.params.lang
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      navigator.storage.estimate().then(({ usage, quota }) => {
        console.log(`Web storage using ${humanStorageSize(usage)} out of ${humanStorageSize(quota)}.`)
      })
    }
  }
}
</script>

<style lang="stylus">
.login
  background-image: url('https://webimg.ccpgamescdn.com/7lhcm73ukv5p/6LCbIs6wQo0iMQ2QuWIGou/b9e34e2b3dd4283256b5618c7bc09167/Skill_Injector.png_w=900&fm=jpg&fl=progressive') !important
  background-position: center !important
  background-repeat: no-repeat !important
  background-size: cover !important
.q-item__label + .q-item__label
  margin-top: 2px
</style>
