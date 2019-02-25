<template>
  <div class="carinfo">
    <div class="cube-item border-bottom-1px">
      <router-link to="/carbrand">
        <span class="label">车型</span>
        <span class="value" style="float:right;margin-right:30px;">选择车型</span>
        <i class="cubeic-arrow"></i>
      </router-link>
    </div>
    <div class="type_detail" v-if="typeInfo.length>0">
      <div class="item border-bottom-1px">
        <span class="label">品牌：</span>
        <span class="value">{{typeInfo[0]}}</span>
      </div>
      <div class="item border-bottom-1px">
        <span class="label">车系：</span>
        <span class="value">{{typeInfo[1]}}</span>
      </div>
      <div class="item border-bottom-1px">
        <span class="label">排量：</span>
        <span class="value">{{typeInfo[2]}}</span>
      </div>
      <div class="item border-bottom-1px">
        <span class="label">年份：</span>
        <span class="value">{{typeInfo[3]}}</span>
      </div>
      <div class="item border-bottom-1px">
        <span class="label">车型：</span>
        <span class="value">{{typeInfo[4]}}</span>
      </div>
    </div>
    <cube-form :model="model" class="form-custom">
      <cube-form-item :field="schema.fields[0]"></cube-form-item>
      <cube-form-item :field="schema.fields[1]"></cube-form-item>
      <cube-form-item :field="schema.fields[2]">
        <cube-button
          @click="showDatePicker"
          :style="model.licensing_time?'':'color:#ccc'"
        >{{model.licensing_time || schema.fields[2].props.placeholder}}</cube-button>
        <i class="cubeic-arrow"></i>
      </cube-form-item>
      <cube-form-item :field="schema.fields[3]">
        <cube-button
          @click="showCityPicker"
          :style="model.address_text?'':'color:#ccc'"
        >{{model.address_text || schema.fields[3].props.placeholder}}</cube-button>
        <i class="cubeic-arrow"></i>
      </cube-form-item>
      <cube-form-item v-if="user" :field="schema.fields[4]"></cube-form-item>
      <cube-form-item :field="schema.fields[5]"></cube-form-item>
    </cube-form>
  </div>
</template>
<script>
import events from '../events'
export default {
  name: 'carInfo',
  props: ['model','user'],
  computed: {
    typeInfo() {
      if (this.model && this.model.brand_names) {
        return this.model.brand_names.split(',')
      }
      return []
    }
  },
  data() {
    return {
      cityData: [],
      schema: {
        fields: [
          {
            type: 'input',
            modelKey: 'color',
            label: '车辆颜色',
            props: {
              placeholder: '请输入车辆颜色'
            }
          },
          {
            type: 'input',
            modelKey: 'mileage',
            label: '车行驶里程',
            props: {
              placeholder: '请输入车行驶里程'
            }
          },
          {
            type: 'input',
            modelKey: 'licensing_time',
            label: '上牌时间',
            props: {
              placeholder: '请选择上牌时间'
            }
          },
          {
            modelKey: 'address_code',
            label: '所在城市',
            props: {
              placeholder: '请选择所在城市'
            }
          },
          {
            type: 'input',
            modelKey: 'customer_phone',
            label: '联系电话',
            props: {
              placeholder: '请输入联系电话'
            }
          },
          {
            type: 'input',
            modelKey: 'vehicle_owner',
            label: '车主',
            props: {
              placeholder: '请输出车主姓名'
            }
          }
        ]
      },
    }
  },
  methods: {
    dateSelectHandler(date, selectedVal) {
      this.model.licensing_time = selectedVal.map(item => item < 10 ? '0' + item : item).join('-')
    },
    citySelectHandle(selectedVal, selectedIndex, selectedText) {
      this.model.address_code = selectedVal.join(',')
      this.model.address_text = selectedText.join(',')
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: '上牌时间',
          format: {
            year: 'YYYY年', month: 'MM月', date: 'D日'
          },
          min: new Date(2008, 7, 8),
          max: new Date(2020, 9, 20),
          value: new Date(),
          onSelect: this.dateSelectHandler
        })
      }
      this.datePicker.show()
    },
    showCityPicker() {
      this.addressPicker && this.addressPicker.show()
    },
    getCityData() {
      this.$axios.get('/api/v2/Citylevel/index').then(res => {
        this.addressPicker = this.$createCascadePicker({
          title: '所在城市',
          data: res.data.data,
          onSelect: this.citySelectHandle
        })
      })
    },
  },
  created() {
    this.getCityData()
    events.$on('carTypeChange', (brand_values, brand_names) => {
      this.model.brand_values = brand_values
      this.model.brand_names = brand_names
    })
  }
}
</script>

<style lang="less" scoped>
.type_detail {
  background-color: white;
  color: #888;
  font-size: 14px;
  line-height: 30px;
  .item {
    padding: 0 15px;
  }
}
</style>



