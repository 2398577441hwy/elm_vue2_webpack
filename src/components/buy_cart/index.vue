<template>
  <div class="cartfooter">
    <!-- cartlist -->
    <transition name="list">
      <dl class="cartlist" v-show="show">
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
        <dd v-for="(item,index) in shopCartList" :key="index">
          <h3>{{item.name}}</h3>
          <div class="price">￥<strong>{{item.price}}</strong></div>
          <div class="svg">
            <svg data-v-c8684834="" fill="#3190e8">
              <use
                data-v-c8684834=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#cart-minus"
              ></use>
            </svg>
            <div class="cart_num">{{item.price * item.num}}</div>
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
    </transition>
    <transition name="bounce">
      <div :class="allnum === 0 ? 'outline' : 'outline active'" ref="cart" @click="showList()">
        <div :class="allnum === 0 ? 'maincolor' : 'maincolor active'">
          <svg data-v-c8684834="" class="cart_icon">
            <use
              data-v-c8684834=""
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#cart-icon"
            ></use>
          </svg>
        </div>
        <span v-show="allnum !== 0" class="flag">{{allnum}}</span>
      </div>
    </transition>
    <hgroup>
      <h3>￥{{allprice}}</h3>
      <p>配送费￥5</p>
    </hgroup>
    <button :class="allprice >= 20 ? 'active' : ''">{{title}}</button>
  </div>
</template>

<script>
// 实时接收vuex中的数据  （在data中不能实时获取，已经读取过的不会再读取）
import { mapState } from "vuex";
export default {
  data() {
    return {
      timer: null,
      show: false,
      listHeight: 0,
    };
  },
  computed: {
    ...mapState(["receiveInCart",'shopCartList']),
    allnum(){
      return this.shopCartList.reduce((pre,next)=>{
        return pre + next.num
      },0)
    },
    allprice(){
      return this.shopCartList.reduce((pre,next)=>{
        return pre + (next.num * next.price)
      },0)    
    },
    title(){
      if(this.allprice < 20){
        return `还差￥${20 - this.allprice}起送`
      }else{
        return `去结算`
      }
    }
  },
  watch: {
    receiveInCart: {
      handler(value) {
        if (value) {
          console.log(value);
          this.$refs.cart.classList.add("cartoon");
          if (this.timer) {
            clearTimeout();
          }
          this.timer = setTimeout(() => {
            this.$refs.cart.classList.remove("cartoon");
            this.$store.commit("CHANGERECEIVEINCART", false);
          }, 600);
        }
      },
    },
  },
  methods: {
    showList() {
      this.show = !this.show;
    }
  },
};
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
.cartoon {
  animation: mymove 0.5s ease-in-out;
}

.list-enter {
  transform:translateY(100%);
}
.list-enter-to{
  transform: translateY(0);
}
.list-leave{
  transform: translateY(0);
}
.list-leave-to{
  transform: translateY(100%);
}
.list-enter-active,.list-leave-active{
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
    z-index:-1;
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