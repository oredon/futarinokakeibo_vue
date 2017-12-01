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
  name: "kkb-yearly-chart-fuufu",
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

      let datasets = [];
      let targetArray = [[],[],[]];
      let labelArray = ["旦那","嫁", "合計"];
      let i,l;
      for(i = 1; i <= 12; i++){
        if( this.chartState["mon"+i] ){
          targetArray[0].push(this.chartState["mon"+i].danna);
          targetArray[1].push(this.chartState["mon"+i].yome);
          targetArray[2].push(this.chartState["mon"+i].sum);
        }else{
          targetArray[0].push(0);
          targetArray[1].push(0);
          targetArray[2].push(0);
        }
      }
      for(i = 0, l = targetArray.length; i < l; i++){
        datasets.push({
          label: labelArray[i],
          backgroundColor: Colors[i],
          data: targetArray[i],
          fill: false,
          lineTension: 0
        });
      }

      let _this = this;

      this.renderChart({
        labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        datasets: datasets,
        onClick: function(){
          console.log(arguments)
        }
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
