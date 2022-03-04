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
        require("@/assets/images/(3).png"),
        require("@/assets/images/(13).png"),
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
      throttleHander: null,
      initQuery: {
        page: 2,
        limit: 100,
      },
      timer: null,
    };
  },
  mounted() {
    waterFall(this, this.$refs.box, { margin: 0, vgap: 15, hgap: 15 });

    // 页面尺寸改变时实时触发
    window.onresize = () => {
      //重新定义瀑布流
      if (this.$refs.box) {
        console.log("onresize重写定义瀑布流", this.$refs.box);
        waterFall(this, this.$refs.box, { margin: 4, vgap: 15, hgap: 15 });
      }
    };

    //节流函数
    this.throttleHander = this.throttle(this.lazyLoading, 300);
    window.addEventListener("scroll", this.throttleHander); // 滚动到底部，再加载的处理事件

    this.timer = setInterval(() => {
      // console.log("定时器");
      waterFall(this, this.$refs.box, { margin: 0, vgap: 15, hgap: 15 });
    }, 5000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
    // 在组件生命周期结束的时候销毁。
    window.removeEventListener("scroll", this.throttleHander, false);
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
      if (scrollTop + clientHeight >= scrollHeight && this.flag) {
        // 滚动到底部，逻辑代码
        //事件处理
        console.log("我已经滚动到底部了触发这个事件了"); //此处可以添加数据请求
        this.flag = false;
        this.axiosList();
      }
    },
    async axiosList() {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      //进行请求
      this.initQuery.page++; //页码增加
      photosList(this.initQuery)
        .then((res) => {
          console.log("列表", res);
          res.forEach((element) => {
            this.urls.push(element.download_url);
          });
          loading.close();
          waterFall(this, this.$refs.box, { margin: 0, vgap: 15, hgap: 15 });
          this.flag = true;
        })
        .catch(() => {
          loading.close();
          waterFall(this, this.$refs.box, { margin: 0, vgap: 15, hgap: 15 });
          this.flag = true;
        });
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
      border-radius: 12px;
      width: 100%;
      height: 100%;
    }
    &:hover {
      transform: scale(1.05, 1.05);
    }
  }
}
</style>
