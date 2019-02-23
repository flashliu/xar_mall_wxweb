<template>
  <div class="assess">
    <cube-tab-bar
      class="tabs border-bottom-1px"
      v-model="selectedLabel"
      show-slider
      :data="tabLabels"
      ref="tabNav"
    ></cube-tab-bar>
    <cube-slide
      ref="slide"
      :loop="false"
      :initial-index="initialIndex"
      :auto-play="false"
      :show-dots="false"
      :options="slideOptions"
      @scroll="scroll"
      @change="changePage"
    >
      <cube-slide-item v-for="(value,key) in assessData" :key="key">
        <cube-scroll style="height:calc(100vh - 38px)" :options="scrollOptions">
          <ul class="list-wrapper">
            <li v-for="(item, index) in value.list" :key="index">
              <router-link :to="{name:'detail',params:{id:item.assess_id}}">
                <OrderItem @accept="accept" show-action :item="item"></OrderItem>
              </router-link>
            </li>
          </ul>
        </cube-scroll>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>
<script>
import OrderItem from '../components/OrderItem'
export default {
  name: 'assess',
  components: { OrderItem },
  data() {
    return {
      assessData: {
        finish: { list: [], count: 0 },
        new: { list: [], count: 0 },
        wait: { list: [], count: 0 },
      },
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        /* lock x-direction when scrolling horizontally and  vertically at the same time */
        directionLockThreshold: 0
      },
      selectedLabel: '待接单',
      tabLabels: [
        { label: '待接单' },
        { label: '待评估' },
        { label: '已评估' }
      ],
    }
  },
  computed: {
    initialIndex() {
      const index = this.tabLabels.findIndex(item => item.label === this.selectedLabel)
      return index
    }
  },
  methods: {
    changePage(current) {
      this.selectedLabel = this.tabLabels[current].label
    },
    scroll(pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    setData(cb) {
      this.$axios.post('/api/usedcar/employeeassess/index').then(res => {
        this.assessData = res.data.data
        cb && cb()
      })
    },
    accept(res) {
      if (res.data.status) {
        this.setData(() => {
          this.selectedLabel = '待评估'
        })
      }
    }
  },
  created() {
    this.setData()
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name == 'assessinfo') {
  //     to.meta.keepAlive = false
  //   }
  //   next()
  // }
}
</script>
<style lang="less" scoped>
.assess {
  .tabs {
    background-color: white;
  }
  .list-wrapper {
    padding: 10px;
    li {
      margin-bottom: 10px;
    }
  }
}
</style>


