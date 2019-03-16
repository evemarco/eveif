<template lang="pug">
  q-page.padding
    .content.text-center
      h1.text-h3 Contact
      p
        span(v-html="$t('pageContact.text')")
        q-chip(color="dark text-white")
          q-avatar
            img(src="https://imageserver.eveonline.com/Character/94500407_64.jpg")
          span Tapludsou
        | .
    </div>
</template>

<script>
export default {
  name: 'PageContact',
  meta () {
    return {
      title: this.$t('meta.title'),
      titleTemplate: title => `${title} - ${this.$t('meta.contact.title')}`,
      meta: {
        description: { name: 'description', content: this.$t('meta.contact.description') },
        keywords: { name: 'keywords', content: this.$t('meta.contact.keywords') }
      }
    }
  }
}
</script>

<style>
</style>
