<template>
  <div>
    <header>
        <span>《</span>
        <h4 class="title">大美女和哈士奇</h4>
    </header>
    <div class="main">
        <img src="../img/微信图片_20230819105738.jpg" alt="">
        <p class="desc">大美女和哈士奇</p>
        <section>
            <h5 class="nam">大美女和哈士奇</h5>
            <p>评分 <span>⭐⭐</span><span style="color: #f60;"> 4.8</span></p>
            <p>月售 10单 <i style="color:#f60">销售 ￥20起</i></p>
            <p>评论数 228 好评率 22%</p>
        </section>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@baseSize:4.14vw;
header{
    width: 100%;
    height: (50 / @baseSize);
    background: #3190e8;
    display: flex;
    line-height: (50 / @baseSize);
    text-align: center;
    color: white;
    font-size: (20 / @baseSize);
    span{
        width: 10%;
    }
    h4{
        width: 90%;
    }
}
.main{
    width: (414 / @baseSize);
    img{
        width: 100%;
    }
    .desc{
        font-size: (12 / @baseSize);
        color: gray;
        padding: (10 / @baseSize);
    }
    section{
        padding: (10 / @baseSize);
        h5{
            font-size: (20 / @baseSize);
            font-weight: normal;
        }
        p{
            margin-bottom: (3 / @baseSize);
        }
    }
}
</style>>

</style>