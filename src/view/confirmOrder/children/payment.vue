<template>
  <div class="page">
    <myHeader goBack="true">
      <template v-slot:title> 确认订单 </template>
    </myHeader>
    <div class="timer">
        <p>支付剩余时间</p>
        <span>{{paytimer}}</span>
    </div>
    <p class="divider">选择支付方式</p>
    <ul>
        <li @click="pay=false"><img src="@/asset/img/weixin.webp" alt=""> 微信支付 <svg class="choose_icon" :fill="pay ? '#ccc':'#4cd964'">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select"></use>
                </svg></li>
        <li @click="pay=true"><img src="@/asset/img/zhifubao.jpg" alt=""> 支付宝支付 <svg class="choose_icon">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#select" :fill="pay ? '#4cd964':'#ccc'"></use>
                </svg></li>
    </ul>
    <button @click="confirmPay">确认支付</button>
    <alertText v-if="showAlert" :alertValue="mes" @changeShow="closeAlert"></alertText>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import alertText from '@/components/alertText/index.vue'
import {pay} from '@/service/getData.js'
export default {
    data(){
        return{
            pay:false,
            num:900,
            timer:null,
            showAlert:false,
            mes:'',
            goOrder:false
        }
    },
  components: { myHeader,alertText },
  created(){
    this.initData()
  },
  computed:{
    paytimer(){
        let mm = Number.parseInt(this.num / 60)
        if(mm < 10){
            mm = '0' + mm
        }
        let ss = Number.parseInt(this.num % 60)
        if(ss < 10){
            ss = '0' + ss
        }
        return '00 : ' + mm  +  ' : ' + ss
    }
  },
  
  methods:{
    async initData(){
        if(this.timer){
            clearInterval(this.timer)
        }
        this.timer = setInterval(()=>{
            if(this.num!=0){
                this.num--
            }else{
                console.log('支付超时')
            }
        },1000)

        const result = await pay()
        this.showAlert = true
        this.mes = result.message
    },
    closeAlert(){
        this.showAlert = false
        if(this.goOrder){
            this.$router.push('/order')
            // 此商店对应的购物车删除
        }
    },
    confirmPay(){
        this.showAlert = true
        this.mes = '当前环境无法支付，请打开官方APP进行付款'
        this.goOrder = true
    }
  }
};
</script>

<style scoped lang="less">
svg{
    position: absolute;
    width: 20px;
    height: 20px;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
}
button{
    width: 350px;
    height: 50px;
    font-size: 20px;
    background: #4cd964;
    color: white;
    border-radius: 10px;
    margin-top: 15px;
}
img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
}
.divider{
    padding-top: 5px;
    padding-left: 15px;
    padding-bottom: 5px;
    text-align: left;
}
.timer{
    margin-top: 50px;
    background: white;
    height: 150px;
    padding-top: 50px;
    span{
        font-size: 40px;
        font-weight: bold;
    }
}
ul{
    background: white;
    text-align: left;
    li{
        position: relative;
        height: 80px;
        padding-left: 15px;
        padding-top: 15px;
    }
}
</style>