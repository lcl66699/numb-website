<template>
  <div>
    <!-- 头部导航 -->
    <Nav />
    <div class="headFoods">
      <img src="../../assets/images/newyear.jpg" alt="" />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Nav from "../../components/head/Nav";

export default {
  name: "Home",
  components: {
    Nav,
  },
};
</script>
<style lang="scss" scoped>
.headFoods {
  margin: 0 auto;
  text-align: center;
}
img {
  width: 600px;
  height: 100%;
}
</style>
