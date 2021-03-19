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
            <h3>Hi, I am Patricia Doe</h3>
            <p>
              Smilique sunt in culpiqui officia deserunt mollitia animiide labor
              um et dolor um fuga. Et harumqu id em rerum facilis est et
              expedita distinctio. Nam libero tempore cum soluta nobis est
              eligendioptio cumque nihil impedit quo minus quod maxime placeat
              facere possimu.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur. Ut enim ad mini ma
              veniam, quis nostrum exercitationem mosequatu aut em vel eum iure
              veniam quis notias excepturi.
            </p>
          </div>
        </div>
      </div>
    </div>
    <Foot />
  </div>
</template>

<script>
import a from "../../assets/images/banner1.png";
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
    width: 585px;
    height: 585px;
    top: -70px;
    left: 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .aboutme-right {
    margin-left: 170px;
    width: 1000px;
    height: 600px;
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
        font-family: "Muli", sans-serif;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0px;
        margin-bottom: 16px;
      }
    }
  }
  .aboutme-content {
    padding-bottom: 40px;
  }
}
</style>
