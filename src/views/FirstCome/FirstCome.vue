<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="inner-width">
        <a href="/" class="logo"></a>
        <button @click="showRight" class="menu-toggler" :class="isActive?'active':''">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="navbar-menu" :class="isActive?'active':''">
          <!-- <a href="#">Home</a> -->
          <a href="https://blog.csdn.net/qq_38594056?type=blog" target="_blank">我的CSDN</a>
          <a href="https://numbrun.gitee.io" target="_blank">我的博客</a>
          <!-- <a href="#">Services</a>
          <a href="#">Education</a>
          <a href="#">Works</a>
          <a href="#">Contact</a> -->
        </div>
      </div>
    </nav>

    <!-- Home -->
    <section id="home">
      <div class="inner-width">
        <div class="content">
          <h1>Hi I'm </h1>
          <div class="sm">
            <a href="#" class="fab fa-github"></a>
            <a href="#" class="fab fa-qq"></a>
            <a href="#" class="fab fa-weibo"></a>
            <a href="#" class="fab fa-weixin"></a>
            <a href="#" class="fab fa-youtube"></a>
          </div>
          <div class="buttons">
            <a href="" class=" flipInX wow" @click.prevent="login">登 录</a>
            <a href="" class=" flipInX wow" @click.prevent="goHome">访客进入</a>
          </div>
        </div>
      </div>
    </section>

    <compDiago ref="compDiago">
      <LoginBox @loginSus="loginSus" />
    </compDiago>
  </div>
</template>
<script>
import LoginBox from "@/components/LoginBox.vue";
import compDiago from "@/components/compDiago.vue";
import { WOW } from "wowjs";
export default {
  data() {
    return {
      isActive: false,
    };
  },
  components: {
    LoginBox,
    compDiago,
  },
  mounted() {
    //第一种写法，可以设置wow中属性
    this.$nextTick(() => {
      // 在dom渲染完后,再执行动画
      var wow = new WOW({
        boxClass: "wow", ///动画元件css类（默认为wow）
        animateClass: "animated", //动画css类（默认为animated）
        offset: 0, //到元素距离触发动画（当默认为0）
        mobile: true, //在移动设备上触发动画（默认为true）
        live: true, //对异步加载的内容进行操作（默认为true）
      });
      wow.init();
    });
  },
  methods: {
    //登录传来的emit,表示登录成功,请求个人信息接口
    async loginSus(val) {
      let data = await getUserInfo();
      console.log("请求个人信息接口", data);
      try {
        this.userObj = data;
        this.isLogin = true;
      } catch (error) {
        this.isLogin = false;
        this.$message.error("获取用户信息失败!");
      }
    },
    showRight() {
      this.isActive = !this.isActive;
    },
    goHome() {
      this.$router.push("/");
      sessionStorage.setItem("isCome", 1); //判断是不是首次进入
    },
    login() {
      this.$refs.compDiago.open();
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: "Ubuntu", sans-serif;
  box-sizing: border-box;
}

.navbar {
  position: fixed;
  background-color: transparent;
  width: 100%;
  padding: 30px 0;
  top: 0;
  z-index: 999;
  transition: 0.3s linear;
}

.inner-width {
  max-width: 1300px;
  margin: auto;
  padding: 0 40px;
}

.navbar .inner-width {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 44px;
  height: 32px;
  background-image: url("../../assets/images/white-logo.png");
  background-size: contain;
}

.menu-toggler {
  background: none;
  width: 30px;
  border: none;
  cursor: pointer;
  position: relative;
  outline: none;
  z-index: 999;
  display: none;
}

.menu-toggler span {
  display: block;
  height: 3px;
  background-color: #fff;
  margin: 6px 0;
  position: relative;
  transition: 0.3s linear;
}

.navbar-menu a {
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  margin-left: 30px;
  transition: 0.2s linear;
}

.navbar-menu a:hover {
  color: #48dbfb !important;
}

.sticky {
  background-color: #fff;
  padding: 18px 0;
}

.sticky .logo {
  background-image: url("../../assets/images/black-logo.png");
}

.sticky .navbar-menu a {
  color: #111;
}

.sticky .menu-toggler span {
  background-color: #111;
}

#home {
  height: 100vh;
  min-height: 500px;
  background: url("../../assets/images/bg1.jpg") no-repeat center;
  background-size: cover;
  background-attachment: fixed;
}

#home .inner-width {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

#home .content {
  width: 100%;
  color: #fff;
}

#home .content h1 {
  font-size: 60px;
  margin-bottom: 60px;
}

#home .content h1::after {
  content: "Web Engineer";
  animation: textanim 10s linear infinite;
}

@keyframes textanim {
  25% {
    content: "A Developer";
  }
  50% {
    content: "A Designer";
  }
  75% {
    content: "A Youtuber";
  }
}

.sm a {
  color: #fff;
  font-size: 22px;
  margin: 0 10px;
  transition: 0.2s linear;
}

.sm a:hover {
  color: #48dbfb;
}

#home .buttons {
  margin-top: 60px;
}

#home .buttons a {
  display: inline-block;
  margin: 15px 30px;
  color: #48dbfb;
  font-size: 15px;
  font-weight: 500;
  width: 180px;
  border: 1px solid #48dbfb;
  padding: 14px 0;
  border-radius: 6px;
  transition: 0.2s linear;
}

#home .buttons a:hover,
#home .buttons a:nth-child(2) {
  background-color: #48dbfb;
  color: #fff;
}

section {
  padding: 100px 0;
  background-color: #f1f1f1;
}

.section-title {
  text-align: center;
  margin-bottom: 80px;
  position: relative;
  font-size: 26px;
  padding-bottom: 20px;
  color: #111;
}

.section-title::before {
  content: "";
  position: absolute;
  width: 80px;
  height: 3px;
  background-color: #111;
  bottom: 0;
  left: calc(50% - 40px);
}

.section-title::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 10px;
  background-color: #48dbfb;
  border: 4px solid #f1f1f1;
  left: calc(50% - 12px);
  bottom: -7px;
}

.about-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.about-pic {
  width: 200px;
  border-radius: 50%;
  margin-right: 100px;
}

.about-text {
  flex: 1;
}

.about-text h3 {
  margin: 10px 0;
  color: #444;
  font-size: 16px;
}

.about-text h3 span:nth-child(1):after,
.about-text h3 span:nth-child(2):after {
  content: "";
  width: 6px;
  height: 6px;
  background-color: #444;
  display: inline-block;
  border-radius: 50%;
  margin: 0 14px;
}

.about-text p {
  font-size: 17px;
  text-align: justify;
  line-height: 26px;
  margin-top: 20px;
}

.skills {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.skill {
  width: calc(50% - 20px);
  margin: 15px 0;
}

.skill-info {
  display: flex;
  justify-content: space-between;
}

.skill-bar {
  height: 3px;
  background-color: #ddd;
  margin-top: 14px;
  position: relative;
}

.skill-bar::after {
  content: "";
  position: absolute;
  height: 6px;
  background-color: #48dbfb;
  bottom: 0;
}

.html:after {
  width: 90%;
}

.css:after {
  width: 80%;
}

.js:after {
  width: 70%;
}

.php:after {
  width: 60%;
}

.mysql:after {
  width: 90%;
}

.cs:after {
  width: 80%;
}

section.dark {
  background-color: #353b48;
}

section.dark .section-title {
  color: #f1f1f1;
}

section.dark .section-title::before {
  background-color: #f1f1f1;
}

section.dark .section-title::after {
  border: 4px solid #353b48;
}

.services {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.service {
  width: calc(33% - 20px);
  text-align: center;
  border: 1px solid #48dbfb;
  border-radius: 6px;
  margin: 20px 0;
  padding: 40px 20px;
  color: #fff;
  cursor: pointer;
  transition: 0.3s linear;
}

.service .icon {
  color: #48dbfb;
  font-size: 40px;
  margin-bottom: 20px;
  transition: 0.3s linear;
}

.service h4 {
  font-size: 16px;
  margin-bottom: 6px;
}

.service:hover {
  background-color: #48dbfb;
}

.service:hover .icon {
  color: #fff;
}

@media screen and (max-width: 980px) {
  .menu-toggler {
    display: block;
  }

  .navbar-menu {
    position: fixed;
    height: 100vh;
    width: 100%;
    background-color: #353b48;
    top: 0;
    right: -100%;
    max-width: 400px;
    padding: 80px 50px;
    transition: 0.3s linear;
  }

  .navbar-menu a {
    display: block;
    font-size: 30px;
    margin: 30px 0;
  }

  .sticky .navbar-menu {
    background-color: #f1f1f1;
  }

  .navbar-menu.active {
    right: 0;
  }

  .menu-toggler.active span:nth-child(1) {
    transform: rotate(-45deg);
    top: 4px;
  }

  .menu-toggler.active span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggler.active span:nth-child(3) {
    transform: rotate(45deg);
    bottom: 14px;
  }

  .inner-width {
    max-width: 800px;
  }

  .about-pic {
    margin: 0 auto 60px;
  }

  .about-text {
    flex: 100%;
    text-align: center;
  }

  .service {
    width: calc(50% - 20px);
  }
}

@media screen and (max-width: 600px) {
  .inner-width {
    padding: 0 20px;
  }

  .skill {
    width: 100%;
  }

  .service {
    width: 100%;
  }
}
</style>