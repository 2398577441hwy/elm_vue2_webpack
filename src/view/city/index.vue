<template>
  <div>
    <myHeader goBack="true">
        <template v-slot:title>
            {{cityname}}
        </template>
        <template v-slot:more>
            <router-link to="/adress" class="changecity">切换城市</router-link>
        </template>
    </myHeader>
        <!-- v-on:submit.prevent  
            是Vue.js框架中的一个指令，用于在表单提交时阻止默认提交行为，并执行指定的方法
            v-on 绑定事件指令
            submit 事件名称
            .prevent 阻止默认行为
        -->
    <form class="main" action="" v-on:submit.prevent>
        <!-- type="search" 会有小×号   required 为空会有提示 -->
        <input type="search" placeholder="输入学校 商务楼 地址" v-model="keywords" required>
        <button @click="submitkeywords">提交</button>
    </form>
    <section class="historyList" v-if="showItem && historyList.length!==0">
        <header>搜索历史</header>
        <div class="item" v-for="(item,index) in historyList" :key="index"><h2>{{item.address}}</h2><p>{{item.name}}</p></div>
        <footer @click="clearHistoryList">清空所有</footer>
    </section>
    <section class="itemList" v-if="true">
        <div class="item" v-for="(item,index) in list" :key="index" @click="addHistoryItem(item)"><h2>{{item.address}}</h2><p>{{item.name}}</p></div>
    </section>
  </div>
</template>

<script>
import myHeader from '@/components/header/myHeader.vue'
import {searchAdress} from '@/service/getData.js'
import requests from '@/config/mockFetch.js'
import {mapState,mapMutations} from 'vuex'
export default {
    data(){
        return {
            cityname:'',
            a:'',
            keywords:'',
            list:[],
            showItem:true
        }
    },
    components:{myHeader},
    computed:{
        ...mapState(['historyList'])
    },
    mounted(){
       this.cityname = sessionStorage.getItem('cityname')
    },
    methods:{
        async submitkeywords(){
            console.log(this.keywords,Number(this.$route.params.id))
           if(this.keywords){
            const result =  await requests('/address')
            this.list = result.data.data
           }
           this.showItem = !this.showItem
        },
        addHistoryItem(item){
            const arr  = this.historyList.filter(ele=>{
                return ele.id == item.id
            })
            // 如果长度为0 加入仓库
            if(!arr.length){
                this.$store.commit('SETHISTORYLIST',item)
            }
            this.$router.push({
                path:'/home',
                query:{
                    address:item.address
                }
            })
        },
        clearHistoryList(){
            this.$store.commit('CLEARHISTORYLIST')
        }
    }
}
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
.changecity{
    color:white;
}
.main{
    width: 100%;
    height: (120 / @baseSize);
    margin-top:(60 / @baseSize);
    background: white;
    input{
        width: 90%;
        margin-top: (10 / @baseSize);
        padding-left: (10 / @baseSize);
        height: (35 / @baseSize);
    }
    button{
        width: 90%;
        background:#3190e8;
        margin-top: (15 / @baseSize);
        height: (40 / @baseSize);
        color: white;
        border-radius: (5 / @baseSize);
    }
}

.historyList,.itemList{
    text-align: left;
    header{
        padding-left: (10 / @baseSize);
        height: (30 / @baseSize);
        line-height: (30 / @baseSize);
    }
    .item{
        background: white;
        padding-left: (10 / @baseSize);
        border-bottom: 1px solid rgb(222, 218, 218);
        h2{
            font-weight: normal;
            font-size: (18 / @baseSize);
            padding-top:(10 / @baseSize);
            padding-bottom: (10 / @baseSize);
        }
        p{
            color: gray;
            font-size: (14 / @baseSize);
            padding-bottom: (8 / @baseSize);
        }
    }
    footer{
        background: white;
        height: (50 / @baseSize);
        text-align: center;
        line-height: (50 / @baseSize);
        font-size: (18 / @baseSize);
    }
}
</style>