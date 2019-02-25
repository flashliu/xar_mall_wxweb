<template>
  <div class="orderhistory">
    <div v-for="item in list" :key="item.assess_id" class="item">
      <div class="time">2018-2-12</div>
      <OrderItem
        :to="{name:'detail',params:{id:item.assess_id}}"
        :show-action="$route.params.isEmployee==1"
        @accept="accept"
        :item="item"
      ></OrderItem>
    </div>
  </div>
</template>
<script>
import OrderItem from '../components/OrderItem'
export default {
  name: 'orderhistory',
  components: { OrderItem },
  data() {
    return {
      list: []
    }
  },
  methods: {
    getList() {
      if (this.$route.params.isEmployee == 1) {
        this.$axios.post('/api/usedcar/employeeassess/customerhistory', {
          page: 0,
          customer_id: this.$route.params.customer_id
        }).then(res => {
          this.list = res.data.data.list
        })
        return
      }
      this.$axios.post('/api/usedcar/customerassess/index', {
        page: 0,
      }).then(res => {
        this.list = res.data.data.list
      })
    },
    accept(res) {
      if (res.data.status) {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.orderhistory {
  padding: 10px;
  .item {
    margin-bottom: 10px;
    .time {
      margin-bottom: 10px;
      font-size: 14px;
    }
  }
}
</style>

