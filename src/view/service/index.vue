<template>
 <div>
  <header>
        <span>《</span>
        <h4 class="title">服务中心</h4>
    </header>
    <nav>
        <div><span></span><p>在线客服</p></div>
        <div><span></span><p>在线客服</p></div>
    </nav>
    <section>
        <h4>热门问题</h4>
        <ul>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
            <li><span>超级会员权益说明</span><span>></span></li>
        </ul>
    </section>
 </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
@import '@/style/bass.less';
@baseSize:4.14vw;
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
nav{
    height: (103 / @baseSize);
    // border:1px solid black;
    display: flex;
    justify-content:space-between;
    text-align: center;
    background: white;
    div{
        // border:1px solid black;
        width: 100%;
        margin-top: (25 / @baseSize);
        span{
            display: inline-block;
            width: (25 / @baseSize);
            height: (25 / @baseSize);
            border:1px solid black;
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