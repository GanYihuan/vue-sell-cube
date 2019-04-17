<template>
  <div class="cart-control">
    <transition name="move">
      <div
        v-show="food.count>0"
        class="cart-decrease"
        @click.stop="decrease"
      >
        <span class="inner icon-remove_circle_outline" />
      </div>
    </transition>
    <div
      v-show="food.count>0"
      class="cart-count"
    >
      {{ food.count }}
    </div>
    <div
      class="cart-add icon-add_circle"
      @click.stop="add"
    />
  </div>
</template>

<script>
const EVENT_ADD = 'add'

export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    add(event) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1) // Add an attribute to the object, And make sure this new property is also responsive and triggers a view update., And trigger the view update.
      } else {
        this.food.count++
      }
      this.$emit(EVENT_ADD, event.target) // event.target -> dom
    },
    decrease() {
      if (this.food.count) { // if this.food.count > 0 invoked
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.cart-control {
  display: flex;
  align-items: center;

  .cart-decrease {
    display: inline-block;
    padding: 6px;
    opacity: 1;

    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: $fontsize-large-xxx;
      color: $color-blue;
      transition: all 0.3s linear;
      transform: rotate(0);
    }

    &.move-enter-active, &.move-leave-active {
      transition: all 0.3s linear;
    }

    &.move-enter, &.move-leave-active {
      opacity: 0;
      transform: translate3d(24px, 0, 0);

      .inner {
        transform: rotate(180deg);
      }
    }
  }

  .cart-count {
    width: 12px;
    line-height: 24px;
    text-align: center;
    font-size: $fontsize-small-s;
    color: $color-grey;
  }

  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: $fontsize-large-xxx;
    color: $color-blue;
  }
}
</style>
