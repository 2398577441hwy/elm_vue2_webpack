<template>
  <div class="page">
    <myHeader goBack="true">
      <template v-slot:title>
        添加地址
      </template>
    </myHeader>
    <form action="">
      <p><label for="name" class="label">联系人</label><input type="text" id="name" placeholder="你的名字" v-model="addressInfo.name"></p>
      <p class="sex"><label class="label" style="margin-right:10px;"></label><input type="radio" id="man" name="sex" value="1" v-model="addressInfo.sex" checked><label for="man">先生</label>
        <input type="radio" id="women" name="sex" value="2" v-model="addressInfo.sex"><label for="women">女士</label>
      </p>
      <p class="flagP"><label for="phone" class="label">联系电话</label>
                                                  <input type="text" placeholder="你的手机号" v-model="addressInfo.phone"><span class="flag" @click="phone_bk_flag=true">+</span>
                     <section v-if="phone_bk_flag"><label class="label"></label><input type="text" placeholder="备选电话" v-model="addressInfo.phone_bk"></section>
                                                  </p>
      <p><label for="address" class="label">送餐地址</label><router-link class="router" to='/confirmOrder/chooseAddress/addAdress/searchAddress'>{{nowAddress ? nowAddress : '小区/写字楼/学校等'}}</router-link>
                              <label class="label"></label><input type="text" placeholder="详细地址(如门牌号等)" v-model="addressInfo.address_detail">
      </p>
      <p><label for="tag" class="label">标签</label><input type="text" placeholder="无/家/学校/公司" v-model="addressInfo.tag"></p>
    </form>

    <button @click="confirm">确定</button>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
    <alertText :alertValue="message" v-if="showAlert" @changeShow="changeShow"/>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader.vue'
import alertText from '@/components/alertText/index.vue'
import {mapState} from 'vuex'
import {addAdress} from '@/service/getData.js'
export default {
  data(){
    return {
      addressInfo:{
        name:'',
        sex:1,  //1男  2女
        phone:'',
        phone_bk:'',
        address:'',
        address_detail:'',
        tag:'',    //家  学校  公司
      },
      phone_bk_flag:false,
      message:'',
      showAlert:false,
      state:0
    }
  },
  computed:{
    ...mapState(['currentAddress']),
    nowAddress(){
      return this.currentAddress.address || ''
    },
    tag_type(){
      if(this.addressInfo.tag == '家'){
        return 1
      }else if(this.addressInfo.tag == '学校'){
        return 3
      }else if(this.addressInfo.tag == '公司'){
        return 4
      }else{
        return 0
      }
    }
  },
  
  methods:{
    async confirm(){
        const info = {
          user_id:this.$store.state.userinfo.user_id,
          address:this.nowAddress,
          address_detail:this.addressInfo.address_detail,
          geohash:this.$store.state.geohash,
          name:this.addressInfo.name,
          phone:this.addressInfo.phone,
          tag:this.addressInfo.tag,
          sex:this.addressInfo.sex,
          poi_type:0,
          phone_bk:this.addressInfo.phone_bk,
          tag_type:this.tag_type
        }
        const result = await addAdress(info)
        // 1 成功
        if(result.status){
          this.showAlert = true
          console.log(result)
          this.message = result.success
          this.state = 1
        }else{
          this.showAlert = true
          this.state = 0
          // 2 失败
          this.message = result.message
        }
    },
    changeShow(value){
      this.showAlert = value
      if(this.state){
        this.$router.go(-1)
      }
    }
  },
  components:{myHeader,alertText}
}
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
.page{
  z-index: 102;
}
form{
  margin-top: (60 / @baseSize);
  background: white;
  text-align: left;
  padding-left: (12 / @baseSize);
  label[class='label']{
    display: inline-block;
    width: (120 / @baseSize);
    font-size: (18 / @baseSize);
    // border:1px solid red;
  }
  input[type='text'],.router{
    width: (260 / @baseSize);
    height: (50 / @baseSize);
    margin-left: (12 / @baseSize);
    margin-top: (12 / @baseSize);
    border: 0;
    font-size: (18 / @baseSize);
    color: gray;
  }
  .sex{
    height: (50 / @baseSize);
    font-size: (18 / @baseSize);
    padding-top: (12 / @baseSize);
    input{
      margin-right: (3 / @baseSize);
    }
    label[for]{
      margin-right: (10 / @baseSize);

    }
  }
}
.flagP{
  position: relative;
  // border:1px solid red;
}
.flag{
  position: absolute;
  right: (20 / @baseSize);
  top:(15 / @baseSize);
  font-size: (30 / @baseSize);
  font-weight: normal;
  color:#3190e8;
}
button{
  background: #4cd964;
  width: 95%;
  height: (50 / @baseSize);
  border-radius: (10 / @baseSize);
  color: white;
  margin-top: (20 / @baseSize);
}
</style>