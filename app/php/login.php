<?php
$data = array();
$name = $_POST['name'];
$image = $_POST['image'];
$url = $_POST['url'];
$description = $_POST['description'];
if (($name === '') or ($image === '') or ($url === '') or ($description === '')) {
	$data['text'] = 'Поля не заполнены!';
	$data['status'] = 'error';
}else{
	$data['status'] = 'OK';
	$data['text'] = 'Ура! Проект успешно добавлен.';
}
header("Content-type: application/json");
echo json_encode($data);
exit;

?>