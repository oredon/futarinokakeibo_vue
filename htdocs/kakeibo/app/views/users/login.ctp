<?php
//var_dump($_SESSION);

if($session->check('Message.auth'))
	echo $session->flash('auth');
?>
<div class="loginBox">
<?php
echo $form->create('User',array('action'=>'login'));
echo $form->input('username',array('label'=>'ユーザID' , 'div' => false, 'type' => 'text'));
echo '<br /><br />';
echo $form->input('password',array('label'=>'パスワード' , 'div' => false));
echo $form->end('ログイン');
?>
<!-- loginBox --></div>

<!-- bundleのpreload -->
<script type="text/javascript">
var link = document.createElement('link');
link.rel = 'preload';
link.as = 'script';
link.href = '/kakeibo/package/static/lib.bundle.js';
document.head.appendChild(link);
</script>
<!-- /bundleのpreload -->