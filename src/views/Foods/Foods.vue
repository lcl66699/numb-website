<template>
  <div>
    <div class="123" style="width:100%;height:500px;">
      <el-button @click="download">下载</el-button>
      <h1 style="font-size:16px;text-align:center;">
        <div class="box">
          <h1>注册</h1>
          <el-input placeholder="用户名" v-model="initQuery.username" />
          <el-input placeholder="密码" v-model="initQuery.password" />
          <el-button @click="reg">注册</el-button>
          <el-button @click="login">登录</el-button>
          <el-button @click="clear">获取个人信息</el-button>
          <p>{{userInfo}}</p>
        </div>
      </h1>

      <el-upload :http-request="httpRequestwear" class="upload_box" action="#" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <div style="width：300px;background:blue;height:100px" class="shang_chuan">上传成绩</div>
      </el-upload>

      <el-button @click="node">测试连接node</el-button>
      {{testNginx}}

      <el-button @click="getmysql">获取所有数据</el-button>
      {{mysql}}
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  register,
  userUploadLogo,
  login,
  getUserInfo,
  download,
  testNginx,
  getmysql,
} from "@/api/index";
export default {
  name: "Home",
  data() {
    return {
      initQuery: {
        username: "admin",
        password: "123",
      },
      userInfo: [],
      token: "",
      filename: "",
      testNginx: "",
      mysql: "",
    };
  },
  components: {},
  methods: {
    async getmysql() {
      let data = await getmysql();
      this.mysql = data;
    },
    async node() {
      let data = await testNginx();
      this.testNginx = data;
      console.log(data);
    },
    async download() {
      let data = await download({ url: "" });
      console.log(123, data);
      // 创建blob对象，解析流数据
      const blob = new Blob([data], {
        // 如何后端没返回下载文件类型，则需要手动设置：type: 'application/pdf;chartset=UTF-8' 表示下载文档为pdf，如果是word则设置为msword，excel为excel
        type: "application/pdf;chartset=UTF-8",
      });
      const a = document.createElement("a");
      // 兼容webkix浏览器，处理webkit浏览器中href自动添加blob前缀，默认在浏览器打开而不是下载
      const URL = window.URL || window.webkitURL;
      // 根据解析后的blob对象创建URL 对象
      const herf = URL.createObjectURL(blob);
      // 下载链接
      a.href = herf;
      // 下载文件名,如果后端没有返回，可以自己写a.download = '文件.pdf'
      a.download = "前端开发-刘成龙-19963465520.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // 在内存中移除URL 对象
      window.URL.revokeObjectURL(herf);
    },
    httpRequestwear(params) {
      // console.log(123457, params);
      let fd = new FormData();
      fd.append("file", params.file);
      userUploadLogo(fd)
        .then((res) => {
          console.log(res);
          // if (res.code == 200) {
          //   if (res.msg == 0) {
          //     this.$message.error("文件内容不符合要求!");
          //     return;
          //   }
          //   console.log(res);
          //   this.resMsg = res.msg;
          //   this.next();
          // }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    beforeAvatarUpload(file) {
      // const isXlS =
      //   file.type ===
      //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      //   file.type === "application/vnd.ms-excel";
      // //   const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isXlS) {
      //   this.$message.error("仅支持xls、xlsx格式的文件!");
      // }
      // //   if (!isLt2M) {
      // //     this.$message.error("上传头像图片大小不能超过 2MB!");
      // //   }
      // this.filename = file.name;
      // return isXlS;
    },
    handleAvatarSuccess(res, file) {
      //   console.log(res, file);
      this.next();
      //   this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess(res, file) {
      //   console.log(res, file);
      this.next();
      //   this.imageUrl = URL.createObjectURL(file.raw);
    },
    async reg() {
      let data = await register(this.initQuery);
      console.log(data);
    },
    async login() {
      let data = await login(this.initQuery);
      console.log(data);
      sessionStorage.setItem("token", `Bearer ${data.token}`);
    },
    async clear() {
      let { haha } = await getUserInfo();
      this.userInfo = haha;
      console.log("个人信息", haha[0]);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 500px;
}
</style>
