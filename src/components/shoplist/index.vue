<template>
  <div>
    <div class="store-bd" v-if="!loadingShow">
      <ul>
        <li
          v-for="item in goodsList"
          :key="item.id"
          @click="goShop(item.id, item.name)"
        >
          <!-- <img :src="'/img/' + item.image_path" alt="" /> -->
          <img src="@/asset/img/1.webp" alt="" />
          <hgroup>
            <header>
              <h5>{{ item.name }}</h5>
              <pre>保 准 票</pre>
            </header>
            <section>
              <hgroup>
                <i class="star">⭐⭐⭐⭐⭐</i>
                <i>{{ item.rating }}</i>
                <span>月售{{ item.recent_order_num }}单</span>
              </hgroup>
              <div>
                <span>蜂鸟专送</span>
                <span>准时达</span>
              </div>
            </section>
            <footer>
              <pre>
￥{{ item.float_minimum_order_amount }}起送 / {{
                  item.piecewise_agent_fee.tips
                }}</pre
              >
              <div>
                <pre>{{ item.distance }} / </pre>
                <span>{{ item.order_lead_time }}</span>
              </div>
            </footer>
          </hgroup>
        </li>
      </ul>
    </div>
    <loading :show="loadingShow" />
  </div>
</template>

<script>
import { homelist } from "@/service/getData.js";
import loading from "@/components/loading/index.vue";
export default {
  data() {
    return {
      goodsList: [],
      loadingShow: true,
    };
  },
  components: { loading },
  props: {
    geohash:{
      type:String,
      default:''
    },
    restaurant_category_id: {
      type:[String,Number],
      default:''
      },
      restaurant_category_ids:{
        type:[String,Number],
        default:''
      },
      order_by:{
        type:[String,Number],
        default:''
      },
      delivery_mode:{
        type:Array,
        default(){return []}
      },
      support_ids:{
        type:Array,
        default(){return []}
      },
      sure:{
        type:Boolean,
        default:false
      }
    },
    watch:{
      restaurant_category_id:{
        handler(value){
          if(value) this.getData()
        }
      },
      restaurant_category_ids:{
        handler(value){
          if(value) this.getData()
        }
      },
      order_by:{
        handler(value){
          this.getData()
        }
      },
      sure:{
        handler(value){
          if(value) this.getData()
        }
      }
    },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const str = this.geohash.split(",");
      const latitude = str[0];
      const longitude = str[1];
      this.goodsList = await homelist(latitude, longitude,0,this.restaurant_category_id,this.restaurant_category_ids,this.order_by,this.delivery_mode,this.support_ids);
      this.$emit('changeSure',false)
      this.loadingShow = false;
    },
    goShop(id, name) {
      this.$store.state.shopinfo = { id, name };
      this.$router.push({
        path: "/shop",
        query: {
          geohash: this.geohash,
          id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@baseSize: 4.14vw;
.store-bd {
  ul {
    background: white;
    li {
      position: relative;
      // border:1px solid black;
      padding-top: (10 / @baseSize);
      margin: (5 / @baseSize);
      height: (90 / @baseSize);
      img {
        position: absolute;
        width: (70 / @baseSize);
        height: (70 / @baseSize);
        left: (10 / @baseSize);
        background: rgb(128, 223, 128);
      }
      hgroup {
        margin-left: (85 / @baseSize);
        margin-right: (10 / @baseSize);
        // border:1px solid black;
        header {
          height: (20 / @baseSize);
          h5 {
            float: left;
          }
          pre {
            float: right;
          }
        }
        section {
          width: 100%;
          height: (16 / @baseSize);
          position: relative;
          margin-top: (10 / @baseSize);
          hgroup {
            position: absolute;
            margin: 0;
            padding: 0;
            left: 0;
            width: 65%;
            text-align: left;
            font-size: (8 / @baseSize);
            .star {
              display: inline-block;
              font-size: (12 / @baseSize);
            }
            i {
              display: inline-block;
              font-size: (10 / @baseSize);
              color: rgb(243, 171, 37);
            }
            span {
              display: inline-block;
              font-size: (12 / @baseSize);
            }
          }
          div {
            position: absolute;
            right: 0;
            width: 35%;
            span {
              margin: 0;
              padding: (3 / @baseSize);
              font-size: (8 / @baseSize);
              &:first-child {
                border: 1px solid #3190e8;
                background: #3190e8;
                color: white;
              }
              &:last-child {
                border: 1px solid #3190e8;
                color: #3190e8;
              }
            }
          }
        }
        footer {
          position: relative;
          height: (20 / @baseSize);
          margin-top: (6 / @baseSize);
          pre {
            position: absolute;
            padding: 0;
            margin: 0;
            left: 0;
            bottom: 0;
            width: 50%;
            font-size: (12 / @baseSize);
          }
          div {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 45%;
            height: 100%;
            // border:1px solid black;
            pre {
              position: absolute;
              left: 0;
              font-size: (12 / @baseSize);
            }
            span {
              position: absolute;
              right: 0;
              font-size: (10 / @baseSize);
              color: #3190e8;
              bottom: 0;
            }
          }
        }
      }
    }
  }
}
</style>