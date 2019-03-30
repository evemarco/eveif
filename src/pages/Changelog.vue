<template lang="pug">
  q-page(padding)
    div powered by Quasar framework v{{ $q.version }}
    vue-markdown {{ text }}
</template>

<script>
export default {
  name: 'PageChangelog',
  data () {
    return {
      text: `Changelog`
    }
  }
}
</script>

<style>
</style>
