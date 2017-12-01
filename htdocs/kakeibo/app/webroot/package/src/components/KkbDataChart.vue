<summery>
# 月別チャートをwrapするコンポーネント

* vue-chartjsに依存
* 個別のチャートコンポーネントを読み込むだけのコンポーネント
</summery>

<style scoped>
.monthlyChart{
  width: 90%;
  margin: 0 auto 20px auto;
}

@media (min-width:768px){
  .monthlyChart{
    width: 100%;
    margin: 0 0 20px 0;
    display: flex;
    max-height: 450px;

    & .chart{
      flex: 0.5;
    }
  }
}
</style>

<template>
  <div class="monthlyChart">
    <div class="chart">
      <kkb-data-chart-fuufu :chartState="monthly"></kkb-data-chart-fuufu>
    </div>
    <div class="chart">
      <kkb-data-chart-category :chartState="monthly"></kkb-data-chart-category>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import KkbDataChartFuufu from './KkbDataChartFuufu.vue'
import KkbDataChartCategory from './KkbDataChartCategory.vue'

export default {
  name: "kkb-data-chart",
  data: function(){
    return {

    }
  },
  computed: {
    // VuexのStateを展開
    ...mapState({
      monthly: 'monthly'
    }),
  },
  methods: {

  },
  components: { KkbDataChartFuufu, KkbDataChartCategory }
}
</script>
