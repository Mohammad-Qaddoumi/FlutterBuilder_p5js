<?php 

echo "<style>
        *{
            font-size: 1.5em;
            padding:0.1em;
        }
    </style>
    <form action='./public/index.php' method='post'>
    <label for='email' >Email : </label>
    <input name='email' type='email' required  value='email@email.com'>
    <input type='submit' value='Submit'>
    </form>
";

?>
