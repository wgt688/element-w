<template>
  <div class="app-container">
    <!-- 弹出框 Start-->
    <!-- // 弹窗的二次封装
    // 想实现的效果只要给组件名大小这些参数就能自动生成弹窗
    // 支持插槽功能 传入插槽true即可使用自己的样式-->
    <!-- :before-close="handleClose" -->
    <el-dialog
      :title="data.title"
      :visible.sync="data.show"
      :width="data.width"
      :style="data.height"
      :top="data.top"
      :before-close="handleClose"
      :close-on-click-modal="data.besidesClose"
      :modal-append-to-body='data.topIndex'
    >
      <slot></slot>
      <div :is="data.componentSelect.default" :parameter="data.parentparameter" ref="current"/>
      <span slot="footer" class="dialog-footer" v-if="data.isShowFooter">
        
        <el-button
          type="default"
          @click="data.show = false,data.componentSelect = ''"
        >{{data.footerTitle.btn2}}</el-button>
        <el-button type="primary" @click="GetData()">{{data.footerTitle.btn1}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  name: "wDialog",
  props: {
    data: {
      default: {
        title: "",            //弹窗title
        show: false,          //弹窗开启关闭
        componentSelect: '',  //组件名
        width: "50%",         //弹窗宽度
        top: "8vh",           //弹窗top高度
        isShowFooter: true,   //是否隐藏弹窗底部按钮 [取消 | 保存]
        height:"800px" ,      //弹窗高度
        footerTitle: { btn1: "保 存", btn2: "取 消" }, //弹窗底部按钮自定义
        parentFun: '',        //父级组件方法   保存功能将调用本页面的方法
        childrenFun: '',      //子级组件方法   保存功能将调用引用组件内的方法
        parentparameter:'',   //父组件传给子组件
        besidesClose:true,    //是否允许点击遮罩关闭
        topIndex:true         //是否将当前弹窗设为最上层
      },
      type: Object
    }
  },
  // data() {
  //   return {
      
  //   };
  // },
  methods: {
    handleClose(){
      this.data.show = false
      this.data.componentSelect = ''
    },
    GetData(){
      let children = this.$refs.current[this.data.childrenFun]()
      this.$parent[this.data.parentFun](children).then((val)=>{
        if(val) this.handleClose()
      })
    },
  }
};
</script>