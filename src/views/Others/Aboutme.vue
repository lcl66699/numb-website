<template>
  <div id="aboutme">
    <div class="aboutme-head">
      <h2 class="heading">About Author</h2>
    </div>
    <!-- 内容 -->
    <div class="aboutme-content">
      <div class="aboutme-img">
        <img :src="aimg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import a from "../../assets/images/banner1.png";
export default {
  data() {
    return {
      aimg: a,
    };
  },
  components: {},
};
</script>

<style lang="scss" scoped>
#aboutme {
}
</style>
