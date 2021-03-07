<template>
  <div
    :class="{
      searchDefaultStyle: isSearchDefault,
      searchFocusStyle: isSearchFocus,
    }"
    class="search-box"
    ref="searchBox"
  >
    <button id="toSearch" @click="searchButton"></button>
    <input
      ref="searchInput"
      @keyup.enter="searchButton"
      v-model="searchText"
      class="search-input"
      @focus="searchFocus"
      @blur="searchBlur"
      placeholder="试试：百度搜索"
      type="text"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSearchDefault: true,
      isSearchFocus: false,
      searchText: "",
    };
  },
  methods: {
    //   input选中状态
    searchFocus() {
      // console.log(this.$refs.searchBox);
      //   this.$refs.searchBox.style.width = "229px";
      //   this.$refs.searchBox = searchFocusStyle;
      this.isSearchDefault = !this.isSearchDefault;
      this.isSearchFocus = !this.isSearchFocus;
    },
    // input离开状态
    searchBlur() {
      this.isSearchDefault = !this.isSearchDefault;
      this.isSearchFocus = !this.isSearchFocus;
    },
    // 搜索框按钮
    searchButton(searchText) {
      // window.open(
      //   "https://www.baidu.com",
      //   "newwindow",
      //   "height=800, width=1200, top=200, left=200, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no"
      // );
      window.open(
        `https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=${this.searchText}`
      );
      console.log("你搜的内容：", this.searchText);
      // window.open("https://www.baidu.com"); //  跳转链接
      // console.log(this.$refs.searchBox.style);
      // this.$refs.searchBox.style.borderColor = "#109d59";
    },
  },
};
</script>

<style lang="scss" scoped>
.search-box {
  width: 170px;
  border: 1px solid #a8a8a8;
  height: 35px;
  font-size: 14px;
  float: left;
  border-radius: 20px;
  // background: rgba($color: #000000, $alpha: 0.8);
  margin-top: 26px;
  // color: #2ecc71;
  color: #10aeb5;
  overflow: hidden;
  position: relative;
  .search-input {
    position: absolute;
    left: 40px;
    top: -2px;
    font-size: 13px;
    line-height: 39px;
    width: 100%;
    height: 40px;
    // color: #fff;
    // color: #2ecc71;
    color: #10aeb5;
    background: none;
    outline: none;
    // outline-color: #109d59;
    border: none;
  }
  #toSearch {
    background: #10aeb5 url(../../assets/images/Nav/searchIcon.png) no-repeat
      center;
    outline: 0;
    border: 0 none;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
    border-radius: 40px 0 0 40px;
    // border-radius: 0 16px 16px 0;
    cursor: pointer;
  }
  input::-webkit-input-placeholder {
    color: #c1c1c1;
  }
  input::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c1c1c1;
  }
  input:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c1c1c1;
  }
  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #c1c1c1;
  }
}
.searchDefaultStyle {
  width: 170px;
  border: 1px solid #a8a8a8;
  transition: "all 2s";
}
.searchFocusStyle {
  width: 225px;
  border-color: #10aeb5;
  transition: all 0.6s;
}
</style>
