<template>
  <div>
    <header>
        <span>ele.me</span>
        <router-link to="/login"><span>登录|注册</span></router-link>
    </header>
    <section class="currentAddress">
        <div class="hd">
            <span>当前定位城市</span>
            <span>定位不准时,请在城市列表中选择</span>
        </div>
        <div class="bd">
            <a href="#">{{localCity.name}}</a>
            <svg class="arrow_right" height="46" width="46">
                <use data-v-3ea254f4="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
        </div>
    </section>
    <div class="main">
        <section class="hotCities">
            <div class="hd">热门城市</div>
            <div class="bd">
                <ul>
                    <li v-for="item in hotCities" :key="item.id"><a href="#">{{item.name}}</a></li>
                </ul>
            </div>
        </section>
        <section class="AllCities">
            <div class="sortCitiy" v-for="(item,key,index) in sortCity" :key="index">
                <span>{{key}}</span>
                <ul>
                    <li v-for="t in item" :key="t.id"><a href="#">{{t.name}}</a></li>
                </ul>
            </div>
        </section>
    </div>
  </div>
</template>

<script>
import {cityGuess,hotCity,allCity} from '@/service/getData'
export default {
  name:'home',
  data(){
    return{
        localCity:{},
        hotCities:[],
        allCities:{},
    }
  },
  mounted(){
    this.getData()
  },
  methods:{
    async getData(){
      this.localCity = await cityGuess()
      this.hotCities = await hotCity()
      this.allCities = await allCity()
    },
  },
  computed:{
     sortCity(){
        let sortObj = {}
        for(let i=65;i<=90;i++){
            const fu = String.fromCharCode(i)
            if(this.allCities[fu]){
            sortObj[fu] = this.allCities[fu]
            }
        }
        return sortObj
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/style/header.less';
@baseSize:4.14vw;
.currentAddress{
    background-color: white;
    padding-top: (10 / @baseSize);
    margin-bottom:(10 / @baseSize);
    border-bottom: 1px solid #e4e4e4;
    .hd{
        height: (45 / @baseSize);
        border-bottom: 1px solid #e4e4e4;
        display: flex;
        justify-content: space-between;
        padding: 0 (10 / @baseSize);
        line-height: (45 / @baseSize);
        span:last-child{
            font-size: (12 / @baseSize);
        }
    }
    .bd{
        height:(40 / @baseSize);
        padding: 0 (10 / @baseSize);
        display: flex;
        justify-content: space-between;
        a{
            color: #3190e8;
            font-size: (20 / @baseSize);
            line-height: (46 / @baseSize);
        }

    }
}
.main{
    .hotCities{
        background-color: white;
        .hd{
            height: (39 / @baseSize);
            line-height: (39 / @baseSize);
            text-align: left;
            padding-left: (10 / @baseSize);
            // border:1px solid black;
        }
        .bd{
            ul{
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                border-top: 1px solid #e4e4e4;
                li{
                    width: 25%;
                    height: (45 / @baseSize);
                    line-height: (45 / @baseSize);
                    text-align: center;
                    border-bottom: 1px solid #e4e4e4;
                    border-left: 1px solid #e4e4e4;
                    a{
                        color:#3190e8;
                    }
                }
                
            }
        }
    }
   .AllCities{
        .sortCitiy{
            background-color: white;
            margin-top: (10 / @baseSize);
            span{
                display: block;
                height:(40 / @baseSize);
                line-height: (40 / @baseSize);
                color: rgb(67, 64, 64);
                padding-left: (10 / @baseSize);
                text-align: left;
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                border-top: 1px solid gainsboro;
                li{
                    width: 25%;
                    height: (45 / @baseSize);
                    line-height:(45 / @baseSize) ;
                    text-align: center;
                    border-bottom: 1px solid gainsboro;
                    border-left:1px solid gainsboro;
                }
            }
        }
   }
}
</style>