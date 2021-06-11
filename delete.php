<?php 

$data = file_get_contents('php://input',true);
$json = json_decode($data,true);
$app_id =  $image_id = "";
if (count((array)$json) === 0)
{
    die("Error");
}
else
{
    $app_id = $json["app_id"];
    $image_id = $json["image_id"];
}
$dir = "/storage/ssd1/250/16371250/public_html/appImagesFile/$app_id";
$files = scandir($dir);
foreach($files as &$f)
{
    if(strpos($f, $image_id) !== false)
    {
        echo unlink($dir . "/$f");
        break;
    }
}

?>