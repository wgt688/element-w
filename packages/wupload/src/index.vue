<template>
    <div style="position: relative;" :style="blockStyle" >
      <!-- 默认没有图片选择 || !fileAddress[uploadName]!='' -->
      <div class="upload_block" v-if="urls=='' && fileAddress[uploadName]==''">
        <slot></slot>
        <i class=" el-icon-plus"></i>
        <input class="file" type="file" style="z-index:9999" multiple="multiple" :accept="openWindowType" @change="uploadFile(uploadName)" />
      </div>
      <!-- 有图片 -->
      <div class="upload_blocks" v-viewer="{movable: false}" @mouseover="blocksHover=true" @mouseout="blocksHover=false" :style="blockStyle" v-else>
        <viewer style="width:100%;height:100%;overflow:hidden">
          <div class="blocks_hover" v-show="blocksHover">
            <i class="el-icon-download" @click="Download"></i>
            <i class="el-icon-zoom-in" @click="viewers"></i>         
            <i v-if="!banUpload" class="el-icon-delete" @click="Delete"></i>
          </div>
          <img class="images" style="width:100%;height: auto" :src="urls" :id="uploadName" />
        </viewer>
      </div>
      <div v-if="buttomStyle.show" style="display:flex;width:100%;display: flex;justify-content: center;">
        <div style="position: relative;"  :style="{width:buttomStyle.width,height:buttomStyle.height,marginTop:buttomStyle.top}">
          <el-button :disabled="banUpload" :style="{width:buttomStyle.width,height:buttomStyle.height,marginTop:buttomStyle.top}" :type="buttomStyle.type">{{buttomStyle.title}}</el-button>
          <input class="files" type="file" style="z-index:9999" :style="{marginTop:buttomStyle.top}" multiple="multiple" :accept="openWindowType" @change="uploadFile(uploadName)" />
        </div>
      </div>
    </div>
</template>

<script>
// import 'viewerjs/dist/viewer.css'
// import Viewer from 'v-viewer'
// import Vue from 'vue'
// Vue.use(Viewer)
export default {
  name: "wUpload",
  props: {
    // 组件高宽
    blockStyle: {
      default:()=>{
        return { 
          width: "150px",
          height: "150px",
          }
        },
      type: Object
    },
    buttomStyle:{
      default:()=>{
        return {
          width:'',
          height:'',
          top:'',
          show:false,
          title:'点击上传图片',
          type:'success'
        }
      },
      type:Object
    },
    // 展示图片链接B64
    banUpload:{
      default:true,
      type:Boolean
    },
    url: {      
      default: '',
      type: String
    },
    //图片导出b64还是file
    // 绑定的组件名
    uploadName: {
      default: "",
      type: String
    },
    // 传进去的对象
    fileValue: {
      default: {},
      type: Object
    },
    // 按钮
    Buttom: {
      default:()=>{},
      type: Object
    },
    // 上传时判断图片类型
    imgTyoe: {
      default: "image/gif, image/jpeg, image/png, image/jpg",
      type: String
    },
    // 打开上传时选择图片类型
    openWindowType:{
      default: 'image/gif, image/jpeg, image/png, image/jpg',
      type: String
    },
    // 限制上传图片大小
    imgSize: {
      default: '3145728',
      type: String
    },

  },
  data() {
    // console.log('我是data啊哈哈哈哈哈哈哈参透了')
    return {
      urls:this.url,
      blocksHover:false
    };
  },
  mounted(){
    // console.log(this.imgSize.split(0,1))
  },
  //基本函数
  computed: {
    //计算方法
  },
  watch: {
    //监听方法
  },
  methods: {
    viewers(){
     const viewer = this.$el.querySelector('.upload_blocks').$viewer
      viewer.show()
    },
      // 下载icon -> 打开新页面
      Download(){
        const img = new Image();
        img.src = document.getElementById(this.uploadName).src;
        const newWin = window.open("", "_blank");
        newWin.document.write(img.outerHTML);
        newWin.document.close();
      },
      // 删除当前图片
      Delete(){
        this.urls = ''
        this.fileAddress[this.uploadName] = ''
        document.getElementById(this.uploadName).src = ''
      },
      //全局方法
      uploadFile(val) {
        if(this.banUpload) return;
        const file = event.target.files[0];
        if(file.type){
          if (this.imgTyoe.indexOf(file.type) == -1) {
            this.$message.error("支持格式"+this.imgTyoe)
            return false;
          }
          if (file.size > this.imgSize) {
            this.$message.error("请选择"+this.imgSize.slice(0,1)+"M以内的图片！");
            return false;
          }
          this.fileAddress[val] = file;
          const reader = new FileReader();
          this.urls = '因为我下面的图片是操作的dom不是数据渲染的 这个组件判断没值是不会执行点击打开图片预览功能的 所以这里随便加'
          reader.onload = value => {
            document.getElementById(val).src = reader.result;
          };
          reader.readAsDataURL(file);
      }else{
        this.$message.error('请上传图片')
      }
    }
  }
};
</script>
<style lang="scss" scoped>

.fileParent {
  position: relative;
  margin-top: 10px;
}
.file {
  position: absolute;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
}
.files {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  left: 0px;
}
.upload_block {
  background: #fff;
  border-radius: 5px;
  // padding: 10px;
  width: 100%;
  height: 100%;
  border: 1px dashed #ddd;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  font-size: 2vw;
}
.upload_blocks {
  // background: #fff;
  border-radius: 5px;
  border: 1px solid#c0ccda;
  // padding: 10px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  font-size: 2vw;
}
.blocks_hover{
  width:100%;
  height:100%;
  opacity: 0.7;
  background: #000;
  z-index:999;
  position: absolute;
  color:#fff;
  font-size:23px;
  color: rgb(255, 255, 255);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

// .upload_blocks:hover{
//   opacity: 0.5;
//   background: #000;
//   // color: #ffffff;
// }
input.file {
  width: 100%;
  height: 100%;
  display: block;
  opacity: 0;
  position: absolute;
  top: 0px;
}
.title {
  width: 100%;
  border-left: 5px solid#4685fd;
  height: 15px;
  color: #333;
  margin-right: 10px;
  padding-left: 10px;
  font-weight: bold;
  margin-bottom: 30px;
}
::v-deep  .el-drawer.rtl.demo-drawer {
  overflow-y: auto;
}
.el-drawer.rtl.demo-drawer {
  overflow-y: auto;
}
</style>