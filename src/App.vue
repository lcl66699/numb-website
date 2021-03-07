<template>
  <div id="master">
    <router-view />
    <!-- 返回顶部 -->
    <GoTop />
  </div>
</template>
<script>
// 返回顶部
import GoTop from "./components/GoTop";
export default {
  data() {
    return {};
  },
  components: {
    GoTop,
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss">
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
