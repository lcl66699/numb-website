<template>
  <div class="ForeignNcov-box">
    <el-table
      :data="down ? tableDataLess : tableData"
      style="width: 100%"
      :default-sort="{ prop: 'currentConfirmedCount', order: 'descending' }"
      :cell-style="columnStyle"
      :header-cell-style="rowClass"
      size="small"
    >
      <el-table-column prop="provinceName" label="疫情地区"></el-table-column>
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
      <el-table-column prop="curedCount" width="110" label="治愈" sortable>
      </el-table-column>
      <el-table-column prop="deadCount" width="120" label="累计死亡" sortable>
      </el-table-column>
      <el-table-column prop="deadRate" width="100" label="病死率" sortable>
      </el-table-column>
    </el-table>
    <div class="open-all" v-if="tableData.length > 1">
      <p @click="openAll">
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
      tableData: [], //海外疫情数据(全部)
      tableDataLess: [], //海外疫情数据(少量)
      down: true, //下拉按钮icon状态
    };
  },
  methods: {
    // 表格内容第一行上色
    rowClass({ row, rowIndex }) {
      return "background:#F5F6F7;color:#555;font-weight:600;height:30px";
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
  mounted() {
    //请求海外数据接口
    Virus.getForeignNcov()
      .then((data) => {
        if (data.data.code == 200) {
          //   console.log(data.data.newslist);
          let dataList = data.data.newslist;
          let newObj = {};
          for (let i = 0; i < dataList.length; i++) {
            newObj = {
              continents: dataList[i].continents, //大洲
              provinceName: dataList[i].provinceName, //国家名
              currentConfirmedCount: dataList[i].currentConfirmedCount, //现存确诊
              confirmedCount: dataList[i].confirmedCount, //累计确诊
              deadCount: dataList[i].deadCount, //累计死亡人数
              deadRate: dataList[i].deadRate, //病死率
              curedCount: dataList[i].curedCount, //治愈人数
            };
            this.tableData.push(newObj);
          }
        } else {
          console.log("缺少参数，海外疫情数据请求失败");
        }
      })
      .then(() => {
        // 截取少量数据予以展示
        this.tableDataLess = this.tableData.slice(0, 12);
      })
      .catch((error) => {
        console.log(error, "请求超时，刷新重试！");
      });
  },
};
</script>

<style lang="scss" scoped>
.ForeignNcov-box {
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
