<template>
  <div class="hello">
    <div class="flex">
      <div class="flex-div left" ref="left">
        <p v-for="(item, index) in chaifenData.left" :key="index">
          <img :src="item" />
        </p>
      </div>
      <div class="flex-div center" ref="center">
        <p v-for="(item, index) in chaifenData.center" :key="index">
          <img :src="item" />
        </p>
      </div>
      <div class="flex-div right" ref="right">
        <p v-for="(item, index) in chaifenData.right" :key="index">
          <img :src="item" />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      allData: [
        // require("./images/1.jpg"),
        // require("./images/2.jpg"),
        // require("./images/3.jpg"),
        // require("./images/4.jpg"),
        // require("./images/5.jpg"),
        // require("./images/6.jpg"),
        // require("./images/7.jpg"),
        // require("./images/8.jpg"),
        // require("./images/7.jpg"),
        // require("./images/7.jpg"),
      ], // 总数据
      index: 0, // 添加元素的index值
      heightAry: [], // 三列盒子的height
      chaifenData: {
        left: [],
        center: [],
        right: [],
      },
      count: 0,
    };
  },
  mounted() {
    for (let i = 0; i < 100; i++) {
      let { num, num1, num2 } = this.myRandom();
      this.allData.push(`https://picsum.photos/${num}/${num1}?random=${num2}`);
      // this.allData.push({
      //   img: `https://picsum.photos/${num}/${num1}?random=${num2}`,
      //   width: "400",
      //   height: "539",
      // });
    }
    this.chaifenData.left.push(this.allData[0]);
  },
  watch: {
    "chaifenData.left": {
      deep: true,
      handler() {
        let that = this;
        this.index = this.index + 1;
        setTimeout(function () {
          that.handleAry(that, "left", 0);
        }, 200);
      },
    },
    "chaifenData.center": {
      deep: true,
      handler() {
        let that = this;
        this.index = this.index + 1;
        setTimeout(function () {
          that.handleAry(that, "center", 1);
        }, 200);
      },
    },
    "chaifenData.right": {
      deep: true,
      handler() {
        let that = this;
        this.index = this.index + 1;
        setTimeout(function () {
          that.handleAry(that, "right", 2);
        }, 200);
      },
    },
  },
  methods: {
    myRandom() {
      return {
        num: parseInt(Math.random() * (400 - 100 + 1) + 100),
        num1: parseInt(Math.random() * (400 - 100 + 1) + 100),
        num2: parseInt(Math.random() * (50 - 1 + 1) + 1),
      };
    },
    handleAry(that, $el, i) {
      let height = that.$refs[$el].offsetHeight; // 获取盒子高度
      console.log(height);
      that.heightAry[i] = height;
      if (that.index < that.allData.length) {
        console.log("触发", this.count++);
        // 判断index是否超出总数据的下标值
        // 没超出了数据下标值,继续添加数据到下一个盒子
        // 判断heighAry数组中三个数字的最小值,并获取最小值的下标值
        if (that.index == 1) {
          that.chaifenData.center.push(that.allData[that.index]);
          return;
        }
        if (that.index == 2) {
          that.chaifenData.right.push(that.allData[that.index]);
          return;
        }
        let _index = that.heightAry.indexOf(Math.min(...that.heightAry));
        switch (_index) {
          case 0:
            that.chaifenData.left.push(that.allData[that.index]);
            break;
          case 1:
            that.chaifenData.center.push(that.allData[that.index]);
            break;
          case 2:
            that.chaifenData.right.push(that.allData[that.index]);
            break;
          default:
            break;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.hello {
  width: 1200px;
  margin: 0 auto;
}
.flex {
  display: flex;
  justify-content: space-between;
  // height: 100vh;
}
.flex-div {
  width: 350px;
  p {
    margin: 0;
    padding: 10px 0;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
