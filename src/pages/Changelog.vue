<template lang="pug">
  q-page(padding)
    div Quasar v{{ $q.version }}
    q-btn(color="primary") Primary
    q-btn(color="secondary") Secondary
    q-btn(color="positive") Positive
    q-btn(color="negative") Negative
    q-btn(color="warning") Warning
    q-btn(color="info") Info
    q-btn(color="accent") Accent
    q-btn(color="dark") Dark
    q-btn(color="light") Light
</template>

<script>
export default {
  name: 'PageChangelog'
}
</script>

<style>
</style>
