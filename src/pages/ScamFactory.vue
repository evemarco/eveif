<template lang="pug">
  q-page(padding)
    //- First page window
    q-table(dark dense :loading="scamLoading" color="primary" :title="$t('pageScam.title')" :data="list" :columns="scamColumns" row-key="type_id" :pagination.sync="pagination" separator="cell" :filter="filter" table-class="bg-1")
      //- Title top right
      template(v-slot:top-right)
        q-input(borderless dense dark debounce="300" v-model="filter" :placeholder="$q.lang.label.filter" style="width: 12em;").on-left
          template(v-slot:prepend)
            q-icon(name="fas fa-search")
          template(v-slot:append v-if="filter")
            q-icon(name="fas fa-times" @click="filter = ''" class="cursor-pointer")
        q-btn(color="transparent" no-caps icon-right="fas fa-sync" size="sm" :loading="btnRefresh" @click="onRefresh")
          timeago(:datetime="lastTime" :auto-update="1" :converterOptions="{includeSeconds: true}" :locale="$route.params.lang").on-left
          q-tooltip {{ $t('common.refresh') }}
        q-btn(flat dense round icon="fas fa-bars" @click="" aria-label="Options")
      //- Data
      template(v-slot:body="props")
        q-tr(:props="props" @click.native="clickUniverse(props.row.type_id, props.row.name)" class="cursor-pointer")
          q-td(key="type_id" :props="props" style="width: 30px;" class="")
            q-btn(dense color="primary" size="sm" @click.stop="openMarketItem(props.row.type_id, props.row.name)") {{ props.row.type_id }}
              q-tooltip {{ $t('common.openItem') }}
          q-td(key="name" :props="props")
            q-chip(color="transparent text-white" dense)
              q-avatar
                img(:src="`https://image.eveonline.com/Type/${props.row.type_id}_32.png`")
              | {{ props.row.name }}
          q-td(key="nb" :props="props") {{ props.row.number }}
          q-td(key="min_price" :props="props") {{ props.row.min_price | currency }}
          q-td(key="max_price" :props="props") {{ props.row.max_price | currency }}
          q-td(key="packaged" :props="props") {{ props.row.packaged_volume }}
          q-td(key="total_price" :props="props") {{ props.row.total_price | humanCurrency }}
    //- Universe price window
    q-dialog(v-model="universeModal")
      q-card(dark style="height: calc(98vh - 52px); min-width: 98vw; margin-top: 36px;").bg-2
        q-table(dark dense :loading="universeLoading" color="primary" :title="$t('pageScam.universe.title') + (name?' - ':'') + name" :data="(universeTab === 'sell')?universeSell:universeBuy" :columns="universeColumns" row-key="id" :pagination.sync="universePagination" selection="multiple" :selected.sync="universeSelected" separator="cell" table-class="bg-1")
          //- Title top left
          template(v-slot:top-left)
            span.on-left {{ $t('pageScam.universe.title') }}
            q-chip(color="transparent text-white" dense v-if="name")
              q-avatar
                img(:src="`https://image.eveonline.com/Type/${typeID}_32.png`")
              | {{ name }}
            q-btn(dense color="transparent" size="sm" icon="fas fa-paste" @click="clipboard(name)").on-right
            q-btn(dense color="primary" size="sm" @click.stop="openMarketItem(typeID, name)").on-right {{ typeID }}
              q-tooltip {{ $t('common.openItem') }}
            q-btn-toggle(v-model="universeTab" @input="tab" size="sm" rounded toggle-color="primary" color="dark" text-color="white" :options="universeOptions").on-right
            q-btn(rounded color="primary" icon="fas fa-calculator" size="sm" @click.stop="clickCalcul(typeID, name)" label="Calcul").on-right
          //- Title top right
          template(v-slot:top-right)
            q-btn(color="transparent" no-caps icon-right="fas fa-sync" size="sm" :loading="btnRefresh" @click="refreshUniverse")
              timeago(:datetime="lastTimeUniverse" :auto-update="1" :converterOptions="{includeSeconds: true}" :locale="$route.params.lang").on-left
              q-tooltip {{ $t('common.refresh') }}
            q-btn(flat round icon="fas fa-times-circle" size="xs" color="negative" @click="modal = ''").on-right
              q-tooltip {{ $q.lang.label.close }}
          //- Data
          template(v-slot:body="props")
            q-tr(:props="props")
              q-td(auto-width)
                q-checkbox(dense v-model="props.selected" dark)
              q-td(key="nb" :props="props") {{ props.row.volume_remain }}
                q-tooltip {{ props.row.volume_remain + ' / ' + props.row.volume_entered }}
                  span(v-if="props.row.volume_min > 1") {{ ' - Min = ' + props.row.volume_min }}
              q-td(key="price" :props="props") {{ props.row.price | currency }}
              q-td(key="station" :props="props")
                span(:class="securityColor(props.row.station.security)").on-left {{ security(props.row.station.security) }}
                span {{ props.row.station.name }}
                q-btn(dense color="transparent" size="sm" icon="fas fa-rocket" @click="setDestination(props.row.station.id, props.row.station.name)").on-right
              q-td(key="modified" :props="props")
                timeago(:datetime="Date.parse(props.row.issued_at)" :auto-update="1" :converterOptions="{includeSeconds: true}" :locale="$route.params.lang")
          template(v-slot:bottom-row)
            q-tr
              q-td(auto-width).text-center &#8721;
              q-td.text-center {{ sumNB }}
              q-td.text-right {{ sumPrice | currency }}
              q-td.text-left
                span(v-if="sumNB") {{ $t('pageScam.universe.table.average') }} = {{ sumPrice / sumNB | currency }}
              q-td
    //- Calcul price window
    q-dialog(v-model="calculModal")
      q-card(dark style="height: calc(98vh - 52px); min-width: 98vw; margin-top: 36px;").bg-2
        q-toolbar.bg-dark.text-white.shadow-2.rounded-borders
          q-chip(color="transparent" text-color="white") Fabriquer son scam avec
          q-chip(color="transparent" text-color="white")
            q-avatar
              img(:src="`https://image.eveonline.com/Type/${current.type}_32.png`")
            | {{ current.name }}
          q-btn(icon="fas fa-paste" size="sm" @click="clipboard(current.name)")
            q-tooltip {{ $t('common.copy') }}
          q-btn(dense color="primary" size="sm" @click.stop="openMarketItem(current.type, current.name)").on-right {{ current.type }}
            q-tooltip {{ $t('common.openItem') }}
          q-space
          q-btn(flat round icon="fas fa-times-circle" size="sm" color="negative" @click="modal = ''")
            q-tooltip {{ $q.lang.label.close }}
        //- Title
        q-card-section
        //- Zone de saisie
        .row(v-if="sumNB")
          .col-5.offset-3.text-center
            q-btn(flat rounded size="sm" @click="current.priceBuy = sumPrice / sumNB") {{ sumPrice / sumNB | currency }}
          .col-3.text-center
            q-btn(flat rounded size="sm" @click="current.nbBuy = sumNB") {{ sumNB }}
        .row.q-pb-sm
          q-chip(color="primary" text-color="white").col-2.chip-center
            span Achat
          q-btn(icon="fas fa-paste" dense size="sm" @click="clipboard(current.priceBuy)").q-px-sm
            q-tooltip {{ $t('common.copy') }}
          vue-autonumeric(v-model="current.priceBuy" :placeholder="'Prix moyen'" :options="curP").col-5.bg-transparent.text-white.text-center
          span(class="on-right" style="margin-top: 6px; font-size: larger;") &#215;
          vue-autonumeric(v-model="current.nbBuy" :placeholder="'Quantité'" :options="intP").col-3.on-right.bg-transparent.text-white.text-center
        .row.q-py-sm
          q-chip(color="primary" text-color="white").col-2.chip-center
            span Revente
          q-btn(icon="fas fa-paste" dense size="sm" @click="clipboard(current.priceSellOrder)").q-px-sm
            q-tooltip {{ $t('common.copy') }}
          vue-autonumeric(v-model="current.priceSellOrder" :placeholder="'Prix revente'" :options="curP").col-5.bg-transparent.text-white.text-center
          span(class="on-right" style="margin-top: 6px; font-size: larger;") &#215;
          vue-autonumeric(v-model="current.nbSellOrder" :placeholder="'Quantité'" :options="intP").col-3.on-right.bg-transparent.text-white.text-center
          q-btn(v-if="current.nbBuy > 0" flat rounded size="sm" @click="current.nbSellOrder = current.nbBuy - 1") {{ current.nbBuy -1 }}
        .row.q-py-sm
          q-chip(color="primary" text-color="white").col-2.chip-center
            span Achat faussé
          q-btn(icon="fas fa-paste" dense size="sm" @click="clipboard(current.priceBuyOrder)").q-px-sm
            q-tooltip {{ $t('common.copy') }}
          vue-autonumeric(v-model="current.priceBuyOrder" :placeholder="'Prix moyen'" :options="curP").col-5.bg-transparent.text-white.text-center
          span(class="on-right" style="margin-top: 6px; font-size: larger;") &#215;
          vue-autonumeric(v-model="current.nbBuyOrder" :placeholder="'Quantité'" :options="intP").col-3.on-right.bg-transparent.text-white.text-center
          q-btn(v-if="current.nbSellOrder > 0" flat rounded size="sm" @click="current.nbBuyOrder = current.nbSellOrder + suppNBBuyOrderSuggested") {{ current.nbSellOrder + suppNBBuyOrderSuggested }}
</template>

<script>
import openMarketItem from '../mixins/openMarketItem'
import VueAutonumeric from 'vue-autonumeric/src/components/VueAutonumeric.vue'
// import { required, between, integer } from 'vuelidate/lib/validators'
import { mapFields } from 'vuex-map-fields' // , mapMultiRowFields
export default {
  name: 'PageScamFactory',
  components: { VueAutonumeric },
  mixins: [openMarketItem],
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
      btnRefresh: false,
      // universeModal: false,
      universeLoading: false,
      universePagination: {
        sortBy: 'price',
        descending: false,
        page: 1,
        rowsPerPage: 10
      },
      universeSelected: [],
      universeSell: [],
      universeBuy: [],
      typeID: 0,
      name: '',
      sell: true,
      universeTab: 'sell',
      universeOptions: [{ label: 'Sell', value: 'sell' }, { label: 'Buy', value: 'buy' }],
      lastTimeUniverse: null,
      // calculModal: false,
      modal: '',
      // vue-autonumeric options
      cur: ['euro', { currencySymbol: '\u202fISK', digitGroupSeparator: '\u202f', decimalCharacter: '.', decimalCharacterAlternative: ',', wheelOn: 'hover', wheelStep: '0.01' }],
      curP: ['euroPos', { currencySymbol: '\u202fISK', digitGroupSeparator: '\u202f', decimalCharacter: '.', decimalCharacterAlternative: ',', wheelOn: 'hover', wheelStep: '0.01' }],
      int: ['integer', { digitGroupSeparator: '\u202f', wheelOn: 'hover', wheelStep: '1' }],
      intP: ['integerPos', { digitGroupSeparator: '\u202f', wheelOn: 'hover', wheelStep: '1' }],
      flo: [],
      floP: [],
      prc: ['percentageEU2dec', { digitGroupSeparator: '\u202f', decimalCharacter: '.' }],
      prcP: ['percentageEU2dec', { digitGroupSeparator: '\u202f', decimalCharacter: '.' }],
      // current object for calcul
      current: {
        type: 0,
        name: '',
        priceBuy: '',
        nbBuy: '',
        priceSellOrder: '',
        nbSellOrder: '',
        priceBuyOrder: '',
        nbBuyOrder: '',
        hubBegin: '',
        hubDestination: '',
        note: '',
        active: false,
        walletDivision: 'Aucune',
        updatedAt: Date.now()
      },
      nbBuy: 0,
      priceBuy: 0,
      myList: [],
      myListColumns: [
        {
          name: 'active',
          required: true,
          label: 'Actif',
          align: 'center',
          field: 'active',
          sortable: true,
          sort: (a, b) => (a === true ? 1 : 0) - (b === true ? 1 : 0)
        },
        {
          name: 'type',
          required: true,
          label: 'ID',
          align: 'center',
          field: 'type',
          sortable: true
        },
        {
          name: 'name',
          required: true,
          label: 'Nom',
          align: 'center',
          field: 'name',
          sortable: true
        },
        {
          name: 'hubBegin',
          required: false,
          label: 'Départ',
          align: 'center',
          field: 'hubBegin',
          sortable: true
        },
        {
          name: 'hubDestination',
          required: false,
          label: 'Arrivée',
          align: 'center',
          field: 'hubDestination',
          sortable: true
        },
        {
          name: 'walletDivision',
          required: false,
          label: 'Wallet',
          align: 'center',
          field: 'walletDivision',
          sortable: true
        },
        {
          name: 'note',
          required: false,
          label: 'Note',
          align: 'center',
          field: 'note',
          sortable: true
        },
        {
          name: 'updatedAt',
          required: false,
          label: 'Modifié',
          align: 'center',
          field: 'updatedAt',
          sortable: true
        }
      ],
      myListPagination: {
        sortBy: 'updatedAt',
        descending: true,
        page: 1,
        rowsPerPage: 10
      },
      myListFilter: ''
    }
  },
  computed: {
    ...mapFields(`scam`, ['pagination', 'filter', 'list', 'lastTime', 'skillMarginTradingScammer']),
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
    },
    universeColumns () {
      return [
        // {
        //   name: 'id',
        //   required: true,
        //   label: this.$t('pageScam.universe.table.id'),
        //   align: 'center',
        //   field: 'id',
        //   sortable: true
        // },
        {
          name: 'nb',
          required: true,
          label: this.$t('pageScam.universe.table.nb'),
          align: 'center',
          field: 'volume_remain',
          sortable: true
        },
        {
          name: 'price',
          required: true,
          label: this.$t('pageScam.universe.table.price'),
          align: 'right',
          field: 'price',
          sortable: true
        },
        {
          name: 'station',
          required: true,
          label: this.$t('pageScam.universe.table.station'),
          align: 'left',
          field: row => row.station.name,
          sortable: true
        },
        {
          name: 'modified',
          required: true,
          label: this.$t('pageScam.universe.table.modified'),
          align: 'right',
          field: 'issued_at',
          sortable: true
        }
      ]
    },
    universeModal: {
      get () {
        return (this.modal === 'universe')
      },
      set (newValue) {
        if (newValue) this.modal = 'universe'
        else this.modal = ''
      }
    },
    calculModal: {
      get () {
        return (this.modal === 'calcul')
      },
      set (newValue) {
        if (newValue) this.modal = 'calcul'
        else this.modal = ''
      }
    },
    sumNB () {
      return this.universeSelected.reduce((a, b) => a + b.volume_remain, 0)
    },
    sumPrice () {
      return this.universeSelected.reduce((a, b) => a + (b.volume_remain * b.price), 0)
    },
    suppNBBuyOrderSuggested () {
      console.log('skill margin trading', this.skillMarginTradingScammer)
      switch (this.skillMarginTradingScammer) {
        case 1: return Math.ceil(this.current.nbSellOrder * 3)
        case 2: return Math.ceil(this.current.nbSellOrder * 1.2858)
        case 3: return Math.ceil(this.current.nbSellOrder * 0.7298)
        case 4: return Math.ceil(this.current.nbSellOrder * 0.4629)
        case 5: return Math.ceil(this.current.nbSellOrder * 0.3112)
        default: return 0
      }
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
    },
    async clickUniverse (typeID, name) {
      this.name = ''
      this.typeID = typeID
      this.modal = 'universe'
      this.universeSelected = []
      try {
        await this.refreshUniverse()
      } catch (err) {
        this.$q.notify({ color: 'negative', message: this.$te(err.message) ? this.$t(err.message) : err.message })
        this.modal = ''
      } finally {
        this.name = name
      }
    },
    async refreshUniverse () {
      try {
        this.universeLoading = true
        this.btnRefresh = true
        await this.$store.dispatch('profil/checkScammer')
        const response = await this.$axios.get(`https://evemarketer.com/api/v1/markets/types/${this.typeID}?language=${this.$route.params.lang}&important_names=false`)
        this.universeSell = response.data.sell
        this.universeBuy = response.data.buy
        this.lastTimeUniverse = Date.now()
      } catch (err) {
        throw err
      } finally {
        this.universeLoading = false
        this.btnRefresh = false
      }
    },
    clickCalcul (typeID, name) {
      // this.calculModal = true
      this.current.type = typeID
      this.current.name = name
      // if (this.sumNB > 0)
      this.nbBuy = null
      this.nbBuy = this.sumNB
      // if (this.sumPrice > 0)
      this.priceBuy = null
      this.priceBuy = this.sumPrice / this.sumNB
      this.modal = 'calcul'
    },
    security (n) {
      return n.toFixed(1)
    },
    securityColor (n) {
      switch (n.toFixed(1)) {
        case '1.0':
          return 'sec10'
        case '0.9':
          return 'sec09'
        case '0.8':
          return 'sec08'
        case '0.7':
          return 'sec07'
        case '0.6':
          return 'sec06'
        case '0.5':
          return 'sec05'
        case '0.4':
          return 'sec04'
        case '0.3':
          return 'sec03'
        case '0.2':
          return 'sec02'
        case '0.1':
          return 'sec01'
        default:
          return 'sec00'
      }
    },
    clipboard (value) {
      this.$copyText(value)
      this.$q.notify({ color: 'positive', message: `"${value}" ${this.$t('common.copied')}` })
    },
    async setDestination (destinationID, destinationName) {
      try {
        await this.$store.dispatch('profil/checkScammer')
        if (!this.$store.getters['profil/checkScopeWriteWaypoint']) throw new Error('error.noScope')
        await this.$axios.put(`/auth/api/v1/setDestination/${destinationID}`, null, this.$store.getters['profil/headers'])
        this.$q.notify({ color: 'positive', message: `${this.$t('common.destination')} "${destinationName}"` })
      } catch (err) {
        this.$q.notify({ color: 'negative', message: this.$te(err.message) ? this.$t(err.message) : err.message })
      }
    },
    tab () {
      if (this.universePagination.sortBy === 'price') this.universePagination.descending = (this.universeTab === 'buy')
    }
  }
}
</script>

<style lang="stylus">
  .sec10
    color:#33f9f9
  .sec09
    color:#4bf3c3
  .sec08
    color:#02f34b
  .sec07
    color:#0f0
  .sec06
    color:#96f933
  .sec05
    color:#f5f501
  .sec04
    color:#e58000
  .sec03
    color:#f66301
  .sec02
    color:#eb4903
  .sec01
    color:#dc3201
  .sec00
    color:#f30202
  .q-table--col-auto-width
    // width: 1px
    padding-right: 7px !important
  .q-table .q-table--col-auto-width
    // border-right-width: 1px
    border-right: 1px solid black
  .chip-center .q-chip__content
    width: 100%
    text-align: center
  .chip-center .q-chip__content span
    width: 100%
</style>
