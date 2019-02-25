import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) { return pair[1]; }
  }
  return (false);
}

function getUnionid() {
  const unionid = localStorage.getItem('unionid');
  return new Promise(resolve => {
    if (unionid && unionid != 'undefined') {
      resolve(unionid)
    } else {
      if (getQueryVariable('code')) {
        axios.get('/api/v2/wechat_public_account/auth', {
          params: { code: getQueryVariable('code') }
        }).then(res => {
          localStorage.setItem('unionid', res.data.data.unionid)
          resolve(res.data.data.unionid)
        })
      } else {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx630c6b5030ce918b&redirect_uri=https://wx.ynxar.com/xar_mall_wx&response_type=code&scope=snsapi_userinfo#wechat_redirect'
      }
    }
  })
}
axios.interceptors.request.use(async config => {
  if (config.url == "/api/v2/wechat_public_account/auth") {
    return config
  }
  const unionid = await getUnionid()
  const location = JSON.parse(localStorage.getItem('location'))
  const data = {
    ...config.data,
    unionid
  }
  if (location) {
    data.lat = location.latitude
    data.lng = location.longitude
  }
  config.data = data
  return config
}, error => {
  return Promise.reject(error)
})
axios.interceptors.response.use(res=>{
  if(!res.data.status && res.data.message){
    alert(res.data.message)
  }
  return res
})
Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
