<template>
  <div class="home">
    <div class="cube-item" style="margin-bottom: 10px;">
      <router-link to="/orderhistory/0">
        售车申请记录
        <i class="cubeic-arrow"></i>
      </router-link>
    </div>
    <CarInfo :user='true' :model="model"></CarInfo>
    <cube-button class="submit" @click="submit">提交</cube-button>
  </div>
</template>
<script>
import CarInfo from '../components/CarInfo'
export default {
  name: 'home',
  data() {
    return {
      model: {
        brand_values: '',
        brand_names: '',
        color: '',
        mileage: '',
        licensing_time: '',
        address_code: '',
        address_text: '',
        customer_phone: '',
        vehicle_owner: ''
      }
    }
  },
  components: { CarInfo },
  methods: {
    submit() {
      this.$axios.post('/api/usedcar/customerassess/save', this.model).then(res => {
        if (res.data.status) {
          this.model = {
            brand_values: '',
            brand_names: '',
            color: '',
            mileage: '',
            licensing_time: '',
            address_code: '',
            address_text: '',
            customer_phone: '',
            vehicle_owner: ''
          }
        }
        this.$message(res.data.message, res.data.status)
      })
    },
  }
}
</script>
<style lang="less" scoped>
.home {
  padding: 10px;
}
.submit {
  margin-top: 10px;
}
</style>


