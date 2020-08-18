import wUpload from './src/index';

/* istanbul ignore next */
wUpload.install = function(Vue) {
  Vue.component(wUpload.name, wUpload);
};

export default wUpload;
