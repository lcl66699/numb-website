<template>
  <el-row class="login_box">
    <el-col class="login_left" :span="10">
      <div class="left">
        <p class="login_title">扫码登录</p>
        <div class="content_left">
          <div class="Qrcode-img">
            <img src="@/assets/images/qr_code.png" alt="">
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
            <el-form ref="loginform" :model="loginQuery" :rules="loginRules" label-width="0px">
              <el-form-item class="login_input" prop="username">
                <el-input v-model="loginQuery.username" placeholder="请输入手机号或用户名" clearable />
              </el-form-item>
              <el-form-item class="login_input" prop="password">
                <el-input v-model="loginQuery.password" placeholder="请输入密码" type="password" show-password />
              </el-form-item>
              <div class="login_options">
                <span @click="forget" class="forget">忘记密码？</span>
              </div>
              <div class="login_button">
                <el-button :loading="loading" @click="login">
                  <span v-if="!loading">登 录</span>
                  <span v-else>登 录 中...</span>
                </el-button>
              </div>
            </el-form>
            <!-- <div class="login_input">
              <el-input placeholder="手机号或用户名" v-model="loginQuery.username" clearable />
            </div>
            <div class="login_input">
              <el-input placeholder="密码" v-model="loginQuery.password" show-password />
            </div> -->

          </el-tab-pane>
          <el-tab-pane label="用户注册" name="second">
            <el-form ref="form" :model="user" :rules="rules" label-width="0px">
              <el-form-item class="login_input" prop="username">
                <el-input v-model="user.username" placeholder="请输入手机号或用户名" clearable />
              </el-form-item>
              <el-form-item class="login_input" prop="password">
                <el-input v-model="user.password" placeholder="请输入密码" type="password" show-password />
              </el-form-item>
              <el-form-item class="login_input" prop="confirmPassword">
                <el-input v-model="user.confirmPassword" placeholder="请确认密码" type="password" show-password />
              </el-form-item>
              <div class="login_options">
                <span class="login_info">未注册手机验证后自动登录，注册即代表同意《瓜村协议》《隐私保护指引》</span>
              </div>
              <div class="login_button">
                <el-button @click="register">注册</el-button>
              </div>
            </el-form>
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
    const equalToPassword = (rule, value, callback) => {
      if (this.user.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      activeName: "first",
      loading: false,
      user: {
        username: undefined,
        password: undefined,
        confirmPassword: undefined,
      },
      // 表单校验
      loginRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
      },
      loginQuery: {
        username: "chenglong",
        password: "admin123",
      },
      registerQuery: {
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    forget() {
      this.$message("此功能即将开放~");
    },
    login() {
      this.$refs["loginform"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let data = await login(this.loginQuery);
          if (data.code == 200) {
            this.$message({
              message: "登录成功",
              type: "success",
            });
            sessionStorage.setItem("token", `Bearer ${data.token}`);
            this.$parent.$parent.close();
            this.$emit("loginSus");
            this.$router.push("/user");
            sessionStorage.setItem("isCome", 1); //判断是不是首次进入
          } else {
            this.$message.error(data.msg);
            this.loginQuery.password = "";
          }
          this.loading = false;
        }
      });
    },

    async register() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          updateUserPwd(this.user.username, this.user.password).then(
            (response) => {
              this.$modal.msgSuccess("修改成功");
            }
          );
        }
      });
      // let data = await register(this.registerQuery);
      // if (data.code == 200) {
      //   this.$message({
      //     message: "注册成功,请前往登录",
      //     type: "success",
      //   });
      // } else {
      //   this.$message.error(data.msg);
      //   this.loginQuery.password = "";
      // }
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