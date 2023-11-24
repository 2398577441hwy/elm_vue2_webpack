<template>
  <div class="page">
    <transition name="mark"
      ><div class="mark" v-if="markShow"></div
    ></transition>
    <myHeader :goBack="true">
      <template v-slot:title>账户信息</template>
    </myHeader>
    <ul class="main">
      <li class="avatar">
        <p>头像</p>
        <span class="avatarimg"
          ><input type="file" @change="changeImg" ref="input">
          <img :src="avatar" /><svg
            width="20"
            height="20"
            data-v-c2d94162=""
            fill="#d8d8d8"
          >
            <use
              data-v-c2d94162=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#arrow-right"
            ></use></svg
        ></span>
      </li>
      <router-link to="/info/modifyuser" class="item">
        <p>用户名</p>
        <span
          ><span class="text">{{ username }}</span
          ><svg width="20" height="20" data-v-c2d94162="" fill="#d8d8d8">
            <use
              data-v-c2d94162=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#arrow-right"
            ></use></svg
        ></span>
      </router-link>
      <router-link class="item" to="/info/addAddress">
        <p>收货地址</p>
        <span
          ><svg width="20" height="20" data-v-c2d94162="" fill="#d8d8d8">
            <use
              data-v-c2d94162=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#arrow-right"
            ></use></svg
        ></span>
      </router-link>
      <li class="gap"><p>账号绑定</p></li>
      <li>
        <p><img src="" alt="" />手机</p>
        <span
          ><svg width="20" height="20" data-v-c2d94162="" fill="#d8d8d8">
            <use
              data-v-c2d94162=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#arrow-right"
            ></use></svg
        ></span>
      </li>
      <li class="gap">安全设置</li>
      <li>
        <p>登录密码</p>
        <span
          >修改<svg width="20" height="20" data-v-c2d94162="" fill="#d8d8d8">
            <use
              data-v-c2d94162=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#arrow-right"
            ></use></svg
        ></span>
      </li>
    </ul>
    <div class="loginOut" @click="loginOut">退出登录</div>

    <transition name="alertTip" mode="out-in">
      <section class="alertTip" v-if="markShow">
        <div class="icon">
          <div class="col"></div>
          <div class="dot"></div>
        </div>
        <h2>是否退出登录</h2>
        <div class="footer">
          <span style="background: #ccc" @click="notSure">再等等</span>
          <span style="background: #d8584a" @click="confirmOut">退出登录</span>
        </div>
      </section></transition
    >

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
export default {
  components: { myHeader },
  data() {
    return {
      username: this.$store.state.userinfo.username,
      markShow: false,
    };
  },
  computed: {
    avatar() {
      let url = "http://localhost:8001";
      url = url + "/img/" + this.$store.state.userinfo.avatar;
      return url;
    },
  },
  methods: {
    loginOut() {
      
      this.markShow = true;
    },
    changeImg(){
      // console.dir(this.$refs['input'].files[0])
      const data = new FormData()
      data.append('file',this.$refs['input'].files[0])
      console.log(data)
    },
    notSure(){
      this.markShow = false
    },
    confirmOut(){
      this.markShow = false
      this.$store.commit('OUTLOGIN')
      this.$router.push('/profile')
    }
  },
};
</script>

<style lang="less" scoped>
@import "@/style/info.less";
.page {
  position: absolute;
  z-index: 100;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
  // border:1px solid red;
}
.alertTip {
  h2 {
    position: absolute;
    top: 180px;
    width: 100%;
  }
  .footer {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 50px;
    bottom: 20px;
    // border: 1px solid black;
    span {
      // border: 1px solid red;
      padding-left: 20px;
      padding-right: 20px;
      line-height: 50px;
      border-radius: 10px;
      color: white;
    }
  }
  .icon {
    // 相对于最近的非static偏移
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    border: 2px solid orange;
    .col {
      position: absolute;
      left: 50%;
      top: 10px;
      height: 110px;
      width: 4px;
      transform: translateX(-50%);
      background: orange;
    }
    .dot {
      position: absolute;
      left: 50%;
      bottom: 15px;
      transform: translateX(-50%);
      width: 5px;
      height: 5px;
      background: orange;
    }
  }
  width: 350px;
  height: 300px;
  position: fixed;
  left: 10%;
  top: 30%;
  // transform: translate(-175px, -150px);
  background: white;
  border-radius: 5px;
  z-index: 200;
}
.alertTip-enter-active,
.alertTip-leave-active {
  transition: all .6s;
}
.alertTip-enter,
.alertTip-enter-to {
  animation: cartoon .6s;
}
.alertTip-leave,.alertTip-leave-to{
  animation: opacity .2s;
  opacity: 0;
}
@keyframes cartoon {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(.8);
  }
  50%{
    transform: scale(1.1);
  }
  75% {
    transform: scale(.9);
  }
  100% {
    transform: scale(1);
  }
}

.main {
  margin-bottom: 15px;
  .avatar {
    height: 80px;
    line-height: 80px;
    .avatarimg {
      position: relative;
      width: 80px;
      input{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        // border: 1px solid red;
        z-index: 100;
      }
      img {
        position: absolute;
        top: 10px;
        display: block;
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
      svg {
        display: block;
        position: absolute;
        right: 0;
        top: 30px;
      }
    }
  }
}
.loginOut {
  position: absolute;
  height: 35px;
  width: 90%;
  background: #d8584a;
  color: white;
  line-height: 35px;
  border-radius: 10px;
  left: 50%;
  transform: translateX(-50%);
}
</style>