<template>
  <div class="chinaMap">
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width:735px;height:560px "></div>
    <!-- <div id="main2" style="width:7.5rem;height:5.6rem "></div> -->
  </div>
</template>

<script>
import echarts from "echarts";
// 引入中国地图，仅针对4版本的echarts
// import "../../../../node_modules/echarts/map/js/china";
// import "../../../../node_modules/echarts/map/js/world";
// import { postCovidCity } from "../../../api/index";
// import chinaMap from "./china.json";
import Virus from "../../../api/index";
export default {
  data() {
    return {};
  },
  methods: {
    // 将请求的数据做下处理
    getlistdata(arr) {
      let newarr = [];
      for (let i = 0; i < arr.length; i++) {
        let obj = {};
        obj.name = arr[i].provinceShortName;
        obj.value = arr[i].currentConfirmedCount;
        newarr.push(obj);
      }
      return newarr;
    },
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例zz
    // var myChart = echarts.init(document.getElementById("main"));

    // 请求数据
    Virus.postCovidCity().then((data) => {
      console.log("地图疫情数据", data.data);
      if (data.data.code == 200) {
        let CovidCityList = this.getlistdata(data.data.newslist);
        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "疫情各省份统计",
          },
          visualMap: [
            {
              type: "piecewise",
              pieces: [
                { min: 600 },
                { min: 300, max: 599 },
                { min: 100, max: 299 },
                { min: 49, max: 99 },
                { min: 30, max: 19 },
                { min: 10, max: 29 },
                { min: 1, max: 9 },
              ],
              piecewise: {
                align: "center",
              },
            },
          ],
          tooltip: {
            show: true,
            triggerOn: "mousemove",
            formatter: (params) => `<div>
              <p>省:${params.name}</p>
              <p>现存确诊:${params.value}</p>
          </div>`,
          },
          legend: {
            data: ["疫情"],
          },
          series: [
            {
              type: "map",
              showLegendSymbol: false,
              label: {
                show: true,
                color: "#777",
                fontSize: "12px",
              },
              itemStyle: {
                areaColor: "#ffffff",
                borderColor: "#aaa",
              },
              // 高亮显示
              emphasis: {
                label: {
                  show: true,
                },
                itemStyle: {
                  areaColor: "#C7FFFD",
                },
              },
              // 'China' : '中国'
              map: "china",
              data: CovidCityList,
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.registerMap("china", chinaMap);
        // myChart.setOption(option);
      } else {
        // 请求不到数据,展示基础的地图

        // 指定图表的配置项和数据
        var option = {
          title: {
            text: "疫情各省份统计",
          },
          visualMap: [
            {
              type: "piecewise",
              pieces: [
                { min: 600 },
                { min: 300, max: 599 },
                { min: 100, max: 299 },
                { min: 49, max: 99 },
                { min: 30, max: 19 },
                { min: 10, max: 29 },
                { min: 1, max: 9 },
              ],
              piecewise: {
                align: "center",
              },
            },
          ],
          tooltip: {
            show: true,
            triggerOn: "mousemove",
            formatter: (params) => `<div>
            <p>省:${params.name}</p>
            <p>现存确诊:${params.value}</p>
        </div>`,
          },
          legend: {
            data: ["疫情"],
          },
          series: [
            {
              type: "map",
              showLegendSymbol: false,
              label: {
                show: true,
                color: "#777",
                fontSize: "12px",
              },
              itemStyle: {
                areaColor: "#ffffff",
                borderColor: "#aaa",
              },
              // 高亮显示
              emphasis: {
                label: {
                  show: true,
                },
                itemStyle: {
                  areaColor: "#C7FFFD",
                },
              },
              // 'China' : '中国'
              map: "china",
              data: 12,
            },
          ],
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.chinaMap {
  padding-left: 25px;
}
</style>
