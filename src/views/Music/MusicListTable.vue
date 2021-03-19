<template>
  <div>
    <!--歌曲列表-->
    <el-table
      row-class-name="row-height"
      :data="currentMusicListInfo"
      ref="playTable"
      highlight-current-row
      stripe
      style="cursor: context-menu;"
      @row-dblclick="playMusicList"
    >
      <el-table-column fixed label="序号" type="index">
        <template scope="scope">
          <img v-if="curId === scope.row.id" src="imgs/isPlay.png" alt="" />
          <p v-else>{{ scope.$index + 1 }}</p>
        </template>
      </el-table-column>

      <el-table-column
        fixed
        v-if="false"
        label="id"
        prop="id"
      ></el-table-column>

      <el-table-column fixed label="音乐标题" prop="name"></el-table-column>

      <el-table-column fixed label="歌手" prop="ar[0].name" width="180px;">
        <template scope="scope">
          <span
            v-for="(item, index) in scope.row.ar"
            :key="index"
            style="cursor: pointer"
          >
            {{
              index === 0 &&
              scope.row.ar.length > 1 &&
              index !== scope.row.ar.length - 1
                ? item.name + "/"
                : item.name
            }}
          </span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="专辑名" prop="al.name"></el-table-column> -->

      <el-table-column
        fixed
        label="时长"
        prop="dt"
        width="80px;"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //接受传递来的参数
      //   queryIds: ids ? ids : window.localStorage.getItem("queryIds"),
      //查询当前歌单所有音乐的name url 作者等等
      currentMusicListInfo: [],
      //歌单的歌曲id合集
      songListInfo: [],
      //父组件当前播放的音乐的id
      curId: parseInt(window.localStorage.getItem("curPlayMusicId")),
    };
  },
  props: ["ids"],
  created() {},
  mounted() {
    //获取列表信息数据
    this.handlerSongList();
    //注册监听的事件 在main.js中定义了
    // window.addEventListener("setItem", () => {
    //   this.curId = parseInt(localStorage.getItem("curPlayMusicId"));
    // });
    // if (this.ids) {
    //   console.log(this.ids, "音乐列表mounted");
    // }
    //放入上一个组件传递来的参数
    // window.localStorage.setItem("queryIds", this.queryIds);
  },
  methods: {
    //处理歌单所有歌曲信息的查询(根据id)
    handlerSongList() {
      if (this.ids) {
        this.$http
          .get("song/detail", { params: { ids: this.ids } })
          .then((res) => {
            if (res.data.code == 200) {
              console.log("23456", res.data.songs);
              this.currentMusicListInfo = res.data.songs;
              //处理时长数据
              this.currentMusicListInfo.forEach((item) => {
                const dt = new Date(item.dt);
                const mm = (dt.getMinutes() + "").padStart(2, "0");
                const ss = (dt.getSeconds() + "").padStart(2, "0");

                item.dt = mm + ":" + ss;
              });
              //   设置歌单所有歌曲的id信息
              //   this.setSongListInfo();
              this.setSongListInfo();
            } else {
              console.log("请求失败");
            }
          });
      } else {
        console.log("nonon");
      }
    },
    //双击歌曲添加数据进去,并循环播放(向父组件传递参数)
    playMusicList(row) {
      console.log(row.id, this.songListInfo);
      this.$emit("setSongListInfo", this.songListInfo, row.id);
    },
    //设置歌单所有歌曲的id
    setSongListInfo() {
      this.currentMusicListInfo.forEach((item) => {
        this.songListInfo.push(item.id);
      });
    },
    //点击歌手名跳转歌手详细页面
    toSingerPage(id) {
      this.$router.push("/singer/" + id);
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
.el-table_1_column_4 .cell {
  cursor: pointer !important;
}
</style>
