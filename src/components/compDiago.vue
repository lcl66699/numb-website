/**
功能：对话框弹窗-默认title局中
作者：lcl
日期：2021-05-10
**/
<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="close" width="732px" center>
    <div class="module-dialog">
      <slot name="header"></slot>
      <slot></slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "登录西瓜村，与优秀村民深度交流",
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    open(val) {
      this.dialogVisible = true;
    },
    close() {
      this.$emit("closePop", false);
      this.dialogVisible = false;
    },
    close1() {
      this.$emit("closePop", false);
    },
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog {
  background: #fff;
  .el-dialog__header {
    background: rgb(237, 244, 255);
    padding: 13px;
    .el-dialog__title {
      color: #121212;
      font-weight: bold;
    }
    // 关闭按钮
    .el-dialog__close {
      position: relative;
      right: -70px;
      top: -11px;
      color: #fff;
      width: 40px;
      font-size: 32px;
    }
  }
}
.module-dialog {
  height: 400px;
}
</style>
<style lang="scss" >
.el-dialog--center .el-dialog__body {
  padding: 0 !important;
}
</style>