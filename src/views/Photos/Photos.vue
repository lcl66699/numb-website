<template>
  <div class="my_wrapper">
    <!-- <head123 /> -->
    <div class="wrap js_wrap"></div>
  </div>
</template>
<script>
import head123 from "./head.vue";
// import Waterfal from "./newPP.js";

export default {
  name: "photo",
  components: {
    head123,
  },
  data() {
    return {
      imgList: [],
    };
  },
  mounted() {
    for (let i = 0; i < 20; i++) {
      let { num, num1, num2 } = this.myRandom();
      this.imgList.push({
        img: `https://picsum.photos/${num}/${num1}?random=${num2}`,
        width: "400",
        height: "539",
      });
    }
    console.log(this.imgList);

    this.init();
  },
  methods: {
    myRandom() {
      return {
        num: parseInt(Math.random() * (400 - 100 + 1) + 100),
        num1: parseInt(Math.random() * (400 - 100 + 1) + 100),
        num2: parseInt(Math.random() * (50 - 1 + 1) + 1),
      };
    },
    init() {
      const doc = document;
      // 外层盒子
      function getScrollTop() {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      }
      // 列数 column

      function getScrollHeight() {
        return Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight
        );
      }

      // 间隙 gap
      function getClientHeight() {
        var clientHeight = 0;
        if (
          document.body.clientHeight &&
          document.documentElement.clientHeight
        ) {
          var clientHeight =
            document.body.clientHeight < document.documentElement.clientHeight
              ? document.body.clientHeight
              : document.documentElement.clientHeight;
        } else {
          var clientHeight =
            document.body.clientHeight > document.documentElement.clientHeight
              ? document.body.clientHeight
              : document.documentElement.clientHeight;
        }
        return clientHeight;
      }
      var num = parseInt(Math.random() * (400 - 100 + 1) + 100);
      var num1 = parseInt(Math.random() * (400 - 100 + 1) + 100);
      var num2 = parseInt(Math.random() * (50 - 1 + 1) + 1);
      var newnum = `https://picsum.photos/${num}/${num1}?random=${num2}`;
      // item.innerHTML = `<img src="https://picsum.photos/${num}/${num1}?random=${num2}" alt="">`
      var resultData = [
        {
          img: `https://picsum.photos/${num}/${num1}?random=${num2}`,
          width: "400",
          height: "539",
        },
        {
          img: `https://picsum.photos/${num}/${num1}?random=${num2}`,
          width: "500",
          height: "316",
        },
        {
          img: `https://picsum.photos/${num}/${num1}?random=${num2}`,
          width: "527",
          height: "289",
        },
        {
          img: `https://picsum.photos/${num}/${num1}?random=${num2}`,
          width: "400",
          height: "400",
        },
        {
          img: `https://picsum.photos/${num}/${num1}?random=${num2}`,
          width: "500",
          height: "313",
        },
        {
          img: `https://picsum.photos/${num}/${num1}?random=${num2}`,
          width: "500",
          height: "333",
        },
        { img: "../images/6.jpg", width: "400", height: "400" },
        { img: "../images/7.jpg", width: "250", height: "300" },
        { img: "../images/8.jpg", width: "250", height: "300" },
        { img: "../images/9.jpg", width: "250", height: "300" },
        { img: "../images/10.jpg", width: "250", height: "300" },
        { img: "../images/11.jpg", width: "250", height: "300" },
        { img: "../images/12.jpg", width: "250", height: "300" },
        { img: "../images/13.jpg", width: "500", height: "333" },
        { img: "../images/14.jpg", width: "500", height: "625" },
        { img: "../images/15.jpg", width: "500", height: "877" },
        { img: "../images/16.jpg", width: "500", height: "313" },
        { img: "../images/17.jpg", width: "500", height: "744" },
        { img: "../images/18.jpg", width: "500", height: "300" },
        { img: "../images/19.jpg", width: "499", height: "305" },
        { img: "../images/20.jpg", width: "394", height: "374" },
      ];
      //随机排列
      function sortRandom() {
        return Math.random() > 0.5 ? -1 : 1;
      }
      // var sortData = resultData.sort(sortRandom);
      // var sortData = this.imgList.sort(sortRandom);
      var sortData = this.imgList;
      console.log("排序", sortData);

      var Waterfall = function (wrapper, opt) {
        console.log(wrapper, opt); //js_wrap  {column: 3, gap: 10}
        this.oWrapper = doc.getElementsByClassName(wrapper)[0]; //找到该标签
        this.column = opt.column; //设置一行展示几个
        this.gap = opt.gap; //间隙
        //  宽度 1200               -  间隙 5           * 间距 10   / 列数
        this.itemWidth =
          (this.oWrapper.offsetWidth - (this.column - 1) * this.gap) /
          this.column;
        this.pageNum = 0;
        this.pageSize = 0;
        this.heightArr = [];
      };

      Waterfall.prototype = {
        //初始化函数
        init: function () {
          this.getImgDatas(this.pageNum);
          this.bindEvent();
        },
        bindEvent: function () {
          window.addEventListener(
            "scroll",
            this.scrollToBottom.bind(this),
            false
          );
        },

        //到底触发函数
        scrollToBottom: function () {
          if (getScrollTop() + getClientHeight() == getScrollHeight()) {
            // console.log("触发1", this.myRandom().num);
            var num = parseInt(Math.random() * (400 - 100 + 1) + 100);
            var num1 = parseInt(Math.random() * (400 - 100 + 1) + 100);
            var num2 = parseInt(Math.random() * (50 - 1 + 1) + 1);
            this.pageNum++;
            if (this.pageNum <= this.pageSize - 1) {
              this.getImgDatas(this.pageNum);
            }
          }
        },

        getImgDatas: function (pageNum) {
          var _self = this;
          var pagaData = sortData;
          _self.pageSize = 3;
          _self.renderList(pagaData, pageNum);
        },

        renderList: function (data, pageNum) {
          var oItems = null,
            minIndex = -1;
          data.forEach(function (ele, idx) {
            var oItem = doc.createElement("div"),
              oImg = new Image(),
              // oTitle = doc.createElement('div')
              //距离左侧距离
              itemLeft =
                (idx + 1) % this.column === 1
                  ? "0"
                  : idx * (this.itemWidth + this.gap);

            oItem.className = "wf-item";
            oItem.style.width = this.itemWidth + "px" || "500px";
            // oItem.style.height = (ele.height * this.itemWidth / ele.width + 44) + 'px';
            oItem.style.height =
              (ele.height * this.itemWidth) / ele.width + "px";
            // oItem.style.height = '100%';
            // console.log('tupian', ele.img);
            oImg.src = ele.img;
            // oTitle.innerHTML = '<p>肖战</p>';
            // oTitle.className = 'title-box'
            oItem.appendChild(oImg);
            // oItem.appendChild(oTitle);
            this.oWrapper.appendChild(oItem);
            oItems = doc.getElementsByClassName("wf-item");
            if (idx < this.column && pageNum == 0) {
              this.heightArr.push(oItem.offsetHeight);
              oItem.style.top = "0";
              oItem.style.left = itemLeft + "px";
            } else {
              minIndex = getMinIndex(this.heightArr);
              oItem.style.left = oItems[minIndex].offsetLeft + "px";
              oItem.style.top = this.heightArr[minIndex] + this.gap + "px";
              this.heightArr[minIndex] += oItems[idx].offsetHeight + this.gap;
            }
            oImg.style.opacity = "1"; //显示图片
          }, this);
        },
      };

      function getMinIndex(arr) {
        // 获取 最短图片的下标 [].indexOf.call(arr,Math.min.apply(null,arr))
        return [].indexOf.call(arr, Math.min.apply(null, arr));
      }
      window.Waterfall = Waterfall;
      // console.log(123, Waterfal);
      new Waterfall("js_wrap", {
        column: 5,
        gap: 10,
      }).init();
    },
  },
};
</script>
<style lang='scss' >
.my_wrapper {
  margin: 0 auto;
  width: 1200px;
}
p {
  margin: 0;
}
.wrap {
  position: relative;
  width: 1200px;
  margin: 0 auto;
}
.wf-item {
  position: absolute;
  background-color: #ededed;
  overflow: hidden;
  box-shadow: 1px 2px 3px #ccc;
  transition: box-show 2s;
  /* font-size:0;  尽量不使用*/
}
.wf-item:hover {
  box-shadow: 3px 5px 10px #ccc;
}
.wf-item img {
  display: block;
  width: 100%;
  opacity: 0;
  transition: all 2.5s;
}
.wf-item .title-box {
  height: 44px;
  text-align: center;
  line-height: 44px;
  background-color: #fff;
  color: #000;
}
</style>
