<template>
  <transition name="el-fade-in-linear">
    <div v-show="istop" @click="goTop" ref="topBox" class="go-top-style">
      <img :src="toTop" alt="" />
    </div>
  </transition>
</template>

<script>
import toTop from "../assets/images/toTop.png";
export default {
  data() {
    return {
      toTop: toTop,
      goTopTimer: null,
      istop: false, //默认没有返回顶部按钮，下拉一定高度实现
    };
  },
  mounted() {
    var topTimer = null;
    window.onscroll = () => {
      if (window.scrollY >= 1200) {
        //   第一种ref 控制css样式来显示隐藏
        // this.$refs.topBox.style = "display:block";
        // 第二种直接v-show 显示/隐藏
        // console.log("11", this.istop);
        this.istop = true;
        // console.log("22", this.istop);
        topTimer = setInterval(this.topTrue, 300);
      } else {
        // this.$refs.topBox.style.display = "none";
        this.istop = false;
        clearInterval(this.topTrue);
      }
    };
  },
  methods: {
    topTrue() {
      // console.log("函数触发");
    },
    goTop() {
      // 考虑连续点击的情况，点击之后先清一次
      clearInterval(this.goTopTimer);
      this.goTopTimer = setInterval(() => {
        const SPEED = 100;
        var topNumber = document.documentElement.scrollTop - SPEED;
        document.documentElement.scrollTop = topNumber;
        // 已经到顶部
        if (topNumber <= 0) {
          clearInterval(this.goTopTimer);
        }
      }, 30);
    },
  },
};
</script>

<style lang="scss">
.go-top-style {
  transition: all 1s;
  position: fixed;
  cursor: pointer;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
