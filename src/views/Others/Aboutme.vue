<template>
  <div id="aboutme">
    <div class="aboutme-head">
      <h2 class="heading">About Author</h2>
    </div>
    <!-- 内容 -->
    <div class="wrapper">
      <div class="aboutme-content">
        <div class="aboutme-img">
          <swiper ref="mySwiper" class="aboutme-img" loop="true" :options="swiperOptions">
            <swiper-slide>
              <img class="aboutme_img_item" src="@/assets/images/homeImgs/me3.jpg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img class="aboutme_img_item" src="@/assets/images/homeImgs/snow.jpg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img class="aboutme_img_item" src="@/assets/images/homeImgs/melcl.jpg" alt="" />
            </swiper-slide>
            <swiper-slide>
              <img class="aboutme_img_item" src="@/assets/images/homeImgs/me2.jpg" alt="" />
            </swiper-slide>

            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          </swiper>
        </div>
        <div class="aboutme-right">
          <div class="author_info">
            <h3>Hi, I am numb author</h3>
            <p>
              95后的西瓜村村长，来自黑龙江，热爱技术，更热爱生活。
              一名普通的前端开发，这个网站初衷是记录生活，写点有趣的东西~
            </p>
            <p>
              本网站技术栈为：Vue全家桶、NodeJs（express）、Mysql、wowjs、ElementUI、Echarts、axios等
              顶部导航条为vue-router，登录为jwt登录验证，使用Vuex配合本地存储将用户登录数据持久化并管理用户登录状态
              目前主要分为首页、音乐、随手拍、聊聊、我的博客、抗击疫情、访客留言等模块。
            </p>
            <p>
              其中首页大量使用了原生css特效，如过渡、位移、旋转、webkit-box-reflect倒影效果等。
            </p>
            <p>
              音乐模块为调取网易云音乐接口，并对一些可复用的组件进行封装，如歌单详情页和mv播放页，根据传入不同id以展示不同数据。
              其中左侧的选项卡为vue动态组件，我的信息(网易账号)，进入之后会进行判断该用户是否已登录，以展示登录页面或个人信息页面。
              登陆后将用户id存储到vuex和localstorge中，后台返回userid，得到userid后进行请求私人音乐的歌单以及个人信息等。
            </p>
            <p>
              疫情数据接口为天行数据提供，中国地图引用了Echarts(现5版本已不支持)，中国和海外的数据为element-ui的表格进行渲染，并加入了排序和展开更多功能。
            </p>
            <p>
              路漫漫其修远兮，吾将上下而求索。如果您在浏览本网页中发现问题或有好的建议，请在其他->访客留言板块为我留言或加下方的QQ与我反馈。
              本网页还有很多功能尚未开发，我也将会继续完善，增加更多的创新。
            </p>
            <p>祝愿大家平安喜乐，所得皆所期。</p>
          </div>
        </div>
      </div>
    </div>
    <Foot />
  </div>
</template>

<script>
import Swiper, { Autoplay } from "swiper"; //一定解出Autoplay
import "swiper/swiper-bundle.css";
Swiper.use([Autoplay]);
import Foot from "../../components/Foot";
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //点击分页器的指示点分页器会控制Swiper切换。
        },
        loop: true, // 循环模式选项
        autoplay: true,
        autoplay: {
          delay: 3000, //自动切换的时间间隔
          stopOnLastSlide: false, //如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
          disableOnInteraction: false, //用户操作swiper之后，是否禁止autoplay。默认为true：停止。
        },
        parallax: true, //设置为true开启Swiper的视差效果，内容在切换时更有层次感
      },
    };
  },
  components: {
    Foot,
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    // console.log("Current Swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, true);
  },
};
</script>

<style lang="scss" scoped>
#aboutme {
  .aboutme-head {
    background-image: url(../../assets/images/aboutBg1.jpg);
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 90px 0px 200px 0px;
    text-align: center;
    .heading {
      //   position: relative;
      font-size: 48px;
      line-height: 60px;
      margin-top: 0px;
      margin-bottom: 0px;
      color: #59815b;
      font-family: "Oswald", sans-serif;
      font-weight: 600;
    }
  }
  //   内容部分
  .wrapper {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }
  .aboutme-img {
    position: absolute;
    width: 500px;
    height: 600px;
    border-radius: 5px;
    top: -70px;
    left: 60px;

    .aboutme_img_item {
      display: inline-block;
      margin: 0 auto;
      border-radius: 5px;
      width: 100%;
    }
  }
  .aboutme-right {
    margin-left: 170px;
    width: 1000px;
    border-radius: 5px;
    // height: 600px;
    background-color: #59815b;
    background-color: #10aeb5;
    padding: 120px 70px 65px 477px;
    box-sizing: border-box;
    .author_info {
      color: #fff;
      text-align: justify;
      h3 {
        font-size: 30px;
        margin-bottom: 35px;
        font-family: "Oswald", sans-serif;
        font-weight: 600;
      }
      p {
        text-indent: 2em;
        font-family: "Muli", sans-serif;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0px;
        // margin-bottom: 5px;
      }
    }
  }
  .aboutme-content {
    padding-bottom: 40px;
  }
}
</style>
<style lang="scss" >
#aboutme {
  .swiper-slide {
    width: 500px;
    height: 600px;
    display: flex;
    align-items: center;
  }
}
</style>
