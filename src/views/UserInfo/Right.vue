<template>
  <div class="">

    <el-row class="right_box1">
      <el-col :span="24">
        <p class="head_txt">
          <img src="@/assets/create.png" alt="">
          创作中心
        </p>
        <el-row type='flex' class="all_read">
          <el-col class="allread_item allread_border" :span="12">
            <p>今日浏览量</p>
            <span>{{random(10,100)}}</span>
          </el-col>
          <el-col class="allread_item" :span="12">
            <p>今日阅读 (播放) 数</p>
            <span>{{random(1,50)}}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="24">
        <el-button @click="write" class="create_txt">进入创作中心</el-button>
      </el-col>
    </el-row>

    <el-row class="right_box2">
      <el-col :span="24">
        <p class="head_txt">
          活跃用户
        </p>
      </el-col>
      <el-col :span="24">
        <el-row>
          <el-col class="img_active" v-for="(item,index) in 12" :key="index" :span='6'>
            <img :src="handImg()" alt="">
            <p>村民{{showName()}}</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 第一个参数为你想生成的固定的文字开头比如: 云村村民xxxxx
    // 第二个为你想生成出固定开头文字外的随机长度
    new_random(prefix = "", randomLength = 7) {
      // 兼容更低版本的默认值写法
      prefix === undefined ? (prefix = "") : prefix;
      randomLength === undefined ? (randomLength = 8) : randomLength;

      // 设置随机用户名
      // 用户名随机词典数组
      let nameArr = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
        [
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
          "g",
          "h",
          "i",
          "g",
          "k",
          "l",
          "m",
          "n",
          "o",
          "p",
          "q",
          "r",
          "s",
          "t",
          "u",
          "v",
          "w",
          "x",
          "y",
          "z",
        ],
      ];
      // 随机名字字符串
      let name = prefix;
      // 循环遍历从用户词典中随机抽出一个
      for (var i = 0; i < randomLength; i++) {
        // 随机生成index
        let index = Math.floor(Math.random() * 2);
        let zm =
          nameArr[index][Math.floor(Math.random() * nameArr[index].length)];
        // 如果随机出的是英文字母
        if (index === 1) {
          // 则百分之50的概率变为大写
          if (Math.floor(Math.random() * 2) === 1) {
            zm = zm.toUpperCase();
          }
        }
        // 拼接进名字变量中
        name += zm;
      }
      // 将随机生成的名字返回
      return name;
    },

    write() {
      this.$message("暂未开放");
    },
    random(m, n) {
      return Math.floor(Math.random() * (m - n) + n);
    },
    handImg() {
      return `https://picsum.photos/100/100?random=${this.random(1, 1000)}`;
    },

    // 获取指定范围内的随机数
    randomAccess(min, max) {
      return Math.floor(Math.random() * (min - max) + max);
    },

    // 解码
    decodeUnicode(str) {
      //Unicode显示方式是\u4e00
      str = "\\u" + str;
      str = str.replace(/\\/g, "%");
      //转换中文
      str = unescape(str);
      //将其他受影响的转换回原来
      str = str.replace(/%/g, "\\");
      return str;
    },

    /*
     *@param Number NameLength 要获取的名字长度
     */
    getRandomName(NameLength) {
      let name = "";
      for (let i = 0; i < NameLength; i++) {
        let unicodeNum = "";
        unicodeNum = this.randomAccess(0x4e00, 0x9fa5).toString(16);
        name += this.decodeUnicode(unicodeNum);
      }
      return name;
    },
    showName() {
      let _num = this.random(1, 3);
      let name = this.getRandomName(_num);
      // console.log(name); // 输出内容：柎芨
      return name;
    },
  },
};
</script>

<style lang="scss" scoped>
.right_box1 {
  background: #fff;
  border-radius: 5px;
  padding: 12px;
  .head_txt {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 600;
    color: #121212;
    img {
      height: 40px;
      width: 80px;
      margin-right: 10px;
    }
  }
  .create_txt {
    width: 100%;
    margin: 10px 0;
  }
  .all_read {
    background: rgba(133, 144, 166, 0.05);
    border-radius: 4px;
    height: 98px;
    padding: 9px;
    margin: 10px 0;
    .allread_item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      p {
        font-size: 12px;
        line-height: 22px;
      }
      span {
        margin-top: 10px;
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
      }
    }
    .allread_border {
      border-right: 1px solid hsla(0, 0%, 92.2%, 0.6);
    }
  }
}
.right_box2 {
  border-radius: 5px;
  background: #fff;
  padding: 12px;
  margin: 12px 0;
  .head_txt {
    font-size: 16px;
    padding-bottom: 15px;
    padding-top: 5px;
    margin-bottom: 15px;
    text-align: left;
    text-indent: 10px;
    font-weight: 600;
    border-bottom: 0.2px solid #f6f7fb;
  }
  .img_active {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    p {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      line-height: 30px;
      color: gray;
      font-size: 12px;
      width: 50px;
      text-align: center;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 80px;
    }
  }
}
</style>