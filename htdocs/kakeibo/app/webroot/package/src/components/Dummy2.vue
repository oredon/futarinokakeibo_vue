<style scoped>

</style>

<template>
  <div class="container">
    <h1 :class="style.foo">Dummy</h1>
    <main role="main">
      <p :class="[style.bar, style.bold]">Dummy</p>
    </main>
  <!-- container --></div>
</template>

<script>
// CSS Modules + PostCSS(nextCSS) テスト
import Store from '../store/index'
import Style from '../style/common.css'

export default {
  data: function(){
    return {
      store: Store.state,
      style: Style
    }
  },
  computed: {

  },
  methods: {

  },
  components: {  }
}
</script>
