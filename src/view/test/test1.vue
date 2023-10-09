<template>
  <div>
    <ul>
      <li><span @click="showTime($event)"></span></li>
      <li><span @click="showTime($event)"></span></li>
      <li><span @click="showTime($event)"></span></li>
      <li><span @click="showTime($event)"></span></li>
      <li><span @click="showTime($event)"></span></li>
      <li><span @click="showTime($event)"></span></li>
    </ul>

    <transition
      appear
      @before-enter="beforeEnter"
      @after-enter="afterEnter"
      v-for="(item,index) in showDot" :key="index"
    >
      <div class="dot" v-if="item">
        <div class="innerdot"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      elLeft:0,
      elTop:0,
      windowHeight:window.innerHeight,
      showDot:[]
    };
  },
  methods: {
    showTime(event){
        this.show = !this.show
        this.elLeft = event.target.getBoundingClientRect().left
        this.elTop = event.target.getBoundingClientRect().top
        this.showDot = [...this.showDot,true]
    },
    // 外快 细究一下  时间一样  速度和距离不一样，呈现的曲线不同  外快内慢和外慢内快所呈现的不一样  显示外盒子和显示内盒子呈现不一样 ？？？？
    beforeEnter(el) {
        el.style.transform = `translate3d(0,-${this.windowHeight - this.elTop}px,0)`
        el.children[0].style.transform = `translate3d(${this.elLeft - 30}px,0,0)`
    },
    // 动画进入之后 
    afterEnter(el) {
         el.style.transform = `translate3d(0,0,0)`;
                el.children[0].style.transform = `translate3d(0,0,0)`;
                el.style.transition = 'transform 3s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
                el.children[0].style.transition = 'transform 3s linear';
                console.log(this.showDot)
                this.showDot = []

    },
  },
};
</script>

<style lang="less">
/* 基本样式 */
ul {
  margin-top: 50px;
  li {
    height: 100px;
    margin-top: 20px;
    border: 1px solid rgb(227, 109, 109);
    span {
      display: block;
      float: right;
      width: 50px;
      height: 50px;
      border: 1px solid pink;
      margin-top: 15px;
      margin-right: 15px;
    }
  }
}
.dot {
    position: fixed;
    bottom: 50px;
    left: 30px;
  .innerdot{
    width: 25px;
    height: 25px;
    background-color: #3190e8;
    border:1px solid black;
  }
}
</style>