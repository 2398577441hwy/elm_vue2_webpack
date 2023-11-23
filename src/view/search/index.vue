<template>
  <div>
    <myHeader goBack="true">
      <template v-slot:go> </template>
      <template v-slot:title> 搜索 </template>
    </myHeader>
    <form action="">
      <input type="text" placeholder="请输入商家或美食名称" v-model="keyword" />
      <input type="submit" value="提交" @click.prevent="searchData" />
    </form>
    <section class="history" v-if="historyShow">
      <h4 style="text-align: left; padding-left: 12px">搜索历史</h4>
      <ul>
        <li v-for="(item, index) in historyList" :key="index">
          <p>{{ item }}</p>
          <span @click="$store.commit('CLEARHISTORYITEM', item)">×</span>
        </li>
      </ul>
      <p class="kong" @click="$store.commit('CLEARHISTORYLIST')">清空历史</p>
    </section>
    <section class="restaurantslist" v-else>
      <div v-if="restaurantsList.length!=0">
        <p class="title">商家</p>
        <ul>
          <li
            v-for="item in restaurantsList"
            :key="item.id"
            @click="goShop(item.id)"
          >
            <img src="" alt="" />
            <hgroup>
              <p class="header">
                {{ item.name }}
                <svg
                  data-v-3726cde6=""
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  width="24"
                  height="14"
                  class="pay_icon"
                >
                  <polygon
                    data-v-3726cde6=""
                    points="0,14 4,0 24,0 20,14"
                    style="fill: none; stroke: rgb(255, 96, 0); stroke-width: 1"
                  ></polygon>
                  <line
                    data-v-3726cde6=""
                    x1="1.5"
                    y1="12"
                    x2="20"
                    y2="12"
                    style="stroke: rgb(255, 96, 0); stroke-width: 1.5"
                  ></line>
                  <text
                    data-v-3726cde6=""
                    x="3.5"
                    y="9"
                    style="
                      fill: rgb(255, 96, 0);
                      font-size: 9px;
                      font-weight: bold;
                    "
                  >
                    支付
                  </text>
                </svg>
              </p>
              <p>月售 {{ item.recent_order_num }} 单</p>
              <p>
                {{ item.float_minumum_order_amount }}元起送 / 距离{{
                  item.distance
                }}
              </p>
            </hgroup>
          </li>
        </ul>
      </div>
      <div v-else>没有相关数据</div>
    </section>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import { searchRestaurants } from "@/service/getData.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      keyword: "",
      restaurantsList: [],
      historyShow: true,
    };
  },
  watch:{
    keyword:{
      handler(value){
        if(!value.trim()){
          this.restaurantsList = []
          this.historyShow = true
        }
      }
    }
  },
  components: { myHeader },
  computed: {
    ...mapState(["historyList"]),
  },
  methods: {
    async searchData() {
      const geohash = this.$store.state.geohash;
      const keyword = this.keyword.trim();
      if (keyword) {
        const result = await searchRestaurants(geohash, keyword);
        if (result.status !== 0) {
          this.restaurantsList = result;
          this.historyShow = false;
        }
        const index = this.historyList.indexOf(keyword);
        if (index == -1) {
          this.$store.commit("SETHISTORYLIST", keyword);
        }
      }
    },
    goShop(id) {
      this.$router.push({
        path: "/shop",
        query: {
          id,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
@import "@/style/bass.less";
@baseSize: 4.14vw;
form {
  margin-top: (60 / @baseSize);
  height: (70 / @baseSize);
  padding: (15 / @baseSize) (10 / @baseSize);
  background: white;
  display: flex;
  input {
    margin-right: (5 / @baseSize);
    height: (40 / @baseSize);
    font-size: (16 / @baseSize);
    font-weight: bold;
    border: 0;
    border-radius: (5 / @baseSize);
    outline: none;

    &:first-child {
      width: 80%;
      padding-left: (8 / @baseSize);
      background: #f2f2f2;
    }

    &:last-child {
      width: 20%;
      border: 0;
      background-color: #3190e8;
      color: white;
    }
  }
}

.history {
  line-height: (52 / @baseSize);
  h4 {
    height: (51 / @baseSize);
    color: gray;
    line-height: (51 / @baseSize);
    padding-left: (10 / @baseSize);
  }

  ul {
    background: white;
    font-size: (18 / @baseSize);
    li {
      width: 100%;
      height: (52 / @baseSize);
      padding-left: (10 / @baseSize);
      padding-right: (10 / @baseSize);
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgb(199, 197, 197);
    }
  }

  .kong {
    background-color: white;
    height: (52 / @baseSize);
    text-align: center;
    font-size: (20 / @baseSize);
    font-weight: bold;
    color: #3190e8;
  }
}
.restaurantslist {
  text-align: left;
  .title {
    height: 50px;
    line-height: 50px;
  }
  li {
    background: white;
    display: flex;
    padding: 15px;
    img {
      width: 50px;
      height: 50px;
      background: pink;
      margin-right: 8px;
    }
    hgroup {
      p {
        line-height: 20px;
        font-size: 14px;
      }
    }
  }
}
</style>