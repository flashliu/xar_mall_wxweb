<template>
  <div class="home">
    <div class="searchBar">
      <input
        type="text"
        @focus="searching = true"
        @blur="goods_list.length>0 && (searching = false)"
        v-model="searchVal"
        placeholder="请输入商品名称进行搜索"
      >
      <div class="btn" :class="{active:searchVal.length>0}" @click="search(searchVal)">搜索</div>
    </div>
    <div v-if="searching" class="advance">
      <div class="title">热门搜索</div>
      <div
        class="item"
        @click="search(item)"
        v-for="(item,index) in hot_advance_list"
        :key="index"
      >{{item}}</div>
    </div>
    <div v-else class="content">
      <router-link
        :to="{ name:'detail',params:{id:item.pro_id}}"
        v-for="item in goods_list"
        :key="item.pro_id"
        class="goods_item"
      >
        <div class="g_img">
          <img :src="item.thumb">
        </div>
        <div class="g_info">
          <div class="title">{{item.pro_name}}</div>
          <div class="label_container"></div>
          <div class="price_and_salenum">
            <div class="price">¥ {{item.mall_price}}</div>
            <div class="salenum">销量{{item.sales_total}}</div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      hot_advance_list: [
        '洗车卡',
        '保养卡',
        '做漆卡',
        '美容卡',
        '车用品',
        '0-100',
        '100-300',
        '300-500',
        '1000以上'
      ],
      searchVal: "",
      searching: true,
      goods_list: []
    }
  },
  methods: {
    search(keyword) {
      keyword != this.searchVal && (this.searchVal = keyword)
      this.axios.post('api/v2/Mallindex/getAll', {
        keyword
      }).then(res => {
        this.goods_list = res.data.data.list.filter(item=>item.type=='card')
      })
      this.searching = false
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  .searchBar {
    display: flex;
    padding: 10px;
    align-items: center;
    border-bottom: solid 1px #eee;
    input {
      background-color: #f6f7f8;
      color: #5f5f5f;
      outline: none;
      border: none;
      display: block;
      flex: 1;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
    .btn {
      font-size: 14px;
      margin-left: 10px;
      border-radius: 5px;
      padding: 0 20px;
      color: #9b9b9b;
      border: solid 1px #dfdfdf;
      box-sizing: border-box;
      height: 30px;
      line-height: 30px;
    }
    .active {
      background-color: #f4ca2a;
      border-color: #f4ca2a;
      color: black;
    }
  }
  .advance {
    padding: 0 10px;
    .title {
      padding-left: 24px;
      background-image: url("../assets/hot.png");
      background-repeat: no-repeat;
      background-position: left center;
      background-size: 16px;
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: solid 1px #eee;
    }
    .item {
      padding: 15px 0;
      border-bottom: solid 1px #eee;
      font-size: 14px;
    }
  }

  .content {
    box-sizing: border-box;
    height: calc(100vh - 53px);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: #f3f3f3;
    .goods_item {
      width: 49.5vw;
      background-color: white;
      margin-bottom: 1vw;
      border-radius: 3px;
      overflow: hidden;
      display: block;
      .g_img {
        height: 49.5vw;
        overflow: hidden;
        img {
          width: 100%;
          display: block;
        }
      }
      .g_info {
        padding: 10px;
        .title {
          font-size: 14px;
          color: #4a4a4a;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .label_container {
          display: flex;
          align-items: center;
          height: 25px;
        }
        .price_and_salenum {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price {
            color: #ff4a08;
            font-size: 28rpx;
          }
          .salenum {
            color: #b0b0b0;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>

