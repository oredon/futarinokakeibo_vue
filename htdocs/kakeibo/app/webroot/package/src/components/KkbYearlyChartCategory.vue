<summery>
# 年間支出チャート　カテゴリーグラフ

* vue-chartjsに依存
* 親コンポーネントからpropsとしてchartStateを受け取り、その値を変更監視してグラフを生成
</summery>

<style scoped>

</style>

<script>
import { Line } from 'vue-chartjs'
import Colors from '../config/Colors'
import { mapActions } from 'vuex'

export default {
  extends: Line,
  name: "kkb-yearly-chart-line",
  props: ["chartState"],
  data: function(){
    return {}
  },
  computed: {

  },
  methods: {
    // Vuexのactionsを展開
    ...mapActions ({
      getMonthlyData: 'getMonthlyData',
    }),
    /**
     * propsに応じたChartの描画処理
     */
    fillData: function(){
      // 作成済みなら破棄
      if (this.$data._chart) {
        this.$data._chart.destroy();
      }

      // カテゴリーの数だけloopを回し、1-12月分のデータを集計する
      let datasets = [];
      let counterIdx = 0;
      for(let i in this.chartState.category){
        // mon1 - mon12 値があれば集計
        let arr = [];
        for(let j = 1; j <= 12; j++){
          if( this.chartState["mon"+j] && this.chartState["mon"+j][i] ){
            arr.push( this.chartState["mon"+j][i].sum_price );
          }else{
            arr.push(0);
          }
        }

        // data生成
        datasets.push({
          label: this.chartState.category[i],
          backgroundColor: Colors[counterIdx],
          data: arr,
          fill: false,
          lineTension: 0
        });
        counterIdx++;
      }

      let _this = this;

      this.renderChart({
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: datasets
      }, {responsive: true, maintainAspectRatio: false, onClick: function(e){
        // グラフ内のポイントをクリックした場合の挙動
        if(this.chart.getElementsAtEvent(e).length){
          let clickedIdx = this.chart.getElementsAtEvent(e)[0]._index;
          let month = "" + (parseInt(clickedIdx, 10) + 1);
          let year  = "" + _this.$route.params.year;
          let yearmonth = year + month;

          // クリックした月のデータを取得
          _this.getMonthlyData(yearmonth);
        }
      }});
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
