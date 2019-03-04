<template>
  <div class="assessinfo">
    <cube-scroll style="height:calc(88vh - 10px)">
      <div class="cube-item" style="margin-bottom: 10px;">
        <router-link
          :to="{name:'orderhistory',params:{isEmployee:1,customer_id:model.customer_id}}"
        >
          用户申请列表
          <i class="cubeic-arrow"></i>
        </router-link>
      </div>
      <CarInfo :model="model" :disabled="$route.params.edit == 'false'"></CarInfo>
      <div class="items">
        <div class="item">
          <div class="title">车辆外观图片(不少于4张)</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_exterior"
            :action="{target:'/api/api/upload/upload'}"
            :process-file="processFile"
          ></cube-upload>
        </div>
        <div class="item">
          <div class="title">内饰图片(不少于4张)</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_interiors"
            :action="{target:'/api/api/upload/upload'}"
            :process-file="processFile"
          ></cube-upload>
        </div>
        <div class="item">
          <div class="title">机舱(不少于4张)</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_engineroom"
            :action="{target:'/api/api/upload/upload'}"
            :process-file="processFile"
          ></cube-upload>
        </div>
        <div class="item">
          <div class="title">尾箱图(不少于4张)</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_trunk"
            :action="{target:'/api/api/upload/upload'}"
            :process-file="processFile"
          ></cube-upload>
        </div>
        <div class="item">
          <div class="title">异常项</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_other"
            :action="{target:'/api/api/upload/upload'}"
            :process-file="processFile"
          ></cube-upload>
        </div>
      </div>
      <div class="items">
        <div class="item">
          <div class="title">车辆评估描述</div>
          <cube-textarea placeholder="请输入车辆评估描述" v-model="model.description"></cube-textarea>
        </div>
        <div class="item" v-if="model.status_remark">
          <div class="title">结束评估原因描述</div>
          <div class="content">{{model.status_remark}}</div>
        </div>
      </div>
      <div style="height:10px"></div>
    </cube-scroll>
    <div class="actions">
      <cube-button primary @click="showActive" :disabled="disabled">结束评估</cube-button>
      <div style="width:20px;"></div>
      <cube-button @click="save">保存信息</cube-button>
    </div>
  </div>
</template>
<script>
import CarInfo from '../components/CarInfo'
import compress from '../image'
export default {
  name: 'assessinfo',
  data() {
    return {
      model: {},
      disabled: false
    }
  },
  components: { CarInfo },
  methods: {
    getInfo() {
      this.$axios.post('/api/usedcar/employeeassess/read', { assess_id: this.$route.params.id }).then(res => {
        const data = res.data.data
        data.img_exterior = data.img_exterior.map(url => ({ url }))
        data.img_interiors = data.img_interiors.map(url => ({ url }))
        data.img_engineroom = data.img_engineroom.map(url => ({ url }))
        data.img_trunk = data.img_trunk.map(url => ({ url }))
        data.img_other = data.img_other.map(url => ({ url }))
        data.description = data.description || ''
        this.model = data
        this.$watch('model', () => {
          if (!this.disabled) {
            this.disabled = true
          }
        }, { deep: true })
        this.$nextTick().then(() => {
          this.disabled = false
        })
      })
    },
    showActive() {
      this.$createActionSheet({
        active: 0,
        data: [
          {
            content: '售卖'
          },
          {
            content: '不售卖'
          }
        ],
        onSelect: (item, index) => {
          this.showPrompt(index)
          this.$nextTick().then(() => {
            this.bindInputEvents()
          })
        },
      }).show()
    },
    bindInputEvents() {
      const inputs = document.querySelectorAll('input')
      inputs.forEach(item => {
        item.addEventListener('blur', () => {
          window.scroll(0, 0);
        })
      })
    },
    showPrompt(passed) {
      this.dialog = this.$createDialog({
        type: 'prompt',
        title: passed ? '失败原因' : '售卖价格',
        prompt: {
          value: '',
          placeholder: passed ? '请填写失败原因' : '请填写售卖价格'
        },
        onConfirm: (e, promptValue) => {
          this.dialog.remove()
          if (passed) {
            this.pass(promptValue)
          } else {
            this.adopt(promptValue)
          }
        },
        onCancel: () => {
          this.dialog.remove()
        }
      })
      this.dialog.show()
    },
    pass(status_remark) {
      this.$axios.post('/api/usedcar/employeeassess/disagree', {
        assess_id: this.$route.params.id,
        status_remark
      }).then(res => {
        this.$message(res.data.message, res.data.status)
        if (res.data.status) {
          setTimeout(() => {
            this.$router.replace('/assess')
          }, 1500);
        }
      })
    },
    adopt(evaluation) {
      this.$axios.post('/api/usedcar/employeeassess/agree', {
        assess_id: this.$route.params.id,
        evaluation
      }).then(res => {
        this.$message(res.data.message, res.data.status)
        if (res.data.status) {
          setTimeout(() => {
            this.$router.replace('/assess')
          }, 1500);
        }
      })
    },
    uploadSuccess(file) {
      this.disabled = true
      if (file.response.error) {
        file.status = 'error'
        alert(file.response.message)
      } else {
        file.url = file.response.data && file.response.data.full_path
      }
    },
    save() {
      const data = Object.assign({}, this.model)
      data.img_exterior = data.img_exterior.map(item => item.url)
      data.img_interiors = data.img_interiors.map(item => item.url)
      data.img_engineroom = data.img_engineroom.map(item => item.url)
      data.img_trunk = data.img_trunk.map(item => item.url)
      data.img_other = data.img_other.map(item => item.url)
      this.$axios.post('/api/usedcar/employeeassess/save', data).then(res => {
        this.$message(res.data.message, res.data.status)
        this.disabled = false
      })
    },
    processFile(file, next) {
      compress(file, {
        compress: {
          width: 600,
          height: 600,
          quality: 1,
        },
        type: 'file'
      }, next)
    },
  },
  beforeRouteEnter(to, from, next) {
    if (from.name == 'carbrand') {
      to.meta.isBack = true
    }
    next()
  },
  activated() {
    if (!this.$route.meta.isBack) {
      this.getInfo()
    }
  },
  mounted() {
    this.bindInputEvents()
  }
}

</script>
<style lang="less" scoped>
.assessinfo {
  padding: 10px;
}
.items {
  background-color: white;
  margin-top: 10px;
  padding: 10px;
  color: #666;
  .tips {
    color: #f56c6c;
    font-size: 14px;
  }
  .title {
    margin: 10px 0;
  }
  .content {
    padding: 5px 10px;
    font-size: 14px;
  }
}
.actions {
  display: flex;
  height: calc(12vh - 10px);
  box-sizing: border-box;
  padding-top: 10px;
}
</style>


