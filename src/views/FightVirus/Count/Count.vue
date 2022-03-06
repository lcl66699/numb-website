<template>
  <div class="count-box">
    <div class="count-head">
      <h1>截至北京时间{{ countdata.modifyTime | formatTime }} 数据统计</h1>
    </div>
    <div class="count-content">
      <div class="count">
        <p class="lastDay">
          较昨日
          <span class="currentConfirmedCount">{{
              countdata.currentConfirmedIncr > 0
                ? `+${countdata.currentConfirmedIncr}`
                : `${countdata.currentConfirmedIncr?countdata.currentConfirmedIncr:'-'}`
            }}
          </span>
        </p>
        <p class="currentConfirmedCount">
          {{ countdata.currentConfirmedCount }}
        </p>
        <p>现存确诊</p>
      </div>
      <div class="count">
        <p class="lastDay">
          较昨日
          <span class="suspectedCount">{{
              countdata.suspectedIncr > 0
                ? `+${countdata.suspectedIncr}`
                : `${countdata.suspectedIncr?countdata.suspectedIncr:'-'}`
            }}
          </span>
        </p>
        <p class="suspectedCount">{{ countdata.suspectedCount }}</p>
        <p>境外输入</p>
      </div>
      <div class="count">
        <p class="lastDay">
          较昨日
          <span class="seriousCount">{{
              countdata.seriousIncr > 0
                ? `+${countdata.seriousIncr}`
                : `${countdata.seriousIncr?countdata.seriousIncr:'-'}`
            }}
          </span>
        </p>
        <p class="seriousCount">{{ countdata.seriousCount }}</p>
        <p>现存无症状</p>
      </div>
      <div class="count">
        <p class="lastDay">
          较昨日
          <span class="confirmedCount">{{
              countdata.confirmedIncr > 0
                ? `+${countdata.confirmedIncr}`
                : `${countdata.confirmedIncr?countdata.confirmedIncr:'-'}`
            }}
          </span>
        </p>
        <p class="confirmedCount">{{ countdata.confirmedCount }}</p>
        <p>累计确诊</p>
      </div>
      <div class="count">
        <p class="lastDay">
          较昨日
          <span class="deadCount">{{
              countdata.deadIncr > 0
                ? `+${countdata.deadIncr}`
                : `${countdata.deadIncr?countdata.deadIncr:'-'}`
            }}
          </span>
        </p>
        <p class="deadCount">{{ countdata.deadCount }}</p>
        <p>累计死亡</p>
      </div>
      <div class="count">
        <p class="lastDay">
          较昨日
          <span class="curedCount">{{
              countdata.curedIncr > 0
                ? `+${countdata.curedIncr}`
                : `${countdata.curedIncr?countdata.curedIncr:'-'}`
            }}
          </span>
        </p>
        <p class="curedCount">{{ countdata.curedCount }}</p>
        <p>累计治愈</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Count",
  props: {
    countdata: {
      type: Object,
    },
  },
  filters: {
    //将时间戳转换为年-月-日 时：分
    formatTime(value) {
      // 年月日
      let date = new Date(value).toLocaleDateString().replace(/\//g, "-");
      // 时钟
      let time = new Date(value).toTimeString().slice(0, 5);
      return date + " " + time;
    },
  },

  watch: {
    // countdata(n) {
    //    console.log(n);
    // },
  },
};
</script>

<style lang="scss" scoped>
.currentConfirmedCount {
  color: rgb(247, 76, 49);
}
.suspectedCount {
  color: rgb(247, 130, 7);
}
.seriousCount {
  color: rgb(162, 90, 78);
}
.count-box {
  padding: 20px;
}
.count-head {
  h1 {
    margin-bottom: 5px;
    color: #6f6f6f;
  }
}
.count-content {
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0px 0px 1px #ccc;
  padding-top: 20px;
  font-weight: bold;
  box-shadow: 0 0 10px #eee;
}
.count-content .count {
  width: 33.33%;
  float: left;
  margin-bottom: 20px;
  text-align: center;
  .lastDay {
    font-size: 12px;
    color: #6f6f6f;
  }
}
.count-content .count p {
  margin: 5px 0;
}
.curedCount {
  color: rgb(40, 183, 163);
}
.deadCount {
  color: rgb(93, 112, 146);
}
.confirmedCount {
  color: rgb(174, 33, 44);
}
</style>
