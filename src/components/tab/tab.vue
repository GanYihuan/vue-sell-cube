<template>
  <div class="tab">
    <!-- use-transition: Control whether underscores are used transition -->
    <!-- show-slider: Control whether the effect of underline tracking is turned on -->
    <!-- inline: Whether text and icons are displayed on one line -->
    <!-- [cube-tab-bar](https://didi.github.io/cube-ui/#/zh-CN/docs/tab-bar) -->
    <cube-tab-bar
      ref="tabBar"
      v-model="selectedLabel"
      class="border-bottom-1px"
      show-slider
      :data="tabs"
      :use-transition="false"
    />
    <div class="slider-wrapper">
      <!-- interval: Play interval -->
      <!-- direction: Carousel direction -->
      <!-- initialIndex: Initial index value -->
      <!-- loop: Whether to loop -->
      <!-- autoPlay: Whether to play automatically -->
      <!-- showDots: Whether to display the carousel point -->
      <!-- options: better-scroll 配置 -->
      <!-- threshold: Switch the sliding threshold of the page -->
      <!-- speed: Switch page speed -->
      <!-- refreshResetCurrent: Whether to reset the index when refreshing -->
      <!-- [cube-slide](https://didi.github.io/cube-ui/#/zh-CN/docs/slide) -->
      <cube-slide
        ref="slide"
        :loop="false"
        :show-dots="false"
        :auto-play="false"
        :initial-index="index"
        :options="slideOptions"
        @scroll="onScroll"
        @change="onChange"
      >
        <cube-slide-item
          v-for="(tab, i) in tabs"
          :key="i"
        >
          <component
            :is="tab.component"
            ref="component"
            :data="tab.data"
          />
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tab',
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
      slideOptions: { // onScroll(pos) can get pos.x info
        listenScroll: true,
        probeType: 3, // 0 Not distributed scroll evnet, 1) not real-time; 2) During the sliding process; 3) Not only during the sliding of the screen, but also momentum Real-time dispatch during scrolling animation
        directionLockThreshold: 0
      }
    }
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
  mounted() {
    this.onChange(this.index)
  },
  methods: {
    /**
     * @description: 横向滚动
     * @param {type} pos 位置信息
     * @return:
     */
    onScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth // slide: better-scroll obj
      const transform = (-pos.x / slideWidth) * tabBarWidth // pos.x slideOptions Configured to get
      this.$refs.tabBar.setSliderTransform(transform)
    },
    /**
     * @description: 切换不同项时触发
     * @param {type} current 当前项的索引
     * @return:
     */
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
