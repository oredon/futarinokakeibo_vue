<summery>
# 共通ヘッダコンポーネント

* TOPレベルコンテナであるAppで使用される想定
</summery>

<style scoped>
.header{
  margin: 0 0 10px 0;
  padding: 0;
  box-sizing: border-box;
}
.headerInner{
  margin: 0;
  padding: 0;
  background: #3eba2b;
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  min-height: 60px;
}
.headerInner h1{
  margin: 0;
  padding: 0;
  font-size: 1.8rem;
  font-weight: normal;
  color: #ffffff;
  line-height: 60px;
}
.headerInner h1 a,.headerInner h1 a:active, .headerInner h1 a:visited{
  text-decoration: none;
  color: #fff;
}
.headerInner h1 a:hover{
  text-decoration: underline;
}
.logo a{
  display: inline-block;
  margin-left: 15px;
}
.headerAdd{
  margin: 12px 16px 0 auto;
  padding: 0;

  & .icon{
    display: inline-block;
    transition: all 500ms 0s ease;
    margin-left: 15px;
    cursor: pointer;
  }
  & .iconFirst{
    margin-left: 0;
  }
  & .icon:hover{
    transform: rotateY(180deg);
    transform-origin: 50% 50%;
  }
}
.yearSelect{
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 2;
  min-width: 100px;
  min-height: 50px;
  background: #fff6da;
  border: 1px solid #999;
  padding: 5px;
}
</style>

<template>
  <header class="header">
    <div class="headerInner">
      <h1 class="logo"><router-link to="/">simple家計簿</router-link></h1>
      <div class="headerAdd"><router-link to="/edit"><span class="icon iconFirst" :class="sprite01['icon-add']"></span></router-link><span @click="openYearSelect"><span class="icon iconLast" :class="sprite01['icon-linegraph']"></span></span></div>
    </div>
    <div class="yearSelect" v-show="isOpen">
      <ul class="yearSelectList">
        <li v-for="year in yearArr"><router-link :to="'/yearly/' + year">{{year}}</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Sprite01 from '../style/sprite01.css'

export default {
  name: 'kkb-header',
  data: function(){
    return {
      sprite01: Sprite01,
      isOpen: false,
    }
  },
  computed: {
    // VuexのStateを展開
    ...mapState({
      startYear: 'startYear',
      today: 'today'
    }),
    /**
     * 開始年から現在年までのリストを生成
     * @return {Array} 年リスト
     */
    yearArr: function(){
      let startYear = this.startYear;
      let currentYear = this.today.year;
      let diff = parseInt(currentYear, 10) - parseInt(startYear, 10);
      let arr = [];
      for(var i = 0; i <= diff; i++){
        arr.push(startYear + i);
      }
      return arr;
    }
  },
  methods: {
    /**
     * 年リスト表示を開く
     * @param  {Object} e クリックイベントオブジェクト
     */
    openYearSelect: function(e){
      e.preventDefault();
      e.stopPropagation();
      this.isOpen = !this.isOpen;
      return false;
    }
  },
  created: function(){
    // OuterClickで年リスト表示を閉じる
    document.addEventListener("click", (function(){
      this.isOpen = false;
    }).bind(this), false)
  },
  components: {  }
}
</script>
