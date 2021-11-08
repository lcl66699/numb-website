<template>
  <el-row class="login_box">
    <el-col class="login_left" :span="10">
      <div class="left">
        <p class="login_title">扫码登录</p>
        <div class="content_left">
          <div class="Qrcode-img">
            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fremote.yunnan.cn%2Fqr%2Fphp%2Fqr.php%3Fd%3Dhttp%3A%2F%2Fsociety.yunnan.cn%2Fsystem%2F2021%2F10%2F31%2F031741994.shtml&refer=http%3A%2F%2Fremote.yunnan.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638280676&t=41f7aa04b835dce5d6097752bb00c4cf" alt="">
          </div>
          <p>打开微信 App</p>
          <p>在「我的」页面顶部打开扫一扫</p>
          <p>如扫码异常请下载最新版客户端</p>
        </div>
      </div>
    </el-col>
    <el-col class="login_left" :span="14">
      <div class="right">
        <el-tabs class="right_box" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="密码登录" name="first">
            <div class="login_input">
              <el-input placeholder="手机号或用户名" v-model="loginQuery.username" clearable />
            </div>
            <div class="login_input">
              <el-input placeholder="密码" v-model="loginQuery.password" show-password />
            </div>
            <div class="login_options">
              <span class="forget">忘记密码？</span>
            </div>
            <div class="login_button">
              <el-button @click="login">登录</el-button>
            </div>

          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">
            <div class="login_input">
              <el-input placeholder="手机号或用户名" v-model="registerQuery.username" clearable />
            </div>
            <div class="login_input">
              <el-input placeholder="密码" v-model="registerQuery.password" show-password />
            </div>
            <div class="login_input">
              <el-input placeholder="请确认密码" v-model="registerQuery.confirmPassword" show-password />
            </div>
            <div class="login_options">
              <span class="login_info">未注册手机验证后自动登录，注册即代表同意《西瓜协议》《隐私保护指引》</span>
            </div>
            <div class="login_button">
              <el-button @click="register">注册</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { login, register } from "@/api/index";
export default {
  data() {
    return {
      activeName: "first",
      loginQuery: {
        username: "admin",
        password: "123",
      },
      registerQuery: {
        username: "admin",
        password: "123",
        confirmPassword: "123",
      },
    };
  },
  methods: {
    async login() {
      let data = await login(this.loginQuery);
      if (data.code == 200) {
        this.$message({
          message: "登录成功",
          type: "success",
        });
        sessionStorage.setItem("token", `Bearer ${data.token}`);
        this.$parent.$parent.close();
        this.$emit("loginSus");
      } else {
        this.$message.error(data.msg);
        this.loginQuery.password = "";
      }
    },
    async register() {
      let data = await register(this.registerQuery);
      if (data.code == 200) {
        this.$message({
          message: "注册成功,请前往登录",
          type: "success",
        });
      } else {
        this.$message.error(data.msg);
        this.loginQuery.password = "";
      }
    },

    handleClick(tab, event) {
      // console.log(tab, event);
    },
  },
};
</script>

<style lang="scss" scoped>
.login_box {
  height: 100%;
  .left {
    box-shadow: 0 1px 4px rgb(0 0 0 / 10%);
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .login_title {
      margin-bottom: 30px;
      margin-top: 3px;
      font-weight: 500;
      font-size: 24px;
      color: #121212;
    }
    .content_left {
      display: flex;
      // justify-content: flex-end;
      flex-direction: column;
      align-items: center;
    }
    .Qrcode-img {
      width: 120px;
      height: 120px;
      margin-bottom: 30px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      line-height: 20px;
    }
  }
  .right {
    padding: 25px 24px 10px;
    height: 100%;
    .right_box {
      height: 100%;
    }
    .login_input {
      margin-top: 24px;
      border-bottom: 1px solid #ebebeb;
    }
    .login_options {
      margin-top: 12px;
      height: 20px;
      .forget {
        float: right;
        color: #8590a6;
        cursor: pointer;
      }
      .login_info {
        display: block;
        font-size: 13px;
        color: grey;
        text-align: left;
        line-height: 18px;
        margin-top: 20px;
      }
    }
    .login_button {
      width: 100%;
      margin-top: 30px;
      height: 36px;
      button {
        width: 100%;
        color: #fff;
        background-color: #06f;
      }
    }
  }
}
.login_left {
  height: 100%;
}
</style>
<style lang='scss'>
.login_box {
  .el-input__inner {
    border: none;
  }
  .el-tabs__content {
    padding: 10px 0;
  }
  .el-tabs__item.is-active {
    color: #121212;
    font-weight: 600;
  }
  .el-tabs__nav-wrap::after {
    // width: 41%;
    background: none;
  }
}
</style>