<style scoped>
.mt5{
  margin-top: 5px;
}

.foo {
  color: gray(85);
}

.bar {
  color: gray(10%, 50%);
}
</style>

<template>
  <div class="container">
    <h1 class="foo">Dummy</h1>
    <main role="main">
      <p class="bar">Dummy</p>
    </main>
  <!-- container --></div>
</template>

<script>
// scopedCSS + PostCSS(nextCSS) テスト
import Store from '../store/index'

export default {
  data: function(){
    return Store.state
  },
  computed: {

  },
  methods: {

  },
  components: {  }
}
</script>
