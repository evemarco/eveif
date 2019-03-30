<template lang="pug">
  q-page(padding)
    //- .content
    q-table(dark dense :loading="scamLoading" color="primary" :title="$t('pageScam.title')" :data="list" :columns="scamColumns" row-key="type_id" :pagination.sync="pagination" separator="cell" :filter="filter" table-class="bg-1")
      template(slot="top-right" slot-scope="props")
        timeago(:datetime="lastTime" :auto-update="1" :converterOptions="{includeSeconds: true}" :locale="$route.params.lang")
        q-btn(color="transparent" icon="fas fa-sync" size="sm" :loading="btnRefresh" @click="onRefresh")
</template>

<script>
import { mapFields } from 'vuex-map-fields' // , mapMultiRowFields
export default {
  name: 'PageScamFactory',
  meta () {
    return {
      title: this.$t('meta.title'),
      titleTemplate: title => `${title} - ${this.$t('meta.scam.title')}`,
      meta: {
        description: { name: 'description', content: this.$t('meta.scam.description') },
        keywords: { name: 'keywords', content: this.$t('meta.scam.keywords') }
      }
    }
  },
  data () {
    return {
      scamLoading: false,
      btnRefresh: false
    }
  },
  computed: {
    ...mapFields(`scam`, ['pagination', 'filter', 'list', 'lastTime']),
    // ...mapMultiRowFields(`scam`, ['list'])
    scamColumns () {
      return [
        {
          name: 'type_id',
          required: true,
          label: this.$t('pageScam.table.id'),
          align: 'center',
          field: 'type_id',
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: this.$t('pageScam.table.name'),
          align: 'left',
          field: 'name',
          sortable: true
        },
        {
          name: 'nb',
          required: true,
          label: this.$t('pageScam.table.nb'),
          align: 'right',
          field: 'number',
          sortable: true
        },
        {
          name: 'min_price',
          required: true,
          label: this.$t('pageScam.table.minPrice'),
          align: 'right',
          field: 'min_price',
          sortable: true
        },
        {
          name: 'max_price',
          required: true,
          label: this.$t('pageScam.table.maxPrice'),
          align: 'right',
          field: 'max_price',
          sortable: true
        },
        {
          name: 'packaged',
          required: true,
          label: this.$t('pageScam.table.packaged'),
          align: 'right',
          field: 'packaged_volume',
          sortable: true
        },
        {
          name: 'total_price',
          required: true,
          label: this.$t('pageScam.table.totalPrice'),
          align: 'right',
          field: 'total_price',
          sortable: true
        }
      ]
    }
  },
  created () {
    this.$store._vm.$root.$on('storageReady', () => {
      this.onRefresh()
    })
  },
  mounted () {
    // this.$store._vm.$root.$on('storageReady', () => {
    //   this.onRefresh()
    // })
  },
  methods: {
    async onRefresh () {
      this.btnRefresh = true
      this.scamLoading = true
      try {
        await this.$store.dispatch('profil/checkScammer')
        const response = await this.$axios.get('/api/dev/scam_list/50000000/100/500000000/50000000', this.$store.getters['profil/headers'])
        this.list = [...response.data.result]
        this.lastTime = Date.now()
      } catch (err) {
        this.$q.notify({ color: 'negative', message: this.$te(err.message) ? this.$t(err.message) : err.message })
      } finally {
        this.scamLoading = false
        this.btnRefresh = false
      }
    }
  }
}
</script>

<style>
</style>
