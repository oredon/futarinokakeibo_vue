<summery>
# Now Loading表示コンポーネント

* 読み込み中である旨を通知
</summery>

<style scoped>
.loading{
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: rgba(255,255,255,0.7);
  & .loadingText{
    font-size: 24px;
    color: #333;
    font-weight: bold;
    animation: loadingAnim 1s ease 0s infinite alternate;
  }
}
@keyframes loadingAnim {
    0% {
        opacity:1;
    }
    100% {
        opacity:0.2;
    }
}
</style>

<template>
  <div class="loading" :style="{display: isLoading ? 'flex' : 'none'}">
    <p class="loadingText">Now Loading...</p>
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
      isLoading: 'isLoading'
    }),
  },
  methods: {

  },
  components: {  }
}
</script>
