<template>
  <div>
    <!-- 头部导航 -->
    <Nav />
    <!-- 关于我 -->
    <Aboutme />
  </div>
</template>
<script>
// @ is an alias to /src
import Nav from "../../components/head/Nav";
import Aboutme from "./Aboutme";
export default {
  name: "Home",
  components: {
    Nav,
    Aboutme,
  },
};
</script>
