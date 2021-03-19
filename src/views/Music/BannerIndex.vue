<template>
  <div>
    <el-container style="margin-top: 25px;margin-bottom: 45px;">
      <el-header height="300px;">
        <!--轮播图-->
        <el-carousel type="card" height="300px;">
          <el-carousel-item v-for="(item, index) in bannerInfo" :key="index">
            <el-image
              @click="changeUrl(item.targetId)"
              :src="item.imageUrl"
              fit="contain"
              style="height: 300px;"
            ></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-header>

      <el-main>
        <!--推荐歌单的模块渲染-->
        <el-row style="border-bottom: 2px solid rgb(230,230,230)">
          <p style="margin-bottom: 10px;font-size: 22px;">推荐歌单</p>
        </el-row>
        <el-row :gutter="12">
          <el-col
            :span="4"
            v-for="(item, index) in musicList"
            style="margin-top: 20px;position:relative;"
            :key="index"
          >
            <!--播放量-->
            <div
              style="background: rgba(128,128,128,0.2);color: white;
                                    width: 91%;position:absolute;z-index: 10;"
            >
              <div style="float:right;">
                <i class="el-icon-headset" style="margin-right: 5px;"></i>
                {{
                  item.playCount >= 10000
                    ? (item.playCount / 10000).toFixed(0) + "万"
                    : item.playCount
                }}
              </div>
            </div>

            <div class="songimg">
              <el-image
                :src="item.coverImgUrl"
                @click="toSongListPage(item.id)"
                style="box-shadow: 0 0 2px 2px gray;border-radius: 10px;cursor: pointer"
              >
              </el-image>
            </div>

            <h1
              id="songtitle"
              @click="toSongListPage(item.id)"
              style="cursor:pointer;"
            >
              {{ item.name }}
            </h1>
          </el-col>
        </el-row>

        <!--独家放送的模块渲染-->
        <el-row style="border-bottom: 2px solid rgb(230,230,230)">
          <p style="padding: 14px 0;font-size: 22px;">独家放送</p>
        </el-row>

        <el-row :gutter="40" style="margin-top: 25px;">
          <el-col :span="8" v-for="item in privateList" :key="item.id">
            <i
              class="el-icon-video-play"
              style="color: rgba(255,255,255,0.4);font-size: 45px;position: absolute;top: 10px;z-index: 10"
            ></i>
            <el-image
              @click="toVideoPage(item.id)"
              :src="item.sPicUrl"
              style="box-shadow: 0 0 2px 2px gray;border-radius: 5px;cursor:pointer;"
            ></el-image>
            <h1
              id="songtitle"
              @click="toVideoPage(item.id)"
              style="cursor: pointer"
            >
              {{ item.name }}
            </h1>
          </el-col>
        </el-row>

        <!--最新音乐的模块渲染-->
        <el-row style="border-bottom: 2px solid rgb(230,230,230)">
          <p style="padding: 14px 0;font-size: 22px;">最新音乐</p>
        </el-row>

        <!--最新音乐-->
        <el-row style="margin-top: 25px;">
          <!--左侧-->
          <el-col :span="12">
            <el-table
              :data="newMusicList.slice(0, 5)"
              stripe
              @row-dblclick="dblclickPlayMusic"
              :show-header="false"
            >
              <el-table-column type="index">
                <template scope="scope">
                  {{ "0" + (scope.$index + 1).toString() }}
                </template>
              </el-table-column>
              <el-table-column>
                <template scope="scope">
                  <i
                    class="el-icon-video-play"
                    @click="changeUrl(scope.row.id)"
                    style="position: absolute;font-size: 25px;top: 35px;left:35px;z-index: 10;cursor:pointer;"
                  ></i>

                  <el-image
                    :src="scope.row.picUrl"
                    @click="changeUrl(scope.row.id)"
                    style="width: 75px;height: 75px;cursor:pointer;"
                  ></el-image>
                  <span
                    style="position: absolute;top: 25px;font-size: 15px;font-weight: 500"
                  >
                    {{ scope.row.name }}
                  </span>
                  <span
                    @click="toSingerPage(scope.row)"
                    style="cursor:pointer;position: absolute;bottom: 25px;font-size: 12px;font-weight: 500"
                  >
                    {{ scope.row.song.artists[0].name }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>

          <!--右侧-->
          <el-col :span="12">
            <el-table
              :data="newMusicList.slice(5)"
              @row-dblclick="dblclickPlayMusic"
              stripe
              :show-header="false"
            >
              <el-table-column type="index">
                <template scope="scope">
                  {{
                    scope.$index >= 4
                      ? scope.$index + 6
                      : "0" + (scope.$index + 6).toString()
                  }}
                </template>
              </el-table-column>
              <el-table-column>
                <template scope="scope">
                  <el-image
                    :src="scope.row.picUrl"
                    @click="changeUrl(scope.row.id)"
                    style="width: 75px;height: 75px;cursor:pointer;"
                  ></el-image>
                  <i
                    class="el-icon-video-play"
                    @click="changeUrl(scope.row.id)"
                    style="position: absolute;font-size: 25px;top: 35px;left:35px;z-index: 10;cursor:pointer;"
                  ></i>

                  <span
                    style="position: absolute;top: 25px;font-size: 15px;font-weight: 500"
                  >
                    {{ scope.row.name }}
                  </span>

                  <span
                    @click="toSingerPage(scope.row)"
                    style="cursor:pointer;position: absolute;bottom: 25px;font-size: 12px;font-weight: 500"
                  >
                    {{ scope.row.song.artists[0].name }}
                  </span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      //轮播图数据列表
      bannerInfo: [],
      //需要播放的音乐地址
      musicUrl: "",
      //当前音乐的详情对象
      music: {},
      //推荐歌单的数据
      musicList: [],
      //独家放送的信息
      privateList: [],
      //最新音乐的推送列表
      newMusicList: [],
    };
  },
  props: {},
  created() {
    //获取轮播图数据
    this.getBannerInfo();
    //获取推荐歌单数据
    this.getMusicList();
    //获取独家放送的数据
    this.getPrivateList();
    //获取最新音乐的推送信息
    this.getNewMusicList();
  },
  methods: {
    //获取轮播图数据
    getBannerInfo() {
      this.$http
        .get("banner")
        .then((res) => {
          if (res.status !== 200) this.$message.error("轮播图数据获取失败");
          this.bannerInfo = res.data.banners;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // 轮播图
    changeUrl(musicId) {
      console.log("轮播图", musicId);
      if (musicId === null) return;
      // this.getMusicUrl(musicId);
      this.getMusicDetail(musicId);
      this.$emit("setSongListInfo", musicId);
    },
    //根据id获取音乐url
    // getMusicUrl(musicId) {
    //   this.$http.get("song/url", { params: { id: musicId } }).then((res) => {
    //     this.musicUrl = res.data.data[0].url;
    //   });
    // },
    //根据id获取音乐详情
    getMusicDetail(musicId) {
      this.$http
        .get("song/detail", { params: { ids: musicId } })
        .then((res) => {
          this.music = res.data.songs[0];
        });
    },
    //获取歌单数据
    getMusicList() {
      //随机取出精品歌单,避免数据是流动的
      this.$http
        .get("/top/playlist", {
          params: {
            offset: (Math.random() * 1297).toFixed(0) - 12,
            limit: 12, //请求的数量
          },
        })
        .then((res) => {
          this.musicList = res.data.playlists;
        });
    },
    //点击歌单跳转界面!!!
    toSongListPage(id) {
      console.log("歌单跳转界面!", id);
      this.$router.push({
        name: "SingerDetail",
        params: {
          id: id,
        },
      });
    },

    //获取独家放送数据
    getPrivateList() {
      this.$http.get("/personalized/privatecontent").then((res) => {
        this.privateList = res.data.result;
      });
    },
    //点击独家放送的图片跳转mv页面
    toVideoPage(mvId) {
      this.$router.push("video/" + mvId);
    },
    //推荐最新音乐
    getNewMusicList() {
      this.$http.get("personalized/newsong").then((res) => {
        this.newMusicList = res.data.result;
      });
    },
    //双击播放音乐
    dblclickPlayMusic(row) {
      this.changeUrl(row.id);
    },
    //点击歌手名跳转歌手详细页面
    toSingerPage(row) {
      this.$router.push("/singer/" + row.song.artists[0].id);
    },
  },
};
</script>

<style lang="scss" scoped>
// [class*="el-col-"] {
//   display: inline-block;
//   float: none;
// }

h1 {
  font-weight: 500;
}
.songimg {
  width: 151px;
  height: 151px;
}
#songtitle {
  height: 40px;
  padding-top: 10px;
  font-size: 16px;
  color: #333;
  line-height: 20px;
  // 超出两行省略显示
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
