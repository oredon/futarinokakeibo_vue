<summery>
# 新規追加・編集コンテナ

* フォームを内包するコンテナ
</summery>

<style scoped>

</style>

<template>
  <div class="container container-edit">
    <kkb-form></kkb-form>
    <Notification></Notification>
    <Loading></Loading>
  </div>
</template>

<script>
import KkbForm from './KkbForm.vue'
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
  /**
   * マウント時に毎回実行
   */
  mounted: function(){

  },
  components: { KkbForm, Notification, Loading }
}
</script>
