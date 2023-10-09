<template>
  <div>
    <myHeader>
      <router-link to="search" slot="go">
        <svg width="100%" height="100%" style="margin-left:15%;margin-bottom:-12%;" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke: rgb(255, 255, 255); stroke-width: 2"/>
        </svg>
      </router-link>

      <template v-slot:title> 这是主页标题 </template>


      <router-link to="profile" slot="more">
        <svg width="70%" height="70%" style="margin-bottom:15%;">
        <use
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#user"
          fill="white"
        ></use>
      </svg>
      </router-link>
    </myHeader>
    <!-- vue2用的是swiper5
    
      swiper6,7,8主要针对vue3
     -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(list,index) in navList" :key="index">
          <ul>
            <li v-for="item in list" :key="item.id">
              <img :src="imgBaseUrl + item.image_url" alt="" /><span>{{item.title}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
    <div class="store">
      <header class="store-hd">
        <svg class="shop_icon" fill="gray">
	    			<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
	    	</svg>
        <p>附近商家</p>
      </header>
      <div class="store-bd">
        <ul>
          <li v-for="item in goodsList" :key="item.id" @click="goShop(item.id)">
            <img :src="'/img/' + item.image_path" alt="" />
            <hgroup>
              <header>
                <h5>{{item.name}}</h5>
                <pre>保 准 票</pre>
              </header>
              <section>
                <hgroup>
                  <i class="star">⭐⭐⭐⭐⭐</i>
                  <i>{{item.rating}}</i>
                  <span>月售{{item.recent_order_num}}单</span>
                </hgroup>
                <div>
                  <span>蜂鸟专送</span>
                  <span>准时达</span>
                </div>
              </section>
              <footer>
                <pre>￥{{item.float_minimum_order_amount}}起送 / {{item.piecewise_agent_fee.tips}}</pre>
                <div>
                  <pre>{{item.distance}} / </pre>
                  <span>{{item.order_lead_time}}</span>
                </div>
              </footer>
            </hgroup>
          </li>
        </ul>
      </div>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import myFooter from '@/components/footer/myFooter.vue'
// 相当于引入js
import Swiper from "swiper";
// 引入css
import "swiper/css/swiper.min.css";
import {homenav,homelist,cityGuess} from '@/service/getData.js'
export default {
  components: { myHeader,myFooter },
  data(){
    return {
      geohash:this.$store.state.geohash,
      navList:new Array(),
      goodsList:[],
      imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
    }
  },
  mounted() {
    new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
      },
    });
    if(this.geohash){
      this.getData()
    }else{
      this.getAdd()
    }
  },
  methods:{
    async getData(){
      // 处理导航数据
      const navList = await homenav(this.geohash)
      const l = navList.length / 8
      for(let i = 0;i < l; i++){
        this.navList[i] = new Array()
        for(let j = 0;j < 8; j++){
          this.navList[i][j] = navList[i * 8 + j]
        }
      }

      // 处理商家店铺
      const arr = this.geohash
      const latitude = arr[0]
      const longitude = arr[1]
     this.goodsList = await homelist(latitude,longitude)
    },
    async getAdd(){
      const local = await cityGuess()
      const addhash = local.latitude + ',' + local.longitude
      this.geohash = addhash
      this.$store.commit('SETGEOHASH',addhash)
      this.getData()
    },
    // 跳转到商铺页面
    goShop(id){
      this.$router.push({
        path:'/shop',
        query:{
          geohash:this.geohash,
          id
        }
      }) 
    }
  }
};
</script>

<style scoped lang="less">
// @import '@/style/bass.less';
@baseSize: 4.14vw;
.swiper-container {
  position: relative;
  top: (48 / @baseSize);
  width: (414 / @baseSize);
  height: (275 / @baseSize);
  background: white;
  ul {
    height: 88%;
    li {
      float: left;
      width: 25%;
      height: 50%;
      // border:1px solid black;
      img {
        display: block;
        height: 70%;
      }
      span {
        display: block;
        height: 30%;
        padding-top: (6 / @baseSize);
      }
    }
  }
}
.store {
  position: relative;
  margin-top: (60 / @baseSize);
  background: white;
  .store-hd {
    height: (43 / @baseSize);
    svg {
      display: block;
      float: left;
      margin-left: (16 / @baseSize);
      margin-top: (13 / @baseSize);
      width: (15 / @baseSize);
      height: (15 / @baseSize);
    }
    p {
      // border:1px solid black;
      width: 100%;
      height: (43 / @baseSize);
      line-height: (43 / @baseSize);
      margin-left: (40 / @baseSize);
      text-align: left;
    }
  }
  .store-bd {
    ul {
      li {
        position: relative;
        // border:1px solid black;
        margin: (5 / @baseSize);
        height: (90 / @baseSize);
        img {
          position: absolute;
          width: (70 / @baseSize);
          height: (70 / @baseSize);
          left: (10 / @baseSize);
          background: rgb(128, 223, 128);
        }
        hgroup {
          margin-left: (85 / @baseSize);
          margin-right: (10 / @baseSize);
          // border:1px solid black;
          header {
            height: (20 / @baseSize);
            h5 {
              float: left;
            }
            pre {
              float: right;
            }
          }
          section {
            width: 100%;
            height: (16 / @baseSize);
            position: relative;
            margin-top: (10 / @baseSize);
            hgroup {
              position: absolute;
              margin: 0;
              padding: 0;
              left: 0;
              width: 65%;
              text-align: left;
              font-size: (8 / @baseSize);
              .star {
                display: inline-block;
                font-size: (12 / @baseSize);
              }
              i {
                display: inline-block;
                font-size: (10 / @baseSize);
                color: rgb(243, 171, 37);
              }
              span {
                display: inline-block;
                font-size: (12 / @baseSize);
              }
            }
            div {
              position: absolute;
              right: 0;
              width: 35%;
              span {
                margin: 0;
                padding: (3 / @baseSize);
                font-size: (8 / @baseSize);
                &:first-child {
                  border: 1px solid #3190e8;
                  background: #3190e8;
                  color: white;
                }
                &:last-child {
                  border: 1px solid #3190e8;
                  color: #3190e8;
                }
              }
            }
          }
          footer {
            position: relative;
            height: (20 / @baseSize);
            margin-top: (6 / @baseSize);
            pre {
              position: absolute;
              padding: 0;
              margin: 0;
              left: 0;
              bottom: 0;
              width: 50%;
              font-size: (12 / @baseSize);
            }
            div {
              position: absolute;
              right: 0;
              bottom: 0;
              width: 45%;
              height: 100%;
              // border:1px solid black;
              pre {
                position: absolute;
                left: 0;
                font-size: (12 / @baseSize);
              }
              span {
                position: absolute;
                right: 0;
                font-size: (10 / @baseSize);
                color: #3190e8;
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