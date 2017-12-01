<summery>
# 月別支出計算結果コンポーネント

* 夫婦間の差額、カテゴリー別の支出数値の表示
</summery>

<style scoped>
/* 月別ステータス */
.detailStatus{
  box-sizing: border-box;
  width: 90%;
  margin: 10px auto;
  & .sumStatus{
    display: block;
    width: 100%;
  }
  & .categoryStatus{
    display: block;
    width: 100%;
  }
  @media (min-width:768px){
    & ul{
      margin-left: 0;
      padding-left: 0;
    }
    & .sumStatus{
      display: inline-block;
      width: 49%;
      vertical-align: top;
    }
    & .categoryStatus{
      display: inline-block;
      width: 49%;
      vertical-align: top;
    }
  }
}
</style>

<template>
  <div class="monthlyCalc">
    <div class="detailStatus">
      <h2>{{monthly.currentYearMonth | dateFormat}}</h2>
      <div class="sumStatus">
        <p>月計: {{monthly.sum | priceFormat}}円<br />
          <span :class="style.em">旦那: {{monthly.danna | priceFormat}}円</span><br />
          <span :class="style.alert">嫁　: {{monthly.yome | priceFormat}}円</span><br />
          差額: {{diffPrice}}円<br />
          （<span :class="style.bold">{{payPrice}}円</span>支払うと同額になります）</p>
      </div><!--
      --><div class="categoryStatus">
        <ul>
          <li v-for="(d,i) in monthly.list">{{d.category_name}} ({{percentage(monthly.sum, d.sum_price)}}％)<br />
            {{d.sum_price | priceFormat}}円 <span :class="style.em">{{d.sum_danna | priceFormat}}円</span> <span :class="style.alert">{{d.sum_yome | priceFormat}}円</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Style from '../style/common.css'

export default {
  name: 'kkb-data-calc',
  data: function(){
    return {
      style: Style,
    }
  },
  computed: {
    // VuexのStateを展開
    ...mapState({
      monthly: 'monthly'
    }),
    /**
     * 差額計算
     * @return {String} 差額文字列
     */
    diffPrice: function(){
      let diff = this.getDiff();
      let diffText = diff.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');
      //let pay = Math.floor((diff/2)).toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');
      return diffText;
    },
    /**
     * 差額清算支払い金額
     * @return {Number} 支払い金額
     */
    payPrice: function(){
      let diff = this.getDiff();
      //let diffText = diff.toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');
      let pay = Math.floor((diff/2)).toString().replace(/(\d)(?=(\d{3})+$)/g , '$1,');
      return pay;
    }
  },
  methods: {
    /**
     * 旦那と嫁の差額を計算
     * @return {Number} 差額金額
     */
    getDiff: function(){
      let dannna = this.monthly.danna;
      let yome   = this.monthly.yome;
      let diff   = Math.abs(parseInt(dannna, 10) - parseInt(yome, 10));
      return diff;
    },
    /**
     * 合計金額と対象金額からパーセンテージ値を計算
     * @param  {Number} sum 合計の金額
     * @param  {Number} num 対象となる金額
     * @return {Number}     パーセンテージ
     */
    percentage: function(sum, num){
      var n = 2 ;	// 小数点第n位まで残す
      return Math.floor( num / sum * 100 * Math.pow( 10, n ) ) / Math.pow( 10, n );
    }
  },
  components: {  }
}

</script>
