<template>
  <transition name="fade">
    <!-- mask: Whether to display the background layer -->
    <!-- position: Content placement, Priority ratio center higher -->
    <!-- type: Shell type -->
    <!-- @mask-click: Background layer click -->
    <!-- [cube-popup](https://didi.github.io/cube-ui/#/zh-CN/docs/popup) -->
    <cube-popup
      v-show="visible"
      mask-closable
      position="bottom"
      type="shop-cart-list"
      :z-index="90"
      @mask-click="maskClick"
    >
      <transition
        name="move"
        @after-leave="afterLeave"
      >
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">
              购物车
            </h1>
            <span
              class="empty"
              @click="empty"
            >清空</span>
          </div>
          <cube-scroll
            ref="listContent"
            class="list-content"
          >
            <ul>
              <li
                v-for="(food,index) in selectFoods"
                :key="index"
                class="food"
              >
                <span class="name">{{ food.name }}</span>
                <div class="price">
                  <span>￥{{ food.price*food.count }}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control
                    :food="food"
                    @add="onAdd"
                  />
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
import CartControl from 'components/cart-control/cart-control'
import popupMixin from 'utils/mixins/popup'

const EVENT_SHOW = 'show'
const EVENT_ADD = 'add'
const EVENT_LEAVE = 'leave'

export default {
  name: 'ShopCartList',
  components: {
    CartControl
  },
  mixins: [popupMixin],
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
    this.$on(EVENT_SHOW, () => { // Shopping cart list shows refresh scroll
      this.$nextTick(() => {
        this.$refs.listContent.refresh()
      })
    })
  },
  methods: {
    onAdd(target) {
      this.$emit(EVENT_ADD, target)
    },
    afterLeave() {
      this.$emit(EVENT_LEAVE)
    },
    maskClick() {
      this.hide()
    },
    empty() {
      this.dialogComp = this.$createDialog({
        type: 'confirm',
        content: '清空购物车？',
        $events: {
          confirm: () => {
            this.selectFoods.forEach(food => {
              food.count = 0
            })
            this.hide()
          }
        }
      })
      this.dialogComp.show()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.cube-shop-cart-list {
  bottom: 48px;

  &.fade-enter, &.fade-leave-active {
    opacity: 0;
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .move-enter, .move-leave-active {
    transform: translate3d(0, 100%, 0);
  }

  .move-enter-active, .move-leave-active {
    transition: all 0.3s ease-in-out;
  }

  .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    background: $color-background-ssss;

    .title {
      float: left;
      font-size: $fontsize-medium;
      color: $color-dark-grey;
    }

    .empty {
      float: right;
      font-size: $fontsize-small;
      color: $color-blue;
    }
  }

  .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: $color-white;

    .food {
      position: relative;
      padding: 12px 0;
      box-sizing: border-box;

      .name {
        line-height: 24px;
        font-size: $fontsize-medium;
        color: $color-dark-grey;
      }

      .price {
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-weight: 700;
        font-size: $fontsize-medium;
        color: $color-red;
      }

      .cart-control-wrapper {
        position: absolute;
        right: 0;
        bottom: 6px;
      }
    }
  }
}
</style>
