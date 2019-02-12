<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk';
export default {
  name: 'app',
  mounted() {
    wx.config({
      appId: 'wx630c6b5030ce918b',
      // timestamp: new Date().getTime(),
      // nonceStr: 'xar_mall_wxweb',
      jsApiList: ['chooseWXPay','getLocation']
    })
    wx.ready(() => {
      wx.getLocation({
        success: function (res) {
          console.log(res)
        }
      });
    })
  }
}
</script>


<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  padding: 0;
  margin: 0;
}
a{
  text-decoration: none;
  color: inherit;
}
.pro_content {
  img {
    max-width: 100%;
    width: 100%;
  }
}
</style>
