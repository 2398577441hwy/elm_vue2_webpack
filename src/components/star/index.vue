<template>
  <div class="container">
    <section data-v-5df6cab1="" class="star_container">
      <svg data-v-5df6cab1="" class="grey_fill" v-for="index in 5" :key="index">
        <use
          data-v-5df6cab1=""
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#star"
        ></use>
      </svg>
    </section>
   <div class="mark" :style="{width:(score / 5)*20 + 'vw'}">
     <section data-v-5df6cab1="" class="star_container">
      <svg
        data-v-5df6cab1=""
        class="orange_fill"
        v-for="index in 5"
        :key="index"
      >
        <use
          data-v-5df6cab1=""
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xlink:href="#star"
        ></use>
      </svg>
    </section>
   </div>
  </div>
</template>

<script>
export default {
  props:['score'],
  // data() {
  //   return {
  //     score: 3.6,
  //   };
  // },
};
</script>

<style scoped lang="less">
.mark{
    position: relative;
    width: 4vw;
    height: 4vw;
    overflow: hidden;
}
.container{
    position: relative;
    .star_container{
        position: absolute;
        width: 20vw;
        height: 4vw;
        display: flex;
    }
}
.orange_fill,.grey_fill{
    width: 4vw;
    height: 4vw;
}
.orange_fill{
    fill:#ff9a0d;
}
.grey_fill{
    fill:#d1d1d1;
}
</style>