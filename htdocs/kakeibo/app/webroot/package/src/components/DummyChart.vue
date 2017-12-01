<style scoped>

</style>



<script>
// scopedCSS + PostCSS(nextCSS) テスト
import Store from '../store/index'
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  name: "dummy-chart",
  data: function(){
    return Store.state
  },
  computed: {

  },
  methods: {

  },
  components: {  },
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'GitHub Commits',
          backgroundColor: '#f87979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
    })
  }
}
</script>
