<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
}
</style>
