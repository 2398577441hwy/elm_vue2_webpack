<template>
  <div class="page">
    <myHeader :goBack="true">
      <template v-slot:title>修改用户名</template>
    </myHeader>
    <div class="main">
      <input type="text" placeholder="输入用户名">
      <p>用户名只能修改一次(5-24字符之间)</p>
    </div>
    <button disabled>确认修改</button>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader.vue'
export default {
  components:{
    myHeader
  }
};
</script>

<style scoped lang="less">
.page{
  position: absolute;
  z-index: 101;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
}
.main{
  margin: 0;
  padding: 0;
  margin-top: 60px;
  text-align: left;
  padding-left: 10px;
  input{
    width: 95%;
    height: 40px;
    border: 1px solid gray;
    padding-left:10px;
    font-size: 18px;
    background: #f5f5f5;
  }
  p{
    margin-top: 5px;
    font-size: 12px;
    color: rgb(91, 91, 91);
  }
}
button{
    width: 80%;
    height: 40px;
    margin-top: 15px;
    font-size: 18px;
    color: white;
    background:#3190e8;
    border: 1px solid #3190e8;
  }
</style>