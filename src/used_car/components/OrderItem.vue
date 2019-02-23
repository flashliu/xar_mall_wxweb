<template>
  <div class="orderitem">
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
      </div>
      <div class="status">
        <div class="primary">{{statusObj(item.status).title}}</div>
        <div class="secondary">{{statusObj(item.status).message}}</div>
      </div>
    </div>
    <div v-if="showAction && (item.status == 0 || item.status == 1)" class="action border-top-1px">
      <div class="a_item" @click.stop="accept(item)" v-if="item.status == 0">接单</div>
      <a @click.stop='stop' :href="'tel:' + item.customer_phone" class="a_item" v-if="item.status == 1">电话沟通</a>
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
    showAction: Boolean
  },
  methods: {
    statusObj(status) {
      if (status == 0 || status == 1) {
        return {
          title: '申请中',
          message: '等待工作人员联系'
        }
      }
      if (status == 3) {
        return {
          title: '申请失败',
          message: '双方未达成一致'
        }
      }
      if (status == 4) {
        return {
          title: '申请成功',
          message: '双方达成一致'
        }
      }
    },
    stop(){},
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


