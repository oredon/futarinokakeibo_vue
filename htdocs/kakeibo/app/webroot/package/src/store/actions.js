import Vue from 'vue';
import * as types from './mutations-types';
import ajaxUrl from '../config/ajaxUrl.js'

/**
 * 月別データの取得
 * @param  {Object}             Vuexオブジェクト
 * @param  {String} yearmonth   取得したい年月文字列（YYYYMM）
 */
export const getMonthlyData = function({commit}, yearmonth){
  let _this = this;

  // AJAXオプション設定
  let ajaxUrlString = ajaxUrl.monthly;
  let ajaxOption    = {};

  if(yearmonth == "201712"){//dummyで挙動確認
    ajaxUrlString = ajaxUrl.monthly.replace(/monthly\.json/, "a.json");
  }

  // AJAXオプションをproductionとdevで分ける
  if(process.env.NODE_ENV === 'production'){
    let method = "POST";

    //let body = JSON.stringify({start: yearmonth})
    // FormDataオブジェクト形式でPOSTデータを生成
    var body = new FormData();
    body.append("start", yearmonth);

    let headers = {'Accept': 'application/json'}

    ajaxOption = {
      method,
      headers,
      body,
      credentials: 'include'
    }
  }else{
    ajaxUrlString = ajaxUrlString + "?yearmonth=" + yearmonth;
  }

  // loadingアニメーション再生
  commit(types.UPDATE_LOADING, true);

  fetch(ajaxUrlString, ajaxOption)
    .then(function(res){
      // loadingアニメーション停止
      commit(types.UPDATE_LOADING, false);

      if(res.ok){
        return res.json();
      }else{
        // error
        commit(types.UPDATE_NOTIFICATION, "(network error)月別データ取得に失敗しました。\nインターネットに接続しているか確認してください。");
      }
    }).then(function(json){
      if( json.status != 1 ){
        // error
        commit(types.UPDATE_NOTIFICATION, "(app error)月別データ取得に失敗しました。\nページを更新してからお試しください。");
        return;
      }
      // 現在年月を追加し、月データを更新
      json.currentYearMonth = yearmonth;
      commit(types.UPDATE_MONTHLY_DATA, json);
    });
}

/**
 * 該当データ削除ボタンの挙動
 * @param  {Object}     Vuexオブジェクト
 * @param  {Object}     option連想配列（d: 現在の月別データ（store.state.monthly.detailと同じ形式, idx: 削除対象の配列番号, category: 支払いカテゴリーリスト）
 */
export const delEntry = function({commit}, {d,idx,category}){
  let _this = this;
  let data = d.Form;
  if(
    window.confirm(
      'データを削除します。よろしいですか？'
       + "\n日付:" + data.date
       + "\nタイトル:" + data.title
       + "\nカテゴリ:" + category[data.category_id]
       + "\n金額:" + data.price
       + "\n旦那支払:" + data.pay_danna
       + "\n嫁支払:" + data.pay_yome
       + "\n備考:" + data.description
     )
  ){

  // AJAXオプション設定
  let ajaxUrlString = ajaxUrl.delete;
  let ajaxOption    = {};

  // AJAXオプションをproductionとdevで分ける
  if(process.env.NODE_ENV === 'production'){
    let method = "POST";
    //let body = JSON.stringify({start: yearmonth})
    // FormDataオブジェクト形式でPOSTデータを生成
    var body = new FormData();
    body.append("id", data.id);

    let headers = {'Accept': 'application/json'}

    ajaxOption = {
      method,
      headers,
      body,
      credentials: 'include'
    }
  }else{
    ajaxUrlString = ajaxUrlString + "?id=" + data.id;
  }

  // loadingアニメーション再生
  commit(types.UPDATE_LOADING, true);

  fetch(ajaxUrlString, ajaxOption)
    .then(function(res){
      // loadingアニメーション停止
      commit(types.UPDATE_LOADING, false);

      if(res.ok){
        return res.json();
      }else{
        // error
        commit(types.UPDATE_NOTIFICATION, "(network error)データ削除に失敗しました。\nインターネットに接続しているか確認してください。");
      }
    }).then(function(json){
      if( json.status != 1 ){
        // error
        commit(types.UPDATE_NOTIFICATION, "(app error)データ削除に失敗しました。\nページを更新してからお試しください。");
        return;
      }else{
        commit(types.UPDATE_NOTIFICATION, "正常にデータを削除しました");

        // 該当データをStoreから削除
        commit(types.DELETE_DATA_FROM_MONTHLY, idx);
      }
    });
  }
}

/**
 * フォーム入力内容を送信
 * @param  {Object}     Vuexオブジェクト
 * @param  {Object}     option連想配列
 */
export const sendForm = function({commit}, {edit, clearEditState, convertStateToAjaxData}){
  // 商品名と価格が入力済みなら送信処理を実行
  if(edit.title && edit.price){
    let _this = this;
    let sendData = Object.assign({}, edit);

    // localstateからAJAXパラメータのデータ構造に変換
    sendData = convertStateToAjaxData(sendData);

    // AJAXオプション設定
    let ajaxUrlString = ajaxUrl.edit;
    let ajaxOption = {};

    // AJAXオプションをproductionとdevで分ける
    if(process.env.NODE_ENV === 'production'){
      let method = "POST";

      //let body = JSON.stringify({start: yearmonth})
      // FormDataオブジェクト形式でPOSTデータを生成
      var body = new FormData();
      for(var i in sendData){
        body.append(i,sendData[i])
      }

      let headers = {'Accept': 'application/json'}

      ajaxOption = {
        method,
        headers,
        body,
        credentials: 'include'
      }
    }else{
      ajaxUrlString = ajaxUrlString + "?edit=" + edit.id;
    }

    // loadingアニメーション再生
    commit(types.UPDATE_LOADING, true);

    fetch(ajaxUrlString, ajaxOption)
      .then(function(res){
        // loadingアニメーション停止
        commit(types.UPDATE_LOADING, false);

        if(res.ok){
          // 通信エラーでないなら次のシーケンスへ移行
          return res.json()
        }else{
          // errorモーダル
          commit(types.UPDATE_NOTIFICATION, "(network error)データ更新に失敗しました。\nインターネットに接続しているか確認してください。");
        }
      }).then(function(json){
        if(json.isNew == 1 && json.status == 1){
          // 新規入力だったらフォーム入力内容を初期化
          clearEditState();
          //edit = Object.assign({},DEFAULT_EDIT_STATE);
        }
        if( json.status != 1 ){
          // error
          commit(types.UPDATE_NOTIFICATION, "(app error)データ更新に失敗しました。\nページを更新してからお試しください。");
        }else{
          commit(types.UPDATE_NOTIFICATION, "正常にデータを送信しました。");
        }
      });
  }
}

/**
 * 年間支出データを取得
 * @param  {Object}        Vuexオブジェクト
 * @param  {Number} year   ターゲットとなる年（YYYY)
 */
export const getYearlyData = function({commit}, year){
  let _this = this;

  // AJAXオプション設定
  let ajaxUrlString = ajaxUrl.yearly;
  let ajaxOption    = {};

  // AJAXオプションをproductionとdevで分ける
  if(process.env.NODE_ENV === 'production'){
    let method = "POST";

    //let body = JSON.stringify({start: year})
    // FormDataオブジェクト形式でPOSTデータを生成
    var body = new FormData();
    body.append("year", year);

    let headers = {'Accept': 'application/json'}

    ajaxOption = {
      method,
      headers,
      body,
      credentials: 'include'
    }
  }else{
    ajaxUrlString = ajaxUrlString + "?year=" + year;
  }

  // loadingアニメーション再生
  commit(types.UPDATE_LOADING, true);

  fetch(ajaxUrlString, ajaxOption)
    .then(function(res){
      // loadingアニメーション停止
      commit(types.UPDATE_LOADING, false);

      if(res.ok){
        return res.json();
      }else{
        // error
        commit(types.UPDATE_NOTIFICATION, "(network error)年間支出データ取得に失敗しました。\nインターネットに接続しているか確認してください。");
      }
    }).then(function(json){
      if( json.status != 1 ){
        // error
        commit(types.UPDATE_NOTIFICATION, "(app error)年間支出データ取得に失敗しました。\nページを更新してからお試しください。");
        return;
      }
      // 年データを更新
      commit(types.UPDATE_YEARLY_DATA, json);
    });
}

/**
 * FormTitleListを取得
 * @param  {Object}     Vuexオブジェクト
 */
export const getFormTitleList = function({commit}){
  // productionもdevもGETで取得
  let ajaxUrlString = ajaxUrl.formTitleList;
  let method = "GET";

  let headers = {'Accept': 'application/json'}

  let ajaxOption = {
    method,
    headers,
    credentials: 'include'
  }

  fetch(ajaxUrlString, ajaxOption)
    .then(function(res){
      if(res.ok){
        return res.json();
      }
    }).then(function(json){
      commit(types.UPDATE_FORM_TITLE_LIST, json.list);
    });
}
