<template>
  <div class="clock-box">
    <div class="mydate ">
      <h3>The time is now | 现在时刻</h3>
      <div class="time wow fadeInDown">
        <!-- <div>
          <span class="hour">{{ fixNum(Year) }}</span>
          <span>Year</span>
        </div> -->

        <div class="new_month">
          <span class="">{{fixNum(Month)}}</span>
          <span>Month | 月</span>
        </div>
        <div class="new_month my_hours">
          <span>{{ fixNum(Day)  }}</span>
          <span>Day | 日</span>
        </div>
        <div class="">
          <span class="hour">{{ fixNum(hours)  }}</span>
          <span>Hours 时</span>
        </div>
        <div>
          <span class="minutes">{{fixNum(minutes)   }}</span>
          <span>Minutes 分</span>
        </div>
        <div class="seconds-box">
          <span class="seconds">{{ fixNum(seconds)  }}</span>
          <span>Seconds 秒</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hours: "",
      minutes: "",
      seconds: "",
      Year: "",
      Month: "",
      Day: "",
      clockTimer: null,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let setClock = () => {
        var date = new Date();
        this.Year = date.getFullYear();
        this.Month = date.getMonth() + 1;
        this.Day = date.getDate();
        this.hours = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
      };

      // 执行时钟定时器
      if (!this.clockTimer) {
        setClock();
      }
      this.clockTimer = setInterval(setClock, 1000);

      // 只执行一次 在销毁前清定时器
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.clockTimer);
      });
    },
    fixNum(number, digits = 2) {
      if (Number(number) < 10) {
        return "0" + String(number);
      }
      return number;
    },
  },
};
</script>

<style lang="scss" scoped>
.clock-box {
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  background: #060a1f;
  background: rgba(#080a23, 0.9); //颜色比较浅
  // background: #10aeb5; //主题色
  font-size: 20px;
  height: 500px;

  .mydate {
    position: relative;
    top: -30px;
    h3 {
      position: relative;
      top: -10px;
      display: block;
      color: #fff;
      text-align: center;
      margin: 10px 0;
      font-weight: 700;
      text-transform: uppercase; //转大写
      letter-spacing: 0.4em;
      font-size: 0.8em;
    }
    .time {
      display: flex;
      div {
        position: relative;
        margin: 0 5px;
        -webkit-box-reflect: below 1px linear-gradient(transparent, #0004); //倒影
        span {
          position: relative;
          display: block;
          width: 120px;
          height: 100px;
          background: #2196f3;
          color: #fff;
          font-weight: 300;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 3em;
          z-index: 11;
          box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
        }
        span:nth-child(2) {
          height: 30px;
          font-size: 0.7em;
          letter-spacing: 0.2em;
          font-weight: 500;
          background: #127fd6;
          box-shadow: none;
          text-transform: uppercase;
        }
      }
      div:last-child span {
        background: #ff006a;
      }
      div:last-child span:last-child {
        background: #ec0062;
      }
      // div:nth-child(1) span {
      //   background: #39766d;
      // }
      // div:nth-child(1) span:last-child {
      //   background: #26504a;
      // }
      // div:nth-child(2) span {
      //   background: #39766d;
      // }
      // div:nth-child(2) span:last-child {
      //   background: #26504a;
      // }
      // div:nth-child(3) span {
      //   background: #39766d;
      // }
      // div:nth-child(3) span:last-child {
      //   background: #26504a;
      // }
      .my_hours {
        margin-right: 50px;
      }
      .new_month span {
        background: #39766d;
      }
      .new_month span:last-child {
        background: #26504a;
      }
    }
  }
}
</style>
