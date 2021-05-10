<template>
  <div class="selectBox" style="padding:50px">
    <input type="text" v-model="inputValue" @click.stop="showActive" />
    <ul class="list" v-show="isShow">
      <li
        :class="isActive == index ? 'blue' : ''"
        @click="clickName(item, index)"
        v-for="(item, index) in list"
        :key="index"
      >
        {{ item }}
      </li>
    </ul>
    <!-- g高德地图 -->
    <div id="amap-main" style="height:500px;width:800px"></div>
  </div>
</template>
<script>
// import 'https://webapi.amap.com/loader.js'
import { lazyAMapApiLoaderInstance } from "vue-amap";
export default {
  name: "Home",
  data() {
    return {
      isActive: -1, //，选中颜色
      inputValue: "",
      isShow: false,
      list: ["111", "222", "333"],
    };
  },

  mounted() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.map = new AMap.Map("amap-main", {
        center: new AMap.LngLat(121.59996, 31.197646),
         features: ['road'],
          mapStyle: "amap://styles/blue",
          rotation: 0,
          zoom: 20,
          viewMode: "3D",
          pitch: 0,
          skyColor: "#33216a",
      });
    });





    let that = this;
    //点击页面空白处隐藏下拉列表
    document.addEventListener("click", function() {
      that.isShow = false;
    });
  },
  components: {},
  methods: {
    clickName(name, index) {
      new Promise((resolve, reject) => {
        this.inputValue = name;
        this.isActive = index;
        resolve("success");
      }).then((resolve) => {
        this.showNone();
      });
    },
    showActive() {
      this.isShow = true;
    },
    showNone() {
      this.isShow = false;
    },
    initMap() {
      // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
      let AMapUI = (this.AMapUI = window.AMapUI);
      let AMap = (this.AMap = window.AMap);
      AMapUI.loadUI(["misc/PositionPicker"], (PositionPicker) => {
        let mapConfig = {
          zoom: 16,
          cityName: MapCityName,
        };
        if (this.lat && this.lng) {
          mapConfig.center = [this.lng, this.lat];
        }
        let map = new AMap.Map("js-container", mapConfig);
        // 加载地图搜索插件
        AMap.service("AMap.PlaceSearch", () => {
          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 5,
            pageIndex: 1,
            citylimit: true,
            city: MapCityName,
            map: map,
            panel: "js-result",
          });
        });
        // 启用工具条
        AMap.plugin(["AMap.ToolBar"], function() {
          map.addControl(
            new AMap.ToolBar({
              position: "RB",
            })
          );
        });
        // 创建地图拖拽
        let positionPicker = new PositionPicker({
          mode: "dragMap", // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
          map: map, // 依赖地图对象
        });
        // 拖拽完成发送自定义 drag 事件
        positionPicker.on("success", (positionResult) => {
          // 过滤掉初始化地图后的第一次默认拖放
          if (!this.dragStatus) {
            this.dragStatus = true;
          } else {
            this.$emit("drag", positionResult);
          }
        });
        // 启动拖放
        positionPicker.start();
      });
    },
    initMap2() {
      let _this = this;
      lazyAMapApiLoaderInstance.load().then(() => {
        this.map = new AMap.Map("amap", {
          center: _this.address,
          // features: ['road'],
          mapStyle: "amap://styles/blue",
          rotation: 0,
          zoom: 20,
          viewMode: "3D",
          pitch: 0,
          skyColor: "#33216a",
        });

        AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function() {
          _this.map.addControl(
            new AMap.ToolBar({
              liteStyle: true,
            })
          );
          _this.map.addControl(new AMap.Scale());
        });

        this.markers = this.alarmList.reverse().map((item, index) => {
          const colorStyle = item.type == 19 ? 1 : 3;

          return new AMap.Marker({
            position: this.fakeRandomPoint(),
            // 将 html 传给 content
            alarmId: item.alarmId,
            content:
              '<div class="example"><span class="dot colorStyle' +
              colorStyle +
              '"></span></div>',
          });
        });

        this.map.add(this.markers);
        //    var marker = new AMap.Marker({
        //     position:[104.058201, 30.705218],
        //     // 将 html 传给 content
        //     content:  '<div class="example"><span class="dot colorStyle'+ 1 +'"></span></div>',
        // });
        //    var marker1 = new AMap.Marker({
        //     position:[103.058201, 30.705218],
        //     // 将 html 传给 content
        //     content:  '<div class="example"><span class="dot colorStyle'+ 1 +'"></span></div>',

        // });

        // var markers = [marker,marker1]
      });
    },
  },
};
</script>
<style scoped>
.blue {
  background: #dae8fd;
  font-weight: 700;
}

.list li {
  cursor: pointer;
  font-size: 20px;
  line-height: 26px;
  padding-left: 10px;
}
</style>
