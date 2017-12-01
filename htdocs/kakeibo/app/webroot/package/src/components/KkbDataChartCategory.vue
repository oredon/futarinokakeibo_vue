<summery>
# 月別チャート　カテゴリー別支出円グラフコンポーネント

* vue-chartjsに依存
* 親コンポーネントからpropsとしてchartStateを受け取り、その値を変更監視してグラフを生成
</summery>

<style scoped>

</style>

<script>
import { Pie } from 'vue-chartjs'
import Colors from '../config/Colors'

export default {
  extends: Pie,
  name: "kkb-data-chart-category",
  props: ["chartState"],
  data: function(){
    return {}
  },
  computed: {

  },
  methods: {
    /**
     * propsに応じたChartの描画処理
     */
    fillData: function(){
      // 作成済みなら破棄
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }
      this.renderChart({
          labels:  this.chartState.list.map(function(item){ return item.category_name; }),
          datasets: [
            {
              label: 'カテゴリー別出費',
              backgroundColor: [...Colors],
              data: this.chartState.list.map(function(item){ return item.sum_price; })
            }
          ]
        }, {responsive: true, maintainAspectRatio: false});
    }
  },
  watch: {
    'chartState' () {
      this.fillData()
    }
  },
  components: {  },
  mounted () {
    //this.fillData()
  }
}
</script>
