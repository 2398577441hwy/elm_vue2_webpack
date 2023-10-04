<template>
  <div>
    <myHeader></myHeader>
    <!-- vue2用的是swiper5
    
      swiper6,7,8主要针对vue3
     -->
    <div class="swiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
          <ul>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
          </ul>
        </div>
        <div class="swiper-slide">
          <ul>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
            <li><img src="#" alt=""><span>甜品饮品</span></li>
          </ul>
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
  <div class="store">
    <header class="store-hd">
      <span></span>
      <p>附近商家</p>
    </header>
    <div class="store-bd">
      <ul>
        <li>
          <img src="#" alt="">
          <hgroup>
            <header>
              <h5>效果演示</h5>
              <pre>保 准 票</pre>
            </header>
            <section>
              <hgroup>
                <i class="star">⭐⭐⭐⭐⭐</i>
                <i>4.7</i>
                <span>月售106单</span>
              </hgroup>
              <div>
                <span>蜂鸟专送</span>
                <span>准时达</span>
              </div>
            </section>
            <footer>
              <pre>￥20起送 / 配送费约￥5</pre>
              <div>
                <pre>1349公里 / </pre>
                <span>14小时42分钟</span>
              </div>
            </footer>
          </hgroup>
        </li>
        <li>
          <img src="#" alt="">
          <hgroup>
            <header>
              <h5>效果演示</h5>
              <pre>保 准 票</pre>
            </header>
            <section>
              <hgroup>
                <i class="star">⭐⭐⭐⭐⭐</i>
                <i>4.7</i>
                <span>月售106单</span>
              </hgroup>
              <div>
                <span>蜂鸟专送</span>
                <span>准时达</span>
              </div>
            </section>
            <footer>
              <pre>￥20起送 / 配送费约￥5</pre>
              <div>
                <pre>1349公里 / </pre>
                <span>14小时42分钟</span>
              </div>
            </footer>
          </hgroup>
        </li>
        <li>
          <img src="#" alt="">
          <hgroup>
            <header>
              <h5>效果演示</h5>
              <pre>保 准 票</pre>
            </header>
            <section>
              <hgroup>
                <i class="star">⭐⭐⭐⭐⭐</i>
                <i>4.7</i>
                <span>月售106单</span>
              </hgroup>
              <div>
                <span>蜂鸟专送</span>
                <span>准时达</span>
              </div>
            </section>
            <footer>
              <pre>￥20起送 / 配送费约￥5</pre>
              <div>
                <pre>1349公里 / </pre>
                <span>14小时42分钟</span>
              </div>
            </footer>
          </hgroup>
        </li>
        <li>
          <img src="#" alt="">
          <hgroup>
            <header>
              <h5>效果演示</h5>
              <pre>保 准 票</pre>
            </header>
            <section>
              <hgroup>
                <i class="star">⭐⭐⭐⭐⭐</i>
                <i>4.7</i>
                <span>月售106单</span>
              </hgroup>
              <div>
                <span>蜂鸟专送</span>
                <span>准时达</span>
              </div>
            </section>
            <footer>
              <pre>￥20起送 / 配送费约￥5</pre>
              <div>
                <pre>1349公里 / </pre>
                <span>14小时42分钟</span>
              </div>
            </footer>
          </hgroup>
        </li>
        <li>
          <img src="#" alt="">
          <hgroup>
            <header>
              <h5>效果演示</h5>
              <pre>保 准 票</pre>
            </header>
            <section>
              <hgroup>
                <i class="star">⭐⭐⭐⭐⭐</i>
                <i>4.7</i>
                <span>月售106单</span>
              </hgroup>
              <div>
                <span>蜂鸟专送</span>
                <span>准时达</span>
              </div>
            </section>
            <footer>
              <pre>￥20起送 / 配送费约￥5</pre>
              <div>
                <pre>1349公里 / </pre>
                <span>14小时42分钟</span>
              </div>
            </footer>
          </hgroup>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
// 相当于引入js
import Swiper from "swiper";
// 引入css
import 'swiper/css/swiper.min.css'
export default {
  components: { myHeader },
  mounted() {
    new Swiper(".swiper-container", {
        pagination: {
          el: ".swiper-pagination",
        },
      });
  },
};
</script>

<style scoped lang="less">
// @import '@/style/bass.less';
@baseSize: 4.14vw;
.swiper-container{
  position: relative;
  top:(48 / @baseSize);
  width: (414 / @baseSize);
  height: (275 / @baseSize);
  background: white;
  ul{
    height: 88%;
    li{
      float: left;
      width: 25%;
      height: 50%;
      // border:1px solid black;
      img{
        display: block;
        height: 70%;
        background: pink;
      }
      span{
        display: block;
        height: 30%;
        padding-top: (6 / @baseSize);
        // border:1px solid black;
      }
    }
  }
}
.store{
  position: relative;
  margin-top: (60 / @baseSize);
  background: white;
  .store-hd{
    height: (43 / @baseSize);
    background: pink;
    span{
      display:block;
      float: left;
      margin-left: (8 / @baseSize);
      margin-top: (9 / @baseSize);
      width: (25 / @baseSize);
      height: (25 / @baseSize);
      background: rgb(115, 237, 115);
    }
    p{
      // border:1px solid black;
      width: 100%;
      height: (43 / @baseSize);
      line-height: (43 / @baseSize);
      margin-left: (40 / @baseSize);
      text-align: left;
    }
  }
  .store-bd{
    ul{
      li{
        position: relative;
        // border:1px solid black;
        margin:(5 / @baseSize);
        height: (90 / @baseSize);
        img{
          position: absolute;
          width: (70 / @baseSize);
          height: (70 / @baseSize);
          left:(10 / @baseSize);
          background: rgb(128, 223, 128);
        }
        hgroup{
          margin-left: (85 / @baseSize);
          margin-right: (10 / @baseSize);
          // border:1px solid black;
          header{
            height: (20 / @baseSize);
            h5{
              float: left;
            }
            pre{
              float: right;
            }
          }
          section{
            width: 100%;
            height: (16 / @baseSize);
            position: relative;
            margin-top: (10 / @baseSize);
            hgroup{
              position: absolute;
              margin:0;
              padding: 0;
              left: 0;
              width: 65%;
              text-align: left;
              font-size: (8 / @baseSize);
              .star{
                display: inline-block;
                font-size:(12 / @baseSize);
              }
              i{
                display: inline-block;
                font-size: (10 / @baseSize);
                color:rgb(243, 171, 37);
              }
              span{
                display: inline-block;
                font-size:(12 / @baseSize);
              }
            }
            div{
              position: absolute;
              right: 0;
              width: 35%;
              span{
                margin:0;
                padding: (3 / @baseSize);
                font-size: (8 / @baseSize);
                &:first-child{
                  border:1px solid #3190e8;
                  background: #3190e8;
                  color:white;
                }
                &:last-child{
                  border:1px solid #3190e8;
                  color: #3190e8;
                }
              }
            }
          }
          footer{
            position: relative;
            height: (20 / @baseSize);
            margin-top: (6 / @baseSize);
            pre{
              position: absolute;
              padding:0;
              margin:0;
              left: 0;
              bottom: 0;
              width: 50%;
              font-size: (12 / @baseSize);
            }
            div{
              position: absolute;
              right: 0;
              bottom:0;
              width: 45%;
              height: 100%;
              // border:1px solid black;
              pre{
                position: absolute;
                left: 0;
                font-size: (12 / @baseSize);
              }
              span{
                position: absolute;
                right: 0;
                font-size: (10 / @baseSize);
                color:#3190e8;
                bottom: 0;
              }
            }
          }
        }
      }
    }
  }
}
</style>