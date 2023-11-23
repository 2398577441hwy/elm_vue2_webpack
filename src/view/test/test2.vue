<template>
  <div class="page">
    父组件
    <router-link to="/test2/test3">显示子组件</router-link>
    <div>
      <transition name="slide-fade"><router-view></router-view></transition>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.page{
  position: absolute;
  z-index: 100;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  background: greenyellow;
}
/* 进来的时候触发 */
.slide-fade-enter-active{
  transition:all 3s ease;
}
/* 从进来到离开的动画 */
.slide-fade-enter,.slide-fade-leave-to{
  transform: translateX(100px);
  opacity: 0;
}
</style>