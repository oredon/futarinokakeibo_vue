import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

// router設定
// chunk分割しない
import Monthly from './components/Monthly.vue'  // routerのpathの応じて切り替えるコンテナ（月別データ）
import Edit from './components/Edit.vue'        // routerのpathの応じて切り替えるコンテナ（新規作成・編集）
import Yearly from './components/Yearly.vue'    // routerのpathの応じて切り替えるコンテナ（年間支出データ）
var routes = [
  { path: '/', component: Monthly },
  { path: '/monthly/:yearmonth', component: Monthly },
  { path: '/edit/', component: Edit },
  { path: '/edit/:id', component: Edit },
  { path: '/yearly/:year', component: Yearly }
];

////chunk分割する webpack.config.js側の変更も忘れずに
//var routes = [
//  {
//    path: '/',
//    component: resolve => {
//      require.ensure(['./components/Monthly.vue'], () => {
//        resolve(require('./components/Monthly.vue'));
//      }, 'monthly');
//    }
//  },
//  {
//    path: '/monthly/:yearmonth',
//    component: resolve => {
//      require.ensure(['./components/Monthly.vue'], () => {
//        resolve(require('./components/Monthly.vue'));
//      }, 'monthly');
//    }
//  },
//  {
//    path: '/edit/',
//    component: resolve => {
//      require.ensure(['./components/Edit.vue'], () => {
//        resolve(require('./components/Edit.vue'));
//      }, 'edit');
//    }
//  },
//  {
//    path: '/edit/:id',
//    component: resolve => {
//      require.ensure(['./components/Edit.vue'], () => {
//        resolve(require('./components/Edit.vue'));
//      }, 'edit');
//    }
//  },
//  {
//    path: '/yearly/:year',
//    component: resolve => {
//      require.ensure(['./components/Yearly.vue'], () => {
//        resolve(require('./components/Yearly.vue'));
//      }, 'yearly');
//    }
//  }
//];

var router = new VueRouter({
  routes
});

export default router;
