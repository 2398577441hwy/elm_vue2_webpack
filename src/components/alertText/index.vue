<template>
  <div class="alertText">
    <div class="icon">
        <span></span>
        <span></span>
    </div>
    <p>{{alertValue}}</p>
    <div class="confirmButton" @click="confirmIt">确认</div>
  </div>
</template>

<script>
export default {
  methods:{
    confirmIt(){
      this.$emit('changeShow',false)
    }
  },
  props:['alertValue']
}
</script>

<style scoped lang="less">
.alertText{
  position: fixed;
  z-index: 100;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 330px;
  height: 230px;
  background: white;
  margin: auto;
  border-radius: 10px;
}
.icon{
  top: 15px;
  position: absolute;
  width: 130px;
  height: 130px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  border: 1px solid yellowgreen;
  span{
    position: absolute;
    display: block;
    &:first-child{
    left: 50%;
    top: 15px;
    width: 3px;
    height: 83px;
    transform: translateX(-50%);
    background: yellowgreen;
  }
  &:last-child{
    left: 50%;
    bottom: 20px;
    width: 5px;
    height: 5px;
    transform: translateX(-50%);
    background: yellowgreen;
  }
  }
}
p{
  position: absolute;
  display: block;
  width: 330px;
  // border:1px solid black;
  height: 30px;
  bottom: 50px;
  color: rgb(40, 37, 37);
  font-size: 20px;
}
.confirmButton{
  position: absolute;
  margin: 0 10px;
  bottom: 3px;
  width: 310px;
  height: 50px;
  font-size: 20px;
  background: rgb(3, 159, 55);
  border-radius: 5px;
  line-height: 50px;
  color: white;
}
</style>