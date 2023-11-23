<template>
  <div class="page">
    <myHeader goBack="true">
      <template v-slot:title>订单备注</template>
    </myHeader>
    <div class="main">
      <section class="quickNode">
        <header>快速备注</header>
        <div v-for="(arr,outIndex) in remarkList" :key="outIndex" class="first"><span v-for="(remark,index) in arr" :key="index" :class="{active:tagRemark[outIndex]&&tagRemark[outIndex][0] === index}" @click="checkIt(outIndex,index,remark)">{{remark}}</span></div>
      </section>
      <section class="otherNode">
        <header>其他备注</header>
        <input type="textarea" placeholder="请输入备注内容(可不填)" v-model="notes">
      </section>
    </div>
    <button @click="confirmit">确定</button>
  </div>
</template>

<script>
import myHeader from "@/components/header/myHeader.vue";
import {remarksinfo} from '@/service/getData.js'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      remarkList:[],
      notes:'',
      // 需要将tagRemark设置为{} 是因为index随机  如果index不连续 则中间的index为undefined
      tagRemark:{}
    }
  },
  components: { myHeader },
  computed:{...mapState['remarkTag','remarkText']},
  mounted(){
    this.getData()
  },
  methods:{
    async getData(){
      const result = await remarksinfo(this.$route.query.cart_id)
      this.remarkList = result.remarks
    },
    checkIt(outIndex,index,remark){
      this.tagRemark[outIndex] = [index,remark]
      this.tagRemark = Object.assign({},this.tagRemark)
    },
    confirmit(){
      this.$store.state.remarkTag = this.tagRemark
      this.$store.state.remarkText = this.notes
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
.page {
  z-index: 101;
}
.main{
  margin-top: (60 / @baseSize);
  background: white;
  text-align: left;
  padding:(12 / @baseSize) (12 / @baseSize) (30 / @baseSize);
  header{
    height: (50 / @baseSize);
    line-height: (50 / @baseSize);
    font-size: #333;
    font-size: (18 / @baseSize);
  }
}
.first{
  display: inline-block;
  margin-left: (10 / @baseSize);
}
span{
  padding: (5 / @baseSize) (10 / @baseSize);
  border: 1px solid #3190e8;
  border-radius: (5 / @baseSize);
  &.active{
    background: #3190e8;
    color:white;
  }
}
input{
  width: 100%;
  height: (120 / @baseSize);
  border: 0;
  // 用户是否可以调整尺寸
  resize: none;
  background: #f5f5f5;
  border-radius: (8 / @baseSize);
  padding-left: (10 / @baseSize);
}
div{
  min-height: (50 / @baseSize);
}
button{
  background: #4cd964;
  width: 90%;
  height: (50 / @baseSize);
  border-radius: (10 / @baseSize);
  color: white;
  margin-top: (30 / @baseSize);
}
</style>