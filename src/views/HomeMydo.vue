<template>
  <div class="mydo">
    <h2 class="dotitle">我正在做什么 . . .</h2>
    <p class="do-content">
      这里主要是记录一些日常生活、兴趣爱好、网抑云热评、常用资源等
    </p>
    <div class="wrapper">
      <div class="three">
        <div class="do-box">
          <div class="web-face">
            <div class="icon"><i>图标</i></div>
            <span>总是等</span>
          </div>
          <div class="back-face">
            <span>总是等</span>
            <p>我永远是你黑名单里的成员 我连重蹈覆辙的机会都没有</p>
          </div>
        </div>
        <div class="do-box">
          <div class="web-face">
            <div class="icon">
              <i>图标2</i>
            </div>
            <span>numb</span>
          </div>
          <div class="back-face">
            <span>numb</span>
            <p>
              你算是炎日里的一点微风， 是沙漠里的一小片绿洲，
              从来不是因为我而存在
            </p>
          </div>
        </div>
        <div class="do-box">
          <div class="web-face">
            <div class="icon">
              <i>图标3</i>
            </div>
            <span>皮皮虾我们走</span>
          </div>
          <div class="back-face">
            <span>皮皮虾我们走</span>
            <p>
              言虽有穷而意无尽 希望你遇到一个人 他看你时眼神温柔
              愿意陪你做很多事
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
          .icon {
            height: 80px;
            i {
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
