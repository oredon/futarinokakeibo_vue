/*
  エントリーポイントとなるJSファイル
 */

import Vue from 'vue'
import router from './router'
import App from './App.vue'                     // router-viewを含むトップレベルのコンテナ
import Store from './store/index'               // VuexのStore

// filter定義
Vue.filter('dateFormat', function (value) {
  if (!value) return "";
  return value.substr(0,4) + "/" + value.substr(4,2);
})
Vue.filter('priceFormat', function (value) {
  if (!value) return "0";
  return value.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');
})

// アプリケーションのマウント
new Vue({
  el: '#app',
  store: Store,
  router: router,
  render: h => h(App)
})
