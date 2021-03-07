<template>
  <div>
    <swiper ref="mySwiper" class="home-Swiper" :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/images/banner1.png" alt="" />
        <div class="content ">
          <h3>11111</h3>
          <!-- <div v-if="aa"> -->
          <!-- </div> -->
        </div>
      </swiper-slide>
      <swiper-slide> </swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
// Import Swiper Vue.js components

// Import Swiper styles

export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //点击分页器的指示点分页器会控制Swiper切换。
        },
        loop: true, // 循环模式选项
        autoplay: true,
        autoplay: {
          delay: 3000, //自动切换的时间间隔
          stopOnLastSlide: false, //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
          disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        },
        parallax: true, //设置为true开启Swiper的视差效果，内容在切换时更有层次感
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    // console.log("Current Swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  },
};
</script>

<style lang="scss" scoped>
.home-Swiper {
  width: 1200px;
  height: 600px;
  img {
    width: 100%;
    height: 600px;
  }
  .swiper-slide {
    position: relative;
  }
  .content {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    color: seashell;
    width: 500px;
    height: 300px;
    padding: 40px;
    top: 100px;
    left: 100px;
    line-height: 30px;
  }
}
</style>
