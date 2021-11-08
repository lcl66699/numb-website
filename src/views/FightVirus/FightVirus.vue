<template>
  <div class="fightVirus-box">
    <div class="fightVirus-container">

      <div class="head-pic">
        <img src="../../assets/images/FightVirus/1.jpg" alt="" />
      </div>
      <!-- 病毒信息 -->
      <Covid :covidInfo="covidInfo" />
      <!-- 统计数据 （比较昨日...）-->
      <Count :countdata="countdata" />
      <!-- 地图 -->
      <div>
        <!-- <Mymap /> -->
      </div>

      <!-- 海外疫情表格信息-->
      <!-- 按钮切换 -->
      <div class="switch-country">
        <p @click="ChinaNcov" :class="[isShow ? '' : 'countryActivate']" size="mini">
          中国
        </p>
        <p @click="ForeignNcov" :class="[isShow ? 'countryActivate' : '']" size="mini">
          海外
        </p>
      </div>
      <!-- 动态组件展示中国/海外疫情信息 -->
      <component :is="currentComponent"></component>

      <!-- 新闻 -->
      <news :news="news" />

      <div class="head-pic">
        <img src="../../assets/images/FightVirus/2.jpg" alt="" />
      </div>
      <!-- 折线图 -->
      <VirusSwiper />
    </div>
    <div class="fightVirus-bottom">
      <p>保护自己，百毒不侵，戴口罩，勤洗手</p>
    </div>
  </div>
</template>
<script>
import Covid from "./Covid/Covid";
// import getCovid from "../../api/index";
// import { postCovidCity } from "../../api/index";
// 引入网络请求
import Virus from "../../api/index";
import Count from "./Count/Count";
import Mymap from "./Mymap/Mymap";
import news from "./news/news";
// 海外-中国疫情表格信息 element-ui
import ChinaNcov from "./TableNcov/ChinaNcov";
import ForeignNcov from "./TableNcov/ForeignNcov";
// 折线图/轮播图暂未开发
import VirusSwiper from "./virusSwiper/VirusSwiper";
export default {
  data() {
    return {
      covidInfo: {}, //病毒信息
      news: [], //新闻
      countdata: {}, //现存确诊等数据
      currentComponent: "ForeignNcov", //默认显示海外
      countryActivate: "countryActivate", //按钮的活跃样式
      isShow: true,
    };
  },
  name: "Home",
  components: {
    Covid, //病毒信息
    Count,
    Mymap,
    news,
    ForeignNcov, //海外疫情
    ChinaNcov, //中国表格疫情
    VirusSwiper,
  },
  mounted() {
    //请求新闻和标题
    Virus.getCovid().then((data) => {
      //存对象解构赋值
      let { desc, news } = data.data.newslist[0];
      //存详情页
      this.covidInfo = {
        note1: desc.note1,
        note2: desc.note2,
        note3: desc.note3,
        remark1: desc.remark1,
        remark2: desc.remark2,
        remark3: desc.remark3,
      };
      //存新闻
      this.news = news;
      //统计数据 数字
      this.countdata = {
        currentConfirmedCount: desc.currentConfirmedCount, // 现存确诊人数
        confirmedCount: desc.confirmedCount, //累计确诊人数
        curedCount: desc.curedCount, //累计治愈人数
        deadCount: desc.deadCount, //累计死亡
        seriousCount: desc.seriousCount, //无症状
        suspectedCount: desc.suspectedCount, //现存疑似
        modifyTime: desc.modifyTime, //更新时间

        currentConfirmedIncr: desc.currentConfirmedIncr, //相比昨天确诊
        suspectedIncr: desc.suspectedIncr, //新增境外和昨天比
        seriousIncr: desc.seriousIncr, //现存无症状和昨日比
        confirmedIncr: desc.confirmedIncr, //累计确诊和昨日比
        deadIncr: desc.deadIncr, //累计死亡和昨日比
        curedIncr: desc.curedIncr, //相比昨天治愈人数
      };
    });
  },
  methods: {
    ChinaNcov() {
      if (this.isShow) {
        this.isShow = false;
      }
      this.currentComponent = "ChinaNcov";
    },
    ForeignNcov() {
      if (!this.isShow) {
        this.isShow = true;
      }
      this.currentComponent = "ForeignNcov";
    },
  },
};
</script>

<style lang="scss" scoped>
.fightVirus-box {
  background: #10aeb5;
  padding-bottom: 20px;
  .fightVirus-container {
    background: #fff;
    width: 800px;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.5);
  }
  .switch-country {
    display: flex;
    width: 100%;
    height: 60px;
    overflow: hidden;
    line-height: 36px;
    padding: 20px;
    padding-bottom: 0;
    padding-top: 10px;
    margin-bottom: -18px;
    box-sizing: border-box;
    background: #fff;
    cursor: pointer;
    p {
      border-radius: 6px;
      background: #e3e6eb;
      flex: 1;
      text-align: center;
      margin: 5px;
    }
    // 按钮的活跃样式
    .countryActivate {
      background: #fff;
      border: 1px solid#10aeb5;
      font-weight: 700;
      color: #10aeb5;
    }
  }
  .fightVirus-bottom {
    width: 800px;
    background: #fff;
    margin: 0 auto;
    margin-top: 25px;
    border-radius: 10px;
    padding: 20px 0;
    p {
      text-align: center;
      font-family: "Arial";
      font-weight: 600;
    }
  }
}
.head-pic {
  width: 100%;
  img {
    width: 100%;
    height: 310px;
  }
}
</style>
