<template>
  <div>
    <span class="choose">
      <p v-if="item.specifications.length > 0" class="guige">选规格</p>
      <p v-else class="num">
        <transition name="fade">
          <span v-if="goodsNum > 0" @click="clearItemNum(item.item_id)">-</span>
        </transition>
        <transition name="fade-num">
          <span v-if="goodsNum > 0">{{ goodsNum }}</span>
        </transition>
        <span
          @click="
            addItemNum($event, item.item_id, item.name, item.satisfy_rate)
          "
          >+</span
        >
      </p>
    </span>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["item", "moveDot"],
  data() {
    return {
      // shopCartList:this.$store.state.shopCartList,
      goodsNum: 0,
    };
  },
  computed: {
    ...mapState(["shopCartList"]),
  },
  watch: {
    shopCartList: {
      deep: true,
      handler(newvalue) {
        let flag = false
        newvalue.forEach((element) => {
          if (element.id === this.item.item_id) {
            flag = true
            this.goodsNum = element.num;
          }
        });
        if(!flag) this.goodsNum = 0
      },
    },
  },
  methods: {
    clearItemNum(item_id) {
      this.$store.commit('DELETECARTLIST',item_id)
    },

    addItemNum(event, item_id, name, satisfy_rate) {
      const elLeft = event.target.getBoundingClientRect().left;
      const elTop = event.target.getBoundingClientRect().top;
      this.moveDot.push(true);
      this.$bus.$emit("dotPostion", elLeft, elTop, this.moveDot);
      const obj = {
        // id
        id: item_id,
        name,
        price: satisfy_rate,
        // packing_fee:null,
        // sku_id:null,
        // specs:null,
        // stock:null,
      };
      let flag = false;
      this.shopCartList.forEach((element) => {
        if (element.id === obj.id) {
          flag = true;
          this.$set(obj, "num", element.num + 1);
        }
      });
      if (!flag) {
        this.$set(obj, "num", 1);
      }
      this.$store.commit("ADD_CART", obj);
    },
  },
};
</script>

<style scoped lang="less">
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
</style>