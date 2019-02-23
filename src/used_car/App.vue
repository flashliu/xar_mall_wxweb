<template>
  <div class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>

<style lang="less">
.app {
  background-color: #efeff4;
  height: 100vh;
  width: 100vw;
  overflow-y: scroll;
  // padding: 10px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
  a {
    text-decoration: none;
    color: inherit;
    font-size: inherit;
  }
  .relative {
    position: relative;
  }
  .cube-item {
    height: 46px;
    line-height: 46px;
    padding-left: 16px;
    color: #666;
    position: relative;
    background-color: white;
    font-size: 16px;
    .label {
      width: 110px;
      display: inline-block;
    }
    .value {
      font-size: 14px;
    }
    .placeholder {
      color: #ccc;
      font-size: 14px;
    }
  }
  .cubeic-arrow {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 5px;
    color: #ccc;
    line-height: 46px;
    font-size: 16px;
  }
  .form-custom .cube-form-item .cube-btn {
    padding-left: 0;
    padding-right: 0;
    text-align: left;
    font-size: 100%;
    color: inherit;
    background: none;
    border: none;
  }
  .cube-tab {
    padding: 14px 0;
  }
  .cube-item {
    a {
      display: block;
    }
  }
}
</style>

