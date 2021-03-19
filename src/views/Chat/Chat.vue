<template>
  <div>
   
    <el-button @click="yiyu"> 点我请求抑郁云</el-button>
    <div>
      <ul v-if="musicList">
        <li v-for="(item, index) in musicList" :key="index">
          {{ item.content }}
          <span>歌名:{{ item.source }} </span>
        </li>
      </ul>
    </div>
    <router-view/>
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
  components: {

  },
  methods: {
    yiyu() {
      const promise1 = getHotReview();
      const promise2 = getHotReview();
      const promise3 = getHotReview();

      Promise.all([promise1, promise2, promise3])
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
