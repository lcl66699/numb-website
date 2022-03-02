<template>
  <div class="box_new_photo" ref="box" id="box">
    <div class="item" ref="item">
      <img src="@/assets/images/(2).png" alt="" />
    </div>
    <div v-for="(url,index) in urls" :key="index" class="item">
      <img :src="url" alt="" />
    </div>
  </div>
</template>

<script>
import { waterFall } from "./waterfall";
import { photosList } from "@/api/";
export default {
  data() {
    return {
      flag: true,
      urls: [
        require("@/assets/images/(1).png"),
        // require("@/assets/images/(2).png"),
        require("@/assets/images/(12).png"),
        require("@/assets/images/(14).png"),
        require("@/assets/images/(4).png"),
        require("@/assets/images/(5).png"),
        require("@/assets/images/(6).png"),
        require("@/assets/images/(7).png"),
        require("@/assets/images/(8).png"),
        require("@/assets/images/(9).png"),
        require("@/assets/images/(10).png"),
        require("@/assets/images/(11).png"),
        require("@/assets/images/(13).png"),
        require("@/assets/images/(3).png"),
        require("@/assets/images/(15).png"),
        require("@/assets/images/(16).png"),
        require("@/assets/images/(17).png"),
        require("@/assets/images/(18).png"),
        require("@/assets/images/(20).png"),
        require("@/assets/images/(19).png"),
        require("@/assets/images/(21).png"),
        require("@/assets/images/(22).png"),
        require("@/assets/images/(23).png"),
      ],
    };
  },
  mounted() {
    waterFall(this, this.$refs.box, { margin: 4, vgap: 4, hgap: 3 });

    // 页面尺寸改变时实时触发
    window.onresize = () => {
      console.log("重写定义瀑布流");
      //重新定义瀑布流
      waterFall(this, this.$refs.box, { margin: 4, vgap: 4, hgap: 3 });
    };

    //节流函数
    const throttleHander = this.throttle(this.lazyLoading, 300);
    window.addEventListener("scroll", throttleHander); // 滚动到底部，再加载的处理事件
  },
  methods: {
    async lazyLoading() {
      // 滚动到底部，再加载的处理事件
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //滚动条位置
      let clientHeight = document.documentElement.clientHeight; //可视高度
      let scrollHeight = document.documentElement.scrollHeight; //总高度
      // console.log(scrollTop, clientHeight, scrollHeight);
      //不到底就触发
      if (scrollTop + clientHeight >= scrollHeight) {
        // 滚动到底部，逻辑代码
        //事件处理
        console.log("我已经滚动到底部了触发这个事件了"); //此处可以添加数据请求
        const loading = this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
        setTimeout(() => {
          loading.close();
          waterFall(this, this.$refs.box, { margin: 4, vgap: 4, hgap: 3 });
        }, 2000);

        if (this.flag) {
          this.flag = false;
          photosList().then((res) => {
            res.forEach((element) => {
              this.urls.push(element.download_url);
            });
          });
        }
        // let _len = this.urls.length;
        // photosList().then((res) => {
        //   if (_len > res.length - 1) {
        //     console.log("数据加载完毕");
        //     _len = res.length - 1;
        //   } else {
        //     console.log("push");
        //     res.forEach((element) => {
        //       this.urls.push(element.download_url);
        //     });
        //   }
        //   _len++;
        //   console.log(_len);
        //   waterFall(this, this.$refs.box, { margin: 4, vgap: 4, hgap: 3 });
        // });

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
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
  height: 100%;
}
.box_new_photo {
  // margin: 40px;
  width: 100%;
  position: relative;
  box-sizing: content-box;
  .item {
    // width: 390px;
    position: absolute;
    // border: 1px solid #5592e5;
    transition: all 0.3s;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      transform: scale(1.05, 1.05);
    }
  }
}
</style>
