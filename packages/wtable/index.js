import wTable from './src/index';

/* istanbul ignore next */
wTable.install = function(Vue) {
  Vue.component(wTable.name, wTable);
};

export default wTable;
