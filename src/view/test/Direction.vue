<template>
  <div class="container" v-load-more="loadMore" ref="contain">
    <ul>
        <li v-for="(item,index) in this.total" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import {loadMore} from '@/mixin/mixin.js'
import BScroll from 'better-scroll'
export default {
    data(){
        return{
            total:10,
            ent:null
        }
    },

    mounted(){
        const contain = this.$refs['contain']
        this.ent = new BScroll(contain,{
            probeType:3
        })
        this.ent.on('scroll',(pos)=>{
            console.log(pos)
        })
    },
    mixins:[loadMore],
    methods:{
        loadMore(){
            console.log('增加数据')
            this.total +=10
        }
    }
}
</script>

<style scoped lang="less">
.container{
    position: fixed;
    left: 0;
    right: 0;
    top: 100px;
    height: 600px;
    background: pink;
    overflow: hidden;
}
li{
    height: 80px;
    line-height: 80px;
    border: 1px solid yellowgreen;
}
</style>