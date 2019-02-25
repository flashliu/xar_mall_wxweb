<template>
  <div class="orderitem">
    <router-link :to="to">
      <div class="main">
        <div class="img">
          <img :src="item.logo">
        </div>
        <div class="info">
          <p>
            <span class="chip">{{item.color}}</span>
            {{item.brand_name && item.brand_name.brand}}
          </p>
          <p>{{item.sale}}</p>
          <p>上牌时间：{{item.licensing_time}}</p>
          <p>里程数：{{item.mileage}}km</p>
          <p>
            车主：{{item.vehicle_owner}}
            <span
              class="chip"
              style="margin-left:10px;"
            >已申请{{item.assess_num}}次</span>
          </p>
        </div>
        <div class="status">
          <div class="primary">{{statusObj(item.status).title}}</div>
          <div class="secondary">{{statusObj(item.status).message}}</div>
        </div>
      </div>
    </router-link>
    <div v-if="showAction && (item.status == 0 || item.status == 1)" class="action border-top-1px">
      <div class="a_item" @click.stop="accept(item)" v-if="item.status == 0">接单</div>
      <a :href="'tel:' + item.customer_phone" class="a_item" v-if="item.status == 1">电话沟通</a>
      <router-link
        :to="{name:'assessinfo',params:{id:item.assess_id}}"
        class="a_item"
        v-if="item.status == 1"
      >评估</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderItem',
  props: {
    item: Object,
    showAction: Boolean,
    to: [Object, String]
  },
  methods: {
    statusObj(status) {
      if (status == 0 || status == 1) {
        return {
          title: this.$route.params.isEmployee == 0 ? '申请中' : '',
          message: this.$route.params.isEmployee == 0 ? '等待联系' : status == 0 ? '等待接单' : '等待评估'
        }
      }
      if (status == 3) {
        return {
          title: this.$route.params.isEmployee == 0 ? '申请失败' : '',
          message: '不售卖'
        }
      }
      if (status == 4) {
        return {
          title: this.$route.params.isEmployee == 0 ? '申请成功' : '',
          message: '售卖'
        }
      }
    },
    accept(item) {
      if (this.accepting) {
        return
      }
      this.accepting = true
      this.$axios.post('/api/usedcar/employeeassess/accept', {
        assess_id: item.assess_id
      }).then(res => {
        const message = res.data.status ? '接单成功' : res.data.message
        this.accepting = false
        this.$message(message, res.data.status)
        this.$emit('accept', res)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.orderitem {
  .main {
    border-radius: 3px;
    display: flex;
    background-color: white;
    padding: 10px;
    font-size: 13px;
    color: #444;
    line-height: 1.6;
    align-items: center;
    .img {
      width: 70px;
      height: 70px;
      // background-color: #eee;
      margin-right: 10px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 80%;
      }
    }
    .info {
      flex: 1;
      .chip {
        background-color: #eee;
        padding: 1px 10px;
        line-height: 1;
      }
    }
    .status {
      justify-self: flex-end;
      text-align: right;
      .error {
        color: #f56c6c;
      }
      .secondary {
        color: #888;
      }
    }
  }
  .action {
    display: flex;
    background-color: white;
    .a_item {
      flex: 1;
      text-align: center;
      line-height: 35px;
      font-size: 14px;
      position: relative;
    }
    .a_item:not(:last-child)::after {
      content: "";
      display: block;
      height: 35px;
      width: 1px;
      background-color: #eee;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
</style>


