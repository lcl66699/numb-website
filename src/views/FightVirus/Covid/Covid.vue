<template>
  <div class="covid-box">
    <div class="covid-name">
      <p class="line"></p>
      <h2>病毒信息</h2>
    </div>
    <div class="info-box ">
      <p :class="{ infoBoxP: isShow }" class="infoP" @click="zhanshi">
        {{ covidInfo.remark1 }}
      </p>
      <p :class="{ infoBoxP: isShow }" @click="zhanshi" class="infoP">
        {{ covidInfo.remark2 }}
      </p>
      <p :class="{ infoBoxP: isShow }" @click="zhanshi" class="infoP">
        {{ covidInfo.remark3 }}
      </p>
      <p :class="{ infoBoxP: isShow }" @click="zhanshi" class="infoP">
        {{ covidInfo.note1 }}
      </p>
      <p :class="{ infoBoxP: isShow }" @click="zhanshi" class="infoP">
        {{ covidInfo.note2 }}
      </p>
      <p :class="{ infoBoxP: isShow }" @click="zhanshi" class="infoP">
        {{ covidInfo.note3 }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  props: ["covidInfo"],
  watch: {
    covidInfo(n) {
      //   console.log(n);
    },
  },
  components: {},
  methods: {
    zhanshi(e) {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style lang="scss" scoped>
.covid-box {
  padding: 15px;
  border-bottom: 1px solid #f1f1f1;
  .covid-name {
    overflow: hidden;
    p {
      float: left;
      width: 4px;
      height: 16px;
      background: #4169e2;
      margin-right: 5px;
    }
    h2 {
      font-weight: bold;
      float: left;
    }
  }
  .info-box {
    .infoP {
      color: #aaa;
      margin: 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .infoBoxP {
      white-space: normal;
    }
  }
}
</style>
