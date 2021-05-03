<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = file_get_contents('php://input',true);
    if (count((array)json_decode($data,true)) === 0){
        die('Error');
    }
    $data = json_decode($data,true);
    $app_id = strval($data['app_id']);
    $img_id = strval($data['img_id']);
    $type = strval($data['type']);
    
    
    $url = "https://less-code.000webhostapp.com/appImagesFile/$app_id/$img_id.$type";
    $binary = file_get_contents($url);
    $dataBase64 = "data:image/$type;base64," . base64_encode($binary);
    // header("content-type: image/$type");
    echo $dataBase64;
}
else{
    $app_id = "25";
    $img_id = "93801d1f-d18a-4778-8937-2d99b9f8c03b";
    $type = "png";
    $url = "https://less-code.000webhostapp.com/appImagesFile/$app_id/$img_id.$type";
    $binary = file_get_contents($url);
    $dataBase64 = "data:image/$type;base64," . base64_encode($binary);
    // header("content-type: image/$type");
    echo $dataBase64;
}


?>
