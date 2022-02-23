<template>
  <div class="vue-dropdown default-theme">
    <div class="cur-name" @click="isShow = !isShow">
      {{ itemlist.cur.name }}
    </div>
    <div class="list-and-search" :class="isShow ? 'on' : ''">
      <div class="search-module clearfix" v-show="isNeedSearch">
        <input class="search-text" @keyup="search($event)" :placeholder="placeholder" />
      </div>
      <ul class="list-module">
        <li v-for="(item, index) in datalist" @click="selectToggle(item)" :key="index">
          <span class="list-item-text">{{ item.name }}</span>
        </li>
      </ul>
      <div class="tip-nodata" v-show="isNeedSearch && datalist.length == 0">
        {{ nodatatext }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: [],
      isShow: false,
    };
  },
  props: {
    itemlist: Object, //父组件传来的数据
    placeholder: {
      type: String,
      default: "搜索", //input placeholder的默认值
    },
    isNeedSearch: {
      //是否需要搜索框
      type: Boolean,
      default: false,
    },
    nodatatext: {
      //是否需要显示搜索
      type: String,
      default: "未找到结果", //没有搜索到时的文本提示
    },
  },
  created() {
    this.datalist = this.itemlist.data;
    //点击组件以外的地方，收起
    document.addEventListener(
      "click",
      (e) => {
        if (!this.$el.contains(e.target)) {
          this.isShow = false;
        }
      },
      false
    );
  },
  methods: {
    selectToggle(data) {
      this.itemlist.cur.name = data.name;
      this.isShow = false;
      this.$emit("item-click", data);
    },
    search(e) {
      let searchvalue = e.currentTarget.value;
      this.datalist = this.itemlist.data.filter((item, index, arr) => {
        return item.name.indexOf(searchvalue) != -1;
      });
    },
  },
};
</script>
