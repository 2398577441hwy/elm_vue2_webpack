<template>
  <div>
    <myHeader>
      <router-link
        to="search"
        slot="go"
        style="position: absolute; width: 25px; height: 30px"
      >
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle
            cx="8"
            cy="8"
            r="7"
            stroke="rgb(255,255,255)"
            stroke-width="1"
            fill="none"
          />
          <line
            x1="14"
            y1="14"
            x2="20"
            y2="20"
            style="stroke: rgb(255, 255, 255); stroke-width: 2"
          />
        </svg>
      </router-link>

      <template v-slot:title> {{ title }} </template>

      <router-link
        to="profile"
        slot="more"
        style="position: absolute; right: 10px; top: 3px"
      >
        <svg width="25px" height="25px">
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
        <div class="swiper-slide" v-for="(list, index) in navList" :key="index">
          <ul>
            <li v-for="item in list" :key="item.id" @click="goSortShop(item)">
              <img :src="imgBaseUrl + item.image_url" alt="" />
              <span>{{ item.title }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="swiper-pagination"></div>
    </div>
    <div class="store">
      <header class="store-hd">
        <svg class="shop_icon" fill="gray">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#shop"
          ></use>
        </svg>
        <p>附近商家</p>
      </header>
      <shopList v-if="hasLocal" :geohash="geohash"></shopList>
    </div>
    <myFooter></myFooter>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import myFooter from "@/components/footer/myFooter.vue";
import shopList from "@/components/shoplist/index.vue";
// 相当于引入js
import Swiper from "swiper";
// 引入css
import "swiper/css/swiper.min.css";
import { homenav, cityGuess } from "@/service/getData.js";
import { mapState } from "vuex";
export default {
  components: { myHeader, myFooter, shopList },
  data() {
    return {
      navList: [],
      imgBaseUrl: "https://fuss10.elemecdn.com", //图片域名地址,
      local: null,
      hasLocal: false, //是否已经获取地理位置，成功之后再获取商铺信息
      title: "这是主页标题",
    };
  },
  computed: {
    ...mapState(["geohash"]),
  },
  mounted() {
    if (this.geohash) {
      this.getData();
      this.hasLocal = true;
    } else {
      this.getAdd();
    }
    if (this.$route.query.address) {
      this.title = this.$route.query.address;
    }
  },
  methods: {
    async getData() {
      // 处理导航数据
      let navList = await homenav(this.geohash);
      let tt = [];
      for (let i = 0, j = 0; i <= navList.length; j++, i += 8) {
        tt[j] = navList.splice(0, 8);
      }
      this.navList = tt;
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          // autoplay:true,
          pagination: {
            el: ".swiper-pagination",
          },
        });
      });
    },
    async getAdd() {
      this.local = await cityGuess();
      const addhash = this.local.latitude + "," + this.local.longitude;
      this.$store.commit("SETGEOHASH", addhash);
      this.hasLocal = true;
      this.getData();
    },
    goSortShop(item) {
      // console.log(this.$route)  restaurant_category_id   ??????
      const url = item.link;
      let hwy = "";
      let urlData = decodeURIComponent(
        url.split("=")[1].replace("&target_name", "")
      );
      if (/restaurant_category_id/gi.test(urlData)) {
        hwy = JSON.parse(urlData).restaurant_category_id.id;
      } else {
        hwy = "";
      }
      this.$router.push({
        path: "/sortShop",
        query: {
          geohash: this.geohash,
          title: item.title,
          restaurant_category_id: hwy,
        },
      });
    },
  },
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
}
</style>