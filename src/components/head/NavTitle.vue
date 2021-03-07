<template>
  <ul class="main-nav">
    <li class="active">
      <router-link to="/">
        首页
      </router-link>
    </li>
    <li>
      <router-link to="/music">音乐</router-link>
    </li>
    <li>
      <router-link to="/foods">家常便饭</router-link>
    </li>
    <li>
      <router-link to="/photos">随手拍</router-link>
    </li>
    <li>
      <router-link to="/chat">聊聊</router-link>
    </li>
    <li><router-link to="/lemon">柠檬精</router-link></li>
    <li>
      <router-link to="/virus">抗击疫情</router-link>
    </li>
    <li>
      <router-link to="/others">其他</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  setup() {
    return {};
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
  li {
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
    .router-link-exact-active::after {
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
  }
}
</style>
