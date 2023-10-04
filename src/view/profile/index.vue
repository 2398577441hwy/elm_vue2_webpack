<template>
  <div>
    <header>
        <span>《</span>
                <h4 class="title">我的</h4>
    </header>
    <section class="info">
        <span class="myimg">
            <img src="@/asset/img/微信图片_20230819105738.jpg" alt="">
        </span>
        <hgroup>
            <div class="nav">
                <p>17832859744</p>
                <p><span></span>暂无绑定手机号</p>
            </div>
            <span class="more">></span>
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
        <li><hgroup><span class="tu"></span>我的订单</hgroup><span>></span></li>
        <li><hgroup><span class="tu"></span>积分商城</hgroup><span>></span></li>
        <li><hgroup><span class="tu"></span>饿了么会员卡</hgroup><span>></span></li>
    </ul>
    <ul class="moreinfo">
        <li><hgroup><span class="tu"></span>服务中心</hgroup><span>></span></li>
        <li><hgroup><span class="tu"></span>下载饿了么APP</hgroup><span>></span></li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
@import '@/style/bass.less';
@baseSize: 4.14vw;

header {
    width: 100%;
    height: (50 / @baseSize);
    background: #3190e8;
    display: flex;
    line-height: (50 / @baseSize);
    text-align: center;
    color: white;
    font-size: (20 / @baseSize);

    span {
        width: 10%;
    }

    h4 {
        width: 90%;
    }
}

.info {
    height: (99 / @baseSize);
    background: #3190e8;
    border-top: 1px solid white;
    padding: (15 / @baseSize) (10 / @baseSize);
    display: flex;

    img {
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
                        border:1px solid white;
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
    li{
        height: (47 / @baseSize);
        text-align: left;
        display: flex;
        line-height: (47 / @baseSize);
        hgroup{
            width: 90%;
            font-size: (18 / @baseSize);
            // border:1px solid black;
            padding-left: (10 / @baseSize);
            .tu{
                display: inline-block;
                width: (20 / @baseSize);
                height: (18 / @baseSize);
                border: 1px solid black;
                vertical-align: middle;
                margin-right: (8 / @baseSize);
            }
        }
        span{
            width: 10%;
            text-align: center;
        }
    }
}
</style>