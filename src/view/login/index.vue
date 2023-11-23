<template>
<!-- 
  1.登录后跳转到上一个页面
  2.用户信息存储到store上，并进行持久化存储
  2.进行账号（手机号）格式的验证
  3.密码，验证码不能为空
  4.封装弹框

 -->
  <div>
    <myHeader goBack="true">
      <template v-slot:title>
        密码登录
      </template>
    </myHeader>
    <form action="">
      <section>
        <input type="text" placeholder="账号" v-model="loginInfo.username"/>
      </section>
      <section>
        <input :type="showPassword ? 'text' : 'password'" placeholder="密码" v-model="loginInfo.password"/>
        <!-- change_to_right -->
        <transition name="changeStatus">
          <div class="circle_button" @click="changePs">
          <div :class="showPassword ? 'change_to_right' :'original'"></div>
          <span :class="showPassword ? 'change_to_right' :'original'">abc···</span>
        </div>
        </transition>
        
      </section>
      <section>
        <input type="text" placeholder="验证码" v-model="loginInfo.captcha_code"/>
        <div class="code" @click="changeCode">
          <img :src="codeImg" alt="" v-if="codeImg"/>
          <p>看不清</p>
          <p>换一张</p>
        </div>
      </section>
    </form>
    <p>温馨提示：未注册过的账号，登录时将自动注册</p>
    <p>注册过的用户可凭账号密码登录</p>
    <div class="loginup" @click="loginup">登录</div>
    <router-link  to="/forget" href="#">重置密码?</router-link>
    <transition name="alertTip">
      <alertText v-if="alertShow" @changeShow="changeShow" :alertValue="alertValue"/>
    </transition>
  </div>
</template>

<script>
import {code,login} from '@/service/getData'
import alertText from '../../components/alertText/index.vue'
import myHeader from '@/components/header/myHeader.vue'
export default {
  data(){
    return {
      codeImg:'',
      showPassword:false,
      alertShow:false,
      flag:false,
      alertValue:'',
      loginInfo:{
        username:'',
        password:'',
        captcha_code:''
      }
    }
  },
  components: {
    alertText,
    myHeader
  },
  created(){
    this.getCode()
  },
  methods:{
    async getCode(){
      const result = await code()
      this.codeImg = result.code
    },
    changeCode(){
      this.getCode()
    },
    changePs(){
      this.showPassword = !this.showPassword
    },
    changeShow(value){
      this.alertShow = value
      if(this.flag){
        this.loginInfo = {}
        this.$router.back()
      }
    },
    async loginup(){
       const reg = /^1[0-9]{10}$/
      if(reg.test(this.loginInfo.username)){
        const result = await login(this.loginInfo.username,this.loginInfo.password,this.loginInfo.captcha_code)
        this.$store.state.userinfo = result
        if(result.status == 0){
          this.alertValue = result.message
          this.alertShow = true
          this.flag = false
        }else{
          this.alertValue = '登录成功'
          this.$store.commit('SETUSERINFO',result)
          this.alertShow = true
          this.flag = true
        }
      }else{
        this.alertValue = '请输入正确的用户名格式'
        this.alertShow = true
        this.flag = false
      }
   }
  },
  mounted(){
    console.log(window.location.href)
  }
};
</script>

<style scoped lang="less">
@baseSize:4.14vw;
@keyframes move {
  0%{
    transform: translateX(0);
  }
  100%{
    transform: translateX((26 / @baseSize));
  }
}

@keyframes moveOrigin {
    0%{
    transform: translateX((26 / @baseSize));
  }
  100%{
    transform: translateX(0);
  }
}
form{
    // height: (165 / @baseSize);
    margin-top: (60 / @baseSize);
    section{
        position: relative;
        input{
            width: 100%;
            height: (54.25 / @baseSize);
            padding-left: (10 / @baseSize);
            outline: none;
            border: 0;
            border-bottom: 1px solid #e4e4e4;
        }
        .circle_button{
            position: absolute;
            right: (15 / @baseSize);
            top:(15 / @baseSize);
            span{
              color: white;
              border-radius: (8 / @baseSize);
              padding: 0 (3 / @baseSize);
              &.original{
                background: #ccc;
              }
              &.change_to_right{
                background: #4cd964;
              }
            }
            div{
              position: absolute;
              width: (28 / @baseSize);
              height: (28 / @baseSize);
              border-radius: 50%;
              background:#f1f1f1;
              top: (-3 / @baseSize);
              &.change_to_right{
                animation: move .3s forwards;
              }
              &.original{
                left: (-5 / @baseSize);
                animation: moveOrigin .3s forwards;
              }
            }
        }
        .code{
            position: absolute;
            width: (150 / @baseSize);
            right: (15 / @baseSize);
            top:(10 / @baseSize);
            height: (38 / @baseSize);
            // border: 1px solid black;
            img{
                position: absolute;
                left: 0;
                width: (90 / @baseSize);
                height: (38 / @baseSize);
            }
            p{
                position: absolute;
                right: 0;
                top:(-6 / @baseSize);
                font-size: (13 / @baseSize);
                // border:1px solid black;
                &:last-child{
                    // border:1px solid black;
                    top:(10 / @baseSize);
                    padding-top: (3 / @baseSize);
                    color:#3b95e9;
                }
            }
        }
    }
}

p{
    color: red;
    font-size: (12 / @baseSize);
    margin: (8 / @baseSize) (15 / @baseSize);
}
.loginup{
    width:(350 / @baseSize);
    height:(50 / @baseSize);
    background-color: #4cd964;
    border-radius: (10 / @baseSize);
    line-height: (50 / @baseSize);
    text-align: center;
    color:white;
    font-size: (18 / @baseSize);
    margin: (13 / @baseSize) auto;
}

a{
    position: absolute;
    margin-top: (20 / @baseSize);
    right: (15 / @baseSize);
    color:#3b95e9;
}
</style>