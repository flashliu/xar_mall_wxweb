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
          ></cube-upload>
        </div>
        <div class="item">
          <div class="title">内饰图片(不少于4张)</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_interiors"
            :action="{target:'/api/api/upload/upload'}"
          ></cube-upload>
        </div>
        <div class="item">
          <div class="title">机舱(不少于4张)</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_engineroom"
            :action="{target:'/api/api/upload/upload'}"
          ></cube-upload>
        </div>
        <div class="item">
          <div class="title">尾箱图(不少于4张)</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_trunk"
            :action="{target:'/api/api/upload/upload'}"
          ></cube-upload>
        </div>
        <div class="item">
          <div class="title">异常项</div>
          <cube-upload
            @file-success="uploadSuccess"
            v-model="model.img_other"
            :action="{target:'/api/api/upload/upload'}"
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
      <cube-button primary @click="showActive">结束评估</cube-button>
      <div style="width:20px;"></div>
      <cube-button @click="save">保存信息</cube-button>
    </div>
  </div>
</template>
<script>
import CarInfo from '../components/CarInfo'
export default {
  name: 'assessinfo',
  data() {
    return {
      model: {},
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
      })
    },
    showActive() {
      this.$createActionSheet({
        active: 0,
        data: [
          {
            content: '通过评估'
          },
          {
            content: '评估失败'
          }
        ],
        onSelect: (item, index) => {
          this.showPrompt(index)
        },
      }).show()
    },
    showPrompt(passed) {
      this.$createDialog({
        type: 'prompt',
        title: passed ? '失败原因' : '售卖价格',
        prompt: {
          value: '',
          placeholder: passed ? '请填写失败原因' : '请填写售卖价格'
        },
        onConfirm: (e, promptValue) => {
          if (passed) {
            this.pass(promptValue)
          } else {
            this.adopt(promptValue)
          }
        }
      }).show()
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
      file.url = file.response.data.full_path
    },
    filesAdded(files) {
      alert(JSON.stringify(files))
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
      })
    }
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


