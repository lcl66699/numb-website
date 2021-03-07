<template>
  <div class="not-page">
    <Nav />
    <div class="entry">
      <div class="entry-content">
        <!--  page 404-->

        <h1 class="title-404">404</h1>
        <h2 class="h1">Page Not Found</h2>

        <p class="title-detail">
          We're sorry,the page you have looked for does not exist in our
          database! Maybe go to our home page ?
        </p>

        <div class="goHome">
          <a class="btn btn-black-pearl" href="/"> 返 回 首 页 </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "./head/Nav";
export default {
  data() {
    return {};
  },
  components: {
    Nav,
  },
};
</script>

<style lang="scss" scoped>
.not-page {
  background-color: #f4f4f4 !important;

  .entry {
    width: 100%;
    height: 100%;
    text-align: center;
    .entry-content {
      padding: 120px;
      color: #747474;
      .title-404 {
        color: #000000;
        font-size: 280px;
        width: 100%;
        font-family: "Mulish";
        font-weight: 500;
        line-height: 310px;
      }
      .h1 {
        font-size: 40px;
        font-family: "Mulish";
        font-weight: 800;
        line-height: 1.4;
      }
      .title-detail {
        margin-top: 20px;
        padding-left: 35px;
        margin-bottom: 10px;
      }

      .goHome {
        padding: 50px;
        .btn-black-pearl {
          color: #fff;
          background-color: #1c1d1e;
          border-color: #1c1d1e;
        }
        .btn {
          display: inline-block;
          font-family: "Mulish";
          font-weight: 800;
          line-height: 1.7;
          font-size: 18px;
          text-align: center;
          border: 3px solid transparent;
          cursor: pointer;
          border-radius: 40px;
          padding: 14px 35px;
        }
      }
      .goHome a:hover {
        background-color: #ffda00;
        border-color: #ffda00;
        color: #1c1d1e;
      }
    }
  }
}
</style>
