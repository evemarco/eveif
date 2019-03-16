<template lang="pug">
  q-page.flex.flex-center
    //   img(alt="Quasar logo" src="~assets/quasar-logo-full.svg")
    div.col
      q-carousel(arrows animated infinite navigation padding swipeable v-model="slide")
        q-carousel-slide(v-for="video in videoList" :name="video.name" :key="video.name")
          .content(v-if="video.name === 0")
            h1.text-h4.text-center {{ $t(`pageIndex.slide[0].title`) }}
            .text-center(v-html="$t(`pageIndex.slide[0].text`)")
            br
          q-img(v-else contain :src="`https://img.youtube.com/vi/${video.code}/hqdefault.jpg`" style="max-height: 360px;")
            .absolute-bottom.text-center(v-html="$t(`pageIndex.slide[${video.name}].text`)").q-mx-auto
            h2.absolute-top.text-h4.text-center.margin-h {{ $t(`pageIndex.slide[${video.name}].title`) }}
            q-btn(flat round size="xl" icon="fab fa-youtube" @click="videoModal = !videoModal").absolute-center.icon-youtube
    q-dialog(v-model="videoModal")
      q-card(dark style="height: 80vh+1px; min-width: 80vw;").bg-black
        q-card-actions(align="right").pad-zero
          q-btn(flat round icon="fas fa-times-circle" size="xs" color="negative")
        q-video(:src="`https://www.youtube.com/embed/${videoList[slide].code}?rel=0&hl=${$route.params.lang}&cc_lang_pref=${$route.params.lang}&cc_load_policy=1`")
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  meta () {
    return {
      title: this.$t('meta.title'),
      titleTemplate: title => `${title} - ${this.$t('meta.home.title')}`,
      meta: {
        description: { name: 'description', content: this.$t('meta.home.description') },
        keywords: { name: 'keywords', content: this.$t('meta.home.keywords') }
      }
    }
  },
  data () {
    return {
      videoModal: false,
      slide: 0,
      videoList: [
        { name: 0, code: '' },
        { name: 1, code: 'zQciMy_Pr0Q' },
        { name: 2, code: 'AdfFnTt2UT0' },
        { name: 3, code: '0bjTrPutt4k' },
        { name: 4, code: 'ZdoQzmzg2XY' },
        { name: 5, code: '9tiNJ44OwC8' }
      ]
    }
  }
}
</script>
