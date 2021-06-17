<?php
$tablename='apps';
$db_name     = "id16371250_maindata";
$sql_name    = "id16371250_qualityfirst";
$sql_pass    = "FirstQuality#43";
$server_name = "localhost";
          $mysqli = new mysqli($server_name,$sql_name,$sql_pass ,$db_name );
if(isset($_POST['email']))
{ $email=$_POST["email"]; $_SESSION["loginState"]=false;
    $sql="SELECT * FROM `login` WHERE `email`='$email'";
    $result=$mysqli->query($sql);
     if($row = $result->fetch_assoc())
    {
        if(($row['password'])==($_POST['password']) && strtolower($row['email'])==strtolower($_POST['email']))
        {
        $_SESSION["email"]=$_POST['email'];
        $_SESSION["username"]=$row['username'];
        $_SESSION["loginState"]=true;
        } 
    }
}
if(isset($_SESSION["loginState"]))
    if($_SESSION['loginState'])
    $email=$_SESSION["email"];
    else
    {header("Location: https://less-code.000webhostapp.com");exit();}
else  { header("Location: https://less-code.000webhostapp.com");exit();}
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
         function f1($tablename,$columns,$mysqli){
             if(isset($_GET['ACTION']))
         {
             if ($_GET['ACTION'] == "delete")
             {
                 $sql="DELETE FROM `$tablename` WHERE `id`=".$_GET['id'];
                 $mysqli->query($sql);
             }else if($_GET['ACTION'] == "Edit name"){
             $sql="UPDATE `$tablename` SET `id`=".$_GET['id'].",";
                foreach ($columns as $value) {
                 $sql.=$value."='".$_GET[$value]."',";
                }$sql=substr($sql, 0, -1);$sql.="where `id` =".$_GET['id'];
               $mysqli->query($sql);
             }else if($_GET['ACTION'] == "Create")
             {$values=array();$w=0;
                 $sql="INSERT INTO `$tablename`(";
                  foreach ($columns as $value) {
                 $sql.=$value.",";$values[$w]=$_GET[$value];$w++;
                }$sql=substr($sql, 0, -1);
                 $sql.=") values (";
                   foreach ($values as $value) {
                 $sql.="'$value' ,";
                }$sql=substr($sql, 0, -1);$sql.=")";
                 $mysqli->query($sql);echo $sql;
             }
         }
         }
       ?>
           <div class="row justify-content-center" >
                 <table class = "table" >
                          <thead>
                                 <tr>
                                   <?php $columns=array();$i=0;
                                   $sql="SHOW COLUMNS FROM $tablename";
                                   $result = $mysqli->query($sql);
                                   while($row = mysqli_fetch_array($result)){
                                       $column=$row['Field'];
                                       if($column!="id" and $column!="design_json"	and $column!="created_at" and $column!="version"){
                                    echo "<th>$column </th>";$columns[$i]=$column;$i++;
                                     }}f1($tablename,$columns,$mysqli);
                                   ?>
                                 </tr>
                                  </thead>
                                 
                                     <?php
                                     $sql="select* FROM $tablename";
                                     
                                      $result = $mysqli->query($sql);$srow;
                                    while($row = mysqli_fetch_array($result)){$srow=$row;$appId;
                                   echo "<tr><form>";
                                   for($j=1;$j<count($srow)/2;$j++){
                                       if(isset($columns[$j-1]))$column=$columns[$j-1];else $column="";
                                       if($column!="id" and $column!="design_json"	and $column!="created_at" and $column!="version" and $column!="")
                                       {$data=$row[$j];
                                       if($columns[$j-1]=="app_name")
                                      echo "<td><input type='text' value='$data' name='".$columns[$j-1]."'>
                                      </td>"; else
                                      echo "<input type='hidden' value='$data' name='".$columns[$j-1]."'>
                                      <td><lable>$data</lable>
                                      </td>";
                                      if($columns[$j-1]=="app_id")
                                      {$appId=$data;}
                                       }}
                                      $id=$row['id'];
                                      echo "<td><input type='hidden' name='id' value='$id'>
                                      <input type='submit' value='delete' name='ACTION'> 
                                      <input type='submit' value='Edit name' name='ACTION'>
                                      </form>
                                      <form action='../Design/index.php' method='post'>
                                      <input name='email' type='hidden' required  value='@email.com'>
                                      <input name='name' type='hidden' required  value='".$_SESSION["username"]."'>
                                      <input type='hidden' name='appid' value='$appId'>
                                      <input type='submit' value='Start designing' name='ACTION'>
                                      </form>
                                      
                                      <form  action='index.php' method='post'>
                                       <input type='hidden' name='appid' value='$appId'>
                                      <input type='submit' value='Open app control panel' name='ACTION'>
                                      </form>
                                      </td>
                                      </tr>
                                      ";
                                    }
                                   echo '<tr><form>';
                                   for($j=1;$j<4;$j++)
                                       {if(isset($columns[$j-1]))$column=$columns[$j-1];else $column="";
                                           if($column!="id" and $column!="design_json"	and $column!="created_at"and $column!="version")
                                           echo "<td><input type='text' value='' name='".$columns[$j-1]."'></td>";
                                           
                                       }
                                       echo '
                                       <td><input type="submit" value="Create" name="ACTION" </td>
                                       </form></tr>
                                       ';
                                     ?>
                   </table> 
          </div>
</body>
</html>