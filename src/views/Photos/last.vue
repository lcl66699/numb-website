<template>
  <div class="my_photos" style="position:relative;">
    <el-row class="container">
      <el-col :span='8' class="column" v-for="(column,index) in columns" :key="index">
        <!-- <div class="item" v-for="(item,i) in column.columnArr" :key="i" :style="{ height: item.height + 'px', background: item.background }"> -->
        <div class="item" v-for="(item,i) in column.columnArr" :key="i" :style="{   }">
          <!-- {{ item.text }} -->
          <!-- <img :src="item.url" alt=""> -->
          <el-image lazy :src="item.url"></el-image>
        </div>
      </el-col>
    </el-row>

    <!-- <div class="container">
      <div class="column" v-for="(column,index) in columns" :key="index">
        <div class="item" v-for="(item,i) in column.columnArr" :key="i" :style="{ height: item.height + 'px', background: item.background }">
          {{ item.text }}
          <img :src="item.url" alt="">
        </div>
      </div>
    </div> -->
    <div class="loading" v-if="loading" v-loading="loading" element-loading-text="加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      contentArr: [],
      columns: [],
      arrIndex: [],
      loading: false,
      contentArr2: [],
    };
  },
  mounted() {
    this.init();
    window.onresize = () => {
      console.time("aa");
      this.init();
      console.timeEnd("aa");
    };
    let clientH =
      document.documentElement.clientHeight || document.body.clientHeight;
    document.onscroll = (e) => {
      let top = e.target.documentElement.scrollTop || e.target.body.scrollTop;

      let height =
        e.target.documentElement.scrollHeight || e.target.body.scrollHeight;

      if (top + clientH >= height) {
        this.loading = true;
        this.pushElement().then(() => {
          //  从接口最新获取的元素push到目前高度最小的一列
          for (var index = 0; index < this.contentArr2.length; index++) {
            this.arrIndex = [];
            let arr = []; //找到高度最小的一列，可能有多个
            let minHeight = 0; //高度最小的一列的高度
            let pushIndex = 0; //高度最小的一列所在位置的索引

            for (let i = 0; i < this.columns.length; i++) {
              arr.push({
                height:
                  this.columns[i].columnArr[
                    this.columns[i].columnArr.length - 1
                  ].height,
                top: this.columns[i].columnArr[
                  this.columns[i].columnArr.length - 1
                ].top,
              });
            }

            minHeight = this.getMinHeight(arr);

            this.getMinIndex(minHeight);
            if (this.arrIndex.length > 0) {
              pushIndex = Math.min.apply(null, this.arrIndex); //出现高度一样的，去索引最小的
            }
            this.columns[pushIndex].columnArr.push(this.contentArr[index]);

            this.contentArr[index].top = minHeight + 20;
            this.contentArr[index].value = this.contentArr2[index].value;
            this.contentArr[index].text = this.contentArr2[index].text;
            this.contentArr[index].url = this.contentArr2[index].url;

            this.contentArr.push({
              value: this.contentArr2[index].value,
              height: "150",
              background: "#909399",
              text: this.contentArr2[index].text,
              top: this.contentArr2[index].url,
            });
            this.loading = false;
            console.log(this.contentArr);
          }
        });
      }
    };
  },
  methods: {
    myRandom() {
      const num = parseInt(Math.random() * (600 - 100 + 1) + 100);
      const num1 = parseInt(Math.random() * (600 - 100 + 1) + 100);
      const num2 = parseInt(Math.random() * (50 - 1 + 1) + 1);

      return `https://picsum.photos/${num}/${num1}?random=${num2}`;
    },
    pushElement() {
      console.log("push");
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          for (let i = 0; i < 20; i++) {
            this.contentArr2.push({
              value: i + this.contentArr.length + "hou",
              height: 50 * Math.random() + 50,
              background: "#409eff",
              text: i + this.contentArr.length,
              top: "",
              url: this.myRandom(),
            });
            // this.contentArr2[i] = {
            //   value: i + this.contentArr.length,
            //   height: 50 * Math.random() + 50,
            //   background: "#409eff",
            //   text: i + this.contentArr.length,
            //   top: "",
            //   url: this.myRandom(),
            // };
          }
          resolve();
        }, 500);
      });
    },
    getMinHeight(arr) {
      let a = [];
      for (let i = 0; i < arr.length; i++) {
        a.push(parseInt(arr[i].height) + parseInt(arr[i].top));
      }
      return Math.min.apply(null, a);
    },
    getMinIndex(val) {
      for (let i = 0; i < this.columns.length; i++) {
        let height =
          this.columns[i].columnArr[this.columns[i].columnArr.length - 1]
            .height;
        let top =
          this.columns[i].columnArr[this.columns[i].columnArr.length - 1].top;
        if (parseInt(height) + parseInt(top) == val) {
          this.arrIndex.push(i);
        }
      }
    },

    init() {
      this.columns = [];
      let contentLen = this.contentArr.length;
      // 根据可视区域的宽度判断需要几列
      let cWidth =
        document.documentElement.clientWidth || document.body.clientWidth;
      // 假设图片宽度为140px
      //   let cLen = Math.floor(cWidth / 140 - 1);
      let cLen = 3;
      console.log("cLen", cLen);

      // 初始化每一列的第一个元素，this.contentArr为获取到的数据
      for (let i = 0; i < cLen; i++) {
        this.contentArr[i].top = 0; //预设距离顶部值为0
        this.columns.push({ columnArr: [this.contentArr[i]] });
      }

      // 对剩余元素的判断，应该放到哪一列
      for (var index = cLen; index < contentLen; index++) {
        this.arrIndex = [];
        let arr = []; //找到高度最小的一列，可能有多个
        let minHeight = 0; //高度最小的一列的高度
        let pushIndex = 0; //高度最小的一列所在位置的索引

        for (let i = 0; i < this.columns.length; i++) {
          arr.push({
            height:
              this.columns[i].columnArr[this.columns[i].columnArr.length - 1]
                .height,
            top: this.columns[i].columnArr[this.columns[i].columnArr.length - 1]
              .top,
          });
        }

        minHeight = this.getMinHeight(arr);
        this.getMinIndex(minHeight);
        if (this.arrIndex.length > 0) {
          pushIndex = Math.min.apply(null, this.arrIndex); //出现高度一样的，去索引最小的
        }

        this.contentArr[index].top = minHeight + 20;

        this.columns[pushIndex].columnArr.push(this.contentArr[index]);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.my_photos {
  .el-image {
    width: 100%;
  }
}
</style>
<style lang='scss' scoped>
div,
p {
  margin: 0;
  padding: 0;
}
.container {
  margin: 0 auto;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-around;
  /* background: pink; */
  transition: all 0.5s ease-in-out;
}
.item {
  width: 100%;
  /* width: 120px; */
  min-height: 40px;
  color: #000;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  img {
    width: 100%;
    height: 100%;
  }
}
.loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>