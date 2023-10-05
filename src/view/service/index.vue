<template>
 <div>
  <myHeader goBack="true">
    <template v-slot:title>
        服务中心
    </template>
  </myHeader>
    <nav>
        <div><svg data-v-1a228d92=""><use data-v-1a228d92="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#human"></use></svg><p>在线客服</p></div>
        <div><svg data-v-1a228d92=""><use data-v-1a228d92="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#phone"></use></svg><p>在线客服</p></div>
    </nav>
    <section>
        <h4>热门问题</h4>
        <ul>
            <li><span>超级会员权益说明</span>
            <span>
                <svg width="30%" height="30%" data-v-1a228d92="" fill="#999" class="arrow-svg"><use data-v-1a228d92="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
            </span></li>
            <li><span>超级会员权益说明</span>
            <span>
                <svg width="30%" height="30%" data-v-1a228d92="" fill="#999" class="arrow-svg"><use data-v-1a228d92="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
            </span></li>
            <li><span>超级会员权益说明</span>
            <span>
                <svg width="30%" height="30%" data-v-1a228d92="" fill="#999" class="arrow-svg"><use data-v-1a228d92="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
            </span></li>
            <li><span>超级会员权益说明</span>
            <span>
                <svg width="30%" height="30%" data-v-1a228d92="" fill="#999" class="arrow-svg"><use data-v-1a228d92="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
            </span></li>
            <li><span>超级会员权益说明</span>
            <span>
                <svg width="30%" height="30%" data-v-1a228d92="" fill="#999" class="arrow-svg"><use data-v-1a228d92="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
            </span></li>
            <li><span>超级会员权益说明</span>
            <span>
                <svg width="30%" height="30%" data-v-1a228d92="" fill="#999" class="arrow-svg"><use data-v-1a228d92="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use></svg>
            </span></li>
        </ul>
    </section>
 </div>
</template>

<script>
import myHeader from '@/components/header/myHeader.vue'
export default {
    components:{myHeader}
}
</script>

<style scoped lang="less">
@import '@/style/bass.less';
@baseSize:4.14vw;
nav{
    height: (103 / @baseSize);
    // border:1px solid black;
    display: flex;
    justify-content:space-between;
    text-align: center;
    background: white;
    margin-top: (50 / @baseSize);
    div{
        // border:1px solid black;
        width: 100%;
        margin-top: (25 / @baseSize);
        svg{
            display: inline-block;
            width: (25 / @baseSize);
            height: (25 / @baseSize);
            // border:1px solid black;
        }
    }
}

section{
    background-color: white;
    h4{
        height:(79 / @baseSize) ;
        text-align: left;
        font-size: (20 / @baseSize);
        font-weight: normal;
        padding-left: (15 / @baseSize);
        line-height: (79 / @baseSize);
    }
    ul{
        li{
          text-align: left;
            height: (53 / @baseSize);
            // border:1px solid black;
            line-height: (53 / @baseSize);
            display: flex;
            justify-content:space-around;
            color:gray;
            font-size: (16 / @baseSize);
            span{
                &:first-child{
                    width: 90%;
                    padding-left: (15 / @baseSize);
                }
                &:last-child{
                    width: 10%;
                    font-size: (18 / @baseSize);
                }
            }
        }
    }
}
</style>