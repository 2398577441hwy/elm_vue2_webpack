<template>
  <div>
    <header>
      <span>ele.me</span>
      <span>登录|注册</span>
    </header>
    <form action="">
      <section>
        <input type="text" placeholder="账号" v-model="loginInfo.username"/>
      </section>
      <section>
        <input :type="showPassword ? 'text' : 'password'" placeholder="密码" v-model="loginInfo.password"/>
        <!-- change_to_right -->
        <div class="circle_button" @click="changePs">
          <div :class="{change_to_right:showPassword}"></div>
          <span>abc</span>
        </div>
      </section>
      <section>
        <input type="text" placeholder="验证码" v-model="loginInfo.captcha_code"/>
        <div class="code" @click="changeCode">
          <img :src="codeImg" alt="" />
          <p>看不清</p>
          <p>换一张</p>
        </div>
      </section>
    </form>
    <p>温馨提示：未注册过的账号，登录时将自动注册</p>
    <p>注册过的用户可凭账号密码登录</p>
    <div class="loginup" @click="loginup">登录</div>
    <router-link  to="/forget" href="#">重置密码?</router-link>
  </div>
</template>

<script>
import {code,login} from '@/service/getData'
export default {
  data(){
    return {
      codeImg:'',
      showPassword:false,
      loginInfo:{
        username:'',
        password:'',
        captcha_code:''
      }
    }
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
    async loginup(){
      const result = await login(this.loginInfo.username,this.loginInfo.password,this.loginInfo.captcha_code)
      console.log(result)
   }
  },
  mounted(){
    console.log(window.location.href)
  }
};
</script>

<style scoped lang="less">
@import '@/style/header.less';
@baseSize:4.14vw;
form{
    // height: (165 / @baseSize);
    margin-top: (10 / @baseSize);
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
            div{
                position: absolute;
                width: (28 / @baseSize);
                height: (28 / @baseSize);
                right: (30 / @baseSize);
                top:(-1.93 / @baseSize);
                border-radius: 50%;
                background-color: rgb(220, 216, 216);
            }
            .change_to_right{
              position:absolute;
              right: (0 / @baseSize);
              transform: translateX(10px);
            }
            span{
                display: block;
                width: (40 / @baseSize);
                height:(20 / @baseSize) ;
                top:(15 / @baseSize);
                border-radius: (15 / @baseSize);
                background-color: gray;
                color:white;
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