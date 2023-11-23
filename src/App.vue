<template>
  <div id="app">
    <!-- 执行动画不占位置 mode="out-in" -->
    <transition name="router-slide" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>

    <transition name="router-slide" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"/>
    </transition>
    <iconSvg></iconSvg>
  </div>
</template>

<script>
import iconSvg from "./components/svg/mySvg.vue";
export default {
  name: "App",
  components: {
    iconSvg,
  },
};
</script>

<style lang='less'>
@import "@/style/bass.less";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
@baseSize:4.14vw;
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
a{
    text-decoration: none;
}
body{
    background:#f5f5f5;
    // border:1px solid black;
}
ul{
    list-style: none;
}
input{
  outline: none;
}
button{
  border: 0;
}
.page{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: #f5f5f5;
}

.mark {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0.3;
  z-index: 3;
}
.mark-enter-active,
.mark-leave-active {
  transition: opacity 0.2s;
}
.mark-enter,
.mark-leave-active {
  opacity: 0;
}
/* 进来的时候触发 */
.slide-fade-enter-active,.slide-fade-leave-active{
  transition:all .5s ease;
}
/* 从进来到离开的动画 */
.slide-fade-enter,.slide-fade-leave-to{
  transform: translateX(100px);
  opacity: 0;
}


.router-slide-enter-active,.router-slide-leave-active{
  transition:opacity .5s;
}
.router-slide-enter,.router-slide-leave-to{
  opacity: 0;
}


// 提示框弹出时的动画
.alertTip-enter-active,
.alertTip-leave-active {
  transition: all .6s;
}
.alertTip-enter,
.alertTip-enter-to {
  animation: cartoon .6s;
}
.alertTip-leave,.alertTip-leave-to{
  animation: opacity .2s;
  opacity: 0;
}
@keyframes cartoon {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(.8);
  }
  50%{
    transform: scale(1.1);
  }
  75% {
    transform: scale(.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
