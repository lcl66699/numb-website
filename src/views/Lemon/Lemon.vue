<template>
  <div>
    <!-- 头部导航 -->
    <Nav />
    <el-button @click="qingqiu"> 点我请求</el-button>

    <div v-if="VideoList">
      <div v-for="(item, index) in VideoList" :key="index">
        <p>发布时间{{ item.createtime }}</p>
        <p>总时间{{ item.createtime }}</p>
        <p>标题{{ item.avatar }}</p>
        <p>作者{{ item.author }}</p>
        <video controls="controls" :src="item.playaddr">
          您的浏览器不支持 video 标签。
        </video>
        .

        <!-- <img :src="item.coverurl" alt="" />
        <img :src="item.avatar" alt="" />
        -->
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Nav from "../../components/head/Nav";
import { getVideohot } from "../../api/index";
export default {
  name: "Home",
  data() {
    return {
      VideoList: [],
    };
  },
  components: {
    Nav,
  },
  methods: {
    qingqiu() {
      const promise1 = getVideohot();
      const promise2 = getVideohot();
      const promise3 = getVideohot();

      Promise.all([promise1, promise2, promise3]).then((value) => {
        console.log(111, value);
      });

      /*   getVideohot()
        .then((res) => {
          if (res.data.code == 200) {
            this.VideoList = res.data.newslist;
            console.log(res.data.newslist);
          } else {
            reject(res);
          }
        })
        .catch((err) => {
          console.log(err);
        }); */
    },
  },
  mounted() {},
};
</script>
