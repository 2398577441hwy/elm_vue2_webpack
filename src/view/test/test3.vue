<template>
  <div class="page">
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.page{
  position: absolute;
  z-index: 100;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  background: red;
}
li{
  // position: fixed;
  &:first-child{
    position: relative;
    width: 100%;
    background: pink;
    margin-top: 20px;
  }
}
</style>