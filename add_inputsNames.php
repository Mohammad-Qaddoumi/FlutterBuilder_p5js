<?php

$data = file_get_contents('php://input',true);
$json = json_decode($data,true);
$app_id = "";
$old_columnName = "";
$new_columnName = "";
if (count((array)$json) === 0){
    die("Error");
}
else  
{
    $app_id = $json["app_id"];
    $old_columnName = $json["old_columnName"];
    $new_columnName = $json["new_columnName"];
}

if($old_columnName === $new_columnName)
    die("duplicate");

function check_if_table_exist($table_name)
{
    $sql = "SELECT * FROM `information_schema`.`TABLES` WHERE `TABLE_SCHEMA` = ? AND `TABLE_NAME` = ?";
    $db_name     = "id16371250_maindata";
    $sql_name    = "id16371250_qualityfirst";
    $sql_pass    = "FirstQuality#43";
    $server_name = "localhost";
    $link = mysqli_connect($server_name, $sql_name, $sql_pass, $db_name);
    if($stmt = $link->prepare($sql)){
        $stmt->bind_param("ss", $param_dbName,$param_tableName);
        
        $param_dbName = $db_name;
        $param_tableName = $table_name;
        
        if($stmt->execute()){
            $stmt->store_result();
            
            if($stmt->num_rows > 0){
                echo "<br>" . "This table is already taken.";
                $stmt->close();
                return TRUE;
            } else{
                echo "<br>" . "table not exist";
                $stmt->close();
                return FALSE;
            }
        } else{
            echo "<br>" . "Oops! Something went wrong. Please try again later.";
        }
        $stmt->close();
    }
}
function check_if_column_exist($old,$table_name)
{
    $sql = "SELECT * FROM `information_schema`.`COLUMNS` WHERE `TABLE_SCHEMA` = ? AND `TABLE_NAME` = ? AND `COLUMN_NAME` = ?";
    $db_name     = "id16371250_maindata";
    $sql_name    = "id16371250_qualityfirst";
    $sql_pass    = "FirstQuality#43";
    $server_name = "localhost";
    $link = mysqli_connect($server_name, $sql_name, $sql_pass, $db_name);
    if($stmt = $link->prepare($sql)){
        $stmt->bind_param("sss", $param_dbName,$param_tableName,$param_columnName);
        
        $param_dbName = $db_name;
        $param_tableName = $table_name;
        $param_columnName = $old;
        
        if($stmt->execute()){
            $stmt->store_result();
            
            if($stmt->num_rows > 0){
                echo "<br>" . "This column is already taken.";
                $stmt->close();
                return TRUE;
            } else{
                echo "<br>" . "column not exist";
                $stmt->close();
                return FALSE;
            }
        } else{
            echo "<br>" . "Oops! Something went wrong. Please try again later.";
        }
        $stmt->close();
    }
}
function change_column_name($old,$table_name,$new)
{
    $db_name     = "id16371250_maindata";
    $sql_name    = "id16371250_qualityfirst";
    $sql_pass    = "FirstQuality#43";
    $server_name = "localhost";

    $conn = new mysqli($server_name, $sql_name, $sql_pass, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // $sql = "ALTER TABLE $table_name RENAME COLUMN $old TO $new";
    $sql = "ALTER TABLE $table_name CHANGE COLUMN $old $new VARCHAR(255) NOT NULL";

    if ($conn->query($sql) === TRUE) {
        echo "<br>" . "name changed";
        $conn->close();
        return TRUE;
    } else {
        echo "<br>" . "error in name change" . $conn->error;
        $conn->close();
        return FALSE;
    }
}
function add_new_column($table_name,$new)
{
    $db_name     = "id16371250_maindata";
    $sql_name    = "id16371250_qualityfirst";
    $sql_pass    = "FirstQuality#43";
    $server_name = "localhost";

    $conn = new mysqli($server_name, $sql_name, $sql_pass, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "ALTER TABLE $table_name ADD $new VARCHAR(255) NOT NULL";

    if ($conn->query($sql) === TRUE) {
        echo "<br>" . "column added";
        $conn->close();
        return TRUE;
    } else {
        echo "<br>" . "column not added" . $conn->error;
        $conn->close();
        return FALSE;
    }
}
function create_new_table($table_name,$new)
{
    $db_name     = "id16371250_maindata";
    $sql_name    = "id16371250_qualityfirst";
    $sql_pass    = "FirstQuality#43";
    $server_name = "localhost";

    $conn = new mysqli($server_name, $sql_name, $sql_pass, $db_name);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "CREATE TABLE $table_name (
                id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                $new VARCHAR(255) NOT NULL
    )";

    if ($conn->query($sql) === TRUE) {
        echo "<br>" . "table created";
        $conn->close();
        return TRUE;
    } else {
        echo "<br>" . "tabel not created" . $conn->error;
        $conn->close();
        return FALSE;
    }
}

$result = check_if_table_exist($app_id);
if($result)// Table exist
{
    $result = check_if_column_exist($old_columnName,$app_id);
    if($result)// Column exist
    {
        $result = change_column_name($old_columnName,$app_id,$new_columnName);
        if($result)
            echo "<br>" . "Done";
        else
            echo "<br>" . "Error1";
    }
    else // New Column
    {
        $result = add_new_column($app_id,$new_columnName);
        if($result)
            echo "<br>" . "Done";
        else
            echo "<br>" . "Error2";
    }
}
else // New Table
{
    $result = create_new_table($app_id,$new_columnName);
    if($result)
        echo "<br>" . "Done";
    else
        echo "<br>" . "Error3";
}

?>