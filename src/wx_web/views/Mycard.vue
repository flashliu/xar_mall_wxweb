<template>
  <div class="mycard">
    <div class="number">{{$route.params.name}}:{{list.length}}张</div>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.vc_id">
        <div class="time">{{item.create_time}}</div>
        <div class="info" :style="{backgroundImage:img_path(item)}">
          <div class="name">{{item.sku_name}}</div>
          <div class="price">
            <div class="new">
              <span style="font-size:14px;">¥</span>
              {{item.mall_price}}
            </div>
            <div class="old">原价{{item.market_price}}</div>
          </div>
          <div class="exp_time">有效期至：{{item.exp_time}}</div>
          <div class="use" v-if="$route.params.is_use" :style="{color:'#999'}">已使用</div>
          <div class="use" :style="{color:'#999'}" v-if="$route.params.is_end">已过期</div>
          <div
            class="use"
            @click="showQrcode(item.list_no)"
            v-if="$route.params.is_use == 0 && $route.params.is_end == 0"
          >立即使用</div>
        </div>
      </div>
    </div>
    <div class="qr_container" @click="qr_path=''" v-if="qr_path">
      <div class="main">
        <img :src="qr_path">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mycard',
  data() {
    return {
      list: [],
      qr_path: ''
    }
  },
  watch: {
    '$route.params.id'(id) {
      (id || id == 0) && this.fetchData(id)
      if (id == undefined) {
        this.list = []
      }
    },
  },
  methods: {
    img_path(item) {
      const cat_imgs = {
        39: require('@/assets/xc.png'),
        40: require('@/assets/by.png'),
        42: require('@/assets/zq.png'),
        43: require('@/assets/mr.png'),
      }
      const give_imgs = {
        39: require('@/assets/xch.png'),
        40: require('@/assets/byh.png'),
        42: require('@/assets/zqh.png'),
        43: require('@/assets/mr.png'),
      }
      if (this.$route.params.is_use || this.$route.params.is_end) {
        if (item.gived_by > 0) {
          return `url(${require('@/assets/nouse.png')})`
        } else {
          return `url(${require('@/assets/nouse1.png')})`
        }
      }
      if (item.gived_by > 0) {
        return `url(${give_imgs[this.$route.params.id] || require('@/assets/xch.png')})`
      }
      return `url(${cat_imgs[this.$route.params.id] || require('@/assets/xc.png')})`
    },
    showQrcode(list_no) {
      this.axios.post('/api/api/zmallvcard/carduse', {
        list_no
      }).then(res => {
        this.qr_path = 'data:image/jpeg;base64,' + res.data.data.real_path
      })
    },
    fetchData() {
      this.axios.post('/api/v2/mallvcard/vcardlist', {
        cat_id: this.$route.params.id,
        is_use: this.$route.params.is_use,
        is_end: this.$route.params.is_end,
        page_size: 1000
      }).then(res => {
        this.list = res.data.data.list
      })
    }
  },
  created() {
    this.fetchData()
  }
}
</script>

<style lang="less">
.mycard {
  background-color: #f3f3f3;
  min-height: 100vh;
  font-size: 14px;
  .number {
    background-color: white;
    line-height: 2.5;
    padding: 0 10px;
    position: fixed;
    top: 0;
    width: 100%;
  }
  .list {
    padding: 0 10px;
    padding-top: 50px;
    @media (max-width: 375px) {
      .item {
        margin-bottom: 20px;
        .time {
          color: #444;
          margin-bottom: 10px;
        }
        .info {
          color: white;
          padding: 10px 15px;
          background-repeat: no-repeat;
          background-size: 100%;
          margin: 0 10px;
          .name {
            font-size: 16px;
          }
          .price {
            display: flex;
            align-items: center;
            .new {
              font-size: 32px;
              margin-right: 10px;
            }
            .old {
              text-decoration-line: line-through;
              padding: 0;
            }
          }
          .exp_time {
            text-align: right;
          }
          .use {
            color: black;
            text-align: center;
            margin-top: 12px;
          }
        }
      }
    }
    @media (min-width: 414px) {
      .item {
        margin-bottom: 20px;
        .time {
          color: #444;
          margin-bottom: 10px;
        }
        .info {
          color: white;
          padding: 10px 15px;
          background-repeat: no-repeat;
          background-size: 100%;
          margin: 0 10px;
          .name {
            font-size: 16px;
          }
          .price {
            display: flex;
            align-items: center;
            margin-top: 5px;
            .new {
              font-size: 32px;
              margin-right: 10px;
            }
            .old {
              text-decoration-line: line-through;
              padding: 0;
            }
          }
          .exp_time {
            text-align: right;
          }
          .use {
            color: black;
            text-align: center;
            margin-top: 20px;
          }
        }
      }
    }
  }

  .qr_container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    .main {
      background-color: white;
      border-radius: 5px;
      text-align: center;
      padding: 10px 0;
      img {
        width: 90%;
      }
    }
  }
}
</style>

