import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default {
  install(Vue, options) {
    /**
     * 
     * @param {*} reportName 下载时候的标题
     * @param {*} isDownload  是否下载默认为下载，传false不下载
     */
    Vue.prototype.getPdf = function (reportName, isDownload = true) {
      //     var target = document.getElementsByClassName("right-aside")[0];
      // target.style.background = "#FFFFFF";
      return new Promise((resolve, reject) => {
        var title = reportName;
        html2Canvas(document.querySelector('#pdfDom'), {
          allowTaint: true
        }).then((canvas) => {
          let contentWidth = canvas.width
          let contentHeight = canvas.height
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 592.28 * 841.89
          //未生成pdf的html页面高度
          let leftHeight = contentHeight
          //页面偏移
          let position = 0
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              //避免添加空白页
              if (leftHeight > 0) {
                PDF.addPage()
              }
            }
          }
          if (isDownload) {
            PDF.save(title + '.pdf')
          }
          var pdfData = PDF.output('datauristring')//获取base64Pdf
          resolve(pdfData)
        }
        )
          .catch((err) => {
            reject(err)
          })
      })
    }

    Vue.prototype.getImg = function (reportName, isDownload = true) {
      return new Promise((resolve, reject) => {
        // 注意：  allowTaint: true  和 useCORS: true 不能同时设置，两者只有一个起作用
        let htmlDom = document.querySelector('#pdfDom')
        html2Canvas(htmlDom, {
          allowTaint: false,   //允许污染
          taintTest: true,    //在渲染前测试图片(没整明白有啥用)
          useCORS: true,      //使用跨域(当allowTaint为true时这段代码没什么用,下面解释)
          background: "#fff",
        }).then(function (canvas) {
          //回调内容
          var imgBlob = canvas.toDataURL('image/png', 1.0);    //将图片转为base64
          resolve(imgBlob)
        })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}