<?php
$data = array();
$mail = $_POST['name'];
$password = $_POST['password'];
if (($name === '') or ($password === '')) {
	$data['text'] = 'Поля не заполнены!';
	$data['status'] = 'error';
}else{
	$data['status'] = 'OK';
	$data['text'] = 'Успешная авторизация.';
}
header("Content-type: application/json");
echo json_encode($data);
exit;

?>