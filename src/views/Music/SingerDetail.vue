<template>
  <div class="warpper">
    <el-container style="margin-bottom: 55px;">
      <el-header height="220px;">
        <el-row>
          <!--歌单图标-->
          <img
            :src="currentSongList.coverImgUrl"
            style="width: 220px;height: 220px;"
          />

          <!--右侧歌曲信息-->
          <div style="float:right;color: gray">
            <div style="opacity: 0.7">
              <p>歌曲数 | 播放量</p>
              <p style="float:right;margin: 0;padding:4px">
                {{ currentSongList.trackCount }} |
                {{ (currentSongList.playCount / 10000).toFixed(0) }}万
              </p>
            </div>
          </div>

          <!--标签及名字-->

          <el-tag
            type="danger"
            style="background-color: white;position: absolute;top: 0;left: 240px;"
            >精品歌单
          </el-tag>
          <h2 style="position: absolute;top: 7px;left: 320px;font-weight: 400">
            {{ currentSongList.name }}
          </h2>

          <!--作者信息-->
          <img
            :src="currentSongList.creator.avatarUrl"
            style="width: 35px;height: 35px;border-radius:15px;position: absolute;top: 50px;left: 20%;"
          />
          <span
            style="width:128px;overflow:hidden;position:absolute;top: 61px;left: 24%;"
            >{{ currentSongList.creator.nickname }}</span
          >
          <span style="position:absolute;top: 61px;left: 35%;opacity: 0.7;"
            >{{ currentSongList.createTime | dateFormat }}创建</span
          >

          <!--按钮组-->
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-video-play"
            style="position:absolute;top: 100px;left: 240px;"
            @click="setSongListInfo(playList, playList[0])"
          >
            播放全部
          </el-button>

          <el-button
            icon="el-icon-folder-add"
            size="mini"
            @click="subscripe(currentSongList.id)"
            style="position: absolute;top: 100px;left: 340px;color: black"
          >
            收藏({{ currentSongList.subscribedCount }})
          </el-button>

          <!--标签信息-->
          <span style="position: absolute;top: 150px;left: 240px;">
            标签:
            <span
              style=" fontSize:14px;color: rgb(12,115,194);cursor: pointer"
              v-for="(item, index) in currentSongList.tags"
              :key="index"
              >{{
                index + 1 === currentSongList.tags.length ? item : item + " / "
              }}</span
            >
          </span>

          <!--简介信息-->
          <el-collapse
            style="position: absolute;top: 180px;left: 240px;border: none;z-index: 999"
          >
            <el-collapse-item
              :title="
                '介绍: ' +
                  (currentSongList.description + '').substr(0, 26) +
                  '...'
              "
            >
              <p>{{ currentSongList.description }}</p>
            </el-collapse-item>
          </el-collapse>
        </el-row>
      </el-header>
      <!--歌曲 -->
      <el-main>
        <el-menu
          default-active="1"
          class="el-menu-demo"
          mode="horizontal"
          style="width: 280px;"
        >
          <el-menu-item index="1" @click="toMusicListPage"
            >歌曲列表</el-menu-item
          >
          <el-menu-item index="2" @click="toCommentPage"
            >评论({{ currentSongList.commentCount }})</el-menu-item
          >
        </el-menu>

        <router-view
          ref="child"
          @setSongListInfo="setSongListInfo"
        ></router-view>
        <!-- 音乐列表 -->

        <!-- <MusicListTable v-if="ids.length >= 1" :ids="ids" /> -->
        <!-- <CommentPage v-if="currentId" :currentId="currentId" /> -->
        <div v-if="ids.length >= 1 && currentId">
          <component
            :is="MusicListTable"
            :ids="ids"
            :currentId="currentId"
            @setSongListInfo="setSongListInfo"
          />
        </div>
      </el-main>
    </el-container>

    <audio controls :src="musicUrl" autoplay class="playMusicAudio"></audio>
  </div>
</template>

<script>
import MusicListTable from "./MusicListTable";
import CommentPage from "./CommentPage";
export default {
  data() {
    return {
      musicUrl: "",
      //当前音乐的id
      curId: 0,
      //当前音乐详情对象
      music: {
        name,
        al: {
          picUrl: "",
        },
        ar: [
          {
            name: "",
          },
        ],
      },
      currentId: "",
      // 动态组件
      MusicListTable: "MusicListTable",
      //传给子音乐列表的
      ids: [],
      //前一个组件传递过来的值
      currentId: this.$route.params.id,
      //当前歌单信息
      currentSongList: {
        //创建人信息
        creator: {
          avatarUrl: "",
          nickname: "",
        },
        trackIds: [],
      },
      //传递给下一个组件的所有歌曲id查询信息
      queryIds: "",
      //当前歌单所有歌曲id信息
      playList:
        window.localStorage.getItem("playList") === null
          ? []
          : window.localStorage.getItem("playList").split(","),
      playListInfo: [],
    };
  },
  components: {
    MusicListTable,
    CommentPage,
  },
  watch: {
    // currentId(newName, oldName) {
    //   console.log(newName, oldName);
    // },
  },
  created() {
    this.getSongListInfo();
  },
  mounted() {
    console.log("大$route.params.id", this.currentId);
    //把上一个页面传递来的参数放入localstorage 防止页面刷新 参数没了
    window.localStorage.setItem("currentId", this.currentId);
  },
  methods: {
    //获取歌单信息并处理歌单所有歌曲数据
    getSongListInfo() {
      this.$http
        .get("playlist/detail", { params: { id: this.currentId } })
        .then((res) => {
          //   console.log(
          //     "获取歌单信息并处理歌单所有歌曲数据",
          //     res.data.playlist.trackIds
          //   );
          this.currentSongList = res.data.playlist;
        })
        .then(() => {
          // 传给子音乐列表的
          this.toMusicListPage();
        });
    },
    //路由跳转并携带歌单ids数组参数,没必要跳
    toMusicListPage() {
      var queryIds = "";
      this.currentSongList.trackIds.forEach((item) => {
        queryIds += item.id + ",";
      });
      this.ids = queryIds.substr(0, queryIds.length - 1);
      this.MusicListTable = "MusicListTable";
      //   console.log("父音乐列表", this.ids);

      //   this.$router.push({
      //     name: "musicPage",
      //     params: {
      //       ids: queryIds.substr(0, queryIds.length - 1),
      //     },
      //   });
    },
    //路由跳转携带参数
    toCommentPage() {
      this.MusicListTable = "CommentPage";
      //   this.$router.push("/comment/" + this.currentId);
    },
    //子组件传递来的歌单所有歌曲id信息,和当前播放的音乐的id
    // setSongListInfo(songList, curId) {
    //   this.playList = songList;
    //   this.$emit("setSongListInfo", songList, curId);
    // },
    //接受子路由传递过来的歌单信息
    async setSongListInfo(songList, curId) {
      this.playList = songList;
      console.log("子路由传递过来的歌单信息");
      this.playListInfo = songList;
      //将当前歌单信息放入localStorage
      window.localStorage.setItem("playList", songList);

      //设置当前歌单点击需要播放的音乐链接
      const res = await this.$http.get("song/url", { params: { id: curId } });

      if (res.data.data[0].url === null) {
        this.$message.info("当前歌曲暂不可用,已为您自动跳过");
        this.curId = curId;
        this.changeNextMusic();
      } else {
        this.musicUrl = res.data.data[0].url;
        //设置当前歌单的详细信息
        this.$http
          .get("song/detail", { params: { ids: curId } })
          .then((res) => {
            console.log(66, res);
            this.music = res.data.songs[0];
          });
        //设置当前播放音乐的id
        this.curId = curId;
        //设置audio的各种信息
        // this.setAudioTagsInfo();
      }
    },

    //切换下一首歌
    changeNextMusic() {
      const nextOne = this.playListInfo[
        this.playListInfo.findIndex((target) => {
          return target === this.curId;
        }) + 1
      ];
      this.setSongListInfo(this.playListInfo, nextOne);
    },
    //切换上一首歌
    changePrevMusic() {
      const prevOne = this.playListInfo[
        this.playListInfo.findIndex((target) => {
          return target === this.curId;
        }) - 1
      ];
      this.setSongListInfo(this.playListInfo, prevOne);
    },

    //收藏歌单
    subscripe(id) {
      this.$http
        .get("playlist/subscribe", { params: { id: id, t: 1 } })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            return this.$message.success("收藏成功,数据同步需要时间!");
          } else {
            return this.$message.info("收藏失败!");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.warpper {
  padding: 20px;
  width: 1280px;
  margin: 0 auto;
  .el-button {
    border-radius: 5px;
    color: white;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: 0px;
  }

  .el-menu-item.is-active {
    color: black;
    border-bottom: 2px solid #10aeb5 !important;
  }
}
</style>
