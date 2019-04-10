export default {
  methods: {
    async openMarketItem (typeID, name) {
      try {
        await this.$store.dispatch('profil/checkUser')
        if (this.$store.getters['profil/checkScopeOpenWindow']) {
          await this.$axios.put('/auth/api/v1/openMarket/' + typeID, null, this.$store.getters['profil/headers'])
          this.$q.notify({ color: 'positive', message: `"${name}" ${this.$t('common.itemOpened')}` })
        } else throw new Error(this.$t('error.noScope'))
      } catch (err) {
        this.$q.notify({ color: 'negative', message: this.$te(err.message) ? this.$t(err.message) : err.message })
      }
    }
  }
}
