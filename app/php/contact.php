<?php
$data = array();
$name = $_POST['name'];
$mail = $_POST['mail'];
$massage = $_POST['massage'];
if (($name === '') or ($mail === '') or ($massage === '')) {
	$data['text'] = 'Поля не заполнены!';
	$data['status'] = 'error';
}else{
	$data['status'] = 'OK';
	$data['text'] = 'Сообщение успешно отправлено, мы обязательно с вами свяжемся.';
}
header("Content-type: application/json");
echo json_encode($data);
exit;

?>