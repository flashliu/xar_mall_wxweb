<template>
  <div class="home">
    <div class="searchBar">
      <input type="text" placeholder="请输入商品名称进行搜索">
      <div class="btn">搜索</div>
    </div>
    <div class="advance">
      <div class="title">热门搜索</div>
      <div class="item">洗车卡</div>
      <div class="item">保养卡</div>
      <div class="item">做漆卡</div>
      <div class="item">美容卡</div>
      <div class="item">车用品</div>
      <div class="item">0-100</div>
      <div class="item">100-300</div>
      <div class="item">300-500</div>
      <div class="item">1000以上</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
<style lang="less" scoped>
.home {
  .searchBar {
    display: flex;
    padding: 10px;
    align-items: center;
    border-bottom: solid 1px #eee;
    input {
      background-color: #f6f7f8;
      color: #5f5f5f;
      outline: none;
      border: none;
      display: block;
      flex: 1;
      height: 30px;
      line-height: 30px;
      padding-left: 10px;
    }
    .btn {
      font-size: 14px;
      margin-left: 10px;
      border-radius: 5px;
      padding: 0 20px;
      color: #9b9b9b;
      border: solid 1px #dfdfdf;
      box-sizing: border-box;
      height: 30px;
      line-height: 30px;
    }
  }
  .advance{
    padding: 0 10px;
    .title{
      padding-left: 24px;
      background-image: url('../assets/hot.png');
      background-repeat: no-repeat;
      background-position: left center;;
      background-size: 16px;
      padding-top: 15px;
      padding-bottom: 15px;
      border-bottom: solid 1px #eee;
    }
    .item{
      padding: 15px 0;
      border-bottom: solid 1px #eee;
      font-size: 14px;
    }
  }
}
</style>

