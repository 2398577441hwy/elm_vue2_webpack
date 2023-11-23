<template>
    <div>
        <span v-if="showTimer">{{timming}}</span>
        <span class="moreOrder" v-else>再来一单</span>
    </div>
</template>

<script>
export default {
    props:['goTime'],
    data(){
        return{
            num:900,
            Timer:null,
            showTimer:true
        }
    },
    computed:{
        otherTime(){
            return this.num - Number.parseInt(this.goTime)
        },
        timming(){
           let mm = Number.parseInt((this.otherTime / 60))
           let ss = Number.parseInt((this.otherTime % 60))
           if(mm < 10){
            mm = '0' + mm
           }
           if(ss< 10){
                ss = '0' + ss
           }
           return '去支付(还剩'+mm+'分'+ss+'秒)'
        }
    },
    mounted(){
        if(this.Timer){
            clearInterval(this.Timer)
        }
        this.Timer = setInterval(()=>{
            this.num--
            if(this.num == 0){
                clearInterval(this.Timer)
            }
        },1000)
    }
}
</script>

<style scoped lang="less">
span{
    border:1px solid orange;
    color: orange;
    padding: 3px 5px;
    border-radius: 5px;
}
</style>