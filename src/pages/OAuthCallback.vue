<template lang="pug">
  .content
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'PageOAuthCallback',
  methods: {
    ...mapMutations({ updateProfil: 'profil/updateProfil', updateCharacterID: 'profil/updateCharacterID', updateCharacterName: 'profil/updateCharacterName', updateToken: 'profil/updateToken', updateRole: 'profil/updateRole', updateScopes: 'profil/updateScopes', updateAuth: 'profil/updateAuth' })
  },
  async created () {
    if (this.$q.localStorage.getItem('state') !== this.$route.query.state) throw new Error('State check failed')
    try {
      const response = await this.$axios.post('/api/v1/code', `code=${this.$route.query.code}`)
      this.updateProfil(response.data)
      this.$q.notify({ color: 'positive', message: this.$t('login.message') })
    } catch (error) {
      this.$q.notify({ color: 'negative', message: error.message })
    }
    if (this.$q.localStorage.has('lastPath')) this.$router.push(this.$q.localStorage.getItem('lastPath'))
    else this.$router.push('/')
  }
}
</script>

<style>
</style>
