<template>
  <div>
    <kkb-header></kkb-header>
    <router-view></router-view>
  </div>
</template>

<script>
import KkbHeader from './components/KkbHeader.vue'

export default {
  data: function(){
    return {}
  },
  computed: {

  },
  methods: {

  },
  components: {
    KkbHeader
  }
}
</script>
