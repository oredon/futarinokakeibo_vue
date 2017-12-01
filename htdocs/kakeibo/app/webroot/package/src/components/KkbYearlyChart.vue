<summery>
# 年間支出チャートをwrapするコンポーネント

* vue-chartjsに依存
* 個別のチャートコンポーネントを読み込むだけのコンポーネント
</summery>

<style scoped>
.yearlyChart{
  box-sizing: border-box;
  width: 90%;
  margin: 10px auto;
  & .chart{
    margin: 0 0 50px 0;
  }

  &. h2{
    margin: 0;
    font-size: 18px;
  }
}
</style>

<template>
  <div class="yearlyChart">
    <div class="chart">
      <h2>支払者別支出グラフ</h2>
      <kkb-yearly-chart-fuufu :chartState="yearly"></kkb-yearly-chart-fuufu>
    </div>
    <div class="chart">
      <h2>カテゴリー別支出グラフ</h2>
      <kkb-yearly-chart-category :chartState="yearly"></kkb-yearly-chart-category>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ajaxUrl from '../config/ajaxUrl.js'
import KkbYearlyChartCategory from './KkbYearlyChartCategory.vue'
import KkbYearlyChartFuufu from './KkbYearlyChartFuufu.vue'

export default {
  name: "kkb-yearly-chart",
  data: function(){
    return {

    }
  },
  computed: {
    // VuexのStateを展開
    ...mapState({
      yearly: 'yearly'
    }),
  },
  methods: {
    // Vuexのactionsを展開
    ...mapActions ({
      getYearlyData: 'getYearlyData',
    }),
  },
  /**
   * マウント時に毎回実行
   */
  mounted: function(){
    // 当コンポーネントがマウントされたらAJAXでデータ同期
    this.getYearlyData(this.$route.params.year);
  },
  // routerの変更を監視
  watch: {
    '$route' (to, from) {
      // 当コンポーネントがマウントされた状態でrouterのパラメータが変更されたらデータ同期
      this.getYearlyData(to.params.year);
    }
  },
  components: { KkbYearlyChartCategory, KkbYearlyChartFuufu }
}
</script>
