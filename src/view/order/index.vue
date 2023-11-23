<template>
  <div>
    <!-- 页面没有加载或者不是初次显示页面时，显示 -->
    <div v-show="!showLoading || showList">
          <myHeader goBack="true">
            <template v-slot:title> 订单页面 </template>
          </myHeader>
          <section class="mainBox" v-load-more="addData">
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
                    <p>{{ item.status_bar.title }}</p>
                    <div class="price">￥{{ item.total_amount }}.00</div>
                  </section>
                </div>
                <div class="footer">
                  <Timer
                    v-if="item.status_bar.title == '等待支付'"
                    :goTime="item.time_pass"
                  ></Timer
                  ><span v-else>再来一单</span>
                </div>
              </li>
            </ul>
          </section>
      <transition name="slide-fade">
        <router-view />
      </transition>
    </div>

    <Loading :show="showLoading" />
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import Loading from "@/components/loading/index.vue";
import Timer from "@/components/Timer/index.vue";
import { orderlist } from "@/service/getData.js";
import { loadMore } from "@/mixin/mixin.js";
import alertText from "@/components/alertText/index.vue";
export default {
  components: { myHeader, Loading, Timer, alertText },
  mixins: [loadMore],
  data() {
    return {
      orderlist: [],
      showLoading: true,
      requesting: false,
      limit: 10,
      offset: 0,
      showList: false,
      empty: false,
      alertShow: false,
    };
  },
  mounted() {
    this.initData();
  },
  watch: {
    empty: {
      handler(value) {
        if (value) this.alertShow = value;
      },
    },
  },
  methods: {
    addData() {
      // 列表到达底部，看是否在请求中，没有则去请求
      if (!this.requesting) {
        if (this.empty) return;
        this.requesting = true;
        this.showLoading = true;
        this.showList = true;
        this.offset = this.offset + 10;
        this.initData();
      }
    },
    goOrderDetail(id) {
      this.$router.push({
        path: "/order/orderDetail",
        query: {
          cart_id: id,
        },
      });
    },
    async initData() {
      console.log(this.offset);
      const user_id = this.$store.state.userinfo.user_id;
      if (user_id) {
        const result = await orderlist(user_id, this.limit, this.offset);
        if (!result.length) this.empty = true;
        this.orderlist = [...this.orderlist, ...result];
        this.showLoading = false;
        this.requesting = false;
      } else {
        console.log("用户不存在");
      }
    },
  },
};
</script>

<style scoped lang="less">
.mainBox {
  width: 100%;
  height: 846px;
  margin-top: 50px;
  overflow: auto;
}
.main {
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