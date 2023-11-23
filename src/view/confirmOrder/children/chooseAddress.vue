<template>
  <div class="page">
    <myHeader goBack="true">
      <template v-slot:title>选择地址</template>
    </myHeader>
    <ul class="main">
      <li v-for="item in list" :key="item.id" @click="checkAddress(item)">
        <div class="svg">
          <svg
            class="choosed_address"
            width="20"
            height="20"
            fill="rgb(76, 217, 100)"
            v-if="currentID == item.id"
          >
            <use
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xlink:href="#select"
            ></use>
          </svg>
        </div>
        <div class="hgroup">
          <header>
            <h3>{{ item.name }}</h3>
            <p>{{ item.sex == 1 ? "先生" : "女士" }} {{ item.phone }}</p>
          </header>
          <main>
            <span class="flag" :style="tagColor(item.tag_type)">{{ item.tag }}</span
            ><span>{{ item.address }}</span>
          </main>
        </div>
      </li>
    </ul>
    <router-link class="footer" to="/confirmOrder/chooseAddress/addAdress">
      <span>+</span>
      <p>新增收货地址</p>
    </router-link>
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import { AddressList } from "@/service/getData.js";
export default {
  components: { myHeader },
  data() {
    return {
      list: [],
      currentID:''
    };
  },
  mounted() {
    this.getData();
  },
  watch:{
    list:{
      handler(newValue){
        this.currentID = newValue[0].id
      }
    }
  },
  methods: {
    async getData() {
      const result = await AddressList(this.$store.state.userinfo.user_id);
      this.list = result;
    },
    tagColor(value) {
      if(value == 4){
        return 'background:rgb(76, 217, 100);'
      }else if(value == 3){
        return 'background:#3190e8;'
      }else if(value == 1){
        return 'background:#ff5722;'
      }
    },
    checkAddress(item){
      this.currentID = item.id
      // 将选中的地址放入仓库
      this.$store.commit('SETSHOPADDRESS',item)
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
.flag {
  padding: 3px 5px;
  color: white;
  font-size: 12px;
  border-radius: 5px;
  margin-right: 3px;
}
.page {
  z-index: 101;
}
.main {
  margin-top: 50px;
  overflow: hidden;
  background: white;
  li {
    display: flex;
    justify-content: space-between;
    height: 80px;
    .svg {
      flex: 1;
      padding-top: 20px;
    }
    .hgroup {
      flex: 4;
      text-align: left;
      h3,
      span,
      p {
        display: inline-block;
      }
      header {
        margin-top: 10px;
        margin-bottom: 4px;
      }
    }
  }
}
.footer {
  position: absolute;
  bottom: 0;
  height: (50 / @baseSize);
  line-height: (30 / @baseSize);
  display: flex;
  justify-content: center;
  padding-top: (10 / @baseSize);
  width: 100%;
  font-size: (18 / @baseSize);
  color: #3190e8;
  span {
    width: (30 / @baseSize);
    height: (30 / @baseSize);
    line-height: (30 / @baseSize);
    margin-right: (8 / @baseSize);
    border: 2px solid #3190e8;
    font-size: (20 / @baseSize);
    border-radius: 50%;
  }
}
</style>