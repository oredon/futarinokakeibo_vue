var path = require('path');
var webpack = require('webpack');
var saveLicense = require('uglify-save-license');
var SpritesmithPlugin = require('webpack-spritesmith');

module.exports = {
  // エントリーポイントとなるJSファイル
  entry: './src/main.js',
  // 出力設定
  output: {
    // 基本的な出力設定
    path: path.resolve(__dirname, './static'),
    publicPath: '/static/',
    filename: 'bundle.js',

    //// router.jsのコンポーネント名に分割して出力し、JSファイル非同期取得化 router.jsの変更も忘れずに行うこと
    //chunkFilename: 'js/[name].chunk.js'

  },
  // 使用モジュール設定
  module: {
    rules: [
      // .vueファイル <style>内でcssnextの記法を使用するためpostcss-cssnextをロード
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          cssModules: {
            localIdentName: '[path][name]---[local]---[hash:base64:5]',
            camelCase: true
          },
          postcss: [require('postcss-cssnext')()]
        },
        exclude: "/node_modules/"
      },
      // .js babelのみ使用
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: "/node_modules/"
      },
      // .css CSSModulesを使用 かつ cssファイル内でcssnextの記法を使用
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader?modules" },
          { loader: "postcss-loader" }
        ],
        exclude: "/node_modules/"
      },
      // images spritesmithを使用したいためfile-loaderで読み込み
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        },
        exclude: "/node_modules/"
      }
    ]
  },
  // .vueファイル内で<template>を使用するためvue.esm.jsを読み込む
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  // sprite画像のパスをproductionとdevで共用できるようにproxy設定
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    proxy: {
      '/kakeibo/package/static/sprite01.png': {
        target: 'http://localhost:8080/static/sprite01.png',
        secure: false,
        pathRewrite: {'^/kakeibo/package/static/sprite01.png' : ''}
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  // ライブラリ群とアプリケーションとで分割するなら以下を有効 (http://webpack.github.io/docs/code-splitting.html)
  module.exports.entry = {
    app: "./src/main.js",
    lib: ["vue", "vuex", "vue-router", "vue-datepicker-local", "vue-chartjs", "chart.js", "isomorphic-fetch"],
  }

  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    // jsファイル内で　process.env.NODE_ENV === 'production'　で分岐させるために変数を定義
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // JSの圧縮時、ライセンスの記載を消さないようにする
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: saveLicense,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // ライブラリ群とアプリケーションとで分割するなら以下を有効 (http://webpack.github.io/docs/code-splitting.html)
    new webpack.optimize.CommonsChunkPlugin({
      name:"lib", filename:"lib.bundle.js"
    }),
    // CSSSprite画像の生成
    new SpritesmithPlugin({
      src: {
        cwd: './src/sprite/',
        glob: '*.png'
      },
      target: {
        image: './static/sprite01.png',
        css: './src/style/sprite01.css'
      },
      apiOptions: {
        cssImageRef: '/kakeibo/package/static/sprite01.png',
        cssOpts: {
          cssClass: function (item) {
            return '.' + item;
          }
        }
      },
    })/*,
    new SpritesmithPlugin({
      src: {
        cwd: './src/images/sprite_assets02/',
        glob: '*.png'
      },
      target: {
        image: './app/images/sprite02.png',
        css: './src/scss/_sprite02.scss'
      },
      apiOptions: {
        cssImageRef: '/images/sprite02.png'
      }
    })*/
  ])
}
