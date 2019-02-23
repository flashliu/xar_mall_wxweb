<template>
  <div class="carbrand">
    <div class="view-wrapper">
      <div class="index-list-wrapper custom">
        <cube-index-list style="height:100vh" :data="data">
          <cube-index-list-group v-for="(group, index) in data" :key="index" :group="group">
            <cube-index-list-item
              v-for="(item, index) in group.items"
              :key="index"
              :item="item"
              @select="selectItem"
            >
              <div class="custom-item cube-index-list-item-def border-bottom-1px">
                <img :src="item.url">
                <span class="name">{{item.brand}}</span>
              </div>
            </cube-index-list-item>
          </cube-index-list-group>
          <!-- <span class="custom-nav-item" slot="nav-item" slot-scope="props">{{props.item}}</span> -->
        </cube-index-list>
      </div>
    </div>
    <cube-drawer
      ref="drawer"
      style="z-index:35"
      :title="title"
      :data="drawData"
      :selected-index="selectedIndex"
      @change="changeHandler"
      @select="selectHandler"
    ></cube-drawer>
  </div>
</template>

<script type="text/ecmascript-6">
import events from '../events'
export default {
  data() {
    return {
      data: [],
      selectedIndex: [],
      title: '请选择型号',
      drawData: [
        [],
        [],
        [],
        []
      ]
    }
  },
  methods: {
    selectItem(item) {
      this.drawData.forEach((item, index) => {
        this.$refs.drawer.refill(index, [])
      })
      this.title = '请选择型号'
      this.getData({
        brand_id: item.brand_id
      }).then(res => {
        this.$set(this.drawData, 0, res.data.data.map(item => ({ text: item.vehicle, value: item.vehicle_id })))
        this.$refs.drawer.show()
        this.brand = item
      })
    },
    getData(data) {
      return this.$axios.post('/api/usedcar/Carbrand/index', data)
    },
    changeHandler(index, item, selectedVal, selectedIndex, selectedText) {
      this.title = selectedText.join('/')
      if (index == 0) {
        this.getData({
          vehicle_id: item.value
        }).then(res => {
          this.$refs.drawer.refill(index + 1, res.data.data.map(item => ({ text: item.p_value, value: item.id })))
        })
      }
      if (index == 1) {
        this.getData({
          displacement_id: item.value
        }).then(res => {
          this.$refs.drawer.refill(index + 1, res.data.data.map(item => ({ text: item.year, value: item.id })))
        })
      }
      if (index == 2) {
        this.getData({
          year_id: item.value
        }).then(res => {
          this.$refs.drawer.refill(index + 1, res.data.data.map(item => ({ text: item.name, value: item.id })))
        })
      }
    },
    selectHandler(selectedVal, selectedIndex, selectedText) {
      selectedVal.unshift(this.brand.brand_id)
      selectedText.unshift(this.brand.brand)
      events.$emit('carTypeChange', selectedVal.join(), selectedText.join())
      window.history.go(-1)
    },
  },
  created() {
    this.getData().then(res => {
      this.data = res.data.data
    })
  },
}
</script>

<style lang="less" scoped>
.custom-item {
  line-height: 50px;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    margin-right: 20px;
  }
}
</style>

