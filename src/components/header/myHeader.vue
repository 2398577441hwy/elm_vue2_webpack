<template>
    <header>
        <span>ele.me</span>
        <span>登录|注册</span>
    </header>
</template>

<script>
export default {
  name:'myHeader'
}
</script>

<style lang='less' scoped>
@baseSize:4.14vw;
header{
    position: fixed;
    top:0;
    width: (414 / @baseSize);
    height: (50 / @baseSize);
    background-color:#3190e8;
    display: flex;
    justify-content: space-between;
    padding:0 (10 / @baseSize);
    line-height: (50 / @baseSize);
    span{
        color:white;
    }
}
</style>