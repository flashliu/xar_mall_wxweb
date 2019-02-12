import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
axios.interceptors.request.use(config => {
  const unionid = localStorage.getItem('unionid');
  config.data = {
    ...config.data,
    unionid,
  }
  return config
}, error => {
  return Promise.reject(error)
})

Vue.prototype.axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
