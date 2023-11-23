<template>
  <div class="page">
    <div v-if="!showLoading">
      <myHeader goBack="true">
        <template v-slot:title> 订单详情 </template>
      </myHeader>

      <div class="scrollcontainer">
        <div class="scrollinner">
          <div class="header">
            <div class="img" src="" alt="" />
            <h2>等待支付</h2>
            <span @click="goshop">再来一单</span>
          </div>
          <ul>
            <li class="shop" @click="goshop">
              <section>
                <img src="" alt="" /> {{ info._doc.restaurant_name }}
              </section>
              <svg
                width="20"
                height="20"
                data-v-9106692e=""
                fill="#333"
                class="arrow_right"
              >
                <use
                  data-v-9106692e=""
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#arrow-right"
                ></use>
              </svg>
            </li>
            <li v-for="(item, index) in info._doc.basket.group[0]" :key="index">
              <div class="title">{{ item.name }}</div>
              <section>
                <p class="num">×{{ item.quantity }}</p>
                <p>￥{{ item.price }}</p>
              </section>
            </li>
            <li>
              <section></section>
              <section class="price">
                实付{{ info._doc.total_amount }}.00
              </section>
            </li>
          </ul>

          <ul>
            <li>配送时间</li>
            <li>发送时间:{{ info.deliver_time }}</li>
            <li>送货地址:{{ info.consignee }}</li>
            <li>联系方式:{{ info.phone }}</li>
            <li>配送方式:峰鸟专送</li>
          </ul>

          <ul>
            <li>订单信息</li>
            <li>订单号:{{ info._doc.id }}</li>
            <li>支付方式:{{ info.pay_method }}</li>
            <li>下单时间:{{ info._doc.formatted_created_at }}</li>
          </ul>
        </div>
      </div>
    </div>
    <Loading :show="showLoading"/>
  </div>
</template>

<script>
import { orderDetail } from "@/service/getData.js";
import myHeader from "@/components/header/myHeader.vue";
import Loading from "@/components/loading/index.vue";
export default {
  data() {
    return {
      info: {},
      showLoading: true,
    };
  },
  components: { myHeader, Loading },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      const user_id = this.$store.state.userinfo.user_id;
      const order_id = Number.parseInt(this.$route.query.cart_id);
      const result = await orderDetail(user_id, order_id);
      this.info = result;
      this.showLoading = false
    },
    goshop() {
      const geohash = this.$store.state.geohash;
      const shop_id = this.info._doc.restaurant_id;
      this.$router.push({
        path: "/shop",
        query: {
          geohash,
          id: shop_id,
        },
      });
    },
  },
};
</script>

<style scoped lang="less">
.header {
  position: relative;
  margin-top: 50px;
  background: white;
  padding-top: 15px;
  //   overflow: hidden;
  .img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 1px solid #3190e8;
  }
  h2 {
    margin-top: 90px;
  }
  span {
    display: inline-block;
    border: 1px solid #3190e8;
    color: #3190e8;
    padding: 3px 8px;
    margin-top: 10px;
    margin-bottom: 15px;
    border-radius: 3px;
  }
}
.scrollcontainer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  overflow: auto;
}
ul {
  background: white;
  margin-top: 10px;
  li {
    display: flex;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
    height: 50px;
    // border: 1px solid red;
    line-height: 50px;
    img {
      width: 40px;
      height: 40px;
      background: pink;
      vertical-align: middle;
    }
    section {
      display: flex;
      .num {
        width: 80px;
        // border: 1px solid red;
        color: #ccc;
      }
    }
    .price {
      color: orange;
      font-size: 18px;
      font-weight: bold;
    }
  }
}
</style>