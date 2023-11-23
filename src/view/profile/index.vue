<template>
  <div>
    <myHeader goBack="true">
        <template v-slot:title>
            我的
        </template>
    </myHeader>

    <section class="info" @click="userinfo.username ? $router.push('/info') : $router.push('/login')">
        <span class="myimg">
            <!-- http://localhost:3000/profile -->
            <img :src="`http://localhost:8001/img/${userinfo.avatar}`"  alt="" v-if="userinfo.avatar">
            <svg  v-else data-v-0fc4ab7a="" class="privateImage-svg"><use data-v-0fc4ab7a="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use></svg>
        </span>
        <hgroup>
            <div class="nav">
                <p>{{userinfo.username || '登录/注册'}}</p>
                <p><span>
                    <svg width="100%" height="100%" class="icon-mobile" fill="#fff">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                    </svg>
                </span>暂无绑定手机号</p>
            </div>
            <span class="more">
                <svg width="100%" height="100%" class="arrow-svg" fill="#fff">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                </svg>
            </span>
        </hgroup>
    </section>
    <nav class="nav">
        <div class="left">
            <p style="color:#f90 ;">0.00<span>元</span></p>
            <p>我的余额</p>
        </div>
        <div class="center">
            <p style="color: #ff5f3e;">3<span>个</span></p>
            <p>我的优惠</p>
        </div>
        <div class="right">
            <p style="color: #6ac20b;">0<span>分</span></p>
            <p>我的积分</p>
        </div>
    </nav>
    <ul class="moreinfo">
        <li><hgroup>
            <svg class="tu" fill="#4aa5f0" width="100%" height="100%">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
            </svg>
            我的订单</hgroup>
        <span>
            <svg width="30%" height="30%" class="arrow-svg" fill="gray">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
        </span></li>
        <li><hgroup>
            <svg class="tu" fill="#fc7b53" width="100%" height="100%">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
            </svg>
            积分商城</hgroup>
        <span>
            <svg width="30%" height="30%" class="arrow-svg" fill="gray">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
        </span></li>
        <router-link class="item" to="/vipcard"><hgroup>
            <svg class="tu" fill="#ffc636" width="100%" height="100%">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
            </svg>
            饿了么会员卡</hgroup>
        <span>
            <svg width="30%" height="30%" class="arrow-svg" fill="gray">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
        </span></router-link>
    </ul>
    <ul class="moreinfo">
        <li><hgroup>
            <svg class="tu" fill="#4aa5f0" width="100%" height="100%">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
            </svg>
            服务中心</hgroup>
        <span>
            <svg width="30%" height="30%" class="arrow-svg" fill="gray">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
        </span></li>
        <li><hgroup>
           <svg class="tu" fill="#4aa5f0" width="100%" height="100%">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
            </svg>
            下载饿了么APP</hgroup>
            <span>
                <svg width="30%" height="30%" class="arrow-svg" fill="gray">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
            </span></li>
    </ul>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader.vue'
export default {
    components:{myHeader},
    data(){
        return {
            userinfo:this.$store.state.userinfo
        }
    }
}
</script>

<style scoped lang="less">
@import '@/style/bass.less';
@baseSize: 4.14vw;


.info {
    margin-top: (50 / @baseSize);
    height: (99 / @baseSize);
    background: #3190e8;
    // border-top: 1px solid white;
    padding: (15 / @baseSize) (10 / @baseSize);
    display: flex;
    .privateImage-svg,img {
        width: (65 / @baseSize);
        height: (65 / @baseSize);
        border-radius: 50%;
    }

    hgroup {
        width: 100%;
        display: flex;
        justify-content: space-around;
        height: 100%;
        margin-left: (10 / @baseSize);
        .nav {
            width: 100%;
            height: (45 / @baseSize);
            color:white;
            p{
                margin:(10 / @baseSize);
                margin-bottom: (-7 / @baseSize);
                text-align: left;
                padding-left: (50 / @baseSize);
                &:first-child{
                    font-size: (20 / @baseSize);
                }
                &:last-child{
                    span{
                        display: inline-block;
                        width: (15 / @baseSize);
                        height: (20 / @baseSize);
                        // border:1px solid white;
                        margin-right: (5 / @baseSize);
                        vertical-align: text-bottom;
                    }
                }
            }
        }

        .more {
            color:white;
            width: (25 / @baseSize);
            height: (25 / @baseSize);
            line-height: (70 / @baseSize);
            font-size: (18 / @baseSize);
        }
    }
}
nav{
    height: (95 / @baseSize);
    // border:1px solid black;
    background: white;
    display: flex;
    div{
        width: 100%;
        // border:1px solid red;
        text-align: center;
        height:(65 / @baseSize);
        margin-top: (13 / @baseSize);
        p{
            &:first-child{
                font-size: (28 / @baseSize);
                font-weight: bold;
                span{
                    font-size: (15 / @baseSize);
                    color: black;
                    font-weight: normal;
                }
            }
            &:last-child{
                font-size: (12 / @baseSize);
                color:rgb(74, 74, 74);
                margin-top: (3 / @baseSize);
            }
        }
    }
}

.moreinfo{
    background: white;
    margin-top: (10 / @baseSize);
    li,.item{
        height: (47 / @baseSize);
        text-align: left;
        display: flex;
        color: rgb(66, 65, 65);
        line-height: (47 / @baseSize);
        hgroup{
            width: 90%;
            font-size: (18 / @baseSize);
            // border:1px solid black;
            padding-left: (6 / @baseSize);
            .tu{
                display: inline-block;
                width: (20 / @baseSize);
                height: (18 / @baseSize);
                // border: 1px solid black;
                vertical-align: text-top;
                // margin-right: (3 / @baseSize);
            }
        }
        span{
            width: 10%;
            text-align: center;
        }
    }
}
</style>