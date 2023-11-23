<template>
  <div class="page">
    <myHeader goBack="true">
      <template v-slot:title>选择发票抬头</template>
    </myHeader>
    <section @click="changeInvoice">
      <p>{{invoice?'需要开发票':'不需要开发票'}}</p>
      <svg width="20" height="20" data-v-7bae01d6="" class="" :fill="invoice ? '#4cd964' : '#999'"><use data-v-7bae01d6="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use></svg>
    </section>
    <button @click="$router.go(-1)">确定</button>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader.vue'
export default {
  components:{myHeader},
  data(){
    return{
      invoice:false
    }
  },
  methods:{
    changeInvoice(){
      this.invoice = !this.invoice
      this.$store.state.invoice = this.invoice
    }
  }
}
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
.page{
  z-index:101
}
section{
  margin-top: (60 / @baseSize);
  background: white;
  font-size: (20 / @baseSize);
  height: (80 / @baseSize);
  display: flex;
  justify-content: space-between;
  padding: (30 / @baseSize) (12 / @baseSize);
}
button{
  background: #4cd964;
  width: 95%;
  height: (50 / @baseSize);
  border-radius: (10 / @baseSize);
  color: white;
  margin-top: (10 / @baseSize);
}
</style>