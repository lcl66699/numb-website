<template>
  <div class="home">
    <!-- 头部导航条 -->
    <!-- <Nav /> -->
    <div class="headImg-box">
      <img src="../assets/images/banner1.png" alt="" />
      <div class="content ">
        <p>Hi，楼上雅间请！</p>
        <h3>
          记录点滴，分享美好，遇见更好的自己。
        </h3>
        <!-- <p>有什么好说的呢？我真是太喜欢吃果冻了</p> -->
        <p>
          风景一直都在，但年少轻狂的心会慢慢消失，希望我们保持热爱在路上寻找内心深处的自己。
        </p>
      </div>
    </div>
    <HomeMydo />
    <!-- 首页日历 -->
    <HomeDate />

    <!-- 家常便饭 -->
    <div class="wrapper">
      <div class="content-page">
        <div class="page-header">
          <h1 class="pull-left">家常便饭</h1>
          <span class="pull-right">
            <!-- <a href="index.html"></a> -->
            <router-link to="/foods">更多</router-link>
          </span>
        </div>

        <div class="page-content">
          <div class="container-box">
            <a href="##">
              <div class="picture">
                <img
                  src="../assets/images/homeImgs/food2.jpg"
                  class="img-responsive"
                />
                <h4>边烤边吃&啤酒+烧烤</h4>
                <p>
                  走过路过不要错过
                </p>
              </div>
            </a>
          </div>
          <div class="container-box">
            <a href="##">
              <div class="picture">
                <img
                  src="../assets/images/homeImgs/huoguo.jpg"
                  class="img-responsive"
                />
                <h4>没有什么是一顿火锅解决不了的</h4>
                <p>
                  实在不行就两顿~
                </p>
              </div>
            </a>
          </div>
          <div class="container-box">
            <a href="##">
              <div class="picture">
                <img
                  src="../assets/images/homeImgs/food1.jpg"
                  class="img-responsive"
                />
                <h4>简简单单的烤桃酥</h4>
                <p>
                  普普通通的烘培日常
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!--随手拍  -->
    <div class="hands-photos">
      <div class="wrapper">
        <div class="content-page">
          <!-- 标题 -->
          <div class="page-header">
            <h1 class="pull-left">随手拍</h1>
            <span class="pull-right">
              <!-- <a href="index.html">更多</a>  -->
              <router-link to="/photos">更多</router-link>
            </span>
          </div>
          <!-- 第一行图 -->
          <div class="page-content-row">
            <div id="photosHover" class="content-row-left">
              <img
                src="../assets/images/homeImgs/xiyang1.jpg"
                class="img-responsive"
              />

              <p class="absolute-title">
                谁能想到 如今年轻人下班之后 最大的抚慰 是能拍到当天的夕阳呢
                怀念那些可以拍到夕阳的日子，可人总要向前走。
                <br />
                多拍些照片吧，以后回忆无数次
              </p>
              <div class="hidden"></div>
            </div>
            <div id="photosHover-left" class="content-row-right">
              <img
                src="../assets/images/homeImgs/xiyang3.jpg"
                class="img-responsive"
              />
              <p class="absolute-title">启峰山下看日落</p>
              <div class="hidden"></div>
            </div>
          </div>
          <!-- 第二行图 -->
          <div class="page-content-rowBottom">
            <div id="photosHover" class="bottom-photos">
              <img
                src="../assets/images/homeImgs/bookimg.jpg"
                class="img-responsive"
              />
              <p class="absolute-title">2018年的某一天，在教六实验室的记录</p>
              <div class="hidden"></div>
            </div>
            <div id="photosHover-left" class="bottom-photos">
              <img
                src="../assets/images/homeImgs/school.jpg"
                class="img-responsive"
              />
              <p class="absolute-title">就算大雨让这座城市颠倒</p>
              <div class="hidden"></div>
            </div>
            <div id="photosHover" class="bottom-photos">
              <img
                src="../assets/images/homeImgs/yangxue.jpg"
                class="img-responsive"
              />
              <p class="absolute-title">夕阳无限好</p>
              <div class="hidden"></div>
            </div>
            <div id="photosHover-left" class="bottom-photos">
              <img
                src="../assets/images/homeImgs/xiyang5.jpg"
                class="img-responsive"
              />
              <p class="absolute-title">科二练车时的黄昏</p>
              <div class="hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 胡思乱想 -->
    <div class="think">
      <div class="wrapper">
        <!-- 标题 -->
        <div class="page-header">
          <h1 class="pull-left">聊聊</h1>
          <span class="pull-right">
            <router-link to="/chat">更多</router-link>
          </span>
        </div>

        <div class="think-display">
          <div class="think-son">
            <img
              src="../assets/images/homeImgs/tongyang.jpg"
              class="img-responsive"
            />
            <div class="think-content">
              <h4>保护姑娘，贯彻落实</h4>
              <p>
                当旋律响起来，瞬间全场的激情都被点燃了，再见杰克，再见萨菲娜。
              </p>
              <p style="text-align: right;">--痛痒</p>
            </div>
          </div>
          <div class="think-son">
            <img
              src="../assets/images/homeImgs/tx1.png"
              class="img-responsive"
            />
            <div class="think-content">
              <h4>我们都有美好的未来</h4>
              <p>
                二手的唢呐，万青的小号，扶我起来，我又可以了。
              </p>
              <p style="text-align: right;">--愿爱无忧</p>
            </div>
          </div>
          <div class="think-son">
            <img
              src="../assets/images/homeImgs/tx3.png"
              class="img-responsive"
            />
            <div class="think-content">
              <h4>保持理智</h4>
              <p>
                飞机飞过天空，天空之城。
                港岛妹妹，你献给我的西班牙馅饼，甜蜜地融化了我，天空之城在哭泣。
              </p>
              <p style="text-align: right;">--热心市民李先生</p>
            </div>
          </div>
          <div class="think-son">
            <img
              src="../assets/images/homeImgs/tx2.png"
              class="img-responsive"
            />
            <div class="think-content">
              <h4>故事你真的在听吗</h4>
              <p>
                层楼终究误少年,自由早晚乱余生。 你我山前没相见，山后别相逢。
              </p>
              <p style="text-align: right;">--郭源潮</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 关于 -->
    <div class="section">
      <ul class="inner">
        <li @click="toaboutme">关于</li>
        <li @click="tomusic">+网抑云音乐</li>
      </ul>
    </div>
    <!-- 个人记录 -->
    <div class="section-own">
      <div class="inner">
        <h1>LCL的个人博客</h1>
        <!-- <p>美好的东西每天都在消失，但明天永远不会停止来临</p> -->
        <p>
          “不管做什么，都要做到极致，工作就工作、笑就大笑、吃饭的时候像是最后一餐那样去享受”
        </p>
      </div>
    </div>
    <!-- 页脚 -->
    <Foot ref="foot" />
    <!-- <HomeSwiper /> -->
  </div>
</template>

<script>
// import Nav from "../components/head/Nav";
import HomeSwiper from "./HomeSwiper.vue";
import HomeDate from "./HomeDate.vue";
import HomeMydo from "./HomeMydo.vue";
// import a from "../assets/images/FightVirus/1.jpg";
// import gf from "../assets/images/homeImgs/food1.jpg";
// import eqwewq from "../assets/images/homeImgs/food2.jpg";
// 页脚
import Foot from "../components/Foot.vue";
export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    // let str = "$10796";
    // let num = 10796;
    // // console.log(num / 100, "num");
    // var str2 = str.slice(2);
    // console.log(str, str2);
    // console.log(str.toFixed(2));
  },
  components: {
    // Nav,
    HomeSwiper,
    HomeDate,
    HomeMydo,
    Foot,
  },
  methods: {
    toaboutme() {
      // console.log(this.$refs);
      // 调用子组件方法
      this.$refs.foot.aboutme();
    },
    tomusic() {
      this.$router.push("/music");
    },
  },
};
</script>
<style lang="scss">
.home {
  .headImg-box {
    width: 100%;
    height: 600px;
    position: relative;
    img {
      width: 100%;
      height: 600px;
    }
    .content {
      position: absolute;
      background-color: rgba(0, 0, 0, 0.5);
      color: seashell;
      width: 500px;
      // height: 300px;
      padding: 40px;
      top: 100px;
      left: 165px;
      line-height: 30px;
    }
  }
  .wrapper {
    width: 1170px;
    margin: 0 auto;
  }
  .page-content {
    width: 100%;
    overflow: hidden;
    display: flex;
    .container-box {
      flex: 1;
      font-family: "Lantinghei SC", "Open Sans", Arial, "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", "STHeiti", "WenQuanYi Micro Hei", SimSun,
        sans-serif;
      font-size: 14px;
      line-height: 25px;
      background-color: #ffffff;
      padding: 20px;
      transition: all 0.5s;
      .picture {
        padding: 15px;
        background-color: #f9f9f9;
        transition: all 0.5s;
      }
      .picture:hover {
        background-color: #ffffff;
        box-shadow: 2px 2px 10px #f0f0f0;
      }
      .img-responsive {
        width: 330px;
        height: 220px;
      }
      h4 {
        font-size: 14px;
        font-weight: normal;
      }
      p {
        margin: 0 0 10px;
      }
    }
  }
  .content-page {
    width: 100%;
    overflow: hidden;
    // padding: 0px 0px 30px 0px;
    .page-header {
      margin: 40px 0 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eeeeee;
      padding: 0;
      box-sizing: border-box;
      overflow: hidden;
      .pull-left {
        font-size: 30px;
        float: left;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      .pull-right {
        margin-top: 30px;
        color: #6d9dd1;
        text-decoration: none;
        font-size: 14px;
        line-height: 25px;
        float: right;
      }
      a {
        color: #6d9dd1;
      }
    }
  }

  // 随手拍
  .hands-photos {
    padding-bottom: 30px;
    background-color: #f7f7f7;
    overflow: hidden;
    .page-content-row {
      display: block;
      padding: 0px 15px;
      width: 100%;
      height: 250px;
      overflow: hidden;
      .content-row-left {
        width: 750px;
        height: 100%;
        float: left;
        text-align: left;
        overflow: hidden;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content-row-right {
        width: 390px;
        height: 100%;
        float: left;
        text-align: left;
        position: relative;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .page-content-rowBottom {
      padding: 0px 15px;

      height: 250px;
      overflow: hidden;
      display: flex;
      .bottom-photos {
        overflow: hidden;
        flex: 1;
        position: relative;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .absolute-title {
      position: absolute;
      top: 20px;
      left: 20px;
      color: #fff;

      opacity: 0;
    }
    .hidden {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 100%;
      transition: all 0.5s;
    }
    #photosHover:hover > .hidden,
    #photosHover-left:hover > .hidden {
      color: #3a76b8;
      left: 0;
      transition: all 0.5s;
      z-index: 888;
    }
    #photosHover:hover > .absolute-title,
    #photosHover-left:hover > .absolute-title {
      transition: all 0.5s;
      opacity: 1;
    }
    #photosHover-left > .hidden {
      left: -100%;
    }
  }

  // 胡思乱想
  .think {
    overflow: hidden;
    width: 100%;
    // padding: 0px 0px 30px 0px;
    .page-header {
      margin: 40px 0 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #eeeeee;
      padding: 0;
      box-sizing: border-box;
      overflow: hidden;
      .pull-left {
        font-size: 30px;
        float: left;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      .pull-right {
        margin-top: 30px;
        color: #6d9dd1;
        text-decoration: none;
        font-size: 14px;
        line-height: 25px;
        float: right;
      }
      a {
        color: #6d9dd1;
      }
    }
    .think-display {
      display: flex;
      padding: 20px 0;
      .think-son {
        text-align: center;
        width: 100%;
        flex: 1;

        padding: 0 15px;
        img {
          height: 80px;
          width: 80px;
          border-radius: 50%;
          margin-bottom: -40px;
          box-shadow: 2px 2px 5px #f5f5f5;
        }
        .think-content {
          min-height: 220px;
          background-color: #f7f7f7;
          padding: 60px 15px 15px;
          text-align: left;
          box-shadow: 2px 2px 5px #f0f0f0;
          box-sizing: border-box;
          margin-bottom: 20px;
          font-size: 14px;
          line-height: 25px;
          color: #333333;
          h4 {
            font-size: 14px;
            font-weight: normal;
            line-height: 1.1;
            margin-top: 10px;
            margin-bottom: 10px;
          }
          p {
            font-size: 12px;
            font-weight: normal;
            margin: 0 0 10px;
          }
        }
      }
    }
  }
  // 关于
  .section {
    background-image: url(../assets/images/bg1.jpg);
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    display: table;
    table-layout: fixed;
    width: 100%;
    position: relative;
    padding: 200px 0;
    .inner {
      // width: 100%;
      // height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      li {
        color: #fff;
        display: inline-block;
        width: 200px;
        height: 46px;
        line-height: 46px;
        margin: 10px;
        border: 1px solid #b4b4b4;
        box-sizing: border-box;
        transition: all 0.6s linear;
        position: relative;
        text-align: center;
        overflow: hidden;
        font-size: 14px;
      }
      li:hover {
        border-color: #fff;
        color: #fff;
        background-color: #10aeb5;
      }
      li:after {
        content: "";
        width: 0;
        background-color: #6bc30d;
        height: 46px;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 0;
        -webkit-transition: all 0.6s linear;
        transition: all 0.6s linear;
      }
    }
  }
  // 个人记录
  .section-own {
    width: 100%;
    height: 280px;
    position: relative;
    .inner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 14px;
      font-family: "Microsoft YaHei";
      line-height: 24px;
      h1 {
        margin-bottom: 25px;
        font-size: 30px;
      }
      p {
        color: #333;
        font-size: 18px;
      }
    }
  }
}
</style>
