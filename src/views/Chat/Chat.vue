<template>
  <div class="wrapper">
    <ul>
      <li>
        <p class="commit-content">
          你可以在夜里崩溃，但我希望天一亮，你又能顶住
          四面八方的压力，继续努力的生活。
        </p>
        <p class="commit-song">——来自粉丝投稿</p>
      </li>
      <li>
        <p class="commit-content">
          奈何一个人随着年龄的增长，梦想便不复轻盈，
          他开始用双手掂量生活，更看重果实，而非花朵。
        </p>
        <p class="commit-song">——摘自网易云热评《过时》</p>
      </li>
      <li>
        <p class="commit-content">
          我以前不理解爸爸，为什么他不能挣大钱，
          为什么一家人过的这么艰难，直到自己工作才发现，
          养活我们已经是他最大的能力了。
        </p>
        <p class="commit-song">——摘自网易云热评《父亲写的散文诗》</p>
      </li>
    </ul>
    <ul v-if="musicList">
      <li v-for="(item, index) in musicList" :key="index">
        <p class="commit-content">
          {{ item.content }}
        </p>
        <p class="commit-song">——来自网易云音乐《{{ item.source }} 》</p>
      </li>
    </ul>

    <el-button @click="yiyu"> 点我请求评论</el-button>
    <router-view />
  </div>
</template>
<script>
import { getHotReview } from "../../api/index"; //抑郁云热评
export default {
  name: "Home",
  data() {
    return {
      musicList: [], //请求到的网易云音乐评论
    };
  },
  components: {},
  created() {
    this.yiyu();
  },
  methods: {
    yiyu() {
      const promise1 = getHotReview();
      const promise2 = getHotReview();
      // const promise3 = getHotReview();
      Promise.all([promise1, promise2])
        .then((value) => {
          for (let i of value) {
            if (i.data.code == 200) {
              this.musicList.push(i.data.newslist[0]);
            }
          }
        })
        .then(() => {
          console.log("请求到的网易云评论接口", this.musicList);
        })
        .catch((error) => {
          console.log("网易云评论接口", error);
        });

      // getHotReview()
      //   .then((res) => {
      //     console.log(res);
      //     if (res.data.code == 200) {
      //       console.log(res.data);
      //     } else {
      //       reject(res);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  // text-align: center;
  width: 1280px;
  .commit-content {
    margin-top: 22px;
    font-size: 16px;
    line-height: 24px;
    color: #333;
    text-align: justify;
  }
  .commit-song {
    margin-top: 4px;
    font-size: 16px;
    line-height: 24px;
    color: #333;
    text-align: justify;
  }
}
</style>
