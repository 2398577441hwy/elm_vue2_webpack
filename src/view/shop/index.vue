<template>
  <div>
    <header class="header">
      <nav>
        <svg
          data-v-c8684834=""
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          @click="goBack()"
        >
          <polyline
            data-v-c8684834=""
            points="12,18 4,9 12,0"
            style="fill: none; stroke: rgb(255, 255, 255); stroke-width: 3"
          ></polyline>
        </svg>
      </nav>
      <img src="@/asset/img/微信图片_20230819105738.jpg" alt="" />
      <hgroup>
        <h1 class="title">火锅店</h1>
        <div class="center">
          <p>商家配送 / 分钟送达 / 配送费 ￥5</p>
          <p>公告：欢迎光临，用餐高峰期请提前下单，谢谢</p>
        </div>
      </hgroup>
      <div class="nav">
        <span class="logo">特</span>
        111 (APP专项)
        <span class="act"
          >三个活动
          <svg data-v-c8684834="" class="footer_arrow">
            <use
              data-v-c8684834=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#arrow-left"
            ></use>
          </svg>
        </span>
      </div>
    </header>
    <nav class="storenav">
      <span></span>
      <span
        :class="{ active: currentTag === 'food' }"
        @click="changeTag('food')"
        >商品</span
      >
      <span></span>
      <span></span>
      <span
        :class="{ active: currentTag === 'rating' }"
        @click="changeTag('rating')"
        >评价</span
      >
      <span></span>
    </nav>

    <div class="food" v-show="!showTag && !loadingShow">
      <div class="storemain">
        <div ref="columnContain" class="columnContain">
          <ul class="column">
            <li
              v-for="(item,index) in shopDetailList"
              :key="index"
              @click="navTarget(index)"
              :class="{ active: index === currentIndex }"
              :ref="item.id"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="detail" ref="detail">
          <div class="offsetparent" style="position: relative">
            <dl
              v-for="(list,index) in shopDetailList"
              :key="list.id"
              :ref="list.id"
              :class="index === currentIndex ? 'active' : ''"
            >
              <!-- :class="list.id === currentId ? 'active' : ''" -->
              <dt :class="index === currentIndex ? 'active' : ''">
                {{ list.name }} <span>{{ list.description }}</span>
              </dt>

              <dd v-for="item in list.foods" :key="item.id">
                <div class="img">
                  <span class="logo"></span>
                  <img src="@/asset/img/1.webp" alt="" />
                </div>
                <hgroup>
                  <strong>{{ item.name }}</strong>
                  <span
                    class="sign"
                    v-for="(attr, index) in item.attributes"
                    :key="index"
                    v-show="item.attributes.length > 0 && attr !== null"
                    >招聘</span
                  >
                  <p class="des">{{ item.description }}</p>
                  <p>{{ item.tips }}</p>
                  <span class="flag">{{ item.item_id }}</span>
                  <div class="footer">
                    <span
                      ><span class="price">￥{{ item.specfoods[0].price }}</span
                      >起</span
                    >
                    <myButton
                      :item="item"
                      :moveDot="moveDot"
                      @updataMyCart="updataMyCart(item)"
                      :shopid="$route.query.id"
                    ></myButton>
                  </div>
                </hgroup>
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <div class="cartfooter">
        <!-- cartlist -->
        <transition name="list">
          <dl class="cartlist" v-show="show">
            <dt>
              <p>购物车</p>
              <p @click="clearMyCart">
                <svg data-v-c8684834="">
                  <use
                    data-v-c8684834=""
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#cart-remove"
                  ></use>
                </svg>
                清空
              </p>
            </dt>
            <div class="cartmain">
              <dd v-for="item in myShopCart" :key="item.id">
                <h3>{{ item.name }}</h3>
                <div class="price">
                  ￥<strong>{{ item.price * item.num }}</strong>
                </div>
                <div class="svg">
                  <svg
                    data-v-c8684834=""
                    fill="#3190e8"
                    @click="reduceFood(item)"
                  >
                    <use
                      data-v-c8684834=""
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#cart-minus"
                    ></use>
                  </svg>
                  <div class="cart_num">{{ item.num }}</div>
                  <svg
                    data-v-c8684834=""
                    class="cart_add"
                    fill="#3190e8"
                    @click="addFood(item)"
                  >
                    <use
                      data-v-c8684834=""
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xlink:href="#cart-add"
                    ></use>
                  </svg>
                </div>
              </dd>
            </div>
          </dl>
        </transition>
        <transition name="bounce">
          <div
            :class="allnum === 0 ? 'outline' : 'outline active'"
            ref="cart"
            @click="show = !show"
          >
            <div :class="allnum === 0 ? 'maincolor' : 'maincolor active'">
              <svg data-v-c8684834="" class="cart_icon">
                <use
                  data-v-c8684834=""
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  xlink:href="#cart-icon"
                ></use>
              </svg>
            </div>
            <span v-show="allnum !== 0" class="flag">{{ allnum }}</span>
          </div>
        </transition>
        <hgroup>
          <h3>￥{{ allprice }}</h3>
          <p>配送费￥5</p>
        </hgroup>
        <button :class="allprice >= 20 ? 'active' : ''" @click="goConfirmOrder">
          {{ title }}
        </button>
      </div>
    </div>

    <div class="rating" v-show="showTag && ratingList.length != 0">
      <!-- 外壳 需要有高度 -->
      <div class="ratingmain" ref="ratingmain">
        <div class="inner">
          <header>
            <div class="ratingleft">
              <!-- ratingScore.overall_score.toFixed(1) -->
              <p>
                {{ Number.parseFloat(ratingScore.overall_score).toFixed(1) }}
              </p>
              <p>综合评价</p>
              <p>高于周边商家{{ ratingScore.compare_rating * 100 }}%</p>
            </div>
            <div class="ratingright">
              <p>
                服务态度
                <myStar class="mystar" :score="ratingScore.service_score" />
              </p>
              <p>
                菜品评价
                <myStar class="mystar" :score="ratingScore.food_score" />
              </p>
              <p>送达时间</p>
            </div>
          </header>

          <ul class="ratingTag">
            <li v-for="(item, index) in ratingTag" :key="index">
              {{ item.name }}({{ item.count }})
            </li>
          </ul>

          <ul class="ratingMenu">
            <li v-for="(item, index) in ratingList" :key="index">
              <img class="avatar" :src="getImgPath(item.avatar)" alt="" />
              <section class="ratingContent">
                <header>{{ item.username }}</header>
                <hgroup>
                  <div class="ratingstar">
                    {{ item.time_spent_desc
                    }}<myStar class="hwyStar" :score="item.rating_star" />
                  </div>
                  <main>
                    <div
                      class="group"
                      v-for="(t, index) in item.item_ratings"
                      :key="index"
                    >
                      <img
                        v-if="t.image_hash"
                        :src="getImgPath(t.image_hash)"
                        alt=""
                      />
                      <p>{{ t.food_name }}</p>
                    </div>
                  </main>
                </hgroup>
              </section>
              <div class="timer">{{ item.rated_at }}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <transition
      appear
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
      v-for="(item, index) in moveDot"
      :key="index"
    >
      <span class="move_dot" v-if="item">
        <svg class="move_liner">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#cart-add"
          ></use>
        </svg>
      </span>
    </transition>
    <Loading :show="loadingShow" />
  </div>
</template>

<script>
import {
  shoplist,
  ratingCategory,
  ratingScore,
  ratingList,
  cityGuess,
} from "@/service/getData.js";
import { mapState } from "vuex";
import { getImgPath } from "@/mixin/mixin.js";
import myButton from "@/components/button/index.vue";
import cartFooter from "@/components/buy_cart/index.vue";
import myStar from "@/components/star/index.vue";
import Loading from "@/components/loading/index.vue";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      currentId: null,
      shopDetailList: [],
      flagrefs: [],
      clickflag: false,
      timer: null,
      cartTimer: null,
      moveDot: [],
      elLeft: 0,
      elTop: 0,
      windowHeight: window.innerHeight,
      shopId: this.$route.query.id,
      myShopCart: [],
      show: false, //控制购物车的动画效果
      currentFood: {},
      firstCart: false,
      receiveInCart: false,
      currentTag: "food",
      showTag: false,
      ratingTag: [],
      ratingScore: {},
      ratingList: [],
      loadingShow: true,
      ratingreq: false,
      ratingScroll: null,
      offset:0,
      TopList:[],
      currentIndex:0,
      columnScroll:null,
      detailScroll:null,
      skilPosition:false
    };
  },
  mixins: [getImgPath],
  computed: {
    allnum() {
      return this.myShopCart.reduce((pre, next) => {
        return next.num + pre;
      }, 0);
    },
    allprice() {
      return this.myShopCart.reduce((pre, next) => {
        return pre + next.num * next.price;
      }, 0);
    },
    title() {
      if (this.allprice < 20) {
        return `还差￥${20 - this.allprice}起送`;
      } else {
        return `去结算`;
      }
    },
    ...mapState(["cartList"]),
  },
  mounted() {
    this.getData();
    this.$bus.$on("dotPostion", this.addcart);
  },
  created() {
    this.updataMyCart();
  },
  components: {myButton, cartFooter, myStar, Loading },
  watch: {
    // 上来选中column的active
    shopDetailList: {
      handler(newvalue) {
        newvalue.forEach((element) => {
          this.flagrefs.push(element.id);
        });
        this.currentId = newvalue[0].id;
      },
    },
    receiveInCart: {
      handler(value) {
        if (value) {
          console.log("receiveInCart:" + value);
          this.$refs.cart.classList.add("cartoon");
          if (this.cartTimer) {
            clearTimeout(this.cartTimer);
          }
          this.cartTimer = setTimeout(() => {
            this.$refs.cart.classList.remove("cartoon");
            this.receiveInCart = false;
          }, 600);
        }
      },
    },
    ratingList: {
      handler(value) {
        if (value.length != 0) {
          const ratingmain = this.$refs["ratingmain"];
            this.$nextTick(() => {
            this.ratingScroll = new BScroll(ratingmain, {
              probeType: 3,
              click: true,
            });
            this.ratingScroll.on("scroll", (pos) => {
              if (
                Math.abs(pos.y) + ratingmain.clientHeight >=
                ratingmain.children[0].clientHeight - 50
              ) {
                if (!this.ratingreq) {
                  this.offset += 10;
                  this.getRatingData();
                }
              }
            });
          });
        }
      },
    },
  },
  methods: {
    changeTag(value) {
      this.currentTag = value;
      if (value === "rating") {
        this.showTag = true;
        if (!this.ratingreq) {
          this.getRatingData();
        }
      } else {
        this.showTag = false;
      }
    },
    goBack() {
      this.$router.back();
    },
    async getRatingData() {
      this.loadingShow = true;
      this.ratingreq = true;
      const score = await ratingScore(this.$route.query.id);
      this.ratingScore = score;
      const category = await ratingCategory(this.$route.query.id);
      this.ratingTag = category;
      const list = await ratingList({
        restaurant_id: this.$route.query.id,
        offset: this.offset,
      });
      this.ratingList = [...this.ratingList, ...list];
      if (list.length >= 10) {
        this.loadingShow = false;
        this.ratingreq = false;
      }
    },
    updataMyCart(item) {
      const shop = this.cartList[this.$route.query.id] || {};
      if (shop) {
        Object.values(shop || {}).forEach((category) => {
          Object.values(category || {}).forEach((item) => {
            Object.values(item || {}).forEach((food) => {
              if (!this.myShopCart.find((ele) => ele.id === food.id)) {
                this.myShopCart.push(food);
              }
            });
          });
        });
      }
    },
    reduceFood(item) {
      this.$store.commit("REDUCEMYCART", item);
      const arr = this.myShopCart.filter((ele) => {
        return ele.num != 0;
      });
      this.myShopCart = arr;
    },
    addFood(item) {
      this.$store.commit("ADD_CART", item);
      this.updataMyCart();
    },
    // 清空购物车
    clearMyCart() {
      // 清空了仓库中此商店的数据
      this.$store.commit("DELETECARTLIST", this.$route.query.id);
      // 清空了此商店购物车的数据
      this.myShopCart = [];
      this.show = !this.show;
    },
    // 确认下单  跳转页面
    async goConfirmOrder() {
      // url获取  仓库获取  发请求
      let geohash = this.$route.query.geohash || this.$store.state.geohash;
      if (!geohash) {
        // cityGuess
        const result = await cityGuess();
        geohash = result.latitude + "," + result.longitude;
      }
      this.$router.push({
        path: "/confirmOrder",
        query: {
          id: this.$route.query.id,
          geohash,
        },
      });
    },
    // 初始化数据
    async getData() {
      const result = await shoplist(this.$route.query.id);
      this.shopDetailList = result;
      if (this.shopDetailList.length != 0) {
        const detailContain = this.$refs['detail']

        this.$nextTick(()=>{
          Array.from(detailContain.children[0].children).forEach((element,index)=>{
            this.TopList[index] = element.offsetTop
          })

          this.columnScroll = new BScroll(this.$refs['columnContain'],{
            probeType:2,
            bounce:false,
            click:true
          })

        this.detailScroll =  new BScroll(this.$refs['detail'],{
            probeType:3,
            click:true
          })
          this.detailScroll.on('scroll',(pop)=>{
            this.TopList.forEach((item,index)=>{
              if(Math.abs(pop.y) >= item && !this.skilPosition){
                this.currentIndex = index
              }
            })
          })
        })
      }
      this.loadingShow = false;
    },
    navTarget(index) {
      this.currentIndex = index
     let target = Array.from(this.$refs['detail'].children[0].children).filter(item=>{
      return item.className == 'active'
     })
     target = target[0]
     this.skilPosition = true
      this.detailScroll.scrollTo(0,-(this.TopList[this.currentIndex]),400)
      this.detailScroll.on('scrollEnd',()=>{
        this.skilPosition = false
      })
    },
    // 添加商品到购物车
    addcart(elLeft, elTop, moveDot) {
      this.elLeft = elLeft;
      this.elTop = elTop;
      this.moveDot = moveDot;
    },
    beforeEnter(el) {
      el.style.transform = `translate3d(0,${
        this.elTop - this.windowHeight
      }px,0)`;
      el.children[0].style.transform = `translate3d(${this.elLeft - 35}px,0,0)`;
    },
    afterEnter(el) {
      el.style.transform = `translate3d(0,0,0)`;
      el.children[0].style.transform = `translate3d(0,0,0)`;
      el.style.transition =
        "transform 0.55s  cubic-bezier(0.3, -0.25, 0.7, -0.15)";
      el.children[0].style.transition = "transform 0.55s  ease-out";
      this.moveDot = [];
    },
    afterLeave() {
      if (!this.receiveInCart) {
        this.receiveInCart = !this.receiveInCart;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/style/bass.less";
@baseSize: 4.14vw;
.move_dot {
  position: fixed;
  bottom: 30px;
  left: 35px;
  svg {
    width: (20 / @baseSize);
    height: (20 / @baseSize);
    fill: #3190e8;
  }
}
.header {
  position: fixed;
  width: 100%;
  height: (128 / @baseSize);
  // background: #4cd964;
  // background-image: url("@/asset/img/微信图片_20230819105738.jpg");
  background-image: url("@/asset/img/微信图片_20230819105738.jpg");
  background-size: cover;
  color: white;
  text-align: left;
  font-size: (8 / @baseSize);
  nav {
    position: absolute;
    width: (25 / @baseSize);
    height: (25 / @baseSize);
    // background: greenyellow;
    left: (10 / @baseSize);
    top: (10 / @baseSize);
  }
  img {
    display: block;
    float: left;
    width: (75 / @baseSize);
    height: (75 / @baseSize);
    // background: palevioletred;
    margin-left: (15 / @baseSize);
    margin-top: (15 / @baseSize);
  }
  hgroup {
    display: block;
    float: left;
    width: (310 / @baseSize);
    height: (76 / @baseSize);
    // background: goldenrod;
    margin-top: (15 / @baseSize);
    padding-left: (10 / @baseSize);
    h1 {
      font-size: (20 / @baseSize);
    }
    p {
      margin-top: (5 / @baseSize);
    }
  }
  .nav {
    width: (385 / @baseSize);
    height: (20 / @baseSize);
    // background: rgba(255, 0, 0, 0.416);
    float: left;
    margin-left: (15 / @baseSize);
    margin-top: (5 / @baseSize);
    .logo {
      float: left;
      display: block;
      text-align: center;
      line-height: (17 / @baseSize);
      width: (15 / @baseSize);
      height: (17 / @baseSize);
      background: rgb(237, 193, 35);
      margin-right: (3 / @baseSize);
    }
    .act {
      float: right;
      svg {
        width: (11 / @baseSize);
        height: (11 / @baseSize);
        vertical-align: middle;
        margin-left: (3 / @baseSize);
      }
    }
  }
}
.storenav {
  position: fixed;
  top: (128 / @baseSize);
  width: 100%;
  height: (60 / @baseSize);
  background: white;
  display: flex;
  z-index: 3;
  span {
    width: 100%;
    // border:1px solid black;
    line-height: (80 / @baseSize);
    &.active {
      border-bottom: 1px solid #3190e8;
      color: #3190e8;
    }
  }
}

.storemain {
  position: fixed;
  top: (188 / @baseSize);
  width: 100%;
  .columnContain{
    height:(659 / @baseSize);
    float: left;
    width: 25%;
    overflow: hidden;
  }
  .column {
    li {
      width: 100%;
      height: (70 / @baseSize);
      line-height: (70 / @baseSize);
      font-size: (18 / @baseSize);
      font-weight: bold;
      &.active {
        border-left: (4 / @baseSize) solid #3190e8;
        background: white;
      }
    }
  }
  .detail {
    width: 75%;
    height: (659 / @baseSize);
    overflow:hidden;
    float: left;
    text-align: left;
    dl {
      dt {
        position: relative;
        background: #f5f5f5;
        width: 100%;
        height: (55 / @baseSize);
        font-size: (16 / @baseSize);
        line-height: (70 / @baseSize);
        padding-left: (10 / @baseSize);
        font-weight: bold;
        span {
          padding-left: (10 / @baseSize);
          font-size: (12 / @baseSize);
          font-weight: normal;
        }
      }
      dd {
        width: 100%;
        height: (145 / @baseSize);
        background: white;
        // border:1px solid black;
        img {
          display: block;
          float: left;
          width: (52 / @baseSize);
          height: (52 / @baseSize);
          // background: pink;
        }
        hgroup {
          width: (233 / @baseSize);
          // border:1px solid black;
          position: relative;
          float: left;
          margin-top: (10 / @baseSize);
          font-size: (14 / @baseSize);
          padding-left: (8 / @baseSize);
          strong {
            font-size: (18 / @baseSize);
          }
          .des {
            font-size: (8 / @baseSize);
            color: gray;
          }
          .sign {
            position: absolute;
            color: rgb(240, 115, 115);
            border: 1px solid rgb(240, 115, 115);
            border-radius: (6 / @baseSize);
            font-size: (6 / @baseSize);
            padding: 0 (2 / @baseSize);
            right: 0;
          }
          .flag {
            color: rgb(240, 115, 115);
            border: 1px solid rgb(240, 115, 115);
            border-radius: (6 / @baseSize);
            font-size: (6 / @baseSize);
            padding: 0 (2 / @baseSize);
          }
          p {
            margin: (3 / @baseSize) auto;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            .price {
              color: #f60;
              font-size: (18 / @baseSize);
              font-weight: bold;
              border-radius: (5 / @baseSize);
            }
          }
        }
      }
    }
  }
}

.rating {
  .ratingmain {
    position: absolute;
    width: 100%;
    margin-top: (188 / @baseSize);
    overflow: hidden;
    height: 700px;
    // border: 1px solid red;
    header {
      display: flex;
      justify-content: space-around;
      padding-top: (10 / @baseSize);
      padding-left: (20 / @baseSize);
      padding-bottom: (10 / @baseSize);
      background: white;
      .ratingleft {
        // border: 1px solid red;
        flex: 1;
        :nth-child(1) {
          font-size: (34 / @baseSize);
          color: #f60;
        }
        :nth-child(2) {
          font-size: (18 / @baseSize);
          color: #3d3d3f;
        }
        :nth-child(3) {
          font-size: (12 / @baseSize);
          color: gray;
        }
      }
      .ratingright {
        // border: 1px solid red;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        flex: 1;
        p {
          display: flex;
          font-size: 4vw;
          color: #3d3d3f;
          .mystar {
            width: (80 / @baseSize);
            height: (16 / @baseSize);
            vertical-align: sub;
            margin-left: (3 / @baseSize);
          }
        }
      }
    }
    .ratingTag {
      display: flex;
      flex-wrap: wrap;
      margin-top: (10 / @baseSize);
      background: white;
      padding: 0 (12 / @baseSize) (10 / @baseSize);
      li {
        padding: (3 / @baseSize) (5 / @baseSize);
        border-radius: (10 / @baseSize);
        background: #ebf5ff;
        margin-left: (10 / @baseSize);
        margin-top: (10 / @baseSize);
        &.active {
          background: #3190e8;
        }
      }
    }
    .ratingMenu {
      background: white;
      li {
        display: flex;
        justify-content: space-around;
        padding-top: (10 / @baseSize);
        text-align: left;
        header {
          text-align: left;
          justify-content: space-between;
          padding: 0;
          margin: 0;
        }
        img {
          width: (50 / @baseSize);
          height: (50 / @baseSize);
          margin-left: (10 / @baseSize);
        }
        .ratingContent {
          // border: 1px solid red;
          width: (252 / @baseSize);
          .ratingstar {
            display: flex;
            .hwyStar {
              margin-left: (10 / @baseSize);
              width: (100 / @baseSize);
              // border: 1px solid black;
            }
          }
          main {
            display: flex;
            .group {
              width: (60 / @baseSize);
              height: (80 / @baseSize);
              display: flex;
              justify-content: center;
              flex-direction: column;
              p {
                width: (30 / @baseSize);
                color: gray;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
        .timer {
          // border: 1px solid red;
          font-size: (14 / @baseSize);
        }
        .avatar {
          border-radius: 50%;
          // border: 1px solid red;
        }
      }
    }
  }
}

.cartoon {
  animation: mymove 0.5s ease-in-out;
}

.list-enter {
  transform: translateY(100%);
}
.list-enter-to {
  transform: translateY(0);
}
.list-leave {
  transform: translateY(0);
}
.list-leave-to {
  transform: translateY(100%);
}
.list-enter-active,
.list-leave-active {
  transition: transform 0.5s linear;
}
@keyframes mymove {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
.cartfooter {
  width: 100%;
  // height: (52 / @baseSize);
  position: fixed;
  bottom: 0;
  left: 0;
  color: white;
  .cartlist {
    position: relative;
    color: black;
    z-index: -1;
    max-height: (600 / @baseSize);
    overflow: auto;
    .cartmain {
      margin-top: (49 / @baseSize);
    }
    dt {
      position: fixed;
      width: 100%;
      height: (50 / @baseSize);
      background: #eceff1;
      display: flex;
      justify-content: space-between;
      padding: 0 (10 / @baseSize);
      line-height: (50 / @baseSize);
      margin-top: (-1 / @baseSize);
      svg {
        width: (15 / @baseSize);
        height: (15 / @baseSize);
      }
    }
    dd {
      height: (55 / @baseSize);
      background: white;
      display: flex;
      justify-content: space-between;
      padding: 0 (10 / @baseSize);
      line-height: (55 / @baseSize);
      h3 {
        // border: 1px solid black;
        flex: 2;
        width: (140 / @baseSize);
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .svg {
        flex: 2;
        display: flex;
        // border: 1px solid black;
        line-height: (55 / @baseSize);
        height: 100%;
        .cart_num,
        svg {
          margin-top: (20 / @baseSize);
          margin-left: (5 / @baseSize);
        }
        svg {
          width: (23 / @baseSize);
          height: (23 / @baseSize);
          &:first-child {
            margin-left: (100 / @baseSize);
          }
        }
        .cart_num {
          line-height: (23 / @baseSize);
          // border: 1px solid black;
        }
      }
      .price {
        flex: 1;
        text-align: right;
        // border: 1px solid black;
        font-size: (18 / @baseSize);
        color: #f60;
      }
    }
  }
  .outline {
    position: absolute;
    display: block;
    width: (60 / @baseSize);
    height: (60 / @baseSize);
    bottom: (15 / @baseSize);
    left: (18 / @baseSize);
    padding-top: (5 / @baseSize);
    border-radius: 50%;
    background: #535356;
    .flag {
      height: (20 / @baseSize);
      min-width: (20 / @baseSize);
      line-height: (20 / @baseSize);
      background: #f60;
      border-radius: 100%;
      border: 3px solid #f60;
      position: absolute;
      right: (-3 / @baseSize);
      top: (-3 / @baseSize);
    }
    &.active {
      background: #3d3d3f;
    }
    .maincolor {
      display: inline-block;
      width: (50 / @baseSize);
      height: (50 / @baseSize);
      border-radius: 50%;
      background: #3d3d3f;
      padding-top: (7 / @baseSize);
      padding-left: (3 / @baseSize);
      &.active {
        background: #3190e8;
      }
      svg {
        width: (30 / @baseSize);
        height: (30 / @baseSize);
      }
    }
  }
  hgroup {
    float: left;
    width: 70%;
    height: (52 / @baseSize);
    background: #3d3d3f;
    text-align: left;
    padding: (3 / @baseSize) (90 / @baseSize);
    h3 {
      font-size: (20 / @baseSize);
    }
    p {
      font-size: (12 / @baseSize);
    }
  }
  button {
    color: white;
    float: right;
    width: 30%;
    height: (52 / @baseSize);
    background: #535356;
    border: 0;
    font-size: (18 / @baseSize);
    &.active {
      background: #4cd964;
    }
  }
}
</style>