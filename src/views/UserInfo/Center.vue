<template>
  <div class="center_box">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="抖音热榜" name="first">
        <Article />
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">正在开发~</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Article from "./Article.vue";
export default {
  components: { Article },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="scss" scoped>
.center_box {
  background: #fff;
  padding: 12px;
  margin-bottom: 50px;
  border-radius: 5px;
}
</style>