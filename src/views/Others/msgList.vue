<template>
  <div class="msg_box">
    <div class="wantConsult">
      <div class="wrap_mar">
        <div class="wantConsult_btm clear">
          <div class="wantConsult_btm_right fr1">
            <el-form :rules="rules" ref="msgform" class="msg_form fl1" :model="initQuery" label-width="80px">
              <el-form-item label="昵称" prop="username">
                <el-input clearable id="mobile" maxlength="20" placeholder="请输入您的昵称" v-model="initQuery.username"></el-input>
              </el-form-item>
              <el-form-item label="QQ/email" prop="email">
                <el-input clearable id="mobile" maxlength="30" placeholder="请输入QQ或email" v-model="initQuery.email"></el-input>
              </el-form-item>
              <el-form-item label="留言内容" prop="msg">
                <!-- <el-input type="textarea" id="areaCont" cols="30" rows="10" placeholder="请输入内容" v-model="initQuery.msg"></el-input> -->
                <div ref="msg_div" v-html="initQuery.msg" class="message" contentEditable='true'></div>
              </el-form-item>
              <el-form-item label="">
                <img src="@/assets/images/msgImgs/bba_thumb.gif" class='bq' />
                <div class="face">
                  <ul @click="ckickFace">
                    <li><img src="@/assets/images/msgImgs/smilea_thumb.gif" title="呵呵]"></li>
                    <li><img src="data:image/gif;base64,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" title="嘻嘻]"></li>
                    <li><img src="@/assets/images/msgImgs/laugh.gif" title="[哈哈]"></li>
                    <li><img src="@/assets/images/msgImgs/tza_thumb.gif" title="[可爱]"></li>
                    <li><img src="@/assets/images/msgImgs/kl_thumb.gif" title="[可怜]"></li>
                    <li><img src="@/assets/images/msgImgs/kbsa_thumb.gif" title="[挖鼻屎]"></li>
                    <li><img src="@/assets/images/msgImgs/cj_thumb.gif" title="[吃惊]"></li>
                    <li><img src="@/assets/images/msgImgs/haixiu.gif" title="[害羞]" /></li>
                    <li><img src="@/assets/images/msgImgs/zy_thumb.gif" title="[挤眼]" /></li>
                    <li><img src="@/assets/images/msgImgs/bz_thumb.gif" title="[闭嘴]" /></li>
                    <li><img src="@/assets/images/msgImgs/bs2_thumb.gif" title="[鄙视]" /></li>
                    <li><img src="@/assets/images/msgImgs/lovea_thumb.gif" title="[爱你]"></li>
                    <li><img src="@/assets/images/msgImgs/sada_thumb.gif" title="[泪]"></li>
                    <li><img src="@/assets/images/msgImgs/heia_thumb.gif" title="[偷笑]"></li>
                    <li><img src="@/assets/images/msgImgs/qq_thumb.gif" title="[亲亲]"></li>
                    <li><img src="@/assets/images/msgImgs/sb_thumb.gif" title="[生病]"></li>
                    <li><img src="@/assets/images/msgImgs/mb_thumb.gif" title="[太开心]"></li>
                    <li><img src="@/assets/images/msgImgs/ldln_thumb.gif" title="[懒得理你]"></li>
                    <li><img src="@/assets/images/msgImgs/yhh_thumb.gif" title="[右哼哼]"></li>
                    <li><img src="@/assets/images/msgImgs/zhh_thumb.gif" title="[左哼哼]"></li>
                    <li><img src="@/assets/images/msgImgs/x_thumb.gif" title="[嘘]"></li>
                    <li><img src="@/assets/images/msgImgs/cry.gif" title="[衰]"></li>
                    <li><img src="@/assets/images/msgImgs/wq_thumb.gif" title="[委屈]"></li>
                    <li><img src="@/assets/images/msgImgs/t_thumb.gif" title="[吐]"></li>
                    <li><img src="@/assets/images/msgImgs/k_thumb.gif" title="[打哈气]"></li>
                    <li><img src="@/assets/images/msgImgs/bba_thumb.gif" title="[抱抱]"></li>
                    <li><img src="@/assets/images/msgImgs/angrya_thumb.gif" title="[怒]"></li>
                    <li><img src="@/assets/images/msgImgs/yw_thumb.gif" title="[疑问]"></li>
                    <li><img src="@/assets/images/msgImgs/cza_thumb.gif" title="[馋嘴]"></li>
                    <li><img src="@/assets/images/msgImgs/88_thumb.gif" title="[拜拜]"></li>
                    <li><img src="@/assets/images/msgImgs/sk_thumb.gif" title="[思考]"></li>
                    <li><img src="@/assets/images/msgImgs/sweata_thumb.gif" title="[汗]"></li>
                    <li><img src="@/assets/images/msgImgs/sleepya_thumb.gif" title="[困]"></li>
                    <li><img src="@/assets/images/msgImgs/sleepa_thumb.gif" title="[睡觉]"></li>
                    <li><img src="@/assets/images/msgImgs/money_thumb.gif" title="[钱]"></li>
                    <li><img src="@/assets/images/msgImgs/sw_thumb.gif" title="[失望]"></li>
                    <li><img src="@/assets/images/msgImgs/cool_thumb.gif" title="[酷]"></li>
                    <li><img src="@/assets/images/msgImgs/hsa_thumb.gif" title="[花心]"></li>
                    <li><img src="@/assets/images/msgImgs/hatea_thumb.gif" title="[哼]"></li>
                    <li><img src="@/assets/images/msgImgs/gza_thumb.gif" title="[鼓掌]"></li>
                    <li><img src="@/assets/images/msgImgs/dizzya_thumb.gif" title="[晕]"></li>
                    <li><img src="@/assets/images/msgImgs/bs_thumb.gif" title="[悲伤]"></li>
                    <li><img src="@/assets/images/msgImgs/crazya_thumb.gif" title="[抓狂]"></li>
                    <li><img src="@/assets/images/msgImgs/h_thumb.gif" title="[黑线]"></li>
                    <li><img src="@/assets/images/msgImgs/yx_thumb.gif" title="[阴险]"></li>
                    <li><img src="@/assets/images/msgImgs/nm_thumb.gif" title="[怒骂]"></li>
                    <li><img src="@/assets/images/msgImgs/hearta_thumb.gif" title="[心]"></li>
                    <li><img src="@/assets/images/msgImgs/unheart.gif" title="[伤心]"></li>
                    <li><img src="@/assets/images/msgImgs/pig.gif" title="[猪头]"></li>
                    <li><img src="@/assets/images/msgImgs/ok_thumb.gif" title="[ok]"></li>
                    <li><img src="@/assets/images/msgImgs/ye_thumb.gif" title="[耶]"></li>
                    <li><img src="@/assets/images/msgImgs/good_thumb.gif" title="[good]"></li>
                    <li><img src="@/assets/images/msgImgs/no_thumb.gif" title="[不要]"></li>
                    <li><img src="@/assets/images/msgImgs/z2_thumb.gif" title="[赞]"></li>
                    <li><img src="@/assets/images/msgImgs/come_thumb.gif" title="[来]"></li>
                    <li><img src="@/assets/images/msgImgs/sad_thumb.gif" title="[弱]"></li>
                    <li><img src="@/assets/images/msgImgs/lazu_thumb.gif" title="[蜡烛]"></li>
                    <li><img src="@/assets/images/msgImgs/clock_thumb.gif" title="[钟]"></li>
                    <li><img src="@/assets/images/msgImgs/cake.gif" title="[蛋糕]"></li>
                    <li><img src="@/assets/images/msgImgs/m_thumb.gif" title="[话筒]"></li>
                    <li><img src="@/assets/images/msgImgs/weijin_thumb.gif" title="[围脖]"></li>
                    <li><img src="@/assets/images/msgImgs/lxhzhuanfa_thumb.gif" title="[转发]"></li>
                    <li><img src="@/assets/images/msgImgs/lxhluguo_thumb.gif" title="[路过这儿]"></li>
                    <li><img src="@/assets/images/msgImgs/bofubianlian_thumb.gif" title="[bofu变脸]"></li>
                    <li><img src="@/assets/images/msgImgs/gbzkun_thumb.gif" title="[gbz困]"></li>
                    <li><img src="@/assets/images/msgImgs/boboshengmenqi_thumb.gif" title="[生闷气]"></li>
                    <li><img src="@/assets/images/msgImgs/chn_buyaoya_thumb.gif" title="[不要啊]"></li>
                    <li><img src="@/assets/images/msgImgs/daxiongleibenxiong_thumb.gif" title="[dx泪奔]"></li>
                    <li><img src="@/assets/images/msgImgs/cat_yunqizhong_thumb.gif" title="[运气中]"></li>
                    <li><img src="@/assets/images/msgImgs/youqian_thumb.gif" title="[有钱]"></li>
                  </ul>
                </div>
              </el-form-item>
              <p class="sub_ziXun">
                <input v-loading='loading' id="tijiaoliuyan" class="btn" type="button" :value="loading?'留言中...':'提交留言'" @click="submit" />
              </p>
            </el-form>
            <div class="select_yixiang fr1">
              <p class="ninTitle">您可以根据意向选择内容 <em>[快捷留言]</em></p>
              <ul @click="eventRight">
                <li>过来看看~</li>
                <li>瓜村村长,你好 </li>
                <li>没事,我溜达 </li>
                <li>hia嘿,我是老八 </li>
                <!-- <li><a href="javascript:void(0)" title="想了解的加盟流程，请与我联系！">想了解的加盟流程，请与我联系！</a></li>
                <li><a href="javascript:void(0)" title="做为的代理加盟商能得到哪些支持？">做为的代理加盟商能得到哪些支持？</a></li>
                <li><a href="javascript:void(0)" title="请问投资所需要的费用有哪些？">请问投资所需要的费用有哪些？</a></li>
                <li><a href="javascript:void(0)" title="我想加盟，请电话联系我。">我想加盟，请电话联系我。</a></li>
                <li><a href="javascript:void(0)" title="加盟，有什么优惠？">加盟，有什么优惠？</a></li> -->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>

      <div v-loading='listLoading' class="msgCon">
        <div v-for="(item,index) in msgList" :key="index" class='msgBox'>
          <div class="headUrl">
            <img src='@/assets/images/msgImgs/tx.jpg' width='50' height='50'>
            <div>
              <span class="title">{{item.username?item.username:'-'}}</span>
              <span class="time">{{item.createTime?handTimer(item.createTime):'-'}}</span>
            </div>
            <!-- <a class="del">删除</a> -->
            <span v-show="item.email" class="email_css">QQ/email : {{item.email}}</span>
          </div>
          <div v-html="item.msg" class='msgTxt'>
          </div>
        </div>
        <div class="my_pagination">
          <el-pagination v-show="total>0" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import $ from "./js/jquery-1.10.2.min.js";
import { insertMsg, searchMsglist } from "@/api";
export default {
  data() {
    const equalMsg = (rule, value, callback) => {
      callback();
    };
    return {
      count: 0,
      loading: false,
      listLoading: false,
      msgList: [],
      initQuery: {
        username: "",
        email: "",
        msg: ``,
      },
      rules: {
        username: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入QQ或email", trigger: "blur" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "blur",
          },
        ],
        msg: [
          { required: true, message: "请输入留言内容", trigger: "blur" },
          { required: true, validator: equalMsg, trigger: "blur" },
        ],
      },
      getQuery: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  mounted() {
    this.init();
    //从缓存中获取数据并渲染
    // let msgBoxList =
    //   JSON.parse(window.localStorage.getItem("msgBoxList")) || [];
    // innerHTMl(msgBoxList);

    //点击小图片，显示表情
    $(".bq").click(function (e) {
      $(".face").slideDown(); //慢慢向下展开
      e.stopPropagation(); //阻止冒泡事件
    });

    //在桌面任意地方点击，关闭表情框
    $(document).click(function () {
      $(".face").slideUp(); //慢慢向上收
    });

    //点击小图标时，添加功能
    $(".face ul li").click(function () {
      let simg = $(this).find("img").clone();
      $(".message").append(simg); //将表情添加到输入框
    });

    //点击发表按扭，发表内容
    $("span.submit").click(function () {
      //   let txt = $(".message").html(); //获取输入框内容
      //   if (!txt) {
      //     $(".message").focus(); //自动获取焦点
      //     return;
      //   }
      //   let obj = {
      //     msg: txt,
      //   };
      //   msgBoxList.unshift(obj); //添加到数组里
      //   window.localStorage.setItem("msgBoxList", JSON.stringify(msgBoxList)); //将数据保存到缓存
      //   innerHTMl([obj]); //渲染当前输入框内容
      //   $(".message").html(""); // 清空输入框
    });

    //删除当前数据
    // $("body").on("click", ".del", function () {
    //   let index = $(this).parent().parent().index();
    //   msgBoxList.splice(index, 1);
    //   window.localStorage.setItem("msgBoxList", JSON.stringify(msgBoxList)); //将数据保存到缓存
    //   $(this).parent().parent().remove();
    // });

    //渲染html
    // function innerHTMl(List) {
    //   List = List || [];
    //   List.forEach((item) => {
    //     let str = `<div class='msgBox'>
    // 				<div class="headUrl">
    // 					<img src='images/tx.jpg' width='50' height='50'>
    // 					<div>
    // 						<span class="title">木林森里没有木</span>
    // 						<span class="time">2018-01-01</span>
    // 					</div>
    // 					<a class="del">删除</a>
    // 				</div>
    // 				<div class='msgTxt'>
    // 					${item.msg}
    // 				</div>
    // 			</div>`;
    //     $(".msgCon").prepend(str);
    //   });
    // }
  },
  methods: {
    async handleCurrentChange(val) {
      this.getQuery.pageNum = val;
      await this.init();
      scrollTo(0, 200);
    },
    load() {
      this.count += 2;
    },
    handTimer(thisTime) {
      if (!thisTime) return "-";
      thisTime = thisTime.replace(/-/g, "/");
      let time = new Date(thisTime);
      return this.formatTime(time.getTime());
    },
    //列表
    async init() {
      this.listLoading = true;
      let { data, total } = await searchMsglist(this.getQuery);
      this.listLoading = false;
      this.msgList = data || [];
      this.total = total;
      console.log(total, data);
    },
    //事件委托,点击右侧增加文字
    eventRight(e) {
      const target = e.target;
      if (target.tagName.toLowerCase() == "li") {
        this.initQuery.msg += target.innerHTML;
      }
    },
    ckickFace(e) {
      //   this.initQuery.msg += e.target;
    },

    delay(time) {
      return new Promise((res, rej) => {
        setTimeout(res, time);
      });
    },
    submit() {
      this.initQuery.msg = this.$refs.msg_div.innerHTML;
      this.$refs["msgform"].validate(async (valid) => {
        if (valid) {
          this.loading = true;
          await this.delay(1000);
          let { code } = await insertMsg(this.initQuery);
          if (code == 200) {
            this.$message({
              message: "留言成功",
              type: "success",
            });
          } else {
            this.$message({
              message: "留言失败",
              type: "error",
            });
          }
          this.loading = false;
          this.init();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.msg_box {
  background: url("~@/assets/images/msgImgs/bg.jpg") no-repeat fixed;
  min-height: 100vh;
  height: 100%;
  margin: 0px;
  padding: 0px;
  padding: 50px 0;
  #qq {
    width: 600px;
    /*宽*/
    height: 170px;
    /*高*/
    background: #fff;
    /*背景颜色*/
    margin: 50px auto 30px;
    margin-top: 0;

    border-radius: 5px;
    /*Html5 圆角*/
  }

  #qq p {
    font-size: 12px;
    color: #666;
    font-family: "微软雅黑";
    line-height: 45px;
    text-indent: 20px;
  }

  .message {
    // width: 560px;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
    // outlborder-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: block;
    font-size: inherit;
    line-height: 22px;
    outline: 0;
    border-radius: 4px;
    padding: 8px;
    background: #fff;
    /*粗细 风格 颜色*/
  }

  #qq .But {
    width: 560px;
    height: 35px;
    margin: 15px auto 0px;
    position: relative;
    /*相对，参考对象*/
  }

  #qq .But img.bq {
    cursor: pointer;
    float: left;
    /*左浮动*/
  }

  #qq .But span.submit {
    width: 80px;
    height: 30px;
    background: #ff8140;
    display: block;
    float: right;
    /*右浮动*/
    line-height: 30px;
    border-radius: 5px;
    cursor: pointer;
    /*手指*/
    color: #fff;
    font-size: 12px;
    text-align: center;
    font-family: "微软雅黑";
  }

  /*face begin*/
  #qq .But .face {
    width: 440px;
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 0 12px #111;
    position: absolute;
    /*绝对定位*/
    top: 21px;
    left: 15px;
    display: none;
    /*隐藏*/
  }

  #qq .But .face ul {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    box-sizing: border-box;
  }

  #qq .But .face ul li {
    width: 30px;
    height: 30px;
    list-style-type: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /*msgCon begin*/
  .msgCon {
    width: 920px;
    margin: 0px auto;
    // margin-bottom: 60px;
  }

  .msgCon .msgBox {
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin-top: 16px;
    border-radius: 4px;
  }

  .msgCon .msgBox .headUrl {
    width: 100%;
    height: 60px;
    border-bottom: 1px dotted #ddd;
    display: flex;
    align-items: center;
  }

  .msgCon .msgBox .headUrl img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }

  .msgCon .msgBox .headUrl div {
    flex: 1;
    display: flex;
    flex-flow: column;
    font-size: 16px;
    margin-left: 16px;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to top, #b224ef 0%, #7579ff 100%);
  }

  .msgCon .msgBox .headUrl div .time {
    font-size: 14px;
    margin-top: 14px;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
  }

  .msgCon .msgBox .headUrl a {
    font-size: 14px;
    padding: 10px;
    color: salmon;
    cursor: pointer;
  }

  .msgCon .msgBox .msgTxt {
    font-size: 14px;
    color: #666;
    min-height: 40px;
    line-height: 24px;
    padding: 10px;
    box-sizing: border-box;
    word-wrap: break-word;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(to right, #778899 0%, #333 100%);
  }
}
</style>

<style scoped>
.btn {
  cursor: pointer;
}
/* 浮动 */
.clear {
  zoom: 1;
  clear: both;
}
.clear:after {
  content: "";
  clear: both;
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
}
.fl1 {
  float: left;
  display: inline;
}
.fr1 {
  float: right;
  display: inline;
}

.wrap_mar {
  width: 1200px;
  margin: auto;
}

.wantConsult_btm {
  /* height: 450px; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  /* overflow: hidden; */
  /* margin-bottom: 30px; */
}
.wantConsult_btm_right {
  width: 919px;
  /* height: 450px; */
  /* background: url("../images/sixpage2.png") no-repeat; */
}
.wantConsult_btm_right .msg_form {
  background: rgba(255, 255, 255, 0.8);
  width: 540px;
  padding: 20px;
  border-radius: 5px;
}

.sub_ziXun {
  /* margin: 50px 0; */
  height: 50px;
  text-align: center;
}
.sub_ziXun input {
  border-color: #06f;
  font-size: 14px;
  background: #10aeb5;
  width: 200px;
  height: 50px;
  width: 100%;
  font-size: 18px;
  color: #fff;
  border-radius: 5px;
  border: none;
  outline: none;
}

.ninTitle {
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  font-weight: bold;
  color: #fff;
  padding-left: 18px;
  background: #10aeb5;
  margin-bottom: 5px;
  border-radius: 5px 5px 0 0;
}
.ninTitle em {
  color: #f02c2c;
}
.select_yixiang {
  width: 310px;
  height: 330px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 5px;
  position: relative;
}
.select_yixiang li {
  height: 32px;
  line-height: 32px;
  font-size: 13px;
  color: #666666;
  margin-left: 18px;
  margin-right: 18px;
  padding-left: 12px;
  cursor: pointer;
  overflow: hidden;
  border-bottom: dashed 1px #999999;
}
.select_yixiang li:hover {
  /* color: #10aeb5 !important; */
  text-decoration: underline;
}
.select_yixiang li a {
  color: #606266;
}

.bq {
  cursor: pointer;
}
.face {
  cursor: pointer;
  width: 440px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px #eee;
  position: absolute;
  /*绝对定位*/
  top: 21px;
  left: 15px;
  display: none;
  z-index: 666;
  /*隐藏*/
}

.face ul {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  box-sizing: border-box;
}

.face ul li {
  width: 30px;
  height: 30px;
  list-style-type: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
.email_css {
  font-size: 14px;
  color: #606266;
}
</style>
<style >
.my_pagination {
  display: inline-block;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>