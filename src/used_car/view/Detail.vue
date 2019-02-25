<template>
  <div class="detail">
    <div class="content">
      <div class="item">
        <div class="label">车型</div>
        <div class="name">{{model.brand_names}}</div>
      </div>
      <div class="item">
        <div class="label">车辆颜色</div>
        <div class="name">{{model.color}}</div>
      </div>
      <div class="item">
        <div class="label">车行驶里程</div>
        <div class="name">{{model.mileage}}</div>
      </div>
      <div class="item">
        <div class="label">上牌时间</div>
        <div class="name">{{model.licensing_time}}</div>
      </div>
      <div class="item">
        <div class="label">所在城市</div>
        <div class="name">{{model.address_text}}</div>
      </div>
      <!-- <div class="item">
        <div class="label">联系电话</div>
        <div class="name">{{model.customer_phone}}</div>
      </div> -->
      <div class="item">
        <div class="label">车主</div>
        <div class="name">{{model.vehicle_owner}}</div>
      </div>
    </div>

    <div class="content">
      <div class="item">
        <div class="label">车辆外观图片</div>
        <div class="imgs">
          <div class="img" v-for="item in model.img_exterior" :key="item">
            <img :src="item">
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">内饰图片</div>
        <div class="imgs">
          <div class="img" v-for="item in model.img_interiors" :key="item">
            <img :src="item">
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">机舱</div>
        <div class="imgs">
          <div class="img" v-for="item in model.img_engineroom" :key="item">
            <img :src="item">
          </div>
        </div>
      </div>
      <div class="item">
        <div class="label">尾箱图</div>
        <div class="imgs">
          <div class="img" v-for="item in model.img_trunk" :key="item">
            <img :src="item">
          </div>
        </div>
      </div>
      <div class="item" v-if="model.img_other && model.img_other.length>0">
        <div class="label">异常项</div>
        <div class="imgs">
          <div class="img" v-for="item in model.img_other" :key="item">
            <img :src="item">
          </div>
        </div>
      </div>
    </div>

    <div class="content" v-if="model.description || model.status_remark">
      <div class="item" v-if="model.description">
        <div class="label">车辆评估描述</div>
        <div class="name">{{model.description}}</div>
      </div>
      <div class="item" v-if="model.status_remark">
        <div class="label">车辆评估描述</div>
        <div class="name">{{model.status_remark}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'detail',
  data() {
    return {
      model: {}
    }
  },
  methods: {
    getInfo() {
      this.$axios.post('/api/usedcar/employeeassess/read', { assess_id: this.$route.params.id }).then(res => {
        this.model = res.data.data
      })
    },
  },
  created() {
    this.getInfo()
  }
}
</script>

<style lang="less" scoped>
.detail {
  padding: 10px;
  .content {
    background-color: white;
    margin-bottom: 10px;
    padding: 10px;
    .item {
      padding-bottom: 10px;
      .label {
        margin: 10px 0;
        color: #666;
        font-size: 14px;
      }
      .imgs {
        display: flex;
        flex-wrap: wrap;
        .img {
          width: 100px;
          height: 100px;
          padding: 5px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>


