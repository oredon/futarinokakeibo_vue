<summery>
# 月別データ表示コンテナ

* 各月別データ表示時に使用するコンポーネントを取りまとめるコンテナ
* fetch処理は KkbDataTable コンポーネントで実行
</summery>

<style scoped>
.monthlySelect{
  position: relative;
  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  flex-wrap: nowrap;

  & .older,
  & .newer{
    flex: 0.5;
    margin: 0;
    padding: 0;
  }

  & .older{
    text-align: right;
    margin-right: 10px;
  }

  & .newer{
    text-align: left;
    margin-left: 10px;
  }
}
.icon{
  display: inline-block;
}
</style>

<template>
  <div class="container container-monthly">
    <div class="monthlySelect">
      <p class="older"><router-link :to="'/monthly/' + prevYearMonth"><span class="icon" :class="sprite01['icon-left']"></span>{{prevYearMonth | dateFormat}}</router-link></p>
      <p class="newer"><router-link :to="'/monthly/' + nextYearMonth">{{nextYearMonth | dateFormat}}<span class="icon" :class="sprite01['icon-right']"></span></router-link></p>
    </div>

    <kkb-data-calc></kkb-data-calc>
    <kkb-data-chart></kkb-data-chart>
    <kkb-data-table></kkb-data-table>

    <!-- <p @click="test">errorテストここをクリック！！！</p> -->
    <Notification></Notification>
    <Loading></Loading>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { UPDATE_NOTIFICATION } from '../store/mutations-types';
import KkbDataCalc from './KkbDataCalc.vue'
import KkbDataChart from './KkbDataChart.vue'
import KkbDataTable from './KkbDataTable.vue'
import Notification from './Notification.vue'
import Loading from './Loading.vue'

import Sprite01 from '../style/sprite01.css'

export default {
  data: function(){
    return {
      sprite01: Sprite01
    }
  },
  computed: {
    // VuexのStateを展開
    ...mapState({
      monthly: 'monthly'
    }),
    /**
     * 先月分のyearmonth型を返却
     * @return {String} yearmonth文字列
     */
    prevYearMonth: function(){
      let o = this.getYearMonthObj(this.monthly.currentYearMonth);

      // 月数を-1
      o.m--;

      // 月が0なら12月にし、年を-1
      if(o.m == 0){
        o.y--;
        o.m = 12;
      }

      // 月数が1桁なら0埋めして返す
      return o.y + "" + ( "0" + o.m ).slice(-2);
    },
    /**
     * 来月分のyearmonth型を返却
     * @return {String} yearmonth文字列
     */
    nextYearMonth: function(){
      let o = this.getYearMonthObj(this.monthly.currentYearMonth);

      // 月数を+1
      o.m++;

      // 月が13なら1月にし、年を+1
      if(o.m == 13){
        o.y++;
        o.m = 1;
      }

      // 月数が1桁なら0埋めして返す
      return o.y + "" + ( "0" + o.m ).slice(-2);
    }
  },
  methods: {
    // Vuexのmutationsを展開
    ...mapMutations({
      UPDATE_NOTIFICATION
    }),
    // store更新テスト用メソッド
    test: function(){
      this.UPDATE_NOTIFICATION("テストテストテストテスト")
    },
    /**
     * YYYYMM文字列から年と月の数値を保持するオブジェクトを生成して返却
     * @param  {String} c YYYYMM文字列
     * @return {Object}   y,m数値を含むオブジェクト
     */
    getYearMonthObj: function(c){
      let ret = {
        y: 0,
        m: 0
      };
      let y = c.substr(0,4);    // YYYY文字列
      let m = c.substr(4,2);    // MM文字列
      ret.y = parseInt(y, 10)   // (int)YYYY
      ret.m = parseInt(m, 10);  // (int)M 1-9の場合0埋めなし
      return ret;
    }
  },
  components: { KkbDataCalc, KkbDataChart, KkbDataTable, Notification, Loading },

}
</script>
