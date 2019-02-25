import Vue from 'vue'
import App from './App'
import Cube, { Toast } from 'cube-ui'
import router from './router'
import axios from 'axios'
Vue.use(Cube)
const loading = Toast.$create({
    txt: '加载中',
    mask: true,
    time: 0
})
router.beforeEach((to, from, next) => {
    if (to.name == 'home' && getQueryVariable('state') && getQueryVariable('state').indexOf('assess') >= 0) {
        next('/assess')
    }
    next()
})
axios.interceptors.request.use(async config => {
    if (config.url == "/api/v2/wechat_public_account/auth") {
        return config
    }
    loading.show()
    const unionid = await getUnionid()
    // const unionid = 'oeI0t1nMyDWIh8Hvhyb_R55LLDCg'
    const data = {
        ...config.data,
        unionid
    }
    config.data = data
    return config
}, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(async config => {
    loading.hide()
    return config
}, error => {
    return Promise.reject(error)
})
Vue.prototype.$axios = axios
Vue.prototype.$message = function (message, isSuccess) {
    const toast = this.$createToast({
        txt: message,
        time: 1500,
        type: isSuccess ? 'correct' : 'error'
    })
    toast.show()
}


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

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
                const state = window.location.hash.replace('#/', '')
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx630c6b5030ce918b&redirect_uri=https://wx.ynxar.com/used_car&response_type=code&scope=snsapi_userinfo&state=' + state + '#wechat_redirect'
            }
        }
    })
}
export function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}