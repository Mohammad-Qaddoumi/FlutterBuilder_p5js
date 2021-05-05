<?php

$data = file_get_contents('php://input',true);
$json = json_decode($data,true);
$sql = "";
// $sql = "SELECT room_id FROM `apps` WHERE app_id=\"25\"";
if (count((array)$json) === 0){
    $sql = "SELECT room_id FROM `apps` WHERE app_id=25";
}
elseif(isset($_POST['app_id']))
{
    $app_id = $_POST['app_id'];
    $sql = "SELECT room_id FROM `apps` WHERE app_id=$app_id";
}
else  
{
    $app_id = $json["app_id"];
    $sql = "SELECT room_id FROM `apps` WHERE app_id=$app_id";
}
$db_name     = "id16371250_maindata";
$sql_name    = "id16371250_qualityfirst";
$sql_pass    = "FirstQuality#43";
$server_name = "localhost";

$con = mysqli_connect($server_name, $sql_name, $sql_pass, $db_name);
$result = $con->query($sql);
$row = $result->fetch_assoc();
echo $row["room_id"];



?>
