<?php
$app_id =$_POST['App_id'];
$column=array();$data=array();
$column=explode(";",$_POST['column']);$data=explode(";",$_POST['data']);
$db_name     = "id16371250_maindata";
$sql_name    = "id16371250_qualityfirst";
$sql_pass    = "FirstQuality#43";
$server_name = "localhost";
$con = new mysqli($server_name, $sql_name, $sql_pass, $db_name);
//SELECT* FROM `qwer` WHERE `username`="ahmed" and `password`="12345"
$sql="SELECT* FROM `$app_id`where ";
foreach( $column as $i => $string )
{
    $sql.="`$string` = '$data[$i]' AND";
}$sql=substr($sql,0,-3);
$result=$con->query($sql);
if($row=$result->fetch_assoc())
echo json_encode($row);else echo '{"data":"null"}';
?>