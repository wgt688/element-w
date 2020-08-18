import wDialog from './src/index';

/* istanbul ignore next */
wDialog.install = function(Vue) {
  Vue.component(wDialog.name, wDialog);
};

export default wDialog;
