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
        q-chip(color="dark text-white").q-mr-md
          q-avatar
            img(:src="'https://imageserver.eveonline.com/Character/' + 0 + '_64.jpg'")
          | Personne
        q-select(v-model="lang" @input="$router.push('/' + lang)" :options="langOptions" dark dense borderless emit-value map-options options-dense).on-left
        q-btn(flat dense round @click="rightDrawerOpen = !rightDrawerOpen" aria-label="Session")
          q-icon(name="fas fa-bars")
    q-drawer(v-model="leftDrawerOpen" side="left" bordered content-class="bg-black")
      q-list
        q-item-label(header) {{ $t('menu.title') }}
        q-item(v-for="item in menu" :key="item.path" clickable tag="a" :href="`/${lang}/${item.path}`" @click.prevent="$router.push(`/${lang}/${item.path}`)")
          q-item-section(avatar)
            q-icon(:name="item.icon")
          q-item-section
            q-item-label {{ item.label }}
            q-item-label(caption) {{ item.desc }}
    q-drawer(v-model="rightDrawerOpen" side="right" bordered content-class="bg-black")
      q-list
        q-item-label(header) {{ $t('session.title') }}
        q-item(clickable tag="a" target="_blank" href="http://v1.quasar-framework.org")
          q-item-section(avatar)
            q-icon(name="fas fa-home")
          q-item-section
            q-item-label Docs
            q-item-label(caption) v1.quasar-framework.org
    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      langOptions: [{ label: 'Français', value: 'fr' }, { label: 'English', value: 'en' }],
      lang: this.$route.params.lang,
      version: process.env.version,
      leftDrawerOpen: false, // this.$q.platform.is.desktop,
      rightDrawerOpen: false,
      menu: [
        { path: 'changelog', icon: 'fas fa-code', label: this.$t('menu.changelog.label'), desc: this.$t('menu.changelog.desc') },
        { path: 'contact', icon: 'fas fa-envelope', label: this.$t('menu.contact.label'), desc: this.$t('menu.contact.desc') }
      ]
    }
  },
  methods: {
    openURL
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
    this.$i18n.locale = (this.$route.params.lang === 'en') ? 'en-us' : this.$route.params.lang
  }
}
</script>

<style>
</style>
