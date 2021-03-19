<template>
  <footer class="footer-head">
    <div class="wrapper">
      <div class="foot-display">
        <div class="footer-logo foot-flex">
          <h2>lcl个人博客</h2>
          <p>人生唯一确定的就是不确定的人生</p>
          <button class="">About Me</button>
        </div>

        <div class="single-widget1 foot-flex">
          <h2>相关链接</h2>
          <ul class="social-icon">
            <li class="active"><i class="fa fa-book"></i>博文</li>
            <li class="active"><i class="fa fa-comments"></i>留言</li>
            <li class="active"><i class="fa fa-share"></i>资源</li>
            <li class="active"><i class="fa fa-snowflake-o"></i>日记</li>
            <li class="active"><i class="fa fa-files-o"></i>归档</li>
          </ul>
        </div>

        <div class="single-widget2 foot-flex">
          <h2>联系我</h2>
          <ul id="list">
            <li>地址:北京市朝阳区</li>
            <li class="myQQ">
              QQ: 768206581
              <div class="myqq-box">
                <img :src="myqq" alt="" />
              </div>
            </li>

            <li>邮箱: 768206581@qq.com</li>
          </ul>
        </div>
      </div>
    </div>
    <div id="footer-bottom">
      <p>
        Copyrigh; 2019-2020 numb个人博客 All Rights Reserved V.5.1.3
        粤ICP备1231100号
      </p>
    </div>
  </footer>
</template>

<script>
import myqq from "../assets/images/myqq.png";
export default {
  data() {
    return {
      myqq: myqq,
    };
  },
  components: {},
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.footer-head {
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
  overflow: hidden;
  width: 100%;
  line-height: 24px;
  font-size: 14px;
  background: #232328;
  color: #eee;
  position: relative;
  padding: 60px 0 90px;
  .wrapper {
    width: 1280px;
    margin: 0 auto;
    position: relative;
    .foot-display {
      display: flex;
      .foot-flex {
        flex: 1;
      }
      //   最左侧介绍
      .footer-logo {
        margin-top: 30px;
        h2 {
          color: #fff;
          font-size: 18px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        p {
          color: #eee;
        }
        button {
          margin-top: 20px;
          position: relative;
          height: 38px;
          line-height: 38px;
          padding: 0 18px;
          background-color: #10aeb5;
          color: #fff;
          text-align: center;
          font-size: 14px;
          border: none;
          border-radius: 2px;
          cursor: pointer;
        }
        // 点击按钮之后颜色变深
        button:active::before {
          display: block;
          content: "";
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 15%);
        }
        button:focus {
          outline: none;
        }
      }
      //   右侧共用一个css
      .single-widget1 {
        margin-top: 30px;
        line-height: 24px;
        h2 {
          color: #fff;
          font-size: 18px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        li {
          margin-bottom: 10px;
          float: left;
          width: 50%;
          color: #eee;
          cursor: pointer;
        }
        .list li {
          color: #eee;
          padding-left: 5px;
          font-family: Roboto, sans-serif;
          margin-bottom: 5px;
        }
      }
      .single-widget2 {
        margin-top: 30px;
        line-height: 24px;
        h2 {
          color: #fff;
          font-size: 18px;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        li {
          margin-bottom: 10px;
          width: 50%;
          color: #eee;
          cursor: pointer;
        }
        .list li {
          color: #eee;
          padding-left: 5px;
          font-family: Roboto, sans-serif;
          margin-bottom: 5px;
        }
        // hover的图
        #list > .myQQ {
          position: relative;
          .myqq-box {
            display: none;
            width: 100px;
            height: 100px;
            position: absolute;
            left: 114px;
            top: 0px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        #list >.myQQ:hover  .myqq-box {
          display: block;
        }
      }
    }
  }
  // 页脚
  #footer-bottom {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 12px 0;
    background: #1d1d21;
    line-height: 24px;
    text-align: center;
    p {
      color: #bbb;
      font-size: 14px;
    }
  }
}
</style>
