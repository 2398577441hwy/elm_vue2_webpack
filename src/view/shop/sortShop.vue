<template>
  <div>
    <myHeader goBack="true">
      <template v-slot:title>
        <span>甜品饮品</span>
      </template>
    </myHeader>

    <section class="nav">
      <div class="title" @click="showtitle()">
        甜品饮品<svg
          data-v-6cc1fce6=""
          width="10"
          height="10"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          class="sort_icon"
        >
          <polygon data-v-6cc1fce6="" points="0,3 10,3 5,8"></polygon>
        </svg>
      </div>
      <div class="sort" @click="showsort()">
        排序<svg
          data-v-6cc1fce6=""
          width="10"
          height="10"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          class="sort_icon"
        >
          <polygon data-v-6cc1fce6="" points="0,3 10,3 5,8"></polygon>
        </svg>
      </div>
      <div class="select" @click="showselect()">
        筛选<svg
          data-v-6cc1fce6=""
          width="10"
          height="10"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          class="sort_icon"
        >
          <polygon data-v-6cc1fce6="" points="0,3 10,3 5,8"></polygon>
        </svg>
      </div>
    </section>
    <transition name="list">
      <div class="list" v-show="title">
        <div class="title" v-show="show[0]">
          <ul class="title1">
            <li v-for="(item,index) in catagoryList" :key="index" @click="checkedCategory(index,item.id)" :class="{active:currentCatagoryIndex === index}">
              <section><img class="flag" :src="getImgPath(item.image_url)"/> {{item.name}}</section>
              <section>
                <span class="num">{{item.count}}</span>
                <svg
                  data-v-6cc1fce6=""
                  width="8"
                  height="8"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  class="category_arrow"
                >
                  <path
                    data-v-6cc1fce6=""
                    d="M0 0 L6 4 L0 8"
                    stroke="#bbb"
                    stroke-width="1"
                    fill="none"
                  ></path>
                </svg>
              </section>
            </li>
          </ul>
          <ul class="title2">
            <li v-for="(item,index) in currentCatagory" :key="index" @click="restaurant_category_ids = item.id"><span>{{item.name}}</span> <span>{{item.count}}</span></li>
          </ul>
        </div>
        <ul class="sort" v-show="show[1]" @click="sortMethods($event)">
          <li data="0" :class="{active:sortType === '0'}">
            <svg data-v-6cc1fce6="">
              <use
                data-v-6cc1fce6=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#default"
              ></use>
            </svg>
            智能排序
          </li>
          <li data="5" :class="{active:sortType === '5'}">
            <svg data-v-6cc1fce6="">
              <use
                data-v-6cc1fce6=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#distance"
              ></use>
            </svg>
            距离最近
          </li>
          <li data="6" :class="{active:sortType === '6'}">
            <svg data-v-6cc1fce6="">
              <use
                data-v-6cc1fce6=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#hot"
              ></use>
            </svg>
            销量最高
          </li>
          <li data="1" :class="{active:sortType === '1'}">
            <svg data-v-6cc1fce6="">
              <use
                data-v-6cc1fce6=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#price"
              ></use>
            </svg>
            起送价最低
          </li>
          <li data="2" :class="{active:sortType === '2'}">
            <svg data-v-6cc1fce6="">
              <use
                data-v-6cc1fce6=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#speed"
              ></use>
            </svg>
            配送速度最快
          </li>
          <li data="3" :class="{active:sortType === '3'}">
            <svg data-v-6cc1fce6="">
              <use
                data-v-6cc1fce6=""
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xlink:href="#rating"
              ></use>
            </svg>
            评分最高
          </li>
        </ul>
        <div class="select" v-show="show[2]">
          <dl class="select">
            <dt>
              <h5>配送方式</h5>
              <p v-for="(item,index) in deliveryList" :key="index" @click="deliveryCheck($event,item.id)">
                <svg data-v-6cc1fce6="" style="opacity: 1">
                  <use
                    data-v-6cc1fce6=""
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xlink:href="#fengniao"
                  ></use>
                </svg>
                {{item.text}}
              </p>
            </dt>
            <dd>
              <h5>商家属性(可以多选)</h5>
              <ul>
                <li v-for="(item,index) in activityList" :key="index" @click="shopActive($event,item.id)">
                  <span
                    style="
                      padding: 3px;
                      border: 1px solid rgb(63, 189, 230);
                      border-radius: 3px;
                    "
                    :style="`color:#${item.icon_color};border:1px solid #${item.icon_color}`"
                    >{{item.icon_name}}</span
                  >
                  {{item.name}}
                </li>
              </ul>
            </dd>
          </dl>
        </div>
      </div>
    </transition>
    <shopList :geohash="geohash" class="shoplist" :restaurant_category_id="restaurant_category_id" :restaurant_category_ids="restaurant_category_ids" :order_by="order_by" :delivery_mode="delivery_mode" :support_ids="support_ids"></shopList>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import {shopCategory,deliveryMethods,shopAcitvies,cityGuess} from '@/service/getData.js'
import {getImgPath} from '@/mixin/mixin.js'
import {mapState} from 'vuex'
import shopList from '@/components/shoplist/index.vue'
export default {
  data() {
    return {
      show: [false, false, false],
      catagoryList:[],
      deliveryList:[],
      activityList:[],
      currentCatagoryIndex:0,
      sortType:4,
      activities_ids: [],
      geohash:this.$route.query.geohash || this.$store.state.geohash,
      // 食品类型id
      restaurant_category_id:'',
      // 筛选类型id
      restaurant_category_ids:'',
      // 何种方式排序
      order_by:'',
      // 选中的配送方式
      delivery_mode:[],
      // 选中商品活动列表
      support_ids:[],
    };
  },
  mixins:[getImgPath],
  components: { myHeader,shopList },
  computed: {
    currentCatagory(){
      //  || []
      if(this.catagoryList.length !== 0){
        // console.log(`********${this.catagoryList}`)
        return this.catagoryList[this.currentCatagoryIndex].sub_categories
      }
    },
    title: {
      get() {
         return this.show.includes(true);
      }
    },
    // ...mapState(['geohash'])
  },
  mounted(){
    // console.log(this.geohash)
    if(!this.geohash){
      this.getGeohash()
    }else{
      this.getData()
    }
  },
  methods: {
    async getGeohash(){
      const result = await cityGuess()
      const addhash = result.latitude + ',' + result.longitude
      this.$store.commit('SETGEOHASH',addhash)
      this.getData()
    },
    checkCategoryItem(item){
      console.log(item)
    },
    async getData(){
      // latitude,longitude
      const str = this.geohash.split(',')
      const latitude = str[0]
      const longitude = str[1]
      this.catagoryList = await shopCategory(latitude,longitude)
      this.deliveryList = await deliveryMethods(latitude,longitude)
      this.activityList = await shopAcitvies(latitude,longitude)
    },
    checkedCategory(index,id){
      this.currentCatagoryIndex = index
      this.restaurant_category_id = id
    },
     showtitle() {
      if (this.show[0]) {
        this.show = [false, false, false];
      } else {
        this.show = [true, false, false];
      }
    },
    showsort() {
      if (this.show[1]) {
        this.show = [false, false, false];
      } else {
        this.show = [false, true, false];
      }
    },
    showselect() {
      if (this.show[2]) {
        this.show = [false, false, false];
      } else {
        this.show = [false, false, true];
      }
    },
    sortMethods(event){
      let node = null
      if(event.target.nodeName !== 'LI'){
        node = event.target.parentNode
      }else{
        node = event.target
      }
      this.sortType = node.getAttribute('data')
    },
    // 配送方式
    deliveryCheck(event,id){
      event.target.classList.toggle('active')
      if(this.delivery_mode.indexOf(id)!==-1){
        this.delivery_mode.push(id)
      }
    },
    shopActive(event,id){
      const flag = this.activities_ids.includes(id)
      if(flag){
        const index = this.activities_ids.indexOf(id)
        this.activities_ids.splice(index,1)
        event.target.classList.remove('active')
      }else{
        this.activities_ids.push(id)
        event.target.classList.add('active')
        this.support_ids.push(id)
      }
    }
  },
};
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
.list-enter {
  transform: translateY(-100%);
}
.list-enter-to {
  transform: translateY(0);
}
.list-leave {
  transform: translateY(0);
}
.list-leave-to {
  transform: translateY(-100%);
}
.list-enter-active,.list-leave-active {
  transition: transform 0.55s linear;
}
.nav {
  position: relative;
  z-index: 2;
  margin-top: (50 / @baseSize);
  height: (42 / @baseSize);
  display: flex;
  justify-content: space-between;
  line-height: (42 / @baseSize);
  background: white;
  div {
    flex: 1;
  }
}
.shoplist{
  margin-top: (-4 / @baseSize);
}
.list {
  position: fixed;
  width: 100%;
  text-align: left;
  z-index:1;
  .title {
    width: 100%;
    .title1 {
      width: 50%;
      font-size: (14 / @baseSize);
      max-height: (415 / @baseSize);
      overflow: auto;
      float: left;
      background: #f1f1f1;
      li {
        height: (46 / @baseSize);
        line-height: (46 / @baseSize);
        display: flex;
        padding-right: (10 / @baseSize);
        padding-left: (10 / @baseSize);
        justify-content: space-between;
        &.active{
          background: white;
        }
        section {
          padding-right: (10 / @baseSize);
          .flag {
            display: inline-block;
            width: (20 / @baseSize);
            height: (20 / @baseSize);
            // background: pink;
            vertical-align: middle;
          }
          .num {
            display: inline-block;
            background: #ccc;
            font-size: (12 / @baseSize);
            border-radius: (10 / @baseSize);
            line-height: (15 / @baseSize);
            padding: (1 / @baseSize) (5 / @baseSize);
            color: white;
          }
        }
      }
    }
    .title2 {
      width: 50%;
      height: (415 / @baseSize);
      max-height: (415 / @baseSize);
      overflow: auto;
      background: white;
      float: left;
      li {
        display: flex;
        justify-content: space-between;
        height: (46 / @baseSize);
        padding: 0 (10 / @baseSize);
        line-height: (46 / @baseSize);
        padding-right: (20 / @baseSize);
      }
    }
  }
  .sort {
    width: 100%;
    background: white;
    svg {
      height: (20 / @baseSize);
      width: (20 / @baseSize);
    }
    li {
      height: (46 / @baseSize);
      line-height: (46 / @baseSize);
      border-bottom: 1px solid rgb(209, 208, 208);
      margin: 0 (10 / @baseSize);
      &.active{
        color:#3190e8;
      }
    }
  }
  .select {
    background: white;
    padding-bottom: (10 / @baseSize);
    p,
    li,
    h5 {
      height: (46 / @baseSize);
      line-height: (46 / @baseSize);
      padding-left: (10 / @baseSize);
    }
    dd {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 30%;
          margin-top: (8 / @baseSize);
          font-size: (12 / @baseSize);
          height: (30 / @baseSize);
          line-height: (25 / @baseSize);
          margin-left: (8 / @baseSize);
          border: 1px solid rgb(232, 231, 231);
          &.active{
            color:#3190e8;
          }
        }
      }
    }
    svg {
      width: (20 / @baseSize);
      height: (20 / @baseSize);
    }
    dt{
      p{
        &.active{
          color:#3190e8;
        }
      }
    }
  }
}
</style>