<template>
  <!-- 用户id不存在 才显示登录 存在不显示 -->
  <div>
    <div v-if="islogin" class="login-img">
      <div id="login-box">
        <h1>网抑云-Login</h1>
        <!-- Login的大标题 -->

        <div class="form">
          <div class="item">
            <!-- username部分 -->
            <i>手机号：</i>
            <!-- 将来用来绘制username前面的图标 -->
            <input
              v-model="phone"
              type="text"
              placeholder="请输入您手机号"
              name="username"
            />
            <!-- 用文本框实现的username的输入 -->
          </div>

          <div class="item">
            <!-- password部分 -->
            <i>密 码： </i>
            <!-- 将来用来绘制password前面的图标 -->
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              name="password"
            />
            <!-- 用password文本框实现的密码输入 -->
          </div>
        </div>

        <el-button @click="login" type="submit">Login</el-button>
        <!-- 用button实现的Login登陆按钮 -->
      </div>
    </div>
    <div class="activate-user" v-else>
      <div id="head-box">
        <!-- 背景图 -->
        <!-- <div class="back-img">
          <img :src="currentUserInfo.backgroundUrl" alt="" />
        </div> -->
        <div class="user-img">
          <img :src="currentUserInfo.avatarUrl" alt="" />
        </div>
        <div class="user-right">
          <div class="user-name">
            <p>用户名：{{ currentUserInfo.nickname }}</p>
            <el-button @click="logout" class="sign-logout">退出登陆</el-button>
          </div>
          <ul id="tab-box">
            <li class="fst">
              <strong>{{ currentUserInfo.eventCount }}</strong>
              <span>动态</span>
            </li>
            <li>
              <strong>{{ currentUserInfo.follows }}</strong>
              <span>关注</span>
            </li>
            <li>
              <strong>{{ currentUserInfo.followeds }}</strong>
              <span>粉丝</span>
            </li>
          </ul>
          <p class="user-other">个人介绍：{{ currentUserInfo.signature }}</p>

          <p class="user-other">
            生日：{{ currentUserInfo.birthday | dateFormat }}
          </p>
        </div>
      </div>

      <div v-if="currentUserPlayList.length > 1">
        <!-- 创建歌单/收藏的歌单 -->
        <el-row style="border-bottom: 2px solid rgb(230,230,230)">
          <p style="padding: 14px 0;font-size: 22px;">我创建的歌单</p>
        </el-row>
        <el-row :gutter="40" style="margin-top: 25px;">
          <el-col
            :span="8"
            v-if="!item.subscribed"
            v-for="(item, index) in currentUserPlayList"
            :key="index"
          >
            <i
              class="el-icon-video-play"
              style="color: rgba(255,255,255,0.4);font-size: 45px;position: absolute;top: 10px;z-index: 10"
            ></i>
            <el-image
              :src="item.coverImgUrl"
              @click="changePlaylistId(item.id)"
              style="box-shadow: 0 0 2px 2px gray;border-radius: 5px;cursor:pointer;"
            ></el-image>
            <h1
              :index="'/music/songlist/' + item.id"
              @click="changePlaylistId(item.id)"
              id="songtitle"
              style="cursor: pointer;padding:9px 0;color:#333"
            >
              {{ item.name }}
            </h1>
          </el-col>
        </el-row>

        <el-row style="border-bottom: 2px solid rgb(230,230,230)">
          <p style="padding: 14px 0;font-size: 22px;">我收藏的歌单</p>
        </el-row>
        <el-row :gutter="20" style="margin-top: 25px;">
          <el-col
            :span="4"
            v-if="item.subscribed"
            v-for="(item, index) in currentUserPlayList"
            :key="index"
          >
            <i
              class="el-icon-video-play"
              style="color: rgba(255,255,255,0.4);font-size: 45px;position: absolute;top: 10px;z-index: 10"
            ></i>
            <el-image
              @click="changePlaylistId(item.id)"
              :src="item.coverImgUrl"
              style="box-shadow: 0 0 2px 2px gray;border-radius: 5px;cursor:pointer;"
            ></el-image>
            <h1
              :index="'/songlist/' + item.id"
              @click="changePlaylistId(item.id)"
              id="songtitle"
              style="cursor: pointer;padding:9px 0;color:#333"
            >
              {{ item.name }}
            </h1>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      islogin: true, //登录样式是否在
      phone: "",
      password: "",
      //查询出来的用户私人歌单设置为空
      currentUserPlayList: [],
      currentUserInfo: {}, //用户信息（杂乱）
      musicUid: window.localStorage.getItem("musicUid")
        ? window.localStorage.getItem("musicUid")
        : null, //用户id
    };
  },
  created() {
    //用户已登录
    if (this.musicUid) {
      console.log("登录；1");
      this.islogin = false;
      this.getUserPrivatePlayList();
    }
    let localCurrentUserInfo = window.localStorage.getItem("currentUserInfo");
    if (localCurrentUserInfo) {
      this.currentUserInfo = JSON.parse(localCurrentUserInfo);
    }
  },
  methods: {
    login() {
      var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //phone验证规则
      var flag = reg.test(this.phone); //true
      if (flag && this.password != "") {
        let data = { phone: this.phone, password: this.password };
        this.$http
          .post("/login/cellphone", data)
          .then((res) => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: "恭喜你，登录成功！",
                type: "success",
              });
              // console.log(
              //   "addUser",
              //   res.data,
              //   "musicCookie",
              //   res.data.cookie,
              //   "avatar",
              //   res.data.profile.avatarUrl,
              //   "musicUid",
              //   res.data.profile.userId
              // );
              // 进行本地存储和vuex存储
              this.$store.commit("addUser", res.data); //vuex
              // 保存cookie信息
              window.localStorage.setItem("musicCookie", res.data.cookie);
              // 保存用户头像
              window.localStorage.setItem("avatar", res.data.profile.avatarUrl);
              // 保存用户id
              window.localStorage.setItem("musicUid", res.data.profile.userId);
              // 保存用户信息（乱七八糟的信息 包括背景图，头像，生日等等）
              window.localStorage.setItem(
                "currentUserInfo",
                JSON.stringify(res.data.profile)
              );
              // 赋值给data
              this.currentUserInfo = res.data.profile;
              this.islogin = false;

              // 调用用户信息的请求
              this.getUserPrivatePlayList();
            } else if (res.data.code == 502) {
              this.$message({
                message: "密码错误!",
                type: "warning",
              });
              console.log("密码错误", res.data);
            } else {
              console.log("检查用户名", res.data);
            }
          })
          .catch((error) => {
            console.log(error);
            this.$message({
              message: "用户名不存在，或检查网络设置！",
              type: "warning",
            });
          });
      } else {
        this.$message({
          message: "用户名必须为手机号and密码不能为空！",
          type: "warning",
        });
      }
    },

    // 登出
    logout() {
      this.$http.get("/logout").then((res) => {
        console.log(res);
        //当前用户信息设置为null
        this.currentUserInfo = null;
        //存储用户信息的localstorage设置为null
        window.localStorage.setItem("avatar", null);
        window.localStorage.setItem("musicUid", null);
        window.localStorage.setItem("musicCookie", null);
        //查询出来的用户私人歌单设置为空
        this.currentUserPlayList = [];
        this.islogin = true;
        this.$message({
          message: "退出登录成功！",
          type: "success",
        });
      });
    },

    //查询用户私人歌单
    getUserPrivatePlayList() {
      console.log("musicUid", window.localStorage.getItem("musicUid"));
      this.$http
        .get("user/playlist", { params: { uid: this.musicUid } })
        .then((res) => {
          console.log(res.data.playlist);
          this.currentUserPlayList = res.data.playlist;
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "请刷新后再试！",
            type: "warning",
          });
        });
    },

    //跳转对应的详情
    changePlaylistId(id) {
      console.log(2222, id);
      this.$router.push("music/songlist/" + id);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.login-img {
  position: relative;
  left: -20px;
  width: 1030px;
  height: 557px;
  background: url("../../assets/images/login.jpg") center; /* 首先增加背景图 */
  background-size: 100% auto; /* 设置背景的大小 */
  background-repeat: no-repeat; /* 将背景设置为不重复显示 */
  display: flex;
}
#login-box {
  // border: 1px solid blue;
  width: 30%;
  height: 300px;
  text-align: center;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background: #00000080;
  padding: 20px 50px;
}
#login-box h1 {
  font-size: 30px;
  padding: 20px;
  padding-bottom: 30px;
  color: white;
}
#login-box .form .item input {
  outline: none;
  width: 200px; /* 设置合适的宽度 */
  border: 0; /* 首先将边界取消，方便下面修改下部边界宽度 */
  border-bottom: 2px solid white; /* 将下边界进行修改，显示出横线效果 */
  font-size: 18px; /* 将字体适当的变大加粗 */
  background: #ffffff00; /* 将输入框设置为透明 */
  color: white; /* 上面的文本颜色设置为白色，但是placeholder的颜色要单独设置 */
  padding: 5px 10px; /* 为了placeholder的内容不是顶格显示，增加内部边界 */
}
#login-box .form .item i {
  color: white;
  position: relative;
  top: 5px;
  font-size: 16px;
}
#login-box button {
  cursor: pointer;
  border: 0; /* 取消按钮的边界 */
  width: 150px; /* 设置合适的按钮的长和宽 */
  margin-top: 18px; /* 设置合适的上部外框的宽度，增加与上面的password框的距离 */
  font-size: 18px; /* 修改按钮文字的大小 */
  color: white; /* 修改按钮上文字的颜色 */
  border-radius: 25px; /* 将按钮的左右边框设置为圆弧 */
  background-image: linear-gradient(
    to right,
    #00dbde 0%,
    #fc00ff 100%
  ); /* 为按钮增加渐变颜色 */
}
.activate-user {
  min-height: 600px;
}

// 用户信息
#head-box {
  margin-bottom: 43px;
  padding-top: 20px;
  overflow: hidden;
  .back-img {
    width: 100%;
    height: 300px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user-img {
    float: left;
    width: 188px;
    margin-right: 40px;
    position: relative;
    img {
      display: block;
      width: 180px;
      height: 180px;
      padding: 3px;
      background: #fff;
      border: 1px solid #d5d5d5;
    }
  }
  .user-right {
    float: left;
    width: 670px;
    .user-name {
      overflow: hidden;
      padding-bottom: 12px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ddd;
      p {
        padding-bottom: 3px;
        float: left;
        margin-top: 3px;
        font-size: 22px;
        font-weight: normal;
        line-height: 30px;
      }
      .sign-logout {
        float: right;
      }
    }
    #tab-box {
      height: 41px;
      margin-bottom: 15px;

      li {
        float: left;
        padding: 0 40px 0 20px;
        border-left: 1px solid #ddd;
      }
      li.fst {
        padding-left: 0;
        border-left: none;
      }

      strong {
        display: block;
        margin-top: -4px;
        font-size: 24px;
        font-weight: normal;
        padding: 4px;
        cursor: pointer;
      }
      span {
        display: block;
        text-indent: 2px;
        cursor: pointer;
      }
    }
    .user-other {
      margin-bottom: 5px;
      line-height: 21px;
      color: #666;
    }
  }
}
</style>
