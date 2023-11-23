<template>
  <div class="page">
    <myHeader :goBack="true">
      <template v-slot:title> 搜索地址 </template>
    </myHeader>
    <div class="main">
      <form action="">
        <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="addressValue"/>
        <button @click.prevent="confirm">确认</button>
      </form>
      <div v-if="city.length==0">
        <p class="tip">为了满足商家的送餐要求,建议您从列表中选择地址</p>
        <section>
          <p>找不到地址</p>
          <p>请尝试输入小区,写字楼或学校名</p>
          <p>详细地址(如门牌号)可稍后输入哦</p>
      </section>
      </div>
      <div v-else class="citylist">
        <ul>
          <li v-for="(item,index) in city" :key="index" @click="goAddress(item)"><h3>{{item.title}}</h3><p>{{item.address}}</p></li>
        </ul>
      </div>
    </div>
    <alertText :alertValue="alertValue" v-if="alertValue" @changeShow="alertValue=''"></alertText>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import {searchAdress} from '@/service/getData.js'
import {getCityInfo} from '@/mixin/mixin.js'
import alertText from '@/components/alertText/index.vue'
import mockFetch from '@/config/mockFetch.js'
import {mapState} from 'vuex'
export default {
  components: {myHeader,alertText},
  data(){
    return{
        addressValue:'',
        city:[],
        alertValue:''
    }
  },
  methods:{
    // 做一下兼容性处理
    async confirm(){
      console.log(111111111)
      const city =await getCityInfo()
        const nodeReuslt = await searchAdress({city_id:city.id,keyword:this.addressValue})
        console.log(nodeReuslt)
        if(nodeReuslt.name){
          const mockResult =await mockFetch('/address')
          console.log(mockResult)
          this.city = mockResult.data.data
        }else{
          this.city = nodeReuslt
        }
    },
    goAddress(item){
      this.$store.commit('SETCURRENTADDRESS',item)
      this.$router.back()
    }
  }
};
</script>

<style scoped lang="less">
.page {
  position: absolute;
  z-index: 102;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
}
.citylist{
  text-align: left;
  background: white;
  li{
    height: 80px;
    padding-top: 15px;
    padding-left: 20px;
    border-bottom: 1px solid rgb(216, 215, 215);
    
  }
}
.main {
  margin-top: 50px;
  form {
    background: white;
    padding: 10px;
    input {
      padding-left: 10px;
      height: 40px;
      width: 80%;
      border-radius: 3px;
      border: 1px solid #d4d4d4;
    }
    button {
      width: 18%;
      height: 40px;
      background: #3190e8;
      color: white;
      border-radius: 3px;
      font-size: 16px;
      vertical-align: bottom;
    }
  }
  .tip {
    background: #fff6e4;
    color: #ff883f;
  }
  section {
    position: absolute;
    width: 100%;
    line-height: 23px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    color: rgb(160, 160, 160);
    // border: 1px solid black;
  }
}
</style>