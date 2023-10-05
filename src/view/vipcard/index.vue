<template>
  <div>
    <myHeader goBack="true">
      <template v-slot:title>会员中心</template>
    </myHeader>
    <div class="main">
      <nav>为账户<strong>1783285966</strong>购买会员</nav>
      <dl class="special">
        <dt><span>会员特权</span><span>会员说明 ></span></dt>
        <dd>
          <span></span>
          <hgroup>
            <h3>减免配送费</h3>
            <p>每月减免30单,每日可减免3单,每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </hgroup>
        </dd>
        <dd>
          <span></span>
          <hgroup>
            <h3>减免配送费</h3>
            <p>每月减免30单,每日可减免3单,每单最高减4元</p>
            <p>蜂鸟专送专享</p>
          </hgroup>
        </dd>
      </dl>
      <dl class="open">
        <dt>开通会员</dt>
        <dd><span>1个月<strong>￥20</strong></span><span class="buy">购买</span></dd>
      </dl>
      <dl class="other">
        <dd><span>兑换会员</span> <span>使用卡号卡密 ></span></dd>
        <dd><span>购买记录</span><span>开发票 ></span></dd>
      </dl>
    </div>
  </div>
</template>
<script>
import myHeader from '@/components/header/myHeader.vue'
export default {
  components:{myHeader}
}
</script>

<style scoped lang="less">
@baseSize:4.14vw;
.main{
    margin-top:(50 / @baseSize);
    text-align: left;
    nav{
      height:(52 / @baseSize);
      line-height: (52 / @baseSize);
      // background: greenyellow;
      padding-left: (10 / @baseSize);
    }
    dl{
      margin-top: (10 / @baseSize);
      background: white;
    }
    .special{
      dt{
        height: (52 / @baseSize);
        line-height: (52 / @baseSize);
        // background: pink;
        font-size: (18 / @baseSize);
        display: flex;
        justify-content: space-around;
        span{
          // border:1px solid black;
          width: 100%;
          padding-left: (10 / @baseSize);
          &:last-child{
            text-align: right;
            padding-right: (10 / @baseSize);
            font-size: (12 / @baseSize);
            color:gray;
          }
        }
      }
      dd{
        height: (100 / @baseSize);
        // background: rgb(248, 200, 227);
        display: flex;
        justify-content: space-between;
        span{
          display: block;
          width:(47 / @baseSize);
          height:(47 / @baseSize);
          border:1px solid red;
          padding-left: (10 / @baseSize);
          margin:(10 / @baseSize);
        }
        hgroup{
          flex:1;
          // border:1px solid black;
          padding: (10 / @baseSize);
          h3,p{
            margin-bottom: (3 / @baseSize);
          }
          p{
            color:gray;
            font-size: (10 / @baseSize);
          }
        }
      }
    }
    .open{
      padding-left: (10 / @baseSize);
      dt{
        height: (52 / @baseSize);
        line-height: (52 / @baseSize);
      }
      dd{
        height: (67 / @baseSize);
        line-height: (67 / @baseSize);
        // border:1px solid black;
        strong{
          color:#f60;
        }
        .buy{
          display: block;
          float: right;
          line-height: 0;
          margin-right: (10 / @baseSize);
          margin-top:(20 / @baseSize);
          padding:(10 / @baseSize) (10 / @baseSize);
          color:#f60;
          border:1px solid #f60;
          border-radius: (5 / @baseSize);
        }
      }
    }
    .other{
      dd{
        height: (52 / @baseSize);
        display: flex;
        justify-content: space-between;
        padding:0 (10 / @baseSize);
        line-height: (52 / @baseSize);
      }
    }
  }
</style>