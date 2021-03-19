<template>
  <div class="newMusic">
    <!-- 最新音乐 -->
    <div class="languages">
      <h2>语种:</h2>
      <div
        v-for="(item, index) in musicType"
        :key="item.type"
        :class="index == currentKey ? 'isActive' : 'types' + item.type"
        style="margin-left: 45px;cursor: pointer;"
        @click="changeType(item.type, index)"
        type="text"
      >
        {{ item.name }}
      </div>
    </div>

    <!--左侧-->
    <div v-if="newMusicInfo.length > 1">
      <el-col :span="22" :offset="2">
        <el-table :data="newMusicInfo" stripe :show-header="false">
          <el-table-column type="index">
            <template scope="scope">
              {{
                scope.$index + 1 >= 10
                  ? scope.$index + 1
                  : "0" + (scope.$index + 1).toString()
              }}
            </template>
          </el-table-column>

          <el-table-column>
            <template scope="scope">
              <i
                class="el-icon-video-play"
                @click="changeNewUrl(scope.row.id)"
                style="position: absolute;font-size: 25px;top: 35px;left:35px;z-index: 8;cursor:pointer;"
              ></i>

              <el-image
                :src="scope.row.album.picUrl"
                @click="changeNewUrl(scope.row.id)"
                style="width: 75px;height: 75px;cursor:pointer;"
              ></el-image>

              <span
                style="position: absolute;top: 25px;font-size: 15px;font-weight: 500"
              >
                {{ scope.row.name }}
              </span>
              <span
                style="position: absolute;bottom: 25px;font-size: 12px;font-weight: 500"
              >
                {{ scope.row.album.name }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </div>
  </div>
</template>
<script>
import Nav from "../../components/head/Nav";
import Foot from "../../components/Foot";
export default {
  name: "Home",
  data() {
    return {
      // 样式高亮
      currentKey: 0,
      //筛选条件
      queryInfo: {
        type: 0,
      },
      //最新音乐的数据
      newMusicInfo: [
        {
          id: 0,
          album: {
            picUrl: "",
          },
        },
      ],
      //标签数据
      musicType: [
        { type: 0, name: "全部" },
        { type: 7, name: "华语" },
        { type: 96, name: "欧美" },
        { type: 16, name: "韩国" },
        { type: 8, name: "日本" },
      ],
      //上一次点击的分类(默认的是type-1)
      prevType: "types" + 0,
    };
  },
  components: {
    Nav,
    Foot,
  },
  mounted() {
    // 新歌速递
    this.getNewMusic();
    // this.homepage();
  },
  methods: {
    /* 新歌速递 */
    getNewMusic() {
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$http
        .get("top/song", { params: this.queryInfo })
        .then((res) => {
          if (res.data.code == 200) {
            //请求成功
            loading.close();
            this.newMusicInfo = res.data.data;
          } else {
            loading.close();
            this.$message.error("请检查网路！");
          }
        })
        .catch((error) => {
          console.log(error);
          loading.close();
        });
    },
    //改变筛选条件
    changeType(typeId, index) {
      // console.log(typeId, index);
      this.currentKey = index;
      this.queryInfo.type = typeId;
      //赋值存储
      this.prevType = "types" + typeId;
      this.getNewMusic();
    },
    //播放点击的最新音乐
    changeNewUrl(musicId) {
      console.log("子集", this.newMusicInfo, musicId);
      var playlist = [];
      this.newMusicInfo.forEach((item) => {
        playlist.push(item.id);
      });
      this.$emit("setSongListInfo", musicId, playlist);
    },
  },
};
</script>
<style lang="scss" scoped>
.newMusic {
  float: left;
  width: 70%;
  .languages {
    margin-left: 86px;
    h2,
    div {
      float: left;
      padding: 20px 0;
    }
  }
}
.isActive {
  color: #10aeb5;
}
</style>
