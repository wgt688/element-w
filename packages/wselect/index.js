import wSelect from './src/index';

/* istanbul ignore next */
wSelect.install = function(Vue) {
  Vue.component(wSelect.name, wSelect);
};

export default wSelect;
