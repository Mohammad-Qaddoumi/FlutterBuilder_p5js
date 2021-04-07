<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

$data = file_get_contents('php://input',true);
$json = json_decode($data,true);
if (count((array)$json) === 0){
    die;
}

if(isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on')   
    $url = "https://";   
else  
    $url = "http://";    
$url .= $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];   

if(strpos($url, 'localhost') !== false)
{   
    $db_name  = "testdata";
    $sql_name = "root";
    $sql_pass = "";
} 
else
{
    $db_name  = "id16371250_maindata";
    $sql_name = "id16371250_qualityfirst";
    $sql_pass = "FirstQuality#43";
}

$server_name = "localhost";
$table = "apps";

$date = date('Y-m-d H:i:s');
$sql = "UPDATE `$table` SET `design_json` = '$data', `created_at` = '$date' WHERE `$table`.`app_id` = '25'";

$con = mysqli_connect($server_name, $sql_name, $sql_pass, $db_name);

if (!$con) {
    die( "Database Connection Error..." . mysqli_connect_error());
}

$result = $con->query($sql);

if ($result === TRUE) {
    echo "Updated successfully";
} else {
    echo "Error: " . $sql . "<br/>" . $con->error;
}
$con->close();

?>