<?php
$app_id=$_POST["App_Id"];
$db_name     = "id16371250_maindata";
$sql_name    = "id16371250_qualityfirst";
$sql_pass    = "FirstQuality#43";
$server_name = "localhost";
          $mysqli = new mysqli($server_name,$sql_name,$sql_pass ,$db_name );
          $data=array();
          $sql="SELECT * FROM `$app_id`";
          $result=$mysqli->query($sql);$i=0;
          while($row = $result->fetch_assoc())
          {
              $data[$i]=$row;$i++;
          }
          $data=json_encode($data);
          echo '{"data":'.$data.',"count":'.$i.'}';

?>