<template>
  <ul class="main-nav">
    <li class="active nav-title">
      <router-link to="/">
        首页
      </router-link>
    </li>
    <li class="nav-title">
      <router-link to="/music">音乐</router-link>
    </li>

    <li class="nav-title">
      <router-link to="/photos">随手拍</router-link>
    </li>
    <li class="nav-title">
      <router-link to="/chat">聊聊</router-link>
    </li>
    <li class="nav-title">
      <router-link to="/virus">抗击疫情</router-link>
    </li>
    <li class="nav-title ">
      <!-- <router-link to="/lemon">柠檬精</router-link> -->
      <a class="blog_box" target="_blank" href="https://numbrun.gitee.io/">
        我的博客
        <span class="my_blog"></span>
      </a>
    </li>

    <li class="nav-title">
      <router-link to="/msgList">访客留言</router-link>
    </li>
    <li class=" nav-title">
      <div class="dropdown" @click="goOther">
        其他
        <span class="nav-more"></span>
        <!-- </router-link> -->
        <div v-show="otherShow" class="dropdown-menu">
          <span>
            <router-link to="/others/aboutme">站长资料 </router-link>
          </span>
          <span>
            <router-link :to="{name:'page404'}">404</router-link>
          </span>
          <span @click="goResume">
            <a href="javascript:;">查看简历</a>
            <!-- <a href="https://numb.run/www/public/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91-%E5%88%98%E6%88%90%E9%BE%99-19963465520.pdf" target="_blank"></a> -->
          </span>
        </div>
      </div>
      <!-- <router-link to="/others/aboutme"> -->
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      otherShow: false,
    };
  },
  methods: {
    goOther() {
      this.otherShow = !this.otherShow;
    },
    goResume() {
      this.$prompt("请输入瓜村村长(站长)姓名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(({ value }) => {
          value = value ? value.trim() : "";
          if (value == "刘成龙") {
            window.open(
              "https://numb.run/www/public/%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91-%E5%88%98%E6%88%90%E9%BE%99-19963465520.pdf",
              "_blank"
            );
          } else {
            this.$message({
              type: "error",
              message: "答案错误",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  mounted() {
    window.addEventListener("click", (e) => {
      if (e.target.className != "dropdown") {
        this.otherShow = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.main-nav {
  float: left;
  height: 90px;
  font-size: 14px;
  width: 650px;
  margin-left: 20px;
  // display: flex;
  .nav-title {
    float: left;

    a {
      padding: 4px 10px;
      margin: 0 10px;
      color: #fff;
      // display: inline-block;
      border-radius: 3px;
    }
    a:hover {
      color: #cccccc;
    }
    .router-link-exact-active {
      position: relative;
      // background: #109d59;
      background: #10aeb5;
      color: #fff;
    }
    > .router-link-exact-active::after {
      content: "";
      display: block;
      width: 1px;
      height: 0;
      position: absolute;
      top: 37px;
      left: 27%;
      right: 50%;
      border-top: 11px solid transparent;
      border-right: 11px solid transparent;
      border-bottom: 11px solid #fff;
      border-left: 11px solid transparent;
    }
    .nav-more {
      display: inline-block;
      width: 0;
      height: 0;
      margin-left: 2px;
      vertical-align: middle;
      border-top: 4px solid;
      border-right: 4px solid transparent;
      border-left: 4px solid transparent;
    }

    .blog_box {
      position: relative;
      .my_blog {
        position: absolute;
        top: 0px;
        right: 0px;
        line-height: 20px;
        background: #d9534f;
        padding: 3px;
        z-index: 9999999;
        border-radius: 20%;
        border-radius: 50%;
        font-size: 0;
        line-height: 0;
        border: 1px solid #d43f3a;
      }
    }
  }
  .dropdown {
    position: relative;
    cursor: pointer;
  }
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    font-size: 14px;
    list-style: none;
    background-color: #fff;
    border: 1px solid #ccc;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
    span > a {
      margin: 1px;
      display: block;
      padding: 3px 10px;
      clear: both;
      font-weight: normal;
      line-height: 22px;
      color: #333;
      white-space: nowrap;
      text-align: center;
    }
    span > a:hover {
      background: #10aeb5;
      color: #fff;
    }
    .router-link-exact-active::after {
      content: "";
    }
  }
}
</style>
