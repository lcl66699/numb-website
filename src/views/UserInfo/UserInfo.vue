<template>
  <div class="user_box">
    <div class="card">
      <div class="UserCoverGuide">
        <img src="@/assets/images/bg1.jpg" alt="" />
        <el-button @click="download" class="edit_top"><i class="el-icon-download"></i> 下载我的简历</el-button>
      </div>
      <div class="user_info" :class="noEdit?'':'edit_box'">
        <el-upload class="user_img" action="#" :http-request="httpRequestwear" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <div class="hidden_info">
            <i class="el-icon-camera-solid"></i>
            <p>修改我的头像</p>
          </div>
          <img :src="initQuery.userlogo" class="uploadImg">
          <!-- <span v-else>
            <i class="el-icon-camera-solid avatar-uploader-icon"></i>
          </span> -->
        </el-upload>

        <el-row class="info_txt">
          <el-col class="username" :span="24">
            <span v-if="noEdit">{{initQuery.username?initQuery.username:'-'}}</span>
            <el-input v-else v-model="initQuery.username" />
          </el-col>
          <el-col class="info_left" :span="7">居住地</el-col>
          <el-col :span="17">
            <span v-if="noEdit">{{initQuery.address?initQuery.address:'地球村'}}</span>
            <el-input v-else v-model="initQuery.address" />
          </el-col>
          <el-col class="info_left" :span="7">个人简介</el-col>
          <el-col :span="17">
            <span v-if="noEdit">{{initQuery.resume?initQuery.resume:'用一段话介绍自己吧'}}</span>
            <span v-else>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="initQuery.resume" />
            </span>
          </el-col>
          <el-col class="info_left" :span="7">
            性别
          </el-col>
          <el-col :span="17">
            <span v-if="noEdit">{{initQuery.gender?initQuery.gender:'未知'}}</span>
            <span v-else>
              <el-radio v-model="initQuery.gender" label="男">男</el-radio>
              <el-radio v-model="initQuery.gender" label="女">女</el-radio>
            </span>
          </el-col>
          <el-col class="info_left" :span="7">邮箱</el-col>
          <el-col :span="17">
            <span v-if="noEdit">
              {{initQuery.email?initQuery.email:'-'}}
            </span>
            <span v-else>
              <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="initQuery.email" />
            </span>
          </el-col>
        </el-row>
        <el-button v-if="noEdit" @click="edit" class="edit_css">编辑个人资料</el-button>
        <el-button v-if="!noEdit" @click="cancel" class="cancel">取消</el-button>
        <el-button v-if="!noEdit" @click="save" class="save">保存</el-button>
      </div>
    </div>
    <el-row type="flex" class="center_content">
      <el-col :span="17">
        <Center />
        <!-- <div class="loading_more">
          查看更多文章
          <i class="el-icon-caret-right"></i>
        </div> -->
      </el-col>
      <el-col class="right_info" :span="7">
        <Right />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Center from "./Center.vue";
import Right from "./Right.vue";
import { getUserInfo, setUserInfo, userUploadLogo, download } from "@/api";
export default {
  components: { Center, Right },
  data() {
    return {
      // imageUrl: "",
      imageUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.zhimg.com%2F50%2Fv2-b8f57a87ccff572c84bea1c0497f999d_r.jpg&refer=http%3A%2F%2Fpic1.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638435021&t=e4ad708dc3ff346fc6d3d3a97a6c13da",
      noEdit: true,
      initQuery: {
        username: "numb",
        address: "北京市",
        sex: "男",
        info: "说啥呢",
        email: "13245y@qq.com",
      },
      afterObj: {},
    };
  },
  created() {
    this.init();
  },
  methods: {
    async download() {
      let data = await download({ url: "" });
      console.log("blob", data);
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
    async init() {
      let data = await getUserInfo();
      this.initQuery = data;
      console.log(data);
    },
    //上传文件
    async httpRequestwear(params) {
      let fd = new FormData();
      fd.append("file", params.file);
      let data = await userUploadLogo(fd);
      if (data.code == 200) {
        this.$message.success("上传成功！");
      } else {
        this.$message.error("上传失败！");
      }
      this.init();
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (isJPG || isPNG) {
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 1MB!");
        }
        if (isJPG) {
          return isJPG && isLt2M;
        } else {
          return isPNG && isLt2M;
        }
      } else {
        this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!");
      }
    },
    edit() {
      this.noEdit = false;
      this.afterObj = JSON.parse(JSON.stringify(this.initQuery));
    },
    // 更改用户信息1
    async save() {
      let { code, msg } = await setUserInfo(this.initQuery);
      if (code == 200) {
        this.$message({
          message: "修改成功",
          type: "success",
        });
      } else {
        this.$message.error("修改失败," + msg);
      }
      this.noEdit = true;
      this.init();
    },
    cancel() {
      this.noEdit = true;
      this.initQuery = this.afterObj;
    },
  },
};
</script>

<style lang="scss" scoped>
.user_box {
  background: #f6f6f6;
  // background: red;
  min-height: 100vh;
  padding-top: 10px;
  .card {
    width: 1200px;
    margin: 0 auto;
    background: #fff;
    border-radius: 5px;
    .UserCoverGuide {
      width: 100%;
      height: 100%;
      height: 240px;
      overflow: hidden;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      transition: all 0.5s;
      position: relative;
      img {
        border-radius: 10px;
        width: 100%;
        position: absolute;
        left: 0px;
        top: -161px;
        // height: 100%;
      }
      .edit_top {
        position: absolute;
        right: 20px;
        top: 20px;
      }
    }
    .UserCoverGuide:hover {
      height: 400px;
      transition: all 0.5s;
    }
    .user_info {
      padding: 20px;
      display: flex;
      // justify-content: space-between;
      // align-items: center;
      position: relative;
      .user_img {
        width: 160px;
        height: 160px;
        border-radius: 8px;
        background: #fff;
        position: absolute;
        top: -25px;
        border: 4px solid #fff;
        .uploadImg {
          width: 160px;
          height: 160px;
        }
        .hidden_info {
          width: 160px;
          height: 160px;
          position: absolute;
          z-index: 5;
          color: #fff;
          text-align: center;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          font-size: 15px;
          visibility: hidden;
          p {
            padding-top: 20px;
          }
          .el-icon-camera-solid {
            font-size: 40px;
          }
        }
      }
      .user_img :hover .hidden_info {
        visibility: visible;
      }
      .info_txt {
        margin-left: 200px;
        color: #121212;
        line-height: 28px;
        font-size: 14px;
        .username {
          line-height: 30px;
          margin-bottom: 16px;
          font-size: 26px;
          font-weight: 600;
        }
        .info_left {
          font-weight: 600;
        }
      }
      .edit_css,
      .cancel,
      .save {
        position: absolute;
        bottom: 5px;
      }
      .edit_css {
        right: 20px;
      }
      .save {
        right: 20px;
      }
      .cancel {
        right: 100px;
      }
    }
    .edit_box {
      padding-bottom: 50px;
    }
  }
  .center_content {
    width: 1200px;
    margin: 0 auto;
    margin-top: 12px;
    .right_info {
      margin-left: 12px;
    }
    .loading_more {
      width: 100%;
      height: 50px;
      background-color: white;
      margin: 30px 0;
      color: #0a7ee5;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-size: 16px;
      border-radius: 5px;
      i {
        font-size: 24px;
      }
    }
  }
}
</style>

<style lang="scss" >
.user_box {
  .el-input,
  .el-textarea,
  .el-radio {
    padding-bottom: 30px;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #fff;
  width: 160px;
  height: 160px;
  line-height: 160px;
  text-align: center;
}
</style>