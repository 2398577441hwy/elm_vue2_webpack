<template>
  <div>
    <span class="choose">
      <p v-if="item.specifications.length > 0" class="guige">选规格</p>
      <p v-else class="num">
        <transition name="fade">
          <!--  -->
          <span @click="clearItemNum()" v-if="goodsNum > 0">-</span>
        </transition>
        <transition name="fade-num">
          <!--  -->
          <span v-if="goodsNum > 0">{{ goodsNum }}</span>
        </transition>
        <span
          @click="
            addItemNum($event, item)
          "
          >+</span
        >
      </p>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data(){
    return{
      currentFood:{}
    }
  },
  created(){
    const obj = {
        shopid:this.$route.query.id,
        category_id:this.item.category_id,
        item_id:this.item.item_id,
        food_id:this.item.specfoods[0].food_id,
        name:this.item.specfoods[0].name,
        price:this.item.specfoods[0].price,
        specs:this.item.specfoods[0].specs,
        packing_fee:this.item.specfoods[0].packing_fee,
        sku_id:this.item.specfoods[0].sku_id,
        stock:this.item.specfoods[0].stock
      }
      this.currentFood = obj
  },
  props: ["item", "moveDot","shopid"],
  computed:{
    ...mapState(['cartList']),
    myCartList(){
      // console.log('和仓库数据实时对应')
      return this.cartList[this.shopid] || {}
    },
    // 检测到myCartList变化时触发
    goodsNum(){
      const {category_id,item_id,food_id} = this.currentFood
      if(this.myCartList&&this.myCartList[category_id]&&this.myCartList[category_id][item_id]){
        const food = this.myCartList[category_id][item_id]
        if(food[food_id]){
          return food[food_id].num
        }else{
          return 0
        }
      }else{
        return 0
      }
    }
  },
  methods: {
    clearItemNum() {
      this.$store.commit('REDUCEMYCART',this.currentFood)
    },
    // 添加food到仓库
    addItemNum(event,item) {
      // 直接加
      const elLeft = event.target.getBoundingClientRect().left;
      const elTop = event.target.getBoundingClientRect().top;
      this.moveDot.push(true);
      this.$bus.$emit("dotPostion", elLeft, elTop, this.moveDot);
      console.log(this.currentFood)
      this.$store.commit('ADD_CART',this.currentFood)
      this.$emit('updataMyCart')
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