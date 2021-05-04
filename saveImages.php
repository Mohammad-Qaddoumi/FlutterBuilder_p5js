<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$data = file_get_contents('php://input',true);
if (count((array)json_decode($data,true)) === 0){
    die('Error');
}
$data = json_decode($data,true);
$dataBase64 = strval($data['base64']);
// echo "<img src = '$data'>";
$app_id = strval($data['app_id']);
$img_id = strval($data['img_id']);

list($type, $dataBase64) = explode(';', $dataBase64);
list(, $type) = explode('/',$type);
list(, $dataBase64)      = explode(',', $dataBase64);
$dataBase64 = base64_decode($dataBase64);

if ($dataBase64 === false) 
    throw new \Exception('base64_decode failed');

function file_force_contents($dir, $file, $contents)
{
    $parts = explode('/', $dir);
    $dir = '/storage/ssd1/250/16371250/public_html/';
    foreach($parts as $part)
    {
        if(!is_dir($dir .= "$part/")) 
            mkdir($dir);
    }
    $directory = "$dir$file";
    file_put_contents($directory, $contents);
}

try{
    // file_force_contents('C:/php_project/graduationProject/Design/cool/image.png', $data);
    file_force_contents("appImagesFile/$app_id", $img_id . '.' . $type, $dataBase64);
}
catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}

echo 'done';

?>
