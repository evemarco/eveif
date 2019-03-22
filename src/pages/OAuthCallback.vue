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
  created () {
    if (this.$q.localStorage.getItem('state') === this.$route.query.state) {
      // this.$q.notify({ color: 'positive', message: 'state OK' })
      this.$axios.post('/api/v1/code', `code=${this.$route.query.code}`)
        .then((response) => {
          // let expire = new Date(response.data.expire).getTime()
          console.log('write response !', response.data)
          this.updateProfil(response.data)
          this.$q.notify({ color: 'positive', message: `Authentification succeed` })
        })
        .catch((error) => {
          console.log(error.response)
          this.$q.notify({ color: 'negative', message: `Authentification failed` })
        })
    } else {
      console.log('state failed', this.$q.localStorage.getItem('state'), this.$route.query.state)
    }
    if (this.$q.localStorage.has('lastPath')) this.$router.push(this.$q.localStorage.getItem('lastPath'))
    else this.$router.push('/')
  }
}
</script>

<style>
</style>
