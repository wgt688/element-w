 const Dialog = {
    title: "",           //弹窗title
    show: false,         //弹窗开启关闭
    componentSelect: "", //组件名 直接传组件自动化处理功力不够暂未实现
    width: "50%",        //弹窗宽度  
    top: "8vh",          //弹窗top高度
    isShowFooter: true,  //是否隐藏弹窗底部按钮 [取消 | 保存]
    height:"800px",      //弹窗高度
    footerTitle: { btn1: "保 存", btn2: "取 消" }, //弹窗底部按钮自定义
    parentFun: '',      //父级组件方法   保存功能将调用本页面的方法
    childrenFun: '',    //子级组件方法   保存功能将调用引用组件内的方法
  }
export default Dialog