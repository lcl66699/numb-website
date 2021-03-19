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
      <router-link to="/foods">家常便饭</router-link>
    </li>
    <li class="nav-title">
      <router-link to="/photos">随手拍</router-link>
    </li>
    <li class="nav-title">
      <router-link to="/chat">聊聊</router-link>
    </li>
    <li class="nav-title"><router-link to="/lemon">柠檬精</router-link></li>
    <li class="nav-title">
      <router-link to="/virus">抗击疫情</router-link>
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
          <span
            ><router-link to="/others/commonent">访客留言</router-link></span
          >
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
