<template>
  <div class="tab">
    <!-- useTransition 控制下划线是否使用 transition 过渡 -->
    <!-- showSlider 控制是否开启下划线跟随的效果 -->
    <!-- inline 来决定 icon 与 label 是否处于一行 -->
    <cube-tab-bar
      class="border-bottom-1px"
      ref="tabBar"
      showSlider
      v-model="selectedLabel"
      :data="tabs"
      :useTransition="false"
    />
    <div class="slider-wrapper">
      <cube-slide
        ref="slide"
        :loop="false"
        :auto-play="false"
        :show-dots="false"
        :initial-index="index"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab,index) in tabs" :key="index">
          <component ref="component" :is="tab.component" :data="tab.data"/>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default() {
        return []
      }
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: this.initialIndex,
      // onScroll(pos) 能获得 pos.x 等信息
      slideOptions: {
        listenScroll: true,
        // 0 不派发scroll事件，1：非实时；2：滑动过程中；3：不仅在屏幕滑动的过程中，而且momentum 滚动动画运行过程中实时派发
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  mounted() {
    this.onChange(this.index)
  },
  computed: {
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex(value => {
          return value.label === newVal
        })
      }
    }
  },
  methods: {
    // 先获取 tabBar 和 slide 的宽度，然后获取到滚动位置的坐标值，坐标值 / slideWidth 得到滚动的比例，然后 * tabBarWidth, 实时得到
    onScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      // slide: better-scroll obj
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      // pos.x slideOptions 配置了才能获得
      const transform = (-pos.x / slideWidth) * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    },
    onChange(current) {
      this.index = current
      const instance = this.$refs.component[current]
      if (instance && instance.fetch) {
        instance.fetch()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable';

.tab {
  display: flex;
  flex-direction: column;
  height: 100%;

  >>> .cube-tab {
    padding: 10px 0;
  }

  .slider-wrapper {
    flex: 1;
    overflow: hidden;
  }
}
</style>
