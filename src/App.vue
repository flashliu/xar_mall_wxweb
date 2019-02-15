<template>
  <div id="app">
    <div class="body">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <div class="tabBar">
      <router-link to="/" class="item">商品</router-link>
      <router-link to="/cardlist" class="item">卡包</router-link>
    </div>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
export default {
  name: 'app',
  async mounted() {
    const res = await this.axios.post('/api/v2/wechat_public_account/jssdk', {
      url: location.href.split('#')[0]
    })
    wx.config({
      ...res.data.data,
      debug: false,
      jsApiList: ['chooseWXPay', 'getLocation']
    })
    wx.ready(() => {
      const location = localStorage.getItem('location')
      if (!location) {
        wx.getLocation({
          success: function (location) {
            localStorage.setItem('location', JSON.stringify(location))
          }
        });
      }
    })

  }
}
</script>


<style lang="less">
#app {
  font-family: Arial, "Avenir", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
.pro_content {
  img {
    max-width: 100%;
    width: 100%;
  }
}
.body {
  height: 93vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #f3f3f3;
}
.tabBar {
  display: flex;
  height: 7vh;
  line-height: 7vh;
  text-align: center;
  z-index: 0;
  position: relative;
  .item {
    display: block;
    height: 100%;
    flex: 1;
  }
}
</style>
