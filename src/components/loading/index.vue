<template>
  <transition name="loading">
    <div class="loading_container" v-if="show">
      <div
        class="load_img"
        :style="{ backgroundPositionY: -num * 100 + 'px' }"
      ></div>
      <svg
        class="load_ellipse"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <ellipse
          cx="26"
          cy="10"
          rx="26"
          ry="10"
          style="fill: #ddd; stroke: none"
        ></ellipse>
      </svg>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["show"],
  data() {
    return {
      num: 0,
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.num < 6) {
        this.num++;
      } else {
        this.num = 0;
      }
    }, 600);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped lang="less">
@baseSize: 4.14vw;
@keyframes load {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes ellipse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.5s ease;
}
.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
.loading_container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: (100 / @baseSize);
  height: (200 / @baseSize);
}
.load_img {
  position: absolute;
  width: 100px;
  height: 100px;
  background: url(../../asset/img/icon_loading.png) no-repeat 0 0;
  // background-size: 80px 80px;
  animation: load 0.6s infinite ease-in-out;
}
.load_ellipse {
  position: absolute;
  width: (100 / @baseSize);
  height: (100 / @baseSize);
  top: 100px;
  left: 20px;
  animation: ellipse 0.6s infinite ease-in-out;
}
</style>