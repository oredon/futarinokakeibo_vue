// mutations-typesをロード
import * as types from './mutations-types';

/**
 * 今日の年月日オブジェクトを返す
 * @return {Object} {year:"YYYY", month:"MM", date:"DD"}形式の今日の日付が格納されたオブジェクト
 */
function getTodayObj(){
  let dateObj = new Date();
  let ret = {
    year: "",
    month: "",
    date: ""
  };
  ret.year  = "" + dateObj.getFullYear();
  ret.month = dateObj.getMonth() + 1;
  ret.month = ( "0" + ret.month ).slice(-2);
  ret.date  = dateObj.getDate();
  ret.date  = ( "0" + ret.date ).slice(-2);

  return ret;
}

// stateに登録する今日の年月日オブジェクトを生成
let today = getTodayObj();

// stateのexport
export const state = {
  startYear: 2013, // アプリケーションの開始年
  category: {},    // カテゴリーIDとカテゴリ名が対になったデータ
  monthly: {
    detail: [],           //月別データを格納
    currentYearMonth: "", //現在の年月
  },
  yearly: {
    categoryDataset: [],
    fuufuDataset: [],
    total: {
      dannna: 0,
      yome: 0,
      sum: 0
    }
  },
  today: today, // 今日のリアル年月
  notification: {
    msg: ""
  },
  isLoading: false, // AJAX中フラグ
  formTitleList: [], // 入力フォームのオートコンプリート値
}

// mutations内で時限を使用するためtimerIdを定義
let timerId = null;

// mutationsのexport
export const mutations = {
  /**
   * 月別データを更新
   * @param  {Object} state state
   * @param  {Object} json  月別JSONデータ
   */
  [types.UPDATE_MONTHLY_DATA]: function(state, json){
    state.category = json.category;
    state.monthly = json;
  },
  [types.UPDATE_YEARLY_DATA]: function(state, json){
    state.category = json.category;
    state.yearly = json;
  },
  /**
   * 注記メッセージを更新
   * @param  {Object} state state
   * @param  {String} msg   表示メッセージ文字列
   */
  [types.UPDATE_NOTIFICATION]: function(state, msg){
    state.notification.msg = msg;

    if( timerId != null ){
      clearTimeout(timerId);
      timerId = null;
    }

    // 指定秒数表示した後に消す
    timerId = setTimeout(function(){
      timerId = null;
      state.notification.msg = "";
    }, 1500);
  },
  /**
   * データ削除後の処理
   * @param  {Object} state state
   * @param  {Number} idx   削除すべきindex番号
   */
  [types.DELETE_DATA_FROM_MONTHLY]: function(state, idx){
    // stateの累計データも更新 削除したデータの金額情報を取得
    let price     = state.monthly.detail[idx].Form.price;
    let pay_danna = state.monthly.detail[idx].Form.pay_danna ? parseInt(state.monthly.detail[idx].Form.pay_danna,10) : 0;
    let pay_yome  = state.monthly.detail[idx].Form.pay_yome ? parseInt(state.monthly.detail[idx].Form.pay_yome,10) : 0;

    // 月別データから削除データの金額分を減算
    state.monthly.sum   -= price;
    state.monthly.danna -= pay_danna;
    state.monthly.yome  -= pay_yome;

    // category別リストデータも更新
    let category_id = state.monthly.detail[idx].Form.category_id;
    state.monthly.list = state.monthly.list.map(function(x){
      if(x.category_id == category_id){
        x.sum_price -= price;
        x.sum_danna -= pay_danna;
        x.sum_yome  -= pay_yome;
      }
      return x;
    });

    // 月別詳細データから削除
    state.monthly.detail.splice(idx,1);
  },
  /**
   * LoadingのONOFF
   * @param  {Object} state  state
   * @param  {Boolean} flag  ONOFF
   */
  [types.UPDATE_LOADING]: function(state, flag){
    state.isLoading = flag;
  },
  /**
   * Formの商品名部分のオートコンプリート候補データを更新
   * @param  {Object} state  state
   * @param  {Array}  list   候補文字列リスト
   */
  [types.UPDATE_FORM_TITLE_LIST]: function(state, list){
    state.formTitleList = list;
  }
}
