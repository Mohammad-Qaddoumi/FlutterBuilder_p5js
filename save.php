<?php

$data = file_get_contents('php://input',true);
if (count((array)json_decode($data,true)) === 0){
    die('Error');
}

$db_name  = "id16371250_maindata";
$sql_name = "id16371250_qualityfirst";
$sql_pass = "FirstQuality#43";
$server_name = "localhost";
$table = "apps";

$date = date('Y-m-d H:i:s');
$sql = "UPDATE `$table` SET `design_json` = '$data', `created_at` = '$date' WHERE `$table`.`app_id` = 'qwer'";

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
