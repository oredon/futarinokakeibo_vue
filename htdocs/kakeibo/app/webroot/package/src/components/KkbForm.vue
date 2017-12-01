<summery>
# 新規追加・編集フォームコンポーネント

* フォーム要素から構成される入力／編集向けコンポーネント
</summery>

<style scoped>
/* フォーム入力部 */
.formInputList{
  box-sizing: border-box;
  width: 80%;
  max-width: 720px;
  margin: 20px auto;
  display: flex;
  flex-wrap: wrap;

  & .titleArea, & .inputArea{
    margin: 0;
    vertical-align: top;
  }
  /*& .titleArea{flex: 1 1 80px;}
  & .inputArea{flex: 2 0 auto;}*/
  & .titleArea{
    width: 85px;
  }
  & .inputArea{
    flex: 1;
  }

  & .titleArea label{
    font-weight: bold;
    font-size: 0.9rem;
  }

  & .year{width: 4em;}
  & .month{width: 2em;}
  & .date{width: 2em;}
  & .text{
    width: 99%;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    height: 30px;
  }
  & .select{
    border: 1px solid #9e9e9e;
    min-width: 100px;
    min-height: 30px;
  }
  & .textarea{
    width: 99%;
    min-height: 50px;
  }
}

/* ボタン表示部 */
.formBtnArea{
  box-sizing: border-box;
  max-width: 720px;
  margin: 10px auto 0 auto;
  text-align: center;
  & button{
    display: inline-block;
    margin-right: 2px;
  }
}
</style>

<template>
  <div class="kkb-form">
    <dl class="formInputList">
      <dt class="titleArea"><label for="edit_date">ID</label></dt><dd class="inputArea">{{edit.id == 0 ? "新規" : edit.id}}</dd>
    </dl>
    <dl class="formInputList">
      <dt class="titleArea"><label for="edit_date">購入日</label></dt><dd class="inputArea"><input type="number" v-model="edit.year" class="year" id="edit_year" @blur="dateBlur('year')" />-<input type="number" v-model="edit.month" class="month" id="edit_month" @blur="dateBlur('month')" />-<input type="number" v-model="edit.date" class="date" id="edit_date" @blur="dateBlur('date')" /> <vue-datepicker-local inputClass="datepicker-input" v-model="time" :local="local" /></dd>
    </dl>
    <dl class="formInputList">
      <dt class="titleArea"><label for="edit_title">商品名</label></dt><dd class="inputArea"><input type="text" v-model="edit.title" class="text" id="edit_title" autocomplete="on" list="formTitleList" />
        <datalist id="formTitleList">
          <option v-for="(item, idx) in formTitleList" :value="item">{{item}}</option>
        </datalist>
      </dd>
    </dl>
    <dl class="formInputList">
      <dt class="titleArea"><label for="edit_category">カテゴリー</label></dt><dd class="inputArea" for="edit_select">
        <select v-model="edit.category_id" id="edit_category" class="select">
          <option v-for="(item,idx) in category" :value="idx">{{item}}</option>
        </select>
      </dd>
    </dl>
    <dl class="formInputList">
      <dt class="titleArea"><label for="edit_price">支払い金額</label></dt><dd class="inputArea"><input type="number" v-model="edit.price" class="text" id="edit_price" /></dd>
    </dl>
    <dl class="formInputList">
      <dt class="titleArea"><label for="edit_pay_danna">旦那支払</label></dt><dd class="inputArea"><input type="number" v-model="edit.pay_danna" class="text" id="edit_pay_danna" /></dd>
    </dl>
    <dl class="formInputList">
      <dt class="titleArea"><label for="edit_pay_yome">嫁支払</label></dt><dd class="inputArea"><input type="number" v-model="edit.pay_yome" class="text" id="edit_pay_yome" /></dd>
    </dl>
    <dl class="formInputList">
      <dt class="titleArea"><label for="edit_description">備考</label></dt><dd class="inputArea"><textarea v-model="edit.description" class="textarea" id="edit_description"></textarea></dd>
    </dl>
    <div class="formBtnArea">
      <p><button @click="sendForm({edit, clearEditState, convertStateToAjaxData})" :class="style.btnSubmit">SUBMIT</button><button @click="allDanna" :class="style.btnA">全額旦那</button><button @click="allYome" :class="style.btnB">全額嫁</button><button @click="diff" :class="style.btnGeneral">差額反映</button></p>
    </div>
  </div>
</template>

<script>
import Store from '../store/index'// DEFAULT_EDIT_STATEを生成するために必要
import { mapState, mapActions } from 'vuex'
import Style from '../style/common.css'
import VueDatepickerLocal from 'vue-datepicker-local'

// v-modelによる双方向バインディング用のlocalStateの初期値
const DEFAULT_EDIT_STATE = {
  id: "0",
  year: Store.state.today.year,
  month: Store.state.today.month,
  date: Store.state.today.date,
  title: "",
  category_id: "1",
  price: "",
  pay_danna: "",
  pay_yome: "",
  description: ""
};

export default {
  data: function(){
    return {
      edit: Object.assign({},DEFAULT_EDIT_STATE),
      style: Style,
      time: Store.state.today.year + "-" + Store.state.today.month + "-" + Store.state.today.date, // datepicker一時保管変数
      local: { // datepickerローカライズ定義
        dow: 0, // 日曜始まり
        yearSuffix: '年',
        monthsHead: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weeks: '日_月_火_水_木_金_土'.split('_')
      }
    }
  },
  computed: {
    // VuexのStateを展開
    ...mapState({
      category: 'category',
      monthly: 'monthly',
      isLoading: 'isLoading',
      today: 'today',
      formTitleList: 'formTitleList'
    })
  },
  methods: {
    // Vuexのactionsを展開
    ...mapActions ({
      sendForm: 'sendForm',
      getFormTitleList: 'getFormTitleList'
    }),
    /**
     * Edit用のデータをクリア
     */
    clearEditState: function(){
      this.edit = Object.assign({},DEFAULT_EDIT_STATE);
      this.time = this.today.year + "-" + this.today.month + "-" + this.today.date;
    },
    /**
     * 月別データからIDを指定して該当するデータを返却
     * @param  {Number} id 記事ID
     * @return {Object}    該当データオブジェクト
     */
    getTargetDataFromMonthlyState: function(id){
      // Storeのmonthlyデータから編集対象となるデータを取得
      let targetData = this.monthly.detail.filter(function(d){
        return d.Form.id == id;
      });

      // IDからふるい分けして取得したデータが空でないならデータを整形して返却
      if(targetData && targetData.length){
        targetData = targetData[0]["Form"];

        // 金額などで数字がnullで送られた場合は空文字列に初期化
        targetData["price"]     = targetData["price"]     == null ? "" : targetData["price"];
        targetData["pay_danna"] = targetData["pay_danna"] == null ? "" : targetData["pay_danna"];
        targetData["pay_yome"]  = targetData["pay_yome"]  == null ? "" : targetData["pay_yome"];

        // データ構造をlocalstate用に変換
        targetData = this.convertAjaxDataToState(targetData);
      }
      return targetData;
    },
    /**
     * AJAXレスポンスのデータ構造をlocalStateデータ構造に変換して返却
     * @param  {Object} data AJAXレスポンスデータ（該当月データ）
     * @return {Object}      localState用に変換されたデータ
     */
    convertAjaxDataToState: function(data){
      /*
      変換する
      "category_id": "3",
      "created": "2017-11-08",
      "date": "2017-11-01", //year month dateに分解
      "description": "",
      "id": "3488",
      "modified": "2017-11-08",
      "pay_danna": "1691",
      "pay_yome": null,
      "price": "1691",
      "title": "matukiyo"
      ---------↓↓↓-------------
      id: "",
      year: "",
      month: "",
      date: "",
      title: "",
      category_id: 1,
      price: "",
      pay_danna: "",
      pay_yome: "",
      description: ""
       */
      //YYYY-MM-DDを分解
      let _d = data.date.split("-");
      data.year  = _d[0];
      data.month = _d[1];
      data.date  = _d[2];

      // 不要な値を削除
      delete data.created;
      delete data.modified;

      return data;
    },
    /**
     * localStateデータ構造をAJAXパラメータ用に変換
     * @param  {Object} data localStateデータ（該当月データ）
     * @return {Object}      AJAXパラメータデータ
     */
    convertStateToAjaxData: function(data){
      //YYYY-MM-DDに結合
      data.date  = data.year + "-" + data.month + "-" + data.date;

      // 不要な値を削除
      delete data.year;
      delete data.month;

      return data;
    },
    /**
     * 全額を旦那支払いとする
     * @param  {Object} e ユーザイベントオブジェクト
     */
    allDanna: function(e){
      e.preventDefault();
      if(this.edit.price){
        this.edit.pay_danna = this.edit.price;
        this.edit.pay_yome  = "";
      }
    },
    /**
     * 全額を嫁支払いとする
     * @param  {Object} e ユーザイベントオブジェクト
     */
    allYome: function(e){
      e.preventDefault();
      if(this.edit.price){
        this.edit.pay_danna = "";
        this.edit.pay_yome  = this.edit.price;
      }
    },
    /**
     * 差額計算
     * @param  {Object} e ユーザイベントオブジェクト
     */
    diff: function(e){
      e.preventDefault();
      if(this.edit.price){
        if(this.edit.pay_danna){
          this.edit.pay_yome = "" + (parseInt(this.edit.price, 10) - parseInt(this.edit.pay_danna, 10))
        }else if(this.edit.pay_yome){
          this.edit.pay_danna = "" + (parseInt(this.edit.price, 10) - parseInt(this.edit.pay_yome, 10))
        }
      }
    },
    /**
     * 年月日をblurした際の挙動
     * @param  {String} type year|month|date
     */
    dateBlur: function(flag){
      // blur字に0埋め処理
      if(flag === "month"){
        this.edit.month = ("0" + this.edit.month).slice(-2);
      }else if(flag === "date"){
        this.edit.date = ("0" + this.edit.date).slice(-2);
      }

      // datepickerのtimeに入力値をsync
      this.time = this.edit.year + "-" + this.edit.month + "-" + this.edit.date;
    }
  },
  /**
   * マウント時に毎回実行
   */
  mounted: function(){
    if(this.$route.params.id){
      // 編集モード
      // IDと一致するデータ取得
      let targetData = this.getTargetDataFromMonthlyState(this.$route.params.id);

      // localstateに値を登録
      this.edit = targetData;
      //this.$vue.set(this, "edit", targetData);

      // datepickerのtimeに該当に時間を代入
      this.time = targetData.year + "-" + targetData.month + "-" + targetData.date;
    }else{
      // 新規追加モード VuexのStoreではなくlocalStateを利用したことで初期化処理が不要になった（マウント時に初期化されるため）

    }

    // 商品名候補リスト取得
    if(this.formTitleList.length === 0){
      this.getFormTitleList();
    }
  },
  watch: {
    // routerの変更を監視
    '$route' (to, from) {
      // 当コンポーネントがマウントされた状態でrouterのパラメータが変更されたらデータ同期
      if(!Object.keys(to.params).length){
        //編集＝＞新規入力に移動してきた場合
        this.edit = Object.assign({},DEFAULT_EDIT_STATE);
      }
    },
    // datepickerの値の変動をedit値に反映
    'time' (changedDate) {
      if(typeof changedDate !== "string"){
        this.edit.year = "" + changedDate.getFullYear();
        this.edit.month = ("0" + (changedDate.getMonth() + 1)).slice(-2);
        this.edit.date = ("0" + changedDate.getDate()).slice(-2);
      }
    }
  },
  components: { VueDatepickerLocal },
}
</script>
