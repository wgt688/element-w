import Vue from 'vue'
import wDialog from '../packages/wdialog/index.js';
import wSelect from '../packages/wselect/index.js';
import wTable from '../packages/wtable/index.js';
import wUpload from '../packages/wupload/index.js';
// import * as wg from './Count.js'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// 图片放大组件 在这里没法全局注册
// Vue.use(Viewer);
// Viewer.setDefaults({
//   Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
// });

import wg from './Count.js'
window.wg = wg
import dialogConfig from './dialogConfig.js';
const components = [
	wDialog,wSelect,wTable,wUpload
];

const install = function(Vue) {
  // 判断是否安装
  if (install.installed) return;
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  });
};

 Vue.prototype.$myName = 'by Wgt';
 Vue.prototype.$dialogConfig = dialogConfig;

// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
	install,
	wDialog,
	wSelect,
	wTable,
  wUpload
}