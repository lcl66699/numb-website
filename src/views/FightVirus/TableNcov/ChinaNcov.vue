<template>
  <div class="ChinaNcov-box">
    <el-table
      :data="down ? chinaNcovListLess : chinaNcovList"
      style="width: 100%"
      :default-sort="{ prop: 'currentConfirmedCount', order: 'descending' }"
      :cell-style="columnStyle"
      :header-cell-style="rowClass"
      size="small"
      row-key="cityid"
      :tree-props="{ children: 'cities' }"
    >
      <el-table-column
        prop="provinceShortName"
        label="疫情地区"
      ></el-table-column>
      <el-table-column
        prop="currentConfirmedCount"
        label="现存确诊"
        sortable
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="confirmedCount"
        label="累计确诊"
        sortable
        width="120"
      >
      </el-table-column>
      <el-table-column prop="curedCount" width="110" label="治愈人数" sortable>
      </el-table-column>
      <el-table-column prop="deadCount" width="120" label="累计死亡" sortable>
      </el-table-column>
      <el-table-column
        prop="suspectedCount"
        width="100"
        label="疑似病例"
        sortable
      >
      </el-table-column>
    </el-table>
    <div class="open-all">
      <p @click="openAll" v-if="chinaNcovList.length > 1">
        <span v-html="down ? '展开全部' : '取消展开'"> </span>
        <i class="el-icon-arrow-down" v-if="down"></i>
        <i class="el-icon-arrow-up" v-else></i>
      </p>
    </div>
  </div>
</template>

<script>
import Virus from "../../../api/index";
export default {
  data() {
    return {
      chinaNcovList: [], //中国省市疫情数据(全部)
      chinaNcovListLess: [], //中国省市疫情数据(少量)
      down: true, //下拉按钮icon状态
    };
  },
  mounted() {
    // 请求省市疫情
    Virus.postCovidCity()
      .then((data) => {
        if (data.data.code == 200) {
          let ChinaArr = data.data.newslist;
          let cityid = 1001; //城市的唯一id
          for (let i = 0; i < ChinaArr.length; i++) {
            cityid += 1;
            ChinaArr[i].cityid = cityid;
            if (ChinaArr[i].cities.length > 0) {
              // console.log(ChinaArr[i].cities);
              let citiesArr = ChinaArr[i].cities;
              for (let j = 0; j < citiesArr.length; j++) {
                cityid += 1;
                // console.log(citiesArr[j].cityName);
                // 赋予子城市的provinceShortName键，
                citiesArr[j].provinceShortName = citiesArr[j].cityName;
                // 赋予子城市的唯一id
                citiesArr[j].cityid = cityid;
              }
            }
          }
          // console.log(cityid, citiesArr[j]);
          this.chinaNcovList = ChinaArr;
        } else {
          console.log("请求失败", data.data);
        }
      })
      .then(() => {
        // console.log(this.chinaNcovList, 666);
        // 截取少量数据予以展示
        this.chinaNcovListLess = this.chinaNcovList.slice(0, 12);
      })
      .catch((error) => {
        console.log(error, "请求超时，刷新重试！");
      });
  },
  methods: {
    // 表格内容第一行上色
    rowClass({ row, rowIndex }) {
      return "background:#F5F6F7;color:#555;font-weight:600;height:25px";
    },
    /*
      row,  每一行上的数据
      column, 每一列上的数据
      rowIndex,  行数的下标从0开始
      columnIndex   列数下标从0开始
    */
    // 改变第一列（国家）的颜色
    columnStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        return "color:#00bec7;fontWeight: 600;";
      }
    },
    //展开国外疫情全部数据
    openAll() {
      // icon变换
      this.down = !this.down;
    },
  },
};
</script>

<style lang="scss" scoped>
.ChinaNcov-box {
  padding: 20px;
  .open-all {
    text-align: center;

    color: #555;
    margin-top: 12px;
    p {
      cursor: pointer;
      display: inline-block;
    }
  }
}
</style>
