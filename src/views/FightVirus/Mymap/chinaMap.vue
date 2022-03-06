<template>
  <div class="BoxSeven">
    <Echart id="BoxSeven" width="100%" height="560px" :options="options" />
  </div>
</template>

<script>
import Echart from "@/components/Echarts/index.vue";
import Virus from "@/api";
export default {
  name: "BoxSeven",
  components: {
    Echart,
  },
  data() {
    return {
      options: {},
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      function randomData() {
        return Math.round(Math.random() * 500);
      }
      // 绘制图表
      var optionMap = {
        title: {
          text: "疫情各省份统计",
        },
        tooltip: {},
        tooltip: {
          show: true,
          triggerOn: "mousemove",
          formatter: (params) => `<div>
            <p>省: ${params.name}</p>
            <p>现存确诊: ${params.value ? params.value : "-"}</p>
        </div>`,
        },
        legend: {
          data: ["疫情"],
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
          },
        ],
        series: [
          {
            name: "",
            type: "map",
            zoom: 1.2, //这里是关键，一定要放在 series中
            mapType: "china",
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

            label: {
              normal: {
                show: true,
              },
              emphasis: {
                show: true,
              },
            },
            label: {
              emphasis: {
                show: true,
              },
              normal: {
                show: true,
                textStyle: {
                  fontSize: 8,
                  fontWeight: "300",
                  // color: "red",
                },
              },
            },
            showLegendSymbol: false,
            data: [],
          },
        ],
      };

      // 指定图表的配置项和数据
      var _optionMap = {
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
      this.options = optionMap;
      // this.options = _optionMap;
    },
  },
};
</script>

<style lang="scss" scoped>
.BoxSeven {
  padding: 20px;
}
</style>