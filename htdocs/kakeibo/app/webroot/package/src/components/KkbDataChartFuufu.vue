<summery>
# 月別チャート　人別支出円グラフコンポーネント

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
  name: "kkb-data-chart-fuufu",
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
          labels:  ['旦那', '嫁'],
          datasets: [
            {
              label: '旦那・嫁比率',
              backgroundColor: [...Colors],
              data: [this.chartState.danna, this.chartState.yome]
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
