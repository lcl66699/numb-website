<template>
  <div class="mydo">
    <h2 class="dotitle">我正在做什么 . . .</h2>
    <p class="do-content">
      这里主要是记录一些日常生活、兴趣爱好、网抑云音乐/热评、常用资源等
    </p>
    <div class="wrapper">
      <div class="three">
        <div class="do-box">
          <div class="web-face">
            <div class="icon-me">
              <!-- <i>图标</i> -->
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-strawberry"></use>
              </svg>
            </div>
            <span>总是等</span>
          </div>
          <div class="back-face">
            <span>just do it!</span>
            <p>
              人这辈子总是在等，等下次，等不忙，等有条件，等有钱，可后来等没了选择，等来了遗憾，等到了错过.
              <br />
              去生活,去寻觅,为了自己的人生而奔赴
              <br />
              去做你不敢做的事,去见你不敢见的人
              <br />
              不要犹豫 , just do it!
            </p>
          </div>
        </div>
        <div class="do-box">
          <div class="web-face">
            <div class="icon-me">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-blueberry"></use>
              </svg>
            </div>
            <span>numb</span>
          </div>
          <div class="back-face">
            <span>在路上</span>
            <p>
              numb是一首充满力量的歌。
            </p>
            <p>
              少年的梦,不应止于心动,更应付出行动
              <br />
              有一天你会和我一样。
              <br />
              偶尔惆怅 偶尔叹息 偶尔向上 生生不息。
            </p>
          </div>
        </div>
        <div class="do-box">
          <div class="web-face">
            <div class="icon-me">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-avocado"></use>
              </svg>
            </div>
            <span>百年孤独</span>
          </div>
          <div class="back-face">
            <span>百年孤独</span>
            <p>
              我家门前有两棵树,一棵是枣树,另一棵也是枣树;
            </p>
            <p>
              我家床边有两双鞋,一双是我的,另一双也是我的;
            </p>
            <p>
              我的床上有两个枕头,一个是我的,另一个也是我的.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.mydo {
  text-align: center;
  padding: 50px 0;
  .dotitle {
    color: #2b2b2b;
    font-size: 35px;
    line-height: 52px;
    margin-top: 30px;
    padding-bottom: 5px;
  }
  .do-content {
    color: #878787;
    font-size: 16px;
    font-weight: normal;
    line-height: 25px;
    letter-spacing: 0.2px;
  }
  .wrapper {
    width: 1280px;
    margin: 0 auto;
    .three {
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
      text-align: center;
      margin: 40px 90px auto;
      display: grid; //表格布局
      grid-gap: 20px;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      .do-box {
        width: 350px;
        height: 260px;
        margin: 0 auto;
        position: relative;
        perspective: 1000px;
        .web-face {
          background: #fff;
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0 5px 20px 0 rgba(0, 81, 250, 0.1);
          transition: all 0.5s ease;
          .icon-me {
            height: 80px;
            i,
            svg {
              font-size: 65px;
            }
          }
          span {
            padding-top: 20px;
            font-size: 22px;
            font-weight: 600;
            text-transform: uppercase;
          }
          i,
          span {
            background: linear-gradient(-135deg, #c850c0, #4158d0); //渐变
            -webkit-background-clip: text; //写在background属性下面
            -webkit-text-fill-color: transparent; //文字颜色填充
          }
        }
        .back-face {
          line-height: 22px;
          position: absolute;
          top: 0;
          left: 0;
          background: #fff;
          z-index: 1;
          height: 100%;
          width: 100%;
          padding: 30px;
          box-sizing: border-box;
          color: #fff;
          opacity: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          background: linear-gradient(-135deg, #c850c0, #4158d0); //渐变
          transform: translateY(110px) rotateX(-90deg);
          transition: all 0.5s ease;
          p {
            margin-top: 20px;
            text-align: justify;
          }
          span {
            font-size: 22px;
            font-weight: 600;
            color: #fff;
            text-transform: uppercase;
          }
        }
      }
      .do-box:hover .back-face {
        opacity: 1;
        transform: rotateX(0deg);
      }
      .do-box:hover .web-face {
        opacity: 0;
        transform: translateY(-110px) rotateX(90deg);
      }
    }
  }
}
</style>
