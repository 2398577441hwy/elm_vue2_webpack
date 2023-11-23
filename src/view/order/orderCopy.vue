<template>
  <div>
    <div v-if="!showLoading">
      <myHeader goBack="true">
        <template v-slot:title> 订单页面 </template>
      </myHeader>

      <ul class="main">
        <li v-for="item in orderlist" :key="item.id">
          <div class="mainContent">
            <section class="left">
              <img src="" alt="" />
              <div>
                <hgroup>
                  <h3 @click="goOrderDetail(item.id)">
                    {{ item.restaurant_name }}>
                  </h3>
                  <p>{{ item.formatted_created_at }}</p>
                </hgroup>
                <p>1231等3件商品</p>
              </div>
            </section>
            <section class="right">
              <p>{{item.status_bar.title}}</p>
              <div class="price">￥{{ item.total_amount }}.00</div>
            </section>
          </div>
          <div class="footer">
            <Timer v-if="item.status_bar.title=='等待支付'" :goTime="item.time_pass"></Timer><span v-else>再来一单</span></div>
        </li>
      </ul>
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>

    <Loading :show="showLoading" />
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import myHeader from "@/components/header/myHeader.vue";
import Loading from "@/components/loading/index.vue";
import Timer from '@/components/Timer/index.vue'
import { orderlist } from "@/service/getData.js";
export default {
  components: { myHeader, Loading ,Timer},
  data() {
    return {
      orderlist: [],
      showLoading: true,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    goOrderDetail(id) {
      this.$router.push({
        path: "/order/orderDetail",
        query: {
          cart_id: id,
        },
      });
    },
    async initData() {
      const user_id = this.$store.state.userinfo.user_id;
      console.log(user_id);
      if (user_id) {
        const result = await orderlist(user_id);
        this.orderlist = result;
        this.showLoading = false;
      } else {
        console.log("用户不存在");
      }
    },
  },
};
</script>

<style scoped lang="less">
.main {
  margin-top: 50px;
  li {
    background: white;
    margin-bottom: 10px;
    .mainContent {
      height: 120px;
      display: flex;
      justify-content: space-between;
      padding: 15px 15px;
      .left {
        display: flex;
        img {
          width: 50px;
          height: 50px;
          background: pink;
        }
        div {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          margin-left: 5px;
          hgroup {
            p {
              font-size: 13px;
              color: #ccc;
              padding-top: 3px;
            }
          }
        }
        h3 {
          font-weight: normal;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price {
          font-weight: bold;
          color: #f60;
          font-size: 18px;
        }
      }
    }
    .footer {
      text-align: right;
      margin-right: 15px;
      margin-bottom: 10px;
      padding-bottom: 12px;
      span {
        padding: 3px 5px;
        border: 1px solid #3190e8;
        color: #3190e8;
        border-radius: 5px;
      }
    }
  }
}
</style>