<template>
  <div class="page">
    <myHeader :goBack="true">
        <template v-slot:title>
            新增地址
        </template>
    </myHeader>
    <form class="main">
        <input type="text" placeholder="请填写你的姓名">
        <input type="text" placeholder="小区/写字楼/学校等" readonly @click="goSearchAdress">
        <input type="text" placeholder="请填写详细送餐地址">
        <input type="text" placeholder="请填写能够联系到您的手机号">
        <input type="text" placeholder="备用联系电话(选填)">
    </form>
    <div class="button" disabled>新增地址</div>
    <router-view></router-view>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader.vue'
export default {
    components:{myHeader},
    methods:{
        goSearchAdress(){
            this.$router.push('/info/addAddress/addressDetail/searchAdress')
        }
    }
}
</script>

<style scoped lang="less">
.page{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  z-index: 101;
}
.main{
    margin-top: 60px;
    background: white;
    padding: 1px 15px;
    padding-bottom: 10px;
    input{
        display: block;
        width: 100%;
        font-size: 14px;
        padding: 8px 10px;
        margin-top: 10px;
        border-radius: 10px;
        border: 1px solid #d9d9d9;
        background: #f5f5f5;
        outline: none;
    }
}
.button{
    position: absolute;
    background:#4cd964;
    color: white;
    width: 80%;
    padding: 8px;
    font-size: 18px;
    left: 50%;
    transform: translateX(-50%);
    top: 305px;
}
</style>