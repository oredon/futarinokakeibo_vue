<summery>
# 月別データをテーブル表示するコンポーネント

* monthlyリストデータからテーブルを生成
</summery>

<style scoped>
/* 月別データテーブル */
.detailTbl{
  box-sizing: border-box;
  width: 100%;
  border-collapse:collapse;
  & thead tr th{
    font-weight: normal;
    color: #9e9e9e;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
  }
  & tr{
    border-bottom: 1px solid #e0e0e0;
  }
  & th{
    font-size: 0.9rem;
  }
  & td{
    font-size: 0.8rem;
  }
}
</style>

<template>
  <div class="monthlyTable">
    <table class="detailTbl">
      <thead>
        <tr>
          <th> </th><th>購入日</th><th>タイトル</th><th>カテゴリー</th><th>支払い金額</th><th>旦那支払</th><th>嫁支払</th><th>備考</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(d,idx) in monthly.detail">
          <td>
            <router-link :to="'/edit/' + d.Form.id"><button :class="style.btnA">{{d.isDeleted}}編集</button></router-link><br />
            <button @click="delEntry({d, idx, category})" :class="style.btnB">削除</button>
          </td>
          <td>{{d.Form.date}}</td>
          <td>{{d.Form.title}}</td>
          <td>{{category[d.Form.category_id]}}</td>
          <td>{{d.Form.price}}</td>
          <td>{{d.Form.pay_danna}}</td>
          <td>{{d.Form.pay_yome}}</td>
          <td>{{d.Form.description}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Style from '../style/common.css'

export default {
  name: 'kkb-data-table',
  data: function(){
    return {
      style: Style,
    }
  },
  computed: {
    // VuexのStateを展開
    ...mapState({
      category: 'category',
      monthly: 'monthly',
      isLoading: 'isLoading',
      today: 'today'
    }),
  },
  methods: {
    // Vuexのactionsを展開
    ...mapActions ({
      getMonthlyData: 'getMonthlyData',
      delEntry: 'delEntry',
    }),
    /**
     * パラメータがあればそれを返し、なければ現在日付からyearmonthを返却
     * @param  {String|Undefined} target 検査対象となるパラメータ値
     * @return {String} yearmonth文字列 ex.)201001
     */
    getYearmonth: function(target){
      let yearmonth = "" + this.today.year + "" + this.today.month;
      if( target ){
        yearmonth = target;
      }
      return yearmonth;
    },
  },
  components: {  },
  /**
   * マウント時に毎回実行
   */
  mounted: function(){
    // 当コンポーネントがマウントされたらAJAXでデータ同期
    let yearmonth = this.getYearmonth(this.$route.params.yearmonth);
    this.getMonthlyData(yearmonth);
  },
  // routerの変更を監視
  watch: {
    '$route' (to, from) {
      // 当コンポーネントがマウントされた状態でrouterのパラメータが変更されたらデータ同期
      let yearmonth = this.getYearmonth(to.params.yearmonth);
      this.getMonthlyData(yearmonth);
    }
  }
}


</script>
