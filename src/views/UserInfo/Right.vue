<template>
  <div class="">

    <el-row class="right_box1">
      <el-col :span="24">
        <p class="head_txt">
          <img src="@/assets/create.png" alt="">
          创作中心
        </p>
        <el-row type='flex' class="all_read">
          <el-col class="allread_item allread_border" :span="12">
            <p>今日阅读 (播放) 数</p>
            <span>36</span>
          </el-col>
          <el-col class="allread_item" :span="12">
            <p>今日阅读 (播放) 数</p>
            <span>36</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24">
        <el-button class="create_txt">进入创作中心</el-button>
      </el-col>
    </el-row>

    <el-row class="right_box2">
      <el-col :span="24">
        <p class="head_txt">
          活跃用户
        </p>
      </el-col>
      <el-col :span="24">
        <el-row>
          <el-col class="img_active" v-for="(item,index) in 12" :key="index" :span='6'>
            <img src="https://picsum.photos/100/100" alt="">
            <p>程序员{{index}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.right_box1 {
  background: #fff;
  border-radius: 5px;
  padding: 12px;
  .head_txt {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #121212;
    img {
      height: 40px;
      width: 80px;
      margin-right: 10px;
    }
  }
  .create_txt {
    width: 100%;
    margin: 10px 0;
  }
  .all_read {
    background: rgba(133, 144, 166, 0.05);
    border-radius: 4px;
    height: 98px;
    padding: 9px;
    margin: 10px 0;
    .allread_item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      p {
        font-size: 12px;
        line-height: 22px;
      }
      span {
        margin-top: 10px;
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
      }
    }
    .allread_border {
      border-right: 1px solid hsla(0, 0%, 92.2%, 0.6);
    }
  }
}
.right_box2 {
  border-radius: 5px;
  background: #fff;
  padding: 12px;
  margin: 12px 0;
  .head_txt {
    font-size: 16px;
    padding-bottom: 15px;
    padding-top: 5px;
    margin-bottom: 15px;
    text-align: left;
    text-indent: 10px;
    font-weight: 600;
    border-bottom: 0.2px solid #f6f7fb;
  }
  .img_active {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      line-height: 30px;
      color: gray;
      font-size: 12px;
      width: 50px;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 80px;
    }
  }
}
</style>