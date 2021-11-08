<template>
  <div class="phone_width">
    <Nav v-show="navShow" />
    <!-- 返回顶部 -->
    <GoTop />
    <router-view />
  </div>
</template>
<script>
// 导航条
import Nav from "@/components/head/Nav";
// 返回顶部
import GoTop from "@/components/GoTop";

export default {
  data() {
    return {
      navShow: true,
      // 滚动前，滚动条距文档顶部的距离
      oldScrollTop: 0,
    };
  },
  components: {
    GoTop,
    Nav,
  },
  mounted() {
    // 监听页面滚动事件
    window.addEventListener("scroll", this.scrolling);
    if (!sessionStorage.getItem("isCome")) {
      this.$router.push("/welcome");
    }
  },
  methods: {
    scrolling() {
      // console.log("gun");
      // 滚动条距文档顶部的距离
    },
  },
};
</script>
<style lang="scss">
.phone_width {
  min-width: 1280px;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.go-top {
  display: none;
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
