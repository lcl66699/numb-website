<template>
  <div class="my_wrapper">
    <newPP />
    <!-- <last /> -->
    <!-- <el-row :gutter="20" class="demo-image__lazy my_lazy">
      <el-col class="item" v-for="url in urls" :key="url">
        <el-image lazy :src="url"></el-image>
      </el-col>
    </el-row>
    <p v-if="loading">加载中...</p> -->

    <!-- <photoheader /> -->
  </div>
</template>
<script>
import photoheader from "./head.vue";
import newPP from "./newPP.vue";
import last from "./last.vue";

export default {
  name: "photo",
  components: {
    photoheader,
    newPP,
    last,
  },
  data() {
    return {
      loading: false,
      flag: true,
      imgList: [],
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg",
      ],
      list: [],
      k: 0,
    };
  },
  mounted() {
    //节流函数
    // const throttleHander = this.throttle(this.lazyLoading, 300);
    // window.addEventListener("scroll", throttleHander); // 滚动到底部，再加载的处理事件
  },
  methods: {
    async pushImg() {
      console.log(this.flag);

      if (this.flag) {
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            let { num, num1, num2 } = this.myRandom();
            this.urls.push(
              `https://picsum.photos/${num}/${num1}?random=${num2}`
            );
          }
          this.flag = true;
          console.log("执行完了", this.flag);
        }, 100);
      }
    },
    async lazyLoading() {
      // 滚动到底部，再加载的处理事件
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //滚动条位置
      let clientHeight = document.documentElement.clientHeight; //可视高度
      let scrollHeight = document.documentElement.scrollHeight; //总高度
      // console.log(scrollTop, clientHeight, scrollHeight);
      //不到底就触发
      if (scrollTop + clientHeight + 300 >= scrollHeight) {
        // 滚动到底部，逻辑代码
        //事件处理
        console.log("我已经滚动到底部了触发这个事件了"); //此处可以添加数据请求
        await this.pushImg();
        this.flag = false;
        //  ();
        // this.$axios.get("/static/data.json").then((res) => {
        //   //console.log(res.data.lists.length)
        //   if (this.k > res.data.lists.length - 1) {
        //     console.log(this.list);
        //     console.log("数据加载完毕");
        //     this.k = this.list.length - 1;
        //   } else {
        //     this.list.push(res.data.lists[this.k]);
        //   }
        //   this.k++;
        //   console.log(this.k);
        // });
      }
    },
    myRandom() {
      return {
        num: parseInt(Math.random() * (400 - 100 + 1) + 100),
        num1: parseInt(Math.random() * (400 - 100 + 1) + 100),
        num2: parseInt(Math.random() * (50 - 1 + 1) + 1),
      };
    },
  },
};
</script>
<style lang='scss' scope >
.my_wrapper {
  margin: 0 auto;
  width: 1200px;
  // .demo-image__lazy {
  //   height: 500px;
  //   overflow: auto;
  // }
}
.my_lazy {
  /*分几列*/
  column-count: 3;
  // display: flex;
  // flex-flow: column wrap;
  // height: 100vh;
}
.item {
  margin-top: 10px;
  // width: calc(100% / 3 - 20px);
}

.demo-image__lazy .el-image {
  display: block;
  height: 100%;

  /*不留白，不知道什么意思可以取消这个样式试试*/
  break-inside: avoid;
}
</style>
