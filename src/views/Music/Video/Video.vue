<template>
  <el-container style="margin-bottom: 55px;">
    <el-header>
      <div v-if="tags.length > 1">
        <el-button style="position:relative;top:25px" @click="showTagDialog"
          >全部分类</el-button
        >
        <ul class="video-ul-right" style="float:right">
          <li
            @click="changeTag(tags[0].id)"
            :style="tags[0].id === queryInfo.id ? 'color: #10aeb5' : 'blue'"
          >
            {{ tags[0].name }}
          </li>
          <li
            @click="changeTag(tags[1].id)"
            :style="tags[1].id === queryInfo.id ? 'color: #10aeb5' : 'blue'"
          >
            {{ tags[1].name }}
          </li>
          <li
            @click="changeTag(tags[2].id)"
            :style="tags[2].id === queryInfo.id ? 'color: #10aeb5' : 'blue'"
          >
            {{ tags[2].name }}
          </li>
          <li
            @click="changeTag(tags[3].id)"
            :style="tags[3].id === queryInfo.id ? 'color: #10aeb5' : 'blue'"
          >
            {{ tags[3].name }}
          </li>
          <li
            @click="changeTag(tags[21].id)"
            :style="tags[21].id === queryInfo.id ? 'color: #10aeb5' : 'blue'"
          >
            {{ tags[21].name }}
          </li>
          <li
            @click="changeTag(tags[5].id)"
            :style="tags[5].id === queryInfo.id ? 'color: #10aeb5' : 'blue'"
          >
            {{ tags[5].name }}
          </li>
        </ul>

        <el-dialog
          title="全部标签"
          :visible.sync="tagDialogTableVisible"
          :modal="false"
          style="position: absolute;top: 70px;left: -280px;"
        >
          <el-tag
            v-for="(item, index) in tags"
            :key="index"
            @click="changeTag(item.id)"
            class="tag"
            :style="item.id === queryInfo.id ? 'color: #10aeb5' : '#c1c1c1'"
          >
            {{ item.name }}
          </el-tag>
        </el-dialog>
      </div>
    </el-header>

    <el-main>
      <div v-if="videoList.length > 1">
        <el-row :gutter="10">
          <el-col
            :span="8"
            v-for="(item, index) in videoList"
            style="padding: 10px;position:relative;"
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
                  item.data.playTime >= 10000
                    ? (item.data.playTime / 10000).toFixed(0) + "万"
                    : item.data.playTime
                }}
              </div>
            </div>

            <div style="width:300px;height:170px">
              <el-image
                :src="item.data.coverUrl"
                @click="toVideoPage(item.data.vid)"
                style="width:100%;height:100%;box-shadow: 0 0 2px 2px gray;border-radius: 10px;cursor: pointer"
              >
              </el-image>
            </div>

            <h1
              @click="toVideoPage(item.data.vid)"
              style="color:#333;
            height:35px;
            padding-top:9px
            cursor:pointer;"
            >
              {{ item.data.title }}
            </h1>
          </el-col>
        </el-row>
        <!--分页-->
        <el-pagination
          layout="prev, next"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <div v-else>暂无推荐视频，请稍后再试</div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //视频标签信息
      tags: [],
      tagDialogTableVisible: false,
      //查询视频条件
      queryInfo: {
        id: 58100,
        offset: 0,
      },
      //视频列表
      videoList: [
        {
          data: {
            title: "",
          },
        },
      ],
    };
  },
  created() {
    //获取视频标签
    this.getVideoTags();
    //获取视频信息
    this.getVideoList();
  },
  methods: {
    getVideoTags() {
      this.$http.get("video/group/list").then((res) => {
        console.log("视频标签", res.data);
        this.tags = res.data.data;
      });
    },
    showTagDialog() {
      this.tagDialogTableVisible = true;
    },
    getVideoList() {
      if (window.localStorage.getItem("currentUserInfo") === "null") {
        return this.$message.error("需要登录获取视频数据!");
      }

      this.$http.get("video/group", { params: this.queryInfo }).then((res) => {
        console.log("视频数据", res);
        this.videoList = res.data.datas;
      });
    },
    //跳转视频播放页
    toVideoPage(id) {
      this.$router.push("/videoPlay/" + id);
    },
    //处理页面
    handleCurrentChange(newPage) {
      this.queryInfo.offset += 8;
      this.getVideoList();
    },
    //切换标签
    changeTag(tagId) {
      this.queryInfo.id = tagId;
      const loading = this.$loading({
        lock: true,
        text: "拼命加载中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      new Promise((res, rej) => {
        res(this.getVideoList());
        loading.close();
      }).catch((rej) => {
        console.log(rej);
        loading.close();
      });

      this.tagDialogTableVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
}

.tag {
  cursor: pointer;
  margin-left: 15px;
  margin-top: 15px;
  color: #555;
  background-color: white;
}
.video-ul-right {
  position: relative;
  top: 25px;
  display: flex;
  li {
    cursor: pointer;
    padding: 8px;
    color: #c1c1c1;
  }
}
</style>
