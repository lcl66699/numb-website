<template>
  <div @click="ishanderHeight" class="wrapper123">
    <div class="head_btn">

      <el-button plain round type="warning" @click="getSource">随机更换评论</el-button>
      <el-button plain round type="danger" @click="download">生成PDF</el-button>
      <el-button plain round type="danger" @click="addImg">生成图片</el-button>
      <el-tooltip class="" effect="dark" content="Bottom Center 提示文字" placement="bottom">
        <div slot="content">
          温馨提示：下方文字点击后可进行自定义编辑，包括内容编辑和歌曲名字编辑；
          <br />
          <br />
          编辑完成后，点击上方的按钮可以生成pdf或图片哦~
        </div>
        <el-button type="info " icon="el-icon-info" circle></el-button>
      </el-tooltip>
    </div>
    <div id="pdfDom" class="music_comment">
      <div ref="btm_card" class="btm">
        <div ref="top_card" class="top">
          <h3 v-html="resObj.content" ref="topcontent" contentEditable='true' class="top_title"></h3>
          <!-- <textarea v-model="resObj.msg" class="top_title new_input" /> -->

          <div class="btm_title">
            <p class="for_music">来自网易云音乐——</p>
            <p class="for_music">
              单曲《<span v-html="resObj.source" ref="btmSource" contentEditable='true'></span>》歌曲评论
            </p>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="提示:长按保存图片哦" :visible.sync="dialogVisible" width="30%">
      <img class="my_img_diago" :src="baseImg" alt="">
    </el-dialog>

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
      resObj: {
        content: `奈何一个人随着年龄的增长，梦想便不复轻盈，
          他开始用双手掂量生活，更看重果实，而非花朵。`,
        source: "信仰",
      },
      baseImg: ``,
      dialogVisible: false,
    };
  },
  components: {},
  created() {
    // this.getSource();
  },
  mounted() {
    // window.addEventListener("click", (e) => {
    // console.log(e.target);
    // if (e.target.className != "dropdown") {
    //   this.otherShow = false;
    // }
    // });
  },
  methods: {
    ishanderHeight(e) {
      this.resObj.content = this.$refs.topcontent.innerText;
      //给下面元素赋值
      this.$nextTick(() => {
        this.$refs.btm_card.style.height =
          this.$refs.top_card.offsetHeight - 50 + "px";
      });
    },
    async getSource() {
      let { data } = await getHotReview();
      console.log(data);
      this.resObj = {
        content: data.newslist[0].content || "-",
        source: data.newslist[0].source || "-",
      };
      this.$nextTick(() => {
        this.$refs.btm_card.style.height =
          this.$refs.top_card.offsetHeight - 50 + "px";
      });
    },
    download() {
      window.scrollTo(0, 0);
      this.getPdf("1"); //false为不下载
    },
    async addImg() {
      window.scrollTo(0, 0);
      let data = await this.getImg("1"); //false为不下载
      this.baseImg = data;
      // console.log(12312321, data);
      this.dialogVisible = true;
    },
    dataURLtoFile(dataurl, filename) {
      //将base64转换为文件
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
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
.head_btn {
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #af2c31;
}

.music_comment {
  background: #ca3e2d;
  background: #af2c31;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  box-sizing: border-box;
  padding: 50px;
  padding-bottom: 300px;
  padding-bottom: 100px;
  .btm {
    width: 600px;
    min-height: 450px;
    border: 5px solid #fff;
    border-radius: 20px;
    position: relative;
    // top: 18%;
    // left: 32%;
    padding: 70px 60px 60px 60px;
    box-sizing: border-box;
  }
  .top {
    width: 600px;
    min-height: 500px;
    box-sizing: border-box;
    border: 5px solid #fff;
    border-radius: 20px;
    position: absolute;
    top: 6%;
    left: 6%;
    // left: 54%;
    z-index: 99;
    background: #ca3e2d;
    background: #af2c31;
    padding: 70px 60px 60px 60px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
      "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
      sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";

    font-family: Arial, Helvetica, sans-serif;
    font-style: normal;
  }
  .top_title {
    font-size: 40px;
    line-height: 52px;
    letter-spacing: 0px;
  }
  .top_btm_title {
    font-size: 30px;
    line-height: 32px;
    // opacity: 0;
  }
  .for_music {
    font-size: 26px;
    line-height: 36px;
    letter-spacing: 3px;
  }
  .btm_title {
    margin-top: 20px;
  }
  .new_input {
    background: none;
    outline: none;
    border: none;
    display: inline-block;
    color: #fff;
    vertical-align: top;
    outline: none;
  }
}
</style>

<style >
.my_img_diago {
  width: 100%;
}
</style>
