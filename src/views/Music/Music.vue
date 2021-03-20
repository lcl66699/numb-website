<template>
  <div>
    <!-- 左侧个性推荐 -->
    <div class="wrapper">
      <div class="display">
        <el-header
          style="border-bottom: 1px solid rgb(230,230,230)"
          height="100%;"
        >
          <el-menu style="width: 250px;float:left">
            <el-menu-item
              :class="isavtivedHome == 'BannerIndex' ? 'isavtivedHome' : ''"
              @click="changeCompLeft('BannerIndex', this)"
              >个性推荐</el-menu-item
            >
            <el-menu-item
              :class="isavtivedHome == 'MusicRanking' ? 'isavtivedHome' : ''"
              @click="changeCompLeft('MusicRanking')"
              >排行榜</el-menu-item
            >

            <el-menu-item
              :class="isavtivedHome == 'NewMusic' ? 'isavtivedHome' : ''"
              @click="changeCompLeft('NewMusic')"
            >
              最新音乐
            </el-menu-item>
            <el-menu-item
              :class="isavtivedHome == 'Video' ? 'isavtivedHome' : ''"
              @click="changeCompLeft('Video')"
              >Mv</el-menu-item
            >
            <el-menu-item
              :class="isavtivedHome == 'MeMusic' ? 'isavtivedHome' : ''"
              @click="changeCompLeft('MeMusic')"
              >我的信息</el-menu-item
            >
          </el-menu>
        </el-header>

        <!-- 右侧展示 -->
        <keep-alive>
          <component :is="compleft" @setSongListInfo="getMusicUrl" />
        </keep-alive>
      </div>
      <!-- 新歌 -->
      <!-- <NewMusic @setSongListInfo="getMusicUrl" /> -->

      <audio controls :src="musicUrl" autoplay class="playMusicAudio"></audio>
    </div>

    <Foot />
  </div>
</template>
<script>
import Foot from "../../components/Foot";
import NewMusic from "./NewMusic";

export default {
  name: "Home",
  data() {
    return {
      isavtivedHome: "BannerIndex", //音乐首页左侧的动态组件样式切换
      // 播放音乐的链接
      musicUrl: "",
      // 动态组件
      compleft: "BannerIndex",
    };
  },
  components: {
    Foot,
    NewMusic, //最新音乐
    MeMusic: () => import("./MeMusic.vue"),
    BannerIndex: () => import("./BannerIndex.vue"), //歌单
    MusicRanking: () => import("./MusicRanking.vue"), //排行
    Video: () => import("./Video/Video.vue"), //排行
  },
  mounted() {
    // 新歌速递
    // this.homepage();
  },
  methods: {
    // 动态组件切换
    changeCompLeft(compName) {
      this.compleft = compName;
      this.isavtivedHome = compName;
    },
    /*
  首页-发现
说明 : 调用此接口 , 可获取音乐首页信息 */
    homepage() {
      this.$http
        .get("/homepage/block/page")
        .then((res) => {
          if (res.data.code == 200) {
            console.log("获取APP首页信息", res);
          } else {
            console.log("请求失败", res);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //根据id获取音乐url
    getMusicUrl(musicId) {
      this.$http.get("song/url", { params: { id: musicId } }).then((res) => {
        console.log("fuji", musicId, res);
        this.musicUrl = res.data.data[0].url;
      });
    },
    //设置当前播放url
    setMusicUrl(mUrl, detail) {
      //设置关于音乐的链接和歌曲信息
      this.musicUrl = mUrl;
      this.music = detail;
      this.curId = detail.id;
      console.log("父类传的", mUrl, detail);
      //将当前轮播图传来的歌曲id放入歌单中
      this.playListInfo.push(detail.id);

      this.setAudioTagsInfo();
    },
  },
};
</script>
<style lang="scss">
.wrapper {
  width: 1280px;
  margin: 0 auto;
  .display {
    display: flex;
  }
  .el-header {
    .isavtivedHome {
      color: #10aeb5 !important;
      border-left: 4px solid;
    }
  }
}
</style>
