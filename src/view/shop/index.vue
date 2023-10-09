<template>
  <div>
    <header>
      <nav>
        <svg
          data-v-c8684834=""
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
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
      <span class="active">商品</span>
      <span></span>
      <span></span>
      <span>评价</span>
      <span></span>
    </nav>

    <div class="storemain">
      <ul class="column">
        <li
          v-for="item in shopDetailList"
          :key="item.id"
          @click="navTarget(item.id)"
          :class="{ active: item.id === currentId }"
          :ref="item.id"
        >
          {{ item.name }}
        </li>
      </ul>
      <div class="detail" ref="detail" @scroll="location()">
        <div class="offsetparent" style="position: relative">
          <dl
            v-for="list in shopDetailList"
            :key="list.id"
            :ref="list.id"
            :class="list.id === currentId ? 'active' : ''"
          >
            <!-- :class="list.id === currentId ? 'active' : ''" -->
            <dt :class="list.id === currentId ? 'active' : ''">
              {{ list.name }} <span>{{ list.description }}</span>
            </dt>

            <dd v-for="item in list.foods" :key="item.id">
              <div class="img">
                <span class="logo"></span>
                <img :src="'/img/' + item.image_path" alt="" />
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
                    ><span class="price">￥{{ item.satisfy_rate }}</span
                    >起</span
                  >
                  <span class="choose">
                    <p v-if="item.specifications.length > 0" class="guige">
                      选规格
                    </p>
                    <p v-else class="num">
                      <transition name="fade">
                        <span v-if="item.num" @click="clearItemNum($event)"
                          >-</span
                        >
                      </transition>
                      <transition name="fade-num">
                        <span v-if="item.num">{{ item.num }}</span>
                      </transition>
                      <span
                        @click="
                          addItemNum(
                            $event,
                            item.item_id,
                            item.name,
                            item.satisfy_rate,
                          )
                        "
                        >+</span
                      >
                    </p>
                  </span>
                </div>
              </hgroup>
            </dd>
          </dl>
        </div>
      </div>
    </div>

    <div class="cartfooter">
      <dl class="cartlist">
        <dt>
          <p>购物车</p>
          <p>
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
        <dd>
          <h3>鲤鱼</h3>
          <div class="price">￥<strong>20</strong></div>
          <div class="svg">
            <svg data-v-c8684834="" fill="#3190e8">
              <use
                data-v-c8684834=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#cart-minus"
              ></use>
            </svg>
            <div class="cart_num">1</div>
            <svg data-v-c8684834="" class="cart_add" fill="#3190e8">
              <use
                data-v-c8684834=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#cart-add"
              ></use>
            </svg>
          </div>
        </dd>
      </dl>
      <div class="outline active">
        <div class="maincolor active">
          <svg data-v-c8684834="" class="cart_icon">
            <use
              data-v-c8684834=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#cart-icon"
            ></use>
          </svg>
        </div>
        <span class="flag">1</span>
      </div>
      <hgroup>
        <h3>￥0.00</h3>
        <p>配送费￥5</p>
      </hgroup>
      <button class="active">还差￥20起送</button>
    </div>
    <transition
      appear
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
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
  </div>
</template>

<script>
import { shoplist } from "@/service/getData.js";

export default {
  data() {
    return {
      currentId: null,
      shopDetailList: [],
      flagrefs: [],
      clickflag: false,
      timer: null,
      goodNum: 0,
      moveDot: [],
      elLeft: 0,
      elTop: 0,
      receiveInCart: false,
      windowHeight: window.innerHeight,
      shopId: this.$route.query.id,
      shopCartList: [],
    };
  },
  mounted() {
    this.getData();
  },
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
  },
  methods: {
    async getData() {
      const result = await shoplist(this.$route.query.id);
      this.shopDetailList = result;
    },
    navTarget(id) {
      this.currentId = id;
      const contain = this.$refs.detail;
      const target = this.$refs[id][1];
      console.log(this.currentId);
      contain.scrollTo({
        top: target.offsetTop,
        // behavior: "smooth",
      });
    },
    location() {
      if (this.timer) {
        clearTimeout();
      }
      this.timer = setTimeout(() => {
        const detail = this.$refs.detail;
        const target = this.$refs[this.currentId][1];
        const nowindex = this.flagrefs.indexOf(this.currentId);
        const nextTarget =
          nowindex < this.flagrefs.length - 1
            ? this.$refs[this.flagrefs[nowindex + 1]][1]
            : null;
        const preTarget =
          nowindex > 0 ? this.$refs[this.flagrefs[nowindex - 1]][1] : null;
        if (nextTarget) {
          if (detail.scrollTop > nextTarget.offsetTop) {
            console.log("向下滚动一个开始执行");
            this.currentId = this.flagrefs[nowindex + 1];
          }
        }
        if (preTarget) {
          if (detail.scrollTop + 1 < target.offsetTop) {
            console.log("向上滚动一个开始执行");
            this.currentId = this.flagrefs[nowindex - 1];
          }
        }
      });
    },

    addItemNum(event, item_id, name, price,item) {
      this.goodNum++;
      this.moveDot = [...this.moveDot, true];
      this.elLeft = event.target.getBoundingClientRect().left;
      this.elTop = event.target.getBoundingClientRect().top;
      this.addcart(item_id, name, price);
    },
    // 添加商品到购物车
    addcart(item_id, name, price) {
      const obj = {
        item_id,
        name,
        price,
      };
      let flag = false
      this.shopCartList.forEach(element=>{
        if(element.item_id === obj.item_id){
          flag = true
          element.num++
        }
      })

      if(!flag){
        console.log('添加num属性')
        // 添加响应式的元素
        this.$set(obj,'num',1)
        this.shopCartList.push(obj)
      }
      console.log(this.shopCartList)
    },

    clearItemNum() {
      this.goodNum--;
    },
    listenInCart() {
      // 表示已经到达了目标位置
      if (!this.receiveInCart) {
        this.receiveInCart = true;
        this.$refs.cartContainer.addEventListener("animationend", () => {
          this.receiveInCart = false;
        });
        this.$refs.cartContainer.addEventListener("webkitAnimationEnd", () => {
          this.receiveInCart = false;
        });
      }
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
  },
};
</script>

<style lang="less" scoped>
@import "@/style/bass.less";
@baseSize: 4.14vw;
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-out;
}
// 离开的时候
.fade-enter,
.fade-leave-to {
  transform: translateX((8 / @baseSize));
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3 ease-out;
}
.fade-num-enter,
.fade-num-leave-to {
  opacity: 0;
}
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
header {
  position: fixed;
  width: 100%;
  height: (128 / @baseSize);
  // background: pink;
  background: url("@/asset/img/微信图片_20230819105738.jpg") no-repeat center;
  background-size: 100% auto;
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
  .column {
    width: 25%;
    max-height: (659 / @baseSize);
    overflow: auto;
    float: left;
    //    background-color: firebrick;
    li {
      width: 100%;
      height: (70 / @baseSize);
      line-height: (70 / @baseSize);
      font-size: (18 / @baseSize);
      font-weight: bold;
      // background: yellowgreen;
      &.active {
        border-left: (4 / @baseSize) solid #3190e8;
        background: white;
      }
    }
  }
  .detail {
    width: 75%;
    max-height: (659 / @baseSize);
    overflow: auto;
    float: left;
    text-align: left;
    dl {
      &.active {
        padding-top: (55 / @baseSize);
      }
      dt {
        position: relative;
        overflow-y: overlay;
        background: #f5f5f5;
        width: 100%;
        height: (55 / @baseSize);
        font-size: (16 / @baseSize);
        line-height: (70 / @baseSize);
        padding-left: (10 / @baseSize);
        font-weight: bold;
        &.active {
          position: fixed;
          top: (187 / @baseSize);
          z-index: 5;
        }
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
          background: pink;
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
            .choose {
              .guige {
                color: white;
                background: #3190e8;
                padding: (5 / @baseSize);
                border-radius: (5 / @baseSize);
              }
              .num {
                width: (75 / @baseSize);
                position: relative;
                span {
                  position: absolute;
                  display: block;
                  &:first-child {
                    height: (20 / @baseSize);
                    text-align: center;
                    line-height: (15 / @baseSize);
                    width: (20 / @baseSize);
                    left: 0;
                    background: white;
                    color: #3190e8;
                    border: 1px solid #3190e8;
                    border-radius: 50%;
                    font-size: (25 / @baseSize);
                  }
                  &:nth-child(2) {
                    height: (20 / @baseSize);
                    text-align: center;
                    line-height: (20 / @baseSize);
                    width: (25 / @baseSize);
                    left: (22 / @baseSize);
                    color: black;
                  }
                  &:last-child {
                    height: (20 / @baseSize);
                    text-align: center;
                    line-height: (20 / @baseSize);
                    width: (20 / @baseSize);
                    left: (49 / @baseSize);
                    font-size: (16 / @baseSize);
                    color: white;
                    background: #3190e8;
                    border-radius: 50%;
                    border: 1px solid #3190e8;
                  }
                }
              }
            }
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
.cartfooter {
  width: 100%;
  // height: (52 / @baseSize);
  position: fixed;
  bottom: 0;
  left: 0;
  color: white;
  .cartlist {
    color: black;
    dt {
      height: (50 / @baseSize);
      background: #eceff1;
      display: flex;
      justify-content: space-between;
      padding: 0 (10 / @baseSize);
      line-height: (50 / @baseSize);
      svg {
        width: (15 / @baseSize);
        height: (15 / @baseSize);
      }
    }
    dd {
      height: (55 / @baseSize);
      background: white;
      // border: 1px solid black;
      display: flex;
      justify-content: space-between;
      padding: 0 (10 / @baseSize);
      line-height: (55 / @baseSize);
      h3 {
        // border: 1px solid black;
        flex: 2;
        text-align: left;
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