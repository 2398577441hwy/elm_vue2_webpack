<template>
  <div class="page">
    <myHeader :goBack="true">
        <template v-slot:title>
            编辑地址
        </template>
    </myHeader>
    <ul class="main">
        <router-link to="/info/addAddress/addressDetail" class="item"><p>新增地址</p><span><svg width="20" height="20" data-v-c2d94162="" fill="#d8d8d8">
            <use
              data-v-c2d94162=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#arrow-right"
            ></use></svg
        ></span></router-link>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader.vue'
export default {
    components:{
        myHeader
    }
}
</script>

<style scoped lang="less">
@import "@/style/info.less";
.page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  z-index: 102;
}
</style>