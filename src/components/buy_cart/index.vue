<template>
  
</template>

<script>
// 实时接收vuex中的数据  （在data中不能实时获取，已经读取过的不会再读取）
import { mapState } from "vuex";
export default {
  data() {
    return {
      
      
      listHeight: 0,
      myShopCart:[]
    };
  },
  created(){
    this.shopCart()
  },
  computed: {
    ...mapState(["receiveInCart","cartList"]),
    myCartList(){
      return Object.assign({},this.cartList[this.$route.query.id])
    },
  
  },
  methods: {
      // 初始化购物车的数据以及购物车变化时，实时更改状态
    shopCart(){
      console.log(this.cartList)
      const shopid = this.$route.query.id
      const shop = cartList[shopid]
      // 购物车中有此商店的记录
      
    },
    showList() {
      this.show = !this.show;
    },
    
  },
};
</script>

<style scoped lang="less">
@baseSize: 4.14vw;

</style>