<template>
  <div>
    <transition name="mark"
      ><div v-if="markshow" class="mark" @click="showPayWay"></div
    ></transition>
    <myHeader goBack="true">
      <template v-slot:title> 确认订单 </template>
      <template v-slot:more>
        <svg
          data-v-cec0c0c0=""
          class="user_avatar"
          width="25"
          height="25"
          fill="white"
          style="position: absolute; right: 0"
        >
          <use
            data-v-cec0c0c0=""
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#user"
          ></use>
        </svg>
      </template>
    </myHeader>
    <div class="main" v-if="!show">
      <router-link class="address" to="/confirmOrder/chooseAddress">
        <svg data-v-4e0d5034="" class="location_icon" fill="#3190e8">
          <use
            data-v-4e0d5034=""
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#location"
          ></use>
        </svg>
        <p>{{ address }}</p>
        <svg data-v-4e0d5034="" class="address_empty_right" fill="gray">
          <use
            data-v-4e0d5034=""
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#arrow-right"
          ></use>
        </svg>
      </router-link>

      <section class="arriveTime">
        <div class="leftSection">送达时间</div>
        <div class="rightSection">
          <header>
            尽快送达<span
              style="display: inline-block; width: 20px; text-align: center"
              >|</span
            >预计{{ deliver_reach_time }}
          </header>
          <span class="flag">峰鸟专送</span>
        </div>
      </section>

      <section class="payMethods">
        <header>
          <p style="color: black; font-size: 18px">支付方式</p>
          <span @click="showPayWay"
            >在线支付
            <svg fill="gray" data-v-4e0d5034="" class="address_empty_right">
              <use
                data-v-4e0d5034=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use></svg
          ></span>
        </header>
        <footer>
          <p>红包</p>
          <span>暂时只在饿了么APP中支持</span>
        </footer>
      </section>

      <ul class="content">
        <li>
          <h3 style="color: black; font-size: 20px">
            <img src="" alt="" />{{ cart.restaurant_info.name }}
          </h3>
        </li>
        <li v-for="food in foodList" :key="food.id">
          <h3>{{ food.name }}</h3>
          <span
            style="flex: 1; text-align: right; margin-right: 30px; color: #f60"
            >× {{ food.quantity }}</span
          >
          <p>￥{{ food.price * food.quantity }}</p>
        </li>
        <li>
          <h3>餐盒</h3>
          <p>￥{{ cart.extra[0].price * cart.extra[0].quantity }}</p>
        </li>
        <li>
          <h3>配送费</h3>
          <p>￥{{ cart.deliver_amount }}</p>
        </li>
        <li>
          <h3>订单￥{{ cart.original_total }}</h3>
          <p style="color: #f60">待支付￥{{ cart.total }}</p>
        </li>
      </ul>

      <div class="remarks">
        <router-link
          :to="{ path: '/confirmOrder/remark', query: { cart_id: cart.id } }"
          class="remarkHeader"
          ><p>订单备注</p>
          <span
            >口味,偏好等
            <svg data-v-4e0d5034="" fill="#666" class="address_empty_right">
              <use
                data-v-4e0d5034=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use></svg></span
        ></router-link>
        <router-link to="/confirmOrder/invoice" class="remakrkFooter"
          ><p>发票抬头</p>
          <span
            >不需要开发票<svg
              data-v-4e0d5034=""
              fill="#666"
              class="address_empty_right"
            >
              <use
                data-v-4e0d5034=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#arrow-right"
              ></use></svg></span
        ></router-link>
      </div>
    </div>
    <loading :show="show" />
    <footer class="footer">
      <p>待支付</p>
      <span @click="getOrder">确认下单</span>
    </footer>
    <transition name="pay-slide" mode="out-in">
      <dl class="paymethods" v-if="markshow">
        <dt>支付方式</dt>
        <dd
          v-for="(item, index) in payments"
          :key="index"
          :class="{ active: item.select_state != -1 }"
        >
          <p>
            {{ item.name
            }}<span v-if="item.select_state != 1">{{ item.description }}</span>
          </p>
          <svg
            data-v-4e0d5034=""
            class="address_empty_right"
            :fill="item.select_state != -1 ? '#4cd964' : '#999'"
          >
            <use
              data-v-4e0d5034=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#select"
            ></use>
          </svg>
        </dd>
      </dl>
    </transition>

    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import loading from "@/components/loading/index.vue";
import { buygoods, addCart } from "@/service/getData.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      foodList: [],
      cart: {},
      deliver_reach_time: "",
      payments: [],
      invoice: {},
      show: true,
      markshow: false,
    };
  },
  mounted() {
    this.goodsList();
  },
  components: { myHeader, loading },
  computed: {
    ...mapState(["cartList"]),
    address() {
      if (this.$store.state.shopAddress) {
        return this.$store.state.shopAddress.address;
      } else {
        return "";
      }
    },
    addressId() {
      if (this.$store.state.shopAddress) {
        return this.$store.state.shopAddress.id;
      } else {
        return "";
      }
    },
  },
  methods: {
    showPayWay() {
      this.markshow = !this.markshow;
    },
    async goodsList() {
      // 获取此商店的商品
      let arr = this.getEntities();
      if (arr.length!=0) {
        const shopid = this.$route.query.id || this.$store.state.shopinfo.id;
        const geohash = this.$route.query.geohash || this.$store.state.geohash;
        const result = await addCart(shopid, geohash, [arr]);
        this.cart = result.cart;
        this.deliver_reach_time = result.delivery_reach_time;
        this.payments = result.payments;
        this.invoice = result.invoice;
        this.foodList = result.cart.groups[0];
        this.show = false;
      }
    },
    getEntities() {
      let arr = [];
      const shopGoods = this.cartList[this.$route.query.id];
      // console.log(shopGoods);
      if (shopGoods) {
        Object.values(shopGoods).map((category) => {
          Object.values(category).map((item) => {
            Object.values(item).map((food) => {
              const obj = {
                attrs: [],
                extra: {},
                id: food.id,
                name: food.name,
                packing_fee: food.packing_fee,
                price: food.price,
                quantity: food.num,
                sku_id: food.sku_id,
                specs: food.specs,
                stock: food.stock,
              };
              arr.push(obj);
            });
          });
        });
      }
      return arr;
    },
    // 下单
    async getOrder() {
      const user_id = this.$store.state.userinfo.user_id;
      const cart_id = this.cart.id;
      const address_id = this.addressId;
      const restaurant_id = this.cart.restaurant_info.id;
      const geohash = this.$route.query.geohash || this.$store.state.geohash;
      const description = "备注";
      let arr = this.getEntities();
      const entities = [arr];
      const obj = {
        user_id,
        cart_id,
        address_id,
        restaurant_id,
        geohash,
        description,
        entities,
      };
      try {
        const result = await buygoods(obj);
        if (result.status == 1) {
          // 确认下单这里应该传个倒计时时间的
          this.$router.push("/confirmOrder/payment");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
.mark {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: black;
  opacity: 0.3;
  z-index: 3;
}
.mark-enter-active,
.mark-leave-active {
  transition: opacity 0.2s;
}
.mark-enter,
.mark-leave-active {
  opacity: 0;
}
.pay-slide-enter-active,
.pay-slide-leave-active {
  transition: all 0.2s linear;
}
.pay-slide-enter,
.pay-slide-leave-active {
  transform: translate3d(0, 120px, 0);
}
.paymethods {
  position: fixed;
  background: white;
  width: 100%;
  bottom: 0;
  z-index: 4;
  // border: 1px solid black;
  dt {
    line-height: (50 / @baseSize);
  }
  dt,
  dd {
    height: (50 / @baseSize);
    border: 1px solid white;
    // border: 1px solid red;
  }
  .address_empty_right {
    width: (20 / @baseSize);
    height: (20 / @baseSize);
  }
  dd {
    display: flex;
    justify-content: space-between;
    text-align: left;
    padding-left: (12 / @baseSize);
    padding-right: (20 / @baseSize);
    padding-top: (10 / @baseSize);
    color: gray;
    &.active {
      color: #3c3c3c;
    }
  }
}
svg {
  width: (25 / @baseSize);
  height: (25 / @baseSize);
}
.main {
  margin-top: (50 / @baseSize);
  .address {
    background: white;
    display: flex;
    justify-content: space-between;
    padding: (30 / @baseSize) (10 / @baseSize);
    height: (80 / @baseSize);
    font-size: (18 / @baseSize);
    p {
      flex: 1;
      text-align: left;
      padding-left: (10 / @baseSize);
      // border: 1px solid black;
    }
  }
  .arriveTime {
    background: white;
    margin-top: (10 / @baseSize);
    height: (100 / @baseSize);
    display: flex;
    .leftSection {
      flex: 1;
      line-height: (100 / @baseSize);
      font-size: (20 / @baseSize);
      font-weight: bold;
      border-left: (5 / @baseSize) solid #3190e8;
    }
    .rightSection {
      flex: 1;
      //   border: 1px solid black;
      text-align: right;
      margin-right: (15 / @baseSize);
      header {
        margin-top: (20 / @baseSize);
        font-size: (18 / @baseSize);
        color: #3190e8;
        // letter-spacing:3px;
      }
      .flag {
        display: inline-block;
        // border: 1px solid black;
        margin-top: (10 / @baseSize);
        padding: (1 / @baseSize) (5 / @baseSize);
        background: #3190e8;
        color: white;
        border-radius: (5 / @baseSize);
      }
    }
  }
  .payMethods,
  .remarks {
    margin-top: (10 / @baseSize);
    background: white;
    padding: 0 (10 / @baseSize);
    color: gray;
    header,
    footer,
    .remarkHeader,
    .remakrkFooter {
      display: flex;
      justify-content: space-between;
      height: (60 / @baseSize);
      line-height: (60 / @baseSize);
      color: #666;
      svg {
        vertical-align: middle;
        width: (15 / @baseSize);
        height: (15 / @baseSize);
      }
    }
  }
  .content {
    margin-top: (10 / @baseSize);
    background: white;
    li {
      display: flex;
      justify-content: space-between;
      padding: 0 (12 / @baseSize);
      height: (50 / @baseSize);
      line-height: (50 / @baseSize);
      color: #666;
      h3 {
        font-weight: normal;
        font-size: (18 / @baseSize);
      }
      img {
        width: (30 / @baseSize);
        height: (30 / @baseSize);
        background: pink;
        vertical-align: middle;
      }
    }
  }
  .remarks {
    p {
      font-size: (18 / @baseSize);
      color: #666;
    }
  }
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  height: (60 / @baseSize);
  line-height: (60 / @baseSize);
  font-size: (18 / @baseSize);
  display: flex;
  justify-content: space-between;
  color: white;
  p {
    flex: 1;
    background: #3c3c3c;
  }
  span {
    // flex: 1;
    background: #56d176;
    width: (130 / @baseSize);
    height: (60 / @baseSize);
  }
}
</style>