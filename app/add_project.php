<?php
$data = array();
$name = $_POST['name'];

if ($name === ''){
	$data['text'] = 'Заполните имя!';
	$data['status'] = 'error';
}else{
	$data['status'] = 'OK';
	$data['text'] = 'Вы молодец, не забыли заполнить имя!';
}
header("Content-type: application/json");
echo json_encode($data);
exit;

?>