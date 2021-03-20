<template>
  <div>
    <div class="header">
      <div class="container">
        <!-- 头部logo -->
        <div @click="goHome" class="logo">
          <!-- <img :src="NavLogo" alt="" /> -->
          <span class="logo-svg">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-watermelon"></use>
            </svg>
          </span>
          <div class="logo-text clearFix">
            <strong>西瓜汁</strong>
            <h3>这世上再难遇到我</h3>
          </div>
        </div>
        <!-- 头部li文字 -->
        <NavTitle />
        <!-- 头部input -->
        <NavInput />
        <div class="head-login">
          <span
            class="login"
            v-html="loginText"
            v-if="nologin"
            @click="userLogin"
          ></span>
          <div v-else>
            <span> 登陆地：{{ userCity }} </span>
          </div>
        </div>
      </div>
    </div>
    <p class="navHeight"></p>
  </div>
</template>

<script>
import NavLogo from "@/assets/images/Nav/logo_03.png";
import NavTitle from "./NavTitle";
import NavInput from "./NavInput";
//引入登录api
import { postIplogin } from "../../api/index";
export default {
  data() {
    return {
      NavLogo: NavLogo, //img
      userInfo: [], //请求的ip信息
      nologin: true,
      loginText: "登录",
      userCity: "", //head用户名
    };
  },
  components: {
    NavTitle,
    NavInput,
  },
  methods: {
    goHome() {
      this.$router.push({
        name: "Home",
        params: {},
      });
    },
    // 登录
    userLogin() {
      this.loginText = "正在登录";
      const loading = this.$loading({
        lock: true,
        text: "loading...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)",
      });
      setTimeout(() => {
        loading.close();
      }, 1500);
      // 请求ip地址
      postIplogin()
        .then((res) => {
          if (res.data.code == 200) {
            this.userInfo = res.data.newslist[0];
          } else {
            this.$message.error("登录失败！请检查网络设置或联系管理员");
            this.loginText = "登录";
            reject(res);
          }
        })
        .then(() => {
          // 省市name相同 如北京北京 则去掉一个
          if (this.userInfo.province == this.userInfo.city) {
            this.userInfo.province = "";
          }
          setTimeout(() => {
            this.nologin = false; //切换状态
            this.$notify({
              title: "登录成功",
              type: "success",
              message: `您的当前登录IP：${this.userInfo.ip} ,运营商：${this.userInfo.isp} ,
                登录地：${this.userInfo.country}${this.userInfo.city}${this.userInfo.province}`,
              duration: 6000,
            });
            this.userCity = this.userInfo.country + this.userInfo.city;
          }, 1500);
        })
        .then(() => {
          // 写进本地存储
          let storage = window.localStorage;
          storage.userCity = this.userInfo.country + this.userInfo.city;
          console.log(storage);
        });
    },
  },
  mounted() {
    // console.log(window.localStorage);
    // 加载用户名,有本地存储则用本地的
    if (window.localStorage.userCity) {
      this.nologin = false;
      this.userCity = window.localStorage.userCity;
    } else {
      this.nologin = true;
    }
  },
};
</script>

<style lang="scss" scoped>
$activateColor: #10aeb5;
/* 清浮动 */
.clearFix::after {
  content: "";
  display: block;
  visibility: hidden;
  clear: both;
}
.header {
  height: 90px;
  width: 100%;
  line-height: 90px;
  background-color: rgb(36, 41, 44);
  color: #fff;
  // border-bottom: 1px solid #c1c1c1;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 888;
  .container {
    margin: 0 auto;
    width: 1280px;
    // overflow: hidden;
    .logo {
      cursor: pointer;
      float: left;
      height: 90px;
      .logo-svg {
        float: left;
        text-align: center;
        margin-top: 12px;
        svg {
          line-height: 90px;
          font-size: 44px;
        }
      }
      // img {
      //   float: left;
      //   margin-top: 25px;
      // }
      .logo-text {
        float: left;
        font-weight: 700;
        margin: 22px 0 0 15px;
        line-height: normal;
        font-family: "幼圆";
        strong {
          font-size: 24px;
          letter-spacing: 13px;
        }
        strong::after {
          content: "";
          display: block;
          border-top: 2px solid #fff;
          width: 100px;
          margin: 2px 0;
        }
        h3 {
          font-size: 11px;
          margin-top: 4px;
        }
      }
    }
  }
  .head-login {
    float: right;
    font-size: 14px;
    font-weight: 700;
    .login {
      padding: 4px 10px;
      cursor: pointer;
      background: $activateColor;
      color: #fff;
      border-radius: 3px;
    }
  }
}
.navHeight {
  width: 100%;
  height: 90px;
}
</style>
