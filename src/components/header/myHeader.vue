<template>
  <header>
    <div class="go" @click="$router.go(-1)">
      <svg v-if="goBack" class="goback" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
      <slot name="go"></slot>
    </div>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="more">
      <slot name="more"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: "myHeader",
  props:['goBack']
};
</script>

<style lang='less' scoped>
@baseSize: 4.14vw;
header {
  position: fixed;
  top: 0;
  z-index:2;
  width: (414 / @baseSize);
  height: (50 / @baseSize);
  background-color: #3190e8;
  display: flex;
  justify-content: space-between;
  padding: (10 / @baseSize) (10 / @baseSize);
  line-height: (50 / @baseSize);
  color:white;
  .go {
    position: absolute;
    width: (30 / @baseSize);
    height: (30 / @baseSize);
    top:(15 / @baseSize);
  }
  .more {
    position: absolute;
    height: (30 / @baseSize);
    line-height: 30px;
    // border: 1px solid pink;
    right: (10 / @baseSize);
    width:(100 / @baseSize);
  }
  .title {
    flex: 1;
    padding-left:(30 / @baseSize);
    padding-right: (50 / @baseSize);
    // border:1px solid red;
    line-height: (30 / @baseSize);
  }
}
</style>