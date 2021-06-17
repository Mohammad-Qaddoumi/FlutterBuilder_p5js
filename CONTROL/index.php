<?php
if(isset($_POST["appid"]))
   {$app_id=$_POST["appid"];echo $app_id; }
   else
   {
    //   header("Location: https://less-code.000webhostapp.com");
    //   exit();
    $app_id="qwer";
        }
?>
<!DOCTYPE HTML>
<html>
    <head>
        <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
       <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
     </head>
<body width="100%">
  <div class="container">
   <?php
   
   
   $db_name     = "id16371250_maindata";
$sql_name    = "id16371250_qualityfirst";
$sql_pass    = "FirstQuality#43";
$server_name = "localhost";
          $mysqli = new mysqli($server_name,$sql_name,$sql_pass ,$db_name );
         
         function f1($app_id,$columns,$mysqli){
             if(isset($_GET['ACTION']))
         {
             if ($_GET['ACTION'] == "delete")
             {
                 $sql="DELETE FROM `$app_id` WHERE `id`=".$_GET['id'];
                 $mysqli->query($sql);
             }else if($_GET['ACTION'] == "update"){
             $sql="UPDATE `$app_id` SET `id`=".$_GET['id'].",";
                foreach ($columns as $value) {
                 $sql.=$value."='".$_GET[$value]."',";
                }$sql=substr($sql, 0, -1);$sql.="where `id` =".$_GET['id'];
               $mysqli->query($sql);
             }else if($_GET['ACTION'] == "Add")
             {$values=array();$w=0;
                 $sql="INSERT INTO `$app_id`(";
                  foreach ($columns as $value) {
                 $sql.=$value.",";$values[$w]=$_GET[$value];$w++;
                }$sql=substr($sql, 0, -1);
                 $sql.=") values (";
                   foreach ($values as $value) {
                 $sql.="'$value' ,";
                }$sql=substr($sql, 0, -1);$sql.=")";
                 $mysqli->query($sql);
             }if(isset($_POST["addColumn"])){
                 $d=$_POST["culomnName"];
             $sql="ALTER TABLE `qwer` ADD `$d` TEXT NULL";
                  $mysqli->query($sql);
                 
             }
         }
         }
       ?>
           <div class="row justify-content-center" >
                 <table class = "table" >
                          <thead>
                                 <tr>
                                   <?php $columns=array();$i=0;
                                   $sql="SHOW COLUMNS FROM $app_id";
                                   $result = $mysqli->query($sql);
                                   while($row = mysqli_fetch_array($result)){
                                       $column=$row['Field'];
                                       if($column!="id"){
                                    echo "<th>$column </th>";$columns[$i]=$column;$i++;
                                     }}f1($app_id,$columns,$mysqli);
                                   ?>
                                 </tr>
                                  </thead>
                                 
                                     <?php
                                     $sql="select* FROM $app_id";
                                     
                                      $result = $mysqli->query($sql);$srow;
                                      
                                      
                                   while($row = mysqli_fetch_array($result)){$srow=$row;
                                   echo "<tr><form>";
                                   for($j=1;$j<count($row)/2;$j++){$data=$row[$j];
                                   if($data==null)$data="";if($column[$j-1]==null)$column[$j-1]="";
                                      echo "<td><input type='text' value='$data' name='".$columns[$j-1]."'>
                                      </td>"; }
                                      $id=$row['id'];
                                      echo "<td><input type='hidden' name='id' value='$id'>
                                      <input type='submit' value='delete' name='ACTION'> 
                                      <input type='submit' value='update' name='ACTION'> 
                                      </td></tr></form>";
                                   }
                                   
                                   echo '<tr><form>';
                                   for($j=1;$j<count($srow)/2;$j++)
                                       {echo "<td><input type='text' value='' name='".$columns[$j-1]."'></td>";}
                                       echo '
                                       <td><input type="submit" value="Add" name="ACTION" </td>
                                       </form></tr></tr>
                                       ';
                                     ?>
                   </table> 
                   <form method="post">
                       <input type="text" name="culomnName" value="addColumn">
                       <input type="submit" name="addColumn">
                   </form>
          </div>
</body>
</html>