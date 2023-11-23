<template>
<!-- 修改密码成功  弹框  跳转到登录页面 -->
  <div>
    <myHeader goBack="true">
      <template v-slot:title>
        重置密码
      </template>
    </myHeader>
    <form action="">
      <section>
        <input type="text" placeholder="账号" v-model="form.username"/>
      </section>
      <section>
        <input type="text" placeholder="旧密码" v-model="form.oldpassWord"/>
      </section>
      <section>
        <input type="text" placeholder="请输入新密码" v-model="form.newpassword"/>
      </section>
      <section>
        <input type="text" placeholder="请确认密码" v-model="form.confirmpassword"/>
      </section>
      <section>
        <input type="text" placeholder="验证码" v-model="form.captcha_code"/>
        <div class="code">
          <img :src="codeImg" v-if="codeImg" alt="" />
          <p>看不清</p>
          <p @click="getCode">换一张</p>
        </div>
      </section>
    </form>
    <div class="loginup" @click="changepassword">确认修改</div>
    <alertText v-if="alertShow" :alertValue="alertValue" @changeShow="changeShow"/>
  </div>
</template>

<script>
import {code,modify} from '@/service/getData.js'
import alertText from '../../components/alertText/index.vue'
import myHeader from '@/components/header/myHeader.vue'
export default {
  data(){
    return {
      form:{
        username:'',
        oldpassWord:'',
        newpassword:'',
        confirmpassword:'',
        captcha_code:''
      },
      codeImg:'',
      alertShow:false,
      alertValue:'',
      flag:false
    }
  },
  components:{alertText,myHeader},
  mounted(){
    this.getCode()
  },
  methods:{
    async getCode(){
      const result =await code()
      this.codeImg = result.code
    },
    async changepassword(){
      if(/^1[0-9]{10}$/.test(this.form.username)){
        const result = await modify(this.form)
        if(result.status == 1){
          this.alertValue = result.success
          this.flag = true
        }else{
          this.alertValue = result.message
          this.flag = false
        }
      }else{
        this.alertValue = '请输入正确的用户名'
        this.flag = false
      }
      this.alertShow = true
    },
    changeShow(value){
      this.alertShow = value
      if(this.flag){
        this.form = {}
        this.$router.push('/login')
      }
    }
  }
};
</script>

<style scoped lang="less">
@import '@/style/header.less';
@baseSize:4.14vw;
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
            // border:1px solid black;
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
            // border:1px solid black;
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