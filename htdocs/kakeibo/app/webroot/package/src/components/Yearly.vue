<summery>
# 年間支出データ

* 各年別データ表示時に使用するコンポーネントを取りまとめるコンテナ
</summery>

<style scoped>
h2{
  box-sizing: border-box;
  width: 90%;
  margin: 10px auto 0 auto;
  font-size: 18px;
  color: #999;
}
</style>

<template>
  <div class="container container-yearly">

    <h2>{{$route.params.year}}年</h2>

    <kkb-yearly-chart></kkb-yearly-chart>

    <kkb-data-calc></kkb-data-calc>
    <kkb-data-chart></kkb-data-chart>
    <kkb-data-table></kkb-data-table>

    <Notification></Notification>
    <Loading></Loading>
  </div>
</template>

<script>
import KkbYearlyChart from './KkbYearlyChart.vue'
import KkbDataCalc from './KkbDataCalc.vue'
import KkbDataChart from './KkbDataChart.vue'
import KkbDataTable from './KkbDataTable.vue'
import Notification from './Notification.vue'
import Loading from './Loading.vue'

export default {
  data: function(){
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  components: { KkbYearlyChart, KkbDataCalc, KkbDataChart, KkbDataTable, Notification, Loading },

}

</script>
