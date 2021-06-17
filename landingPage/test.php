<?php
$status = session_status();
if($status == PHP_SESSION_NONE){
    session_start();
    session_regenerate_id(true);
}elseif($status == PHP_SESSION_ACTIVE){
    session_regenerate_id(true);
}
if(isset($_SESSION["loginState"]))
    if(!$_SESSION["loginState"])
   { echo '
    <script>alert("login failed please try again")</script>';
   }
$_SESSION["loggedin"] = true;

if(isset($_POST["email"]))
{
 $db_name     = "id16371250_maindata";
$sql_name    = "id16371250_qualityfirst";
$sql_pass    = "FirstQuality#43";
$server_name = "localhost";
$con = new mysqli($server_name, $sql_name, $sql_pass, $db_name);
$email=$_POST["email"];
$password=$_POST["password"];
$username=$_POST["username"];
$sql="INSERT INTO `login`(`email`, `username`, `password`) VALUES ('$email','$username','$password')";
$con->query($sql);
//header("Location: https://less-code.000webhostapp.com/CONTROL/UserControlPanel.php");
//exit();
}

?>

<!DOCTYPE html>
<html lang="en">
      <style>
        body{
    background-image: url(loginb.jpg);
    height: 100vh;
    background-size: cover;
    background-position: center;
}
.login-page{
width: 360px;
padding: 10% 0 0;
margin: auto;

}
.form{
position: relative;
z-index: 1;
background: rgba(76, 46, 185, 0.658);
max-width: 360px;
margin:0 auto 100px ;
padding: 45px;

}
.form input{
font-family:cursive;
outline: 1;
background: rgba(222, 226, 248, 0.993);
width: 100%;
border: 0;
margin: 0 0 15px;
padding: 15px;
box-sizing: border-box;
font-size: 16px;
}
.form button {
font-family: cursive;
text-transform: uppercase;
outline: 0;
background: rgba(131, 208, 211, 0.815);
width: 100%;
border: 0;
padding: 15px;
color: rgb(0, 7, 7);
font-size: 16px;
cursor: pointer;

}
.form button:hover, .form button:active{
    background: rgba(79, 147, 150, 0.815);
}
.form .message{
    margin: 15px 0 0;
    color: rgb(3, 41, 39);
    font-size: 18px;
}
.form .message a{
    color: darkred;
    text-decoration:none;
}
.form .register-form{
    display: none;
}
    </style>
</head>
<body>
    <div class="login-page">
 <div class="form">
 <form  method="POST" class="register-form">
     <input type="text" name="username" placeholder="user name"/>
     <input type="password" name="password" placeholder ="password"/>
     <input type="text" name="email" placeholder ="email"/>
<button  type="submit" >register</button>
<p class="message"  >Already registered?
    <a href="#">login</a>
</p>
</form>
<form class="login-form" action='../CONTROL/UserControlPanel.php' method='post' >
<div>
    <label for='email' >Email : </label>
    <input type="text" name="email" placeholder="email"/>
</div>
<div>
    <label for='password' >password : </label>
 <input type="pasword" name="password" placeholder="password"/>
</div>
<button type="submit"> login</button>
<p class="message">not registered?<a href="#">register</a></p>

</form>
</div>
</div>

<script src='https://code.jquery.com/jquery-3.2.1.min.js'></script>
<script>
   $('.message a').click(function(){
$('form').animate({height:"toggle", opacity:"toggle"},"slow");
   } );
</script>
</body>
</html>