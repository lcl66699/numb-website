<template>
  <div>
    <el-row class="article_item" @click.native="goDance(item)" v-for="(item,index) in newslist " :key="index" type="flex">
      <el-col class="art_left" :span="6">
        <img :src="item.coverurl" alt="">
      </el-col>
      <el-col class="art_right" :span="18">
        <h2>{{item.title}}</h2>
        <p class="content">{{item.signature}}</p>
        <div class="bottom_aut">
          <img :src="item.avatar" alt="">
          <div class="bottom_info">
            <span class="author_name">{{item.author}}</span>
            <span class="time">{{formatTime(item.createtime)}}</span>
          </div>
          <span class="read_num">热榜指数：{{handNum(item.hotindex)}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { dyvideohot } from "@/api";
// import aa from "./1.json";
export default {
  data() {
    return {
      newslist: [],
    };
  },
  computed: {},
  mounted() {
    // this.newslist = aa.newslist;
    this.init();
  },
  methods: {
    handNum(val) {
      if (!val) return 0;
      if (val > 10000) {
        return (val / 10000).toFixed(2) + "万";
      }
    },
    async init() {
      let { newslist } = await dyvideohot();
      this.newslist = newslist;
    },
    goDance(row) {
      if (row.shareurl) {
        window.open(row.shareurl, "_blank");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.article_item {
  // margin: 15px 0;
  padding: 30px 0px;
  border-bottom: 1px solid #e9e9e9;
  cursor: pointer;
}
.art_left {
  height: 150px;
  width: 250px;
  overflow: hidden;
  img {
    cursor: pointer;
    transition: all 0.5s;
    border-radius: 5px;
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
    line-height: 30px;
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