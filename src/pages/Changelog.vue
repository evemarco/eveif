<template lang="pug">
  q-page(padding)
    div Quasar v{{ $q.version }}
    vue-markdown {{ test }}
</template>

<script>
export default {
  name: 'PageChangelog',
  data () {
    return {
      test: 'TEST is ***test***'
    }
  }
}
</script>

<style>
</style>
