<template>
  <div>
    <el-row class="article_item" v-for="(item,index) in 8 " :key="index" type="flex">
      <el-col class="art_left" :span="6">
        <img src="https://picsum.photos/250/160" alt="">
      </el-col>
      <el-col class="art_right" :span="18">
        <h2>上线CSDN技术文章热榜接口，欢迎有需要的开发者对接</h2>
        <p class="content">制作清晰、好看的各种流程图、UML、产品架构图/制作清晰、好看的各种流程图、UML、产品架构图/技术架构图等是一个优秀的开发人员、产品经理必备的一项基础技能，选择好用的作图工具往往事半功倍，喜欢的话一定要收藏呀~</p>
        <div class="bottom_aut">
          <img src="https://picsum.photos/100/100" alt="">
          <div class="bottom_info">
            <span class="author_name">numb</span>
            <span class="time">2021-10-02 01:13:09</span>
          </div>
          <span class="read_num">678 阅读</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.article_item {
  // margin: 15px 0;
  padding: 30px 0px;
  border-bottom: 1px solid #e9e9e9;
}
.art_left {
  height: 150px;
  width: 250px;
  overflow: hidden;
  img {
    cursor: pointer;
    transition: all 0.5s;
    width: 100%;
    height: 100%;
  }
  img:hover {
    transform: scale(1.2);
  }
}
.art_right {
  padding: 0 12px 12px 20px;

  color: #5d5b5b;
  font-size: 14px;
  font-family: PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB,
    Microsoft Sans Serif, WenQuanYi Micro Hei, Helvetica, sans-serif;
  h2 {
    font-size: 20px;
    line-height: 42px;
    margin: 0 0 5px;
    transition: 0.5s;
    font-weight: 600;
    color: #343434;
  }
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    font-size: 14px;
    line-height: 25px;
    color: rgba(0, 0, 0, 0.6);
    text-align: justify;
    margin-bottom: 10px;
    height: 50px;
  }
  .bottom_aut {
    display: flex;
    align-items: center;
    height: 44px;
    position: relative;
    img {
      width: 30px;
      height: 30px;
      border: 3px solid #f3f0f0;
      border-radius: 50%;
    }
    .bottom_info {
      display: flex;
      justify-content: flex-start;
      margin-left: 15px;
      flex-direction: column;
      .author_name {
        color: #343434;
        line-height: 18px;
      }
      .time {
        color: #5d5b5b;
        line-height: 20px;
        font-size: 12px;
      }
    }
  }
  .read_num {
    position: absolute;
    right: 0;
    bottom: 3px;
  }
}
</style>