<template>
  <div id="app">
    <v-header :seller="seller" />
    <div class="tab-wrapper">
      <tab
        :tabs="tabs"
        :initial-index="0"
      />
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import Tab from 'components/tab/tab'
import Goods from 'components/goods/goods'
import Ratings from 'components/ratings/ratings'
import Seller from 'components/seller/seller'
import qs from 'query-string'
import ApiServer from 'api'
// import { getSeller } from 'api'

export default {
  name: 'App',
  components: {
    VHeader,
    Tab
  },
  data() {
    return {
      seller: {
        id: qs.parse(location.search.slice(1)).id
      }
      // seller: {}
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评价',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      const params = {
        id: this.seller.id
      }
      ApiServer.getSeller(params)
        .then(res => { // pass id => seller?id=2
          this.seller = Object.assign({}, this.seller, res)
        })
        .catch(err => { console.log(err) })
    }
    // _getSeller() {
    //   getSeller().then((seller) => {
    //     this.seller = seller
    //     console.log(this.seller, '--seller')
    //   })
    // }
  }
}
</script>

<style lang="stylus" scoped>
#app {
  .tab-wrapper {
    position: fixed;
    top: 136px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
