<summery>
# 通知用コンポーネント

* ユーザへのフィードバックメッセージを表示
</summery>

<style scoped>
.notificationMsg{
  width: 100%;
  display: block;
  background: #000;
  color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0;
  text-align: center;
  transition: all 0.3s;
  word-wrap: break-all;

  & .notificationMsgText{
    display: inline-block;
    height: 50px;
    margin: 0 auto;
  }

  & .notificationMsgText p{
    display: table-cell;
    height: 50px;
    vertical-align: middle;
    white-space: pre-wrap;
  }
}
</style>

<template>
  <div class="notificationMsg" :style="{height: notification.msg ? '50px' : '0', visibility: notification.msg ? 'visible' : 'hidden'}">
    <div class="notificationMsgText">
      <p>{{notification.msg}}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data: function(){
    return {

    }
  },
  computed: {
    // VuexのStateを展開
    ...mapState({
      notification: 'notification'
    }),
  },
  methods: {

  },
  components: {  }
}
</script>
