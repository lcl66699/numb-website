<template>
  <div id="master">
    <Nav />
    <router-view />
    <!-- 返回顶部 -->
    <GoTop />
  </div>
</template>
<script>
// 导航条
import Nav from "./components/head/Nav";
// 返回顶部
import GoTop from "./components/GoTop";

export default {
  data() {
    return {};
  },
  components: {
    GoTop,
    Nav,
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
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
