<template>
  <div v-if="goods_info" class="detail">
    <div class="scroller">
      <swiper class="swiper">
        <swiper-slide v-for="item in goods_info.pro_img" :key="item.pro_id">
          <img :src="item">
        </swiper-slide>
      </swiper>
      <div class="info_item">
        <div class="price_salenum">
          <div class="price">
            <div class="new">
              <span>¥</span>
              {{goods_info.mall_price}}
            </div>
            <div class="old">¥ {{goods_info.market_price}}</div>
          </div>
          <div class="salenum">总销量{{goods_info.sales_total}}笔</div>
        </div>
        <div class="pro_name">{{goods_info.pro_name}}</div>
        <div class="pro_dep">{{goods_info.pro_dep}}</div>
      </div>
      <div class="info_item">
        <div class="title">商品介绍</div>
        <div class="pro_content" v-html="goods_info.pro_content"></div>
      </div>
    </div>
    <div class="buy_btn" @click="choosing = true">立即购买</div>
    <div v-if="choosing" class="dialog">
      <div class="main" :class="{animate:showMain}">
        <div class="name">
          支付选择
          <img @click="choosing = false" src="@/assets/close.png">
        </div>
        <div class="content">
          <div style="color:#cfcfcf">购买商品支付</div>
          <div style="margin:5px 0">¥ {{goods_info.mall_price}}</div>
          <div class="amount">商城账户：¥ {{user_money}}</div>
          <div class="pay_btn" @click="pay('wx_lite')">微信支付</div>
          <div class="pay_btn" @click="pay('money_bag')">余额支付</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import wx from 'weixin-js-sdk';
export default {
  name: 'detail',
  data() {
    return {
      goods_info: null,
      user_money: 0,
      choosing: false,
      showMain: false
    }
  },
  methods: {
    fetchData(id) {
      this.axios.post('/api/v2/mallvcard/getvcardgoodsinfo', { id }).then(res => {
        this.goods_info = res.data.data
      })
      this.axios.post('/api/api/zsalaryrecord/getbillrecord').then(res => {
        this.user_money = res.data.data.user_money;
      })
    },
    pay(pay_type) {
      const shop_orders = [
        {
          brand_id: this.goods_info.sup_brand_id || 0,
          goods: [
            {
              goods_id: this.goods_info.id,
              shop_id: 0,
              rg_id: 0,
              qrcode: 0,
              quantity: 1,
              superior_id: 0,
              second_id: 0
            }
          ]
        }
      ]

      this.axios.post('/api/v2/payment/pay', {
        pay_type,
        shop_orders,
        form_id: 0,
        voucher_id: 0,
        platform: 'pub',
      }).then(res => {
        if (res.data.status) {
          if (pay_type == 'wx_lite') {
            wx.chooseWXPay({
              timestamp: res.data.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: res.data.data.nonceStr, // 支付签名随机串，不长于 32 位
              package: res.data.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
              signType: res.data.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: res.data.data.paySign, // 支付签名
              success: () => {
                this.$router.push('/cardlist')
              }
            });
          } else {
            this.$router.push('/cardlist')
          }
        }
      })
    }
  },
  watch: {
    '$route.params.id'(id) {
      id && this.fetchData(id)
      if (id == undefined) {
        this.goods_info = null
      }
    },
    choosing(val) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.showMain = val
        }, 0);
      })
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created() {
    this.fetchData(this.$route.params.id)
  }
}
</script>

<style lang="less" scoped>
.detail {
  .scroller {
    background-color: #f3f3f3;
    height: 86vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .swiper {
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .info_item {
      padding: 10px;
      background-color: white;
      margin-bottom: 10px;
      .title {
        color: #9b9b9b;
      }
    }
    .price_salenum {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      .price {
        display: flex;
        align-items: center;
        .new {
          color: #fd3e08;
          font-size: 24px;
          margin-right: 10px;
          span {
            font-size: 14px;
          }
        }
        .old {
          color: #c9c9c9;
          font-size: 13px;
          text-decoration: line-through;
        }
      }
      .salenum {
        font-size: 13px;
        color: #9b9b9b;
      }
    }
    .pro_name {
      font-size: 18px;
    }
    .pro_dep {
      font-size: 12px;
      color: #02cca8;
      margin-top: 15px;
    }
  }
  .buy_btn {
    background-color: #e96740;
    color: white;
    height: 7vh;
    line-height: 7vh;
    text-align: center;
  }
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 7vh;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: flex-end;
    z-index: 100;
    .main {
      background-color: white;
      width: 100%;
      text-align: center;
      transition: all 0.3s;
      transform: translateY(100%);
      .name {
        padding: 15px;
        border-bottom: solid 1px #eee;
        position: relative;
        img {
          width: 20px;
          position: absolute;
          right: 15px;
        }
      }
      .content {
        padding: 15px 0;
        font-size: 15px;
        .amount {
          color: #fd7775;
        }
        .pay_btn {
          width: 60%;
          margin: 20px auto 0 auto;
          background: #f4ca2a;
          font-size: 14px;
          line-height: 2.5;
          border-radius: 5px;
        }
      }
    }
    .animate {
      transform: translateY(0);
    }
  }
}
</style>


