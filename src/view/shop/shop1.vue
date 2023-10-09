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
          <dl v-for="list in shopDetailList" :key="list.id" :ref="list.id" :class="list.id === currentId ? 'active' : ''">
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
                  <span class="choose">选规格</span>
                </div>
              </hgroup>
            </dd>
          </dl>
        </div>
      </div>
    </div>
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
    };
  },
  mounted() {
    this.getData();
  },
  watch: {
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
              console.log('向上滚动一个开始执行');
              this.currentId = this.flagrefs[nowindex - 1]
          }
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "@/style/bass.less";
@baseSize: 4.14vw;
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
      &.active{
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
              background: #3190e8;
              color: white;
              padding: (5 / @baseSize);
              border-radius: (5 / @baseSize);
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
</style>