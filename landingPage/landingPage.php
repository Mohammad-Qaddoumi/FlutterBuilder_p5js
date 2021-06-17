<?php?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>codeless</title>
  <style>
    * {
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, Helvetica, sans-serif;
    background: #333;
    color: #fff;
    height: 100vh;
    line-height: 1.6;
    overflow: hidden;
  }
  
  .container {
    width: 100%;
    height: 100%;
 
    overflow-y: scroll; 
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
  }
  
  .lead {
      color: black;
    font-size: 1.5rem;
  }
  
  .navbar {
    position: fixed;
    top: 0;
    z-index: 1;
    display: flex;
    width: 100%;
    height: 60px;
    background: rgba(0,0,0,0.7);
  }
  
  .navbar ul {
    display: flex;
    list-style: none;
    width: 100%;
    justify-content: center;
  }
  
  .navbar ul li {
    margin: 0 1rem;
    padding: 1rem;
  }
  
  .navbar ul li a {
    text-decoration: none;
    text-transform: uppercase;
    color: #f4f4f4;
  }
  
  .navbar ul li a:hover {
    color: rgb(55, 0, 255);
  }
  
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100vh;
   
    scroll-snap-align: center;
  }
  
  section h1 {
    font-size: 4rem;
  }
  
  
  section#home {
    background: url('vojtech-bruzek-J82GxqnwKSs-unsplash.jpg') no-repeat center center/cover;;
  }
  
  section#about {
    background: url('sigmund-LCun3uxh-z0-unsplash.jpg') no-repeat center center/cover;;
  }
  
  section#service {
    background: url('mobile_pc.jpg') no-repeat center center/cover;;
  }
  
  section#contact {
    background: url('2nd\ page.jpg') no-repeat center center/cover;;
  }
  .cont{
    text-align: center;
    margin-top: 360px;
  }
  .btn{
    border:1xp solid red;
    background: cyan;
    padding: 10px 20px;
    font-size: 20px;
    font-family: monospace;
    cursor: pointer;
    margin: 10px;
  }
  
  </style>
</head>
<body>
  <div class="container">
    <nav class="navbar">
        <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#service">Service</a></li>
            <li><a href="#contact">Sign in</a></li>
          </ul>C
        </nav>
    <section id="home">
      <h1>codeless</h1>
      <p class="lead">the place where u could get creative</p>
    </section>
    <section id="about">
        <h1>what is codeless</h1>
        <p class="lead">codeless is a project created by 5 university student to help people create <br>their simple yet effective applications that are market ready and easily maintainablez 

        </p>
    </section>
    <section id="service">
        <h1>Service</h1>
        <p class="lead">we provide the tools necesseary<br>for our clients to create what they need without any prior knowledge about programming all you need is your imagination </p>
    </section>
    <section id="contact">
<div  class= "cont">

<form action="test.php">
  <input class="btn btn1" type="submit" value="sign in" />
</form>
</div>
</body>
</html>