<template>
  <div class="box">
    <div class="news-name">
      <p></p>
      <h2>疫情新闻简报</h2>
    </div>
    <div class="newsList">
      <div v-for="item in news" :key="item.title">
        <div class="tableft">
          <span class="lefttime">
            {{ item.pubDateStr }}
            <br />
            <span
              class="date"
              style="font-size: 10px; color: rgb(153, 153, 153);line-height: 20px;"
            >
              {{ item.pubDate | setdate }}</span
            >
          </span>
        </div>
        <div class="tabright">
          <p class="one">
            <i>最新</i>
            {{ item.title }}
          </p>
          <p class="two">{{ item.summary }}</p>
          <p class="three">信息来源：{{ item.infoSource }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["news"],
  filters: {
    //过滤接口的数据date
    setdate: (value) => {
      // console.log(value);
      let newValue = new Date(value).toString().slice(15, 21);
      // console.log(newValue);
      let date = new Date(value)
        .toLocaleDateString()
        .slice(5)
        .split("/")
        .join("-");
      // console.log(date);
      return date + " " + newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.news-name {
  // overflow: hidden;
  margin-left: 20px;
  background: #f1f1f1;
  overflow: hidden;
  padding: 2px;
  p {
    float: left;
    width: 4px;
    height: 16px;
    background: #4169e2;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  h2 {
    font-weight: bold;
    float: left;
    line-height: 16px;
  }
}

.box {
  background: #f1f1f1;
  box-sizing: border-box;
  width: 100%;
  padding-top: 16px;
  padding-right: 16px;
  overflow: hidden;
  .newsList {
    overflow: hidden;
    width: 100%;
    .tableft {
      float: left;
      padding-top: 16px;
      padding-right: 10px;
      padding: 15px 25px;
      padding-right: 5px;
      width: 100px;
      position: relative;
      .lefttime {
        font-weight: 500;
      }
    }
    .tabright {
      overflow: hidden;
      position: relative;
      flex-grow: 1;
      margin-bottom: 12px;
      padding: 9px 14px;
      background: #fff;
      border-radius: 12px;
      .one {
        color: #333;
        font-weight: 600;
        font-size: 20px;
        line-height: 36px;
        i {
          width: 38px;
          height: 18px;
          margin-right: 6px;
          color: #fff;
          font-size: 14px;
          text-align: center;
          padding: 5px;
          background-color: #f74c31;
          border-radius: 5px;
        }
      }
      .two {
        margin-top: 4px;
        overflow: hidden;
        color: #999;
        font-size: 16px;
        line-height: 20px;
        text-overflow: ellipsis;
        word-break: break-word;
      }
      .three {
        right: 16px;
        bottom: 12px;
        margin-top: 4px;
        color: #999;
        font-size: 12px;
        text-align: right;
      }
    }
  }
}
</style>
