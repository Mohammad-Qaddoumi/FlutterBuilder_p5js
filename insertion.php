<?php
$app_id =$_POST['App_id'];
$column=array();$data=array();
$column=explode(";",$_POST['column']);$data=explode(";",$_POST['data']);
$db_name     = "id16371250_maindata";
$sql_name    = "id16371250_qualityfirst";
$sql_pass    = "FirstQuality#43";
$server_name = "localhost";
$con = new mysqli($server_name, $sql_name, $sql_pass, $db_name);
$sql="INSERT INTO `$app_id`(";
foreach($column as $string){ $sql.="`$string`,";}$sql=substr($sql,0,-1);
$sql.=") VALUES (";
foreach($data as $string){ $sql.="'$string',";}$sql=substr($sql,0,-1);
$sql.=")";
$con->query($sql);
?>