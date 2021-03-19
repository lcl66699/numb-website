<template>
  <div class="wrapper">
    <!--    左侧区域 播放评论 -->
    <el-row style="margin-bottom: 75px;">
      <el-col :span="14" :offset="2">
        <!--头部信息区域-->
        <el-row>
          <el-tag
            size="mini"
            type="danger"
            style="background-color: white;border: 1px solid red"
            >MV</el-tag
          >
          <span style="margin-left: 10px;">{{
            videoDetailInfo.data.title
          }}</span>
          <span style="margin-left: 10px;font-size: 5px;">{{
            videoDetailInfo.data.creator.nickname
          }}</span>
        </el-row>

        <!--视频播放区域-->
        <el-row style="margin-top: 5px;">
          <video
            width="100%"
            height="480"
            autoplay
            :src="videoUrl"
            controls="controls"
            style="background-color: black"
          >
            很抱歉,您的浏览器当前不支持最新播放标签!
          </video>
        </el-row>

        <!--评论区域-->
        <el-row>
          <p style="padding: 10px 3px;font-size: 18px;">
            评论({{ commentTotal }})
          </p>
          <!-- <div style="height: 120px;margin-top: 15px;">
            <el-input
              type="text"
              maxlength="140"
              v-model="commitInput"
              size="medium"
              style="display: inline-block;width: 98%;margin: 15px 15px;"
            >
            </el-input>
            <el-button size="mini" style="float:right;margin-right: 14px;"
              >评论</el-button
            >
          </div> -->

          <h4
            style="font-weight: 300;padding:5px"
            v-if="queryInfo.offset === 0 && videoHotComment.length !== 0"
          >
            精彩评论
          </h4>
          <!--精彩评论的信息-->
          <div
            v-for="(item, index) in videoHotComment"
            :key="index + 200"
            style="position: relative;border-top: 1px solid rgb(240,240,242);
                 border-bottom: 1px solid rgb(240,240,242);padding: 20px 0;font-size: 14px;"
          >
            <div style="line-height:20px;color:#333">
              <!--用户头像-->
              <img
                :src="item.user.avatarUrl"
                alt=""
                style="display: inline;width: 50px;height: 50px;border-radius: 25px;"
              />

              <!--评论信息-->
              <div style="padding-top:5px;margin-left: 60px;margin-top: -60px;">
                <p>
                  <span style="color: #4d99de;">{{ item.user.nickname }}</span
                  >: {{ item.content }}
                </p>

                <br v-if="item.beReplied.length > 0" />
                <!--子评论-->
                <div
                  v-if="item.beReplied.length > 0"
                  style="background-color: rgb(241,241,244);padding: 5px 5px;"
                >
                  <p
                    v-for="(citem, index) in item.beReplied"
                    :key="index + 200"
                  >
                    <span style="color: #4d99de;"
                      >@{{ citem.user.nickname }}</span
                    >: {{ citem.content }}
                  </p>
                </div>

                <p
                  style="display:block;font-size: 13px;color: gray;opacity: 0.7"
                >
                  {{ item.time | dateFormat }}
                </p>
              </div>
            </div>
          </div>

          <!--所有评论的信息-->
          <h4 style="font-weight: 300;margin-top: 25px;padding:5px">
            最新评论({{ commentTotal }})
          </h4>
          <div
            v-for="(item, index) in videoCommentList"
            :key="index"
            style="position: relative;border-top: 1px solid rgb(240,240,242);
                 border-bottom: 1px solid rgb(240,240,242);padding: 20px 0;font-size: 15px;"
          >
            <div>
              <!--用户头像-->
              <img
                :src="item.user.avatarUrl"
                alt=""
                style="display: inline;width: 50px;height: 50px;border-radius: 25px;"
              />

              <!--评论信息-->
              <div style="margin-left: 60px;margin-top: -45px;">
                <p>
                  <span style="color: #4d99de;">{{ item.user.nickname }}</span
                  >: {{ item.content }}
                </p>

                <br v-if="item.beReplied.length > 0" />
                <!--子评论-->
                <div
                  v-if="item.beReplied.length > 0"
                  style="background-color: rgb(241,241,244);padding: 5px 5px;"
                >
                  <p
                    v-for="(citem, index) in item.beReplied"
                    :key="index + 400"
                  >
                    <span style="color: #4d99de;">{{
                      citem.user.nickname
                    }}</span
                    >: {{ citem.content }}
                  </p>
                </div>

                <p
                  style="display:block;font-size: 13px;color: gray;opacity: 0.7"
                >
                  {{ item.time | dateFormat }}
                </p>
              </div>
            </div>
          </div>

          <!--分页-->
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="queryInfo.limit"
            :total="commentTotal"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-row>
      </el-col>

      <!--右侧mv详细信息-->
      <el-col :span="7" :offset="1">
        <el-row
          style="border-bottom: 1px solid rgb(230,230,230);padding-bottom: 10px;"
        >
          <span style="margin-left: 10px;font-size: 20px;font-weight: 400"
            >MV介绍</span
          >
        </el-row>

        <!-- 播放信息-->
        <el-row style="margin-top: 10px;margin-left: 12px;">
          <span style="font-size: 14px;"
            >发布时间:
            <span style="font-size: 14px;">{{
              videoDetailInfo.data.publishTime | dateFormat
            }}</span>
          </span>

          <span style="font-size: 14px;margin-left: 15px;float: right"
            >播放次数:
            <span style="font-size: 14px;">{{
              (videoDetailInfo.data.playTime / 10000).toFixed(0) + "万次"
            }}</span>
          </span>
        </el-row>

        <!--简介-->
        <el-row style="margin-top: 10px;margin-left: 12px;">
          <p
            style="font-size: 14px; color:#333;line-height:18px;font-weight: 400;"
          >
            简介: {{ videoDetailInfo.data.description }}
          </p>
        </el-row>

        <!--相关推荐-->
        <el-row
          style="margin-top: 45px;border-bottom: 1px solid rgb(230,230,230);padding-bottom: 10px;"
        >
          <span style="margin-left: 10px;font-size: 20px;font-weight: 400"
            >相关推荐</span
          >
        </el-row>

        <!--可点击的视频推荐区域-->
        <div v-if="simiVideoList.length > 1">
          <el-row
            v-for="(item, index) in simiVideoList"
            :key="index"
            style="margin-top: 25px;"
          >
            <el-col :span="12">
              <el-image
                :src="item.coverUrl"
                @click="toVideoPage(item.vid)"
                style="width: 250px;height: 150px;cursor: pointer"
              ></el-image>
              <!--播放量-->
              <div
                style="color:#333;background: rgba(128,128,128,0.2);color: white;
                                    width: 100px;position:absolute;z-index: 10;top: 2px;left: 150px;"
              >
                <div style="float:right;">
                  <i class="el-icon-headset" style="margin-right: 5px;"></i>
                  {{ (item.playTime / 10000).toFixed(0) }}万
                </div>
              </div>
            </el-col>

            <el-col :span="10" :offset="1">
              <el-tag
                size="mini"
                type="danger"
                style="background-color: white;border: 1px solid red"
                >MV</el-tag
              >
              <div style="margin-left: 55px;margin-top: -19px;line-height:20px">
                <span style="cursor: pointer" @click="toVideoPage(item.vid)">{{
                  item.title
                }}</span>
                <!-- <p style="font-size: 15px;opacity: 0.7;">
                {{ (item.duration / 1000) | timeFormat }}
              </p> -->
                <p style="font-size: 15px;opacity: 0.7;line-height:22px">
                  {{ item.creator[0].userName }}
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commitInput: "评论", //评论内容
      //当前id
      curVideoId: this.$route.params.id,
      //当前详细数据
      videoDetailInfo: {
        data: {
          title: "",
          creator: {
            nickname: "",
          },
        },
      },
      //当前mv的url
      videoUrl: "",
      //查询当前评论数据的查询条件
      queryInfo: {
        id: this.$route.params.id,
        offset: 0,
        limit: 10,
      },
      //当前mv的评论数据
      videoCommentList: [],
      //当前mv评论数量
      commentTotal: 0,
      //当前mv的精彩评论
      videoHotComment: [],
      //与当前mv相关的mv
      simiVideoList: [
        {
          title: "",
        },
      ],
    };
  },
  created() {
    //获取当前详细数据
    this.getVideoDetailInfo();
    //获取当前的url
    this.getVideoUrl();
    //获取当前mv的评论数据
    this.getCommentList();
    //获取相关mv
    this.getSimiVideos();
  },
  methods: {
    //获取当前的详细数据
    getVideoDetailInfo() {
      this.$http
        .get("/video/detail", { params: { id: this.curVideoId } })
        .then((res) => {
          this.videoDetailInfo = res.data;
        });
    },
    //获取当前的url
    getVideoUrl() {
      this.$http
        .get("video/url", { params: { id: this.curVideoId } })
        .then((res) => {
          this.videoUrl = res.data.urls[0].url;
        });
    },
    //获取当前mv的评论数据
    getCommentList() {
      this.$http
        .get("/comment/video", { params: this.queryInfo })
        .then((res) => {
          this.videoCommentList = res.data.comments;
          this.commentTotal = res.data.total;
          this.videoHotComment = res.data.hotComments;
        });
    },
    //分页插件页数改变
    handleCurrentChange(newPage) {
      this.queryInfo.offset = (newPage - 1) * this.queryInfo.limit;
      this.getCommentList();
    },
    //获取相关的mv
    getSimiVideos() {
      this.$http
        .get("/related/allvideo", { params: { id: this.curVideoId } })
        .then((res) => {
          this.simiVideoList = res.data.data;
        });
    },
    //跳转推荐mv界面
    toVideoPage(id) {
      this.$router.push("/videoPlay/" + id);
      document.location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 1290px;
  padding: 10px;
  margin: 0 auto;
}
h1 {
  font-weight: 500;
}
</style>
