<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');


$data = file_get_contents('php://input',true);
$json = json_decode($data,true);
if (count((array)$json) === 0)
{
    die("Error : No key provided");
}

$file = fopen("test.json","w");

fwrite($file, $data);

fclose($file);

echo "success";
?>