<template>
  <div style="margin-bottom: 55px;">
    <!--官方榜单信息渲染-->
    <el-row style="border-bottom: 2px solid rgb(230,230,230)">
      <p style="padding:10px 0;font-size: 22px;">官方榜</p>
    </el-row>

    <!-- 请求成功之后再渲染 -->
    <div v-if="musicRankList[0].coverImgUrl">
      <el-row style="">
        <el-col
          :span="6"
          :offset="1"
          v-for="(item, index) in 5"
          :key="index"
          style="margin-top: 25px;"
        >
          <el-image
            :src="musicRankList[item - 1].coverImgUrl"
            @click="toSongListPage(musicRankList[item - 1].id)"
            style="height: 200px;border-radius: 15px;cursor:pointer;"
          ></el-image>
          <!-- 下表格   @row-dblclick="playMusicList"-->
          <el-table
            row-class-name="row-height"
            :data="musicRankList[item - 1].tracks"
            @click="toSongListPage(musicRankList[item - 1].id)"
            :show-header="false"
          >
            <el-table-column type="index">
              <template scope="scope">
                <span style="color: red;font-weight: 400">{{
                  scope.$index + 1
                }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="first"></el-table-column>
            <el-table-column prop="second"></el-table-column>
          </el-table>
        </el-col>

        <!-- <el-col :span="6" :offset="1" style="margin-top: 25px;">
        <el-image
          :src="singerRankInfo.coverUrl"
          style="height: 200px;border-radius: 15px;"
        ></el-image>

        <el-table :data="singerRankInfo.artists" stripe :show-header="false">
          <el-table-column>
            <template scope="scope">
              <span style="color: red;font-weight: 400">{{
                scope.$index + 1
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="first"></el-table-column>
        </el-table>
      </el-col> -->
      </el-row>
    </div>
    <!-- 下面全球 -->
    <el-row style="border-bottom: 2px solid rgb(230,230,230)">
      <p style="padding:10px 0;font-size: 22px;">全球榜</p>
    </el-row>

    <el-row :gutter="10">
      <!-- 从5开始截 是因为上面有6个了 -->
      <el-col
        :span="4"
        v-for="(item, index) in musicRankList.slice(5)"
        style="padding: 10px;position:relative;"
        :key="index"
      >
        <!--播放量-->
        <div
          style="background: rgba(128,128,128,0.2);color: white;
             width: 85%;position:absolute;z-index: 10;"
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

        <div>
          <el-image
            :src="item.coverImgUrl"
            @click="toSongListPage(item.id)"
            style="box-shadow: 0 0 2px 2px gray;border-radius: 10px;cursor: pointer"
          >
          </el-image>
        </div>

        <h1
          @click="toSongListPage(item.id)"
          style="cursor:pointer;
        height:32px;padding:5px;color:#333
        "
        >
          {{ item.name }}
        </h1>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //排行榜的所有数据
      musicRankList: [
        {
          coverImgUrl: "",
        },
        {
          coverImgUrl: "",
        },
        {
          coverImgUrl: "",
        },
        {
          coverImgUrl: "",
        },
      ],
      //歌手榜的信息
      singerRankInfo: {
        coverUrl: "",
        artists: [],
      },
    };
  },
  created() {
    //获取官方榜单的数据
    this.getOfficialRankList();
  },
  methods: {
    //获得官方榜单的数据
    getOfficialRankList() {
      this.$http.get("toplist/detail").then((res) => {
        console.log("官方榜单的数据", res.data);
        this.musicRankList = res.data.list;
        this.singerRankInfo = res.data.artistToplist;
      });
    },
    //点击歌单跳转界面
    toSongListPage(id) {
      this.$router.push("/music/songlist/" + id);
    },
    //双击歌曲添加数据进去,并循环播放(向父组件传递参数)
    playMusicList(row) {
      this.$emit(
        "setSongListInfo",
        window.localStorage.getItem("playlist"),
        row.id
      );
    },
  },
};
</script>

<style lang="scss">
.row-height {
  // 看这里！！！！！！！！！！！！！！！！！！！！！！！！！！！！
  td .cell {
    // padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
