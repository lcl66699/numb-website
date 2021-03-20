<template>
  <div id="aboutme">
    <div class="aboutme-head">
      <h2 class="heading">About Author</h2>
    </div>
    <!-- 内容 -->
    <div class="wrapper">
      <div class="aboutme-content">
        <div class="aboutme-img">
          <img :src="aimg" alt="" />
        </div>
        <div class="aboutme-right">
          <div class="author_info">
            <h3>Hi, I am numb author</h3>
            <p>
              95后的我，出生于黑龙江某乡村，热爱技术，更热爱生活。
              是一个普通的前端开发程序员
              ，这个网站初衷是记录生活，下一步打算开发博客功能，记录工作中遇到的难题
              ，此外对当前导航路由没有开发的模块继续开发等。
            </p>
            <p>
              本网站技术栈为：vue全家桶、ElementUI、Echarts、axios等
              顶部导航条为vue-router，登录为根据当前用户IP获取地理位置并存在localstorge
              目前主要分为首页、音乐、家常便饭、随手拍、聊聊、柠檬精、抗击疫情、其他模块。
            </p>
            <p>
              其中首页大量使用了原生css特效，如过渡、位移、旋转、-webkit-box-reflect倒影效果，
              其中时钟为js原生Date。
            </p>
            <p>
              音乐模块为调取网易云音乐接口，并对一些可复用的组件进行封装，如歌单详情页和mv播放页，根据传入不同id以展示不同数据。
              其中左侧的选项卡为vue动态组件comp，
              我的信息(网易账号)，进入之后会进行判断该用户是否已登录，以展示登录页面或个人信息页面。
              登陆后将用户id存储到vuex和localstorge中，后台返回userid，
              得到userid后进行请求私人音乐的歌单以及个人信息等。
            </p>
            <p>
              疫情数据接口为天行数据提供，父组件网络请求获取后传给子组件map、table等。
              中国地图引用了Echarts，中国和海外的数据为element-ui的表格进行渲染，并加入了排序和展开更多功能。
            </p>
            <p>
              路漫漫其修远兮，吾将上下而求索。如果您在浏览本网页中发现问题或有好的建议，请您加下方的QQ与我反馈，未来，路还很长。
              本网页还有很多功能尚未开发，我也将会继续完善，继续写下去，增加更多的创新功能与技术栈。
            </p>
            <p>祝大家平安喜乐，所得皆所期。</p>
            <br />
          </div>
        </div>
      </div>
    </div>
    <Foot />
  </div>
</template>

<script>
import a from "../../assets/images/homeImgs/melcl.jpg";
import Foot from "../../components/Foot";
export default {
  data() {
    return {
      aimg: a,
    };
  },
  components: {
    Foot,
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
    width: 600px;
    height: 600px;
    top: -70px;
    left: 60px;
    img {
      // width: 100%;
      height: 100%;
    }
  }
  .aboutme-right {
    margin-left: 170px;
    width: 1000px;
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
