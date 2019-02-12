<template>
  <div class="cardlist">
    <div class="tabs">
      <div
        v-for="(item,index) in tabList"
        :key="item.filed"
        :class="{active:active==index}"
        class="tab_item"
        @click="active = index"
      >{{item.name}}</div>
    </div>
    <div class="cates">
      <router-link
        :to="{name:'mycard',params:{id:item.cat_id}}"
        class="cate_item"
        v-for="item in catList"
        :key="item.cat_id"
      >
        <img v-if="item.cat_id == 39" src="../assets/cardc.png">
        <img v-if="item.cat_id == 40" src="../assets/cardb.png">
        <img v-if="item.cat_id == 42" src="../assets/carda.png">
        <img v-if="item.cat_id == 43" src="../assets/mrk.png">
        <img v-if="item.cat_id == 0" src="../assets/other.png">
        <div class="name">
          {{item.label}}
          <span class="count">{{item[tabList[active].filed]}}</span>
          张
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'cardList',
  data() {
    return {
      catList: [],
      active: 0,
      tabList: [
        {
          name: '未使用',
          filed: 'no_use_count'
        },
        {
          name: '已使用',
          filed: 'used_count'
        },
        {
          name: '已过期',
          filed: 'is_end_count'
        }
      ]
    }
  },
  methods: {
    fetchData() {
      this.axios.post('/api/v2/mallvcard/myvcardbag').then(res => {
        this.catList = res.data.data
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="less" scoped>
.cardlist {
  height: 100vh;
  width: 100vw;
  background-color: #f3f3f3;
  .tabs {
    display: flex;
    padding: 10px 0;
    background-color: white;
    .tab_item {
      flex: 1;
      text-align: center;
    }
    .active {
      color: #f1d03b;
      position: relative;
    }
    .active::after {
      content: " ";
      height: 1px;
      width: 20%;
      background-color: #f1d03b;
      position: absolute;
      bottom: -5px;
      left: 40%;
    }
  }
  .cates {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
    .cate_item {
      width: 49%;
      background-color: white;
      margin-bottom: 2%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 0;
      border-radius: 6px;
      img {
        width: 40px;
      }
      .name {
        margin-top: 15px;
      }
    }
  }
}
</style>

