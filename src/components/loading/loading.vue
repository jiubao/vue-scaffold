<template lang="html">
  <transition name="fade">
    <div class="loading-backdrop" v-show="show">
      <div class="loading-box loading-default loading-middle">
        <van-loading color="white" />
        <span class="loading-text">加载中...</span>
      </div>
    </div>
  </transition>
</template>

<script>
import { Loading } from 'vant'
export default {
  components: {
    [Loading.name]: Loading
  },
  props: {
    show: {
      default: false
    }
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.overflowHidden {
  overflow: hidden;
}
.loading-default {
  width: 120px; /* no */
  min-height: 120px; /* no */
  padding: 15px; /* no */
}
.loading-box {
  position: fixed;
  top: 50%;
  left: 50%;
  display: flex;
  color: #fff;
  font-size: 12px; /* no */
  line-height: 1.2;
  border-radius: 5px; /* no */
  word-break: break-all;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  transform: translate3d(-50%, -50%, 0);
  background-color: rgba(0, 0, 0, .7);
  z-index: 999999;
}
.loading-text {
  margin-top: 20px; /* no */
  display: inline-block;
  text-align: center;
}
.loading-backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: none;
  z-index: 999998;
}
</style>
