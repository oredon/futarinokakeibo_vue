# futarinokakeibo_vue

思い出と共に出費も積み重ねよう。同棲、新婚、ルームシェア。楽しいお二人様暮らしの支出記録WEBアプリ。
以前React.jsで作成したWEBアプリケーションを　Vue.jsバージョン　に書き直したものです。

> React.js Version.
> [oredon/futarinokakeibo](https://github.com/oredon/futarinokakeibo)

## DEMO

[http://oredon.guitarkouza.net/kakeibovue](http://oredon.guitarkouza.net/kakeibovue)

ID/PW: admin/admin

## これは？

二人暮らし用の家計簿WEBアプリケーションです。cakePHP1.3ベースで作成しています。 LAMP環境が必要になります。2010年くらいに作ったもので、個人的に使用してきましたがこの度公開してみることにしました。

勉強がてらに作成したもののため賢くない実装も散見されるかもしれませんのでご利用にはご注意いただきますようお願い致します。

## 対応DBは？

cakePHPに準拠します。特にMySQLとSQLiteを推奨しています。 MySQLとSQLite用にテストデータをダンプしたファイルを同梱しています。

### test db dump file.

dumpファイルは　./conf/　ディレクトリに格納しました。

* mysql_kakeibo_clean.sql : MySQL用のクリーンdump
* mysql_kakeibo_testdata.sql : MySQL用のテストデータ込dump
* sqlite_kakeibo_clean.sql : SQLite用のクリーンdump
* sqlite_kakeibo_testdata.sql : SQLite用のテストデータ込dump

なお、ログインユーザとしてID: admin PW: admin ユーザを初期ユーザとしてdumpに含めています。

## Install

DocumentRoot直下にkakeiboディレクトリをアップし、cakePHPの設置同様tmpやcacheディレクトリにapache書き込み権限を与えます。あとはDBの作成をtest db dump file.を参考に作成してください。

## 同梱のVagrantfileについて

開発環境を用意する際、個人的に使用していたVagrantファイルになります。そのままvagrant upしてもただのまっさらなcentos6のVMで、プロビジョニングも特にしてません。Vagrantfile内に個人的なメモで環境構築時に実行したコマンドが載っていますがあくまでメモ書きになります。

Vagrant 1.8.6
Virtualbox 5.0.40
にて動作確認。

Vagrantfile抜粋

> config.vm.box = "centos/6"

> config.vm.network "forwarded_port", guest: 80, host: 10080

> config.vm.synced_folder "./", "/vagrant", :mount_options => ['dmode=777', 'fmode=666'], type:"virtualbox"

なお、PHPのバージョンは5.4.45を使用しました。

## ./_ conf 内のファイルについて

開発環境を作成した際に使用した設定ファイルです。

* httpd.conf : /etc/httpd/conf/httpd.conf に設置
* vhosts/ : /etc/httpd/conf/vhosts/ に設置
* pnp.ini : /etc/pnp.ini に設置
* my.cnf : /etc/my.cnf に設置

## フロントエンド開発について

Vue.jsのコンパイルにはwebpackを使用しています。

nodejs : v6.11.3
npm : 4.0.5

windows7 64bitマシンにて動作確認済みです。

### npm initialization

必要パッケージをインストールします。

```

cd ./htdocs/kakeibo/app/webroot/package
npm Install

```

### Webpack Dev Server (HMR)

LAMP不要ですぐにフロントエンドの確認・開発が可能。
AJAX周りはstub用のJSONファイルを参照します

* jsonファイル : ./htdocs/kakeibo/app/webroot/package/stub

```

cd ./htdocs/kakeibo/app/webroot/package
npm run dev

```

### Webpack production build

./htdocs/kakeibo/app/webroot/package/static/　にJSファイルが吐き出されます。

```

cd ./htdocs/kakeibo/app/webroot/package
npm run build

```

## 使用ライブラリ special thanks.（アルファベット順）

* [cakePHP](http://cakephp.jp/)
* [babel-core](https://github.com/babel)
* [babel-loader](https://github.com/babel/babel-loader)
* [babel-plugin-transform-object-rest-spread](https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread)
* [babel-preset-env](https://github.com/babel/babel-preset-env)
* [chart.js](https://github.com/chartjs/Chart.js)
* [cross-env](https://github.com/kentcdodds/cross-env)
* [css-loader](https://github.com/webpack/css-loader)
* [file-loader](https://github.com/webpack/file-loader)
* [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)
* [postcss-cssnext](https://github.com/MoOx/postcss-cssnext)
* [postcss-loader](https://github.com/postcss/postcss-loader)
* [style-loader](https://github.com/webpack-contrib/style-loader)
* [uglify-save-license](https://www.npmjs.com/package/uglify-save-license)
* [Vue.js](https://vuejs.org)
* [vue-chartjs](https://github.com/apertureless/vue-chartjs)
* [vue-datepicker-local](https://github.com/weifeiyue/vue-datepicker-local)
* [vue-loader](https://github.com/vuejs/vue-loader)
* [vue-router](https://github.com/vuejs/vue-router)
* [vue-template-compiler](https://www.npmjs.com/package/vue-template-compiler)
* [vuex](https://github.com/vuejs/vuex)
* [webpack](https://github.com/webpack)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
* [webpack-spritesmith](https://www.npmjs.com/package/webpack-spritesmith)

-----------------------------

### 制作
oredon

#### WEBサイト
[http://oredon.guitarkouza.net/](http://oredon.guitarkouza.net/)

#### twitter
[https://twitter.com/oredon_taisuke](https://twitter.com/oredon_taisuke)

:::::::::::::::::

#### HTML5 で3Dゲーム作りました
[http://is.guitarkouza.net/](http://is.guitarkouza.net/)

:::::::::::::::::

#### HTML5 で2Dゲーム作りました
[http://oredon.guitarkouza.net/](http://oredon.guitarkouza.net/)

:::::::::::::::::
