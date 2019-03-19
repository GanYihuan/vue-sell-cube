<template>
  <div
    v-show="visible"
    class="shop-cart-sticky"
  >
    <shop-cart
      ref="shopCart"
      :select-foods="selectFoods"
      :delivery-price="deliveryPrice"
      :min-price="minPrice"
      :fold="fold"
      sticky
    />
  </div>
</template>

<script>
import ShopCart from 'components/shop-cart/shop-cart'
import popupMixin from 'utils/mixins/popup'

export default {
  name: 'ShopCartSticky',
  components: {
    ShopCart
  },
  mixins: [popupMixin],
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    fold: {
      type: Boolean,
      default: true
    },
    list: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    drop(el) {
      this.$refs.shopCart.drop(el)
    }
  }
}
</script>

<style lang="stylus" scoped>
.shop-cart-sticky {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 48px;
}
</style>
