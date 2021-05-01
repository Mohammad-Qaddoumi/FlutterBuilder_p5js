<?php 
session_start();
session_regenerate_id(true);

if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) 
{
    header("location: ../connect.php");
    exit;
}
// echo '<pre>';
// print_r ($_POST);
// echo '</pre>';

if( $_SERVER["REQUEST_METHOD"] === "POST" )
{
    $email = 'email@computer.com';
    $user_name = 'user_name';
    $app_id  = '25';

    // if(isset($_SESSION['email']))
    if(isset($_POST['email']))
    {
        $email = $_POST['email'];
    }
    if(isset($_POST['name']))
    {
        $user_name = $_POST['name']; 
    }
    if(isset($_POST['appid']))
    {
        $app_id = $_POST['appid'];
    }

    $room_id = 'roomid';
    $url = 'https://less-code.000webhostapp.com/recieve2.php';
    $json = json_encode(['app_id' => "$app_id"]); 
    
    $options = ['http' => [
        'method' => 'POST',
        'header' => 'Content-type:application/json',
        'content' => $json
    ]];
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $design = $response;
}
else 
{
    header("location: ../connect.php");
    exit;
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codeless</title>

    <link rel="shortcut icon" href="./assets/favicon.ico" >
    <link rel="icon" type="image/gif" href="./assets/animated_favicon1.gif" >

    <link rel="stylesheet" href="./styles/body.css" />
    <link rel="stylesheet" href="./styles/header_footer.css" />
    <link rel="stylesheet" href="./styles/mainContant.css">
    <link rel="stylesheet" href="./styles/canves.css">
    <link rel="stylesheet" href="./styles/details.css">
    <link rel="stylesheet" href="./styles/add_image.css" >

    <script>
        const EMAIL =  <?php echo json_encode($email); ?>;
        const APP_ID =  <?php echo json_encode($app_id); ?>;
        const ROOM_ID =  <?php echo json_encode($room_id); ?>;
        const USER_NAME =  <?php echo json_encode($user_name); ?>;
        let DESIGN = `<?php echo $design; ?>`;
        try{
            DESIGN = DESIGN.replace(/(\r+|\n+)/g, " ");
            DESIGN = JSON.parse( DESIGN );
        }
        catch(e){
            DESIGN = {};
        }
    </script>

</head>

<body>

    <header class="mainheader">
        <div class="header logo">
            <h3>Codeless</h3>
        </div>
    </header>
    
    <div class="mainContant">
        <div class="flex-start">

            <div id="sketch"> </div>

            <div class="details">

                <div class="menu" >
                    <input type="radio" id="property" name="mytabs" checked="checked" >
                    <label for="property">Property</label>
                    <input type="radio" id="tree" name="mytabs">
                    <label style="display:flex;" for="tree">
                        <div>Tree</div>
                        <svg class="plusBtn fas fa-plus" viewBox="0 0 100 100" y="0px" x="0px"   width="30px" height="30px"  >
                            <g class="ldl-scale" style="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);" >
                            <g ><line y2="46.02" x2="19.11" y1="59.83" x1="48.26" stroke-miterlimit="10" stroke-linejoin="round" 
                            stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line>
                            <line y2="59.83" x2="25.07" y1="53.73" x1="33.21" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line></g>
                            <path d="M58.71,81.93l-1.73-31.79l11.83-19.45l-4.83-4.92L52.56,41.29h-1.73L36.25,21.38l-5.36,5.31L45.23,51.7l-1.65,30.23 c-0.18,3.33-1.28,6.49-3.12,8.94L37.37,95h27.56l-3.09-4.13C59.99,88.41,58.89,85.26,58.71,81.93z" 
                            stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="#C69C6D" style="stroke:rgb(51, 52, 53);fill:rgb(198, 156, 109);" ></path>
                            <line y2="5" x2="35.02" y1="21.38" x1="36.25" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line>
                            <g  ><line y2="6.71" x2="63.75" y1="25.77" x1="63.98" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line>
                            <line y2="11.24" x2="73.68" y1="14.11" x1="63.84" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line></g>
                            <g  ><line y2="15.68" x2="14.9" y1="26.69" x1="30.88" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line>
                            <line y2="25.65" x2="10.29" y1="19.31" x1="20.18" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line></g>
                            <g  ><line y2="25.08" x2="87.25" y1="30.69" x1="68.81" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line>
                            <line y2="35.33" x2="89.71" y1="27.36" x1="80.95" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line></g>
                            <g  ><line y2="48.16" x2="79.58" y1="58.19" x1="54.84" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line>
                            <line y2="58.19" x2="78.03" y1="52.09" x1="69.89" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" stroke-width="3.5" stroke="#333435" fill="none" style="stroke:rgb(51, 52, 53);" ></line></g>
                        </svg>
                        
                    </label>
                </div>
            
                <div class="container">
                    <div class="menuTool">
                        <select class="screen-collection transition-animation" >
                            <option selected="selected" value="0" >Screen 1</option>
                        </select>
                        <!-- <div class="oriantaionDiv">
                            <input type="checkbox" id="oriantaion" class="oriantaion">
                            <label for="oriantaion" class="oriantaionLabel">
                                <svg class="fas fa-sync" xml:space="preserve" viewBox="0 0 100 100" y="0" x="0" xmlns="http://www.w3.org/2000/svg" id="圖層_1" version="1.1" width="50px" height="50px" xmlns:xlink="http://www.w3.org/1999/xlink"  ><g class="ldl-scale" style="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);" ><g><path stroke-miterlimit="10" stroke-width="4" fill="none" stroke="#77a4bd" d="M39.33 40c0-7.01 5.682-12.692 12.692-12.692S64.714 32.99 64.714 40s-5.682 12.692-12.692 12.692" style="stroke:rgb(102, 107, 200);" ></path>
                                    <path d="M35.286 33.269L39.33 40l6.732-4.045" stroke-miterlimit="10" fill="none" stroke="#77a4bd" stroke-width="3.9" style="stroke:rgb(102, 107, 200);" ></path></g>
                                    <g><path stroke-miterlimit="10" stroke-width="4" fill="none" stroke="#333" d="M71.67 92.5H28.33a3.21 3.21 0 0 1-3.21-3.21V10.71a3.21 3.21 0 0 1 3.21-3.21h43.34a3.21 3.21 0 0 1 3.21 3.21v78.58a3.21 3.21 0 0 1-3.21 3.21z" style="stroke:rgb(205, 40, 204);" ></path>
                                    <path d="M25.12 70h49.76" stroke-miterlimit="10" stroke-width="4" fill="none" stroke="#333" style="stroke:rgb(205, 40, 204);" ></path>
                                    <circle fill="#333" r="6.667" cy="81.667" cx="50" style="fill:rgb(205, 40, 204);" ></circle></g>
                                </svg>
                                <div>
                                    Orientation
                                </div>
                            </label>
                        </div> -->
                        <a href="#" class="btnAddScreen transition-animation">
                            <svg class="plusBtn fas fa-plus" viewBox="0 0 100 100" y="0" x="0" width="40px" height="40px" >
                                <g class="ldl-scale"
                                    style="transform-origin:50% 50%;transform:rotate(0deg) scale(0.8, 0.8);">
                                    <circle stroke-miterlimit="10" stroke-width="8" stroke="#333" fill="none" r="40" cy="50"
                                        cx="50" style="stroke:rgb(223, 19, 23);"></circle>
                                    <path fill="#abbd81"
                                        d="M70.8 45.8H54.2V29.2c0-2.3-1.9-4.2-4.2-4.2s-4.2 1.9-4.2 4.2v16.5H29.2c-2.3 0-4.2 1.9-4.2 4.2s1.9 4.2 4.2 4.2h16.5v16.5c0 2.3 1.9 4.2 4.2 4.2s4.2-1.9 4.2-4.2V54.2h16.5c2.3 0 4.2-1.9 4.2-4.2s-1.7-4.2-4-4.2z"
                                        style="fill:rgb(7, 171, 204);"></path>
                            </svg>
                            <div>Add Screen</div>
                        </a>
                    </div>
                    <div class="transition-animation">
                        <input type="checkbox" name="showBars" id="showBars" >
                        <Label for="showBars">Show Bar</Label>
                    </div>
                    <hr>
                    <div class="screenaction">
                        <div class="appBar" >
                            <button class="btnAppbar button-style transition-animation"> Add AppBar </button>
                        </div>                    
                        <div class="deleteScreen">
                            <input type="button" class="btnDeleteScreen button-style transition-animation"
                                value="Delete This Screen">
                        </div>
                    </div>
                    <div class="selectedItem">SelectedItem:</div>
                    <div class="locked transition-animation">
                        <input type="checkbox" name="lock" id="lock"  checked>
                        <Label for="lock">lock</Label>
                    </div>
                    <div>
                        <input id="btnAddImage" type="button" class="transition-animation" value="Add Image" >
                    </div>
                    <div class="backgroundColor">
                        <span>Background Color</span>
                        <input type="color" id="backgroundColor" class="transition-animation" value="#ff0000">
                    </div>
                    <div class="foreColor">
                        <span>Fore Color</span>
                        <input type="color" id="foreColor" class="transition-animation" value="#ff0000">
                    </div>
                    <div class="divName">
                        <div>Name:&nbsp;</div>
                        <input autocomplete="off" placeholder="Enter Widget name here" type="text" class="txtName transition-animation"
                            id="name" />
                    </div>
                    <div class="itemType">Type :</div>
                    <div class="size">
                        <div class="size-name transition-animation">Size:&nbsp;</div>
                        <input class="userSize transition-animation" type="number" name="userSize" id="userSize" value="40" min="10" max="100">
                        <div class="percentage transition-animation">%</div>
                    </div>
                    <div class="widthAndHeight">
                        <div>Width:</div>
                        <input class="width transition-animation" type="number" value="20" min="10" max="199" />
                        <div>Height:</div>
                        <input class="height transition-animation" type="number" value="20" min="10" max="199">
                    </div>
                    <div class="innerText">
                        <div>Text:&nbsp;</div>
                        <textarea class="inner-Text transition-animation" name="innerText" id="" cols="30" rows="2"
                            placeholder="write your text here"></textarea>
                    </div>
                    <div class="action">
                        <div class="delete"><input type="button" class="btnDelete button-style  transition-animation" value="Delete"></div>
                    </div>
                    <hr>
                    <div class="update">
                        <input type="button" class="btnUpdate button-style  transition-animation" value="Update The App">
                    </div>
    
                </div>
            
                <div class="treeDiv">
                    <div class="list screens">
                        <a class="list-item screen-value" data-value="0" href="#">Screen 1</a>
                    </div>
                    <div class="list">
                        <div class="childs"></div>
                    </div>
                </div>

            </div>

        </div>
    </div>

    <div class="form-add-image">
        <form class="form" >
            <div class="form-group cancel">
                <div class="bigger-font">
                    Pick an image
                </div>
                <div class="transition-animation btn-cancel-label">
                    <input type="button" class="btn-cancel" value="X">
                </div>
            </div>
            <hr>
            <div class="form-group">
                <input type="radio" value="1" name="choice" checked>
                <label>Image URL</label>
                <input type="text" class="transition-animation image-url-box" placeholder="http://google.com/mysuperfancyimg.jpg">
            </div>
            <hr>
            <div class="form-group">
                <input type="radio" value="2" name="choice">
                <label>Choose From A File :</label>
                <input id="image-BG" class="transition-animation" type="file" />
            </div>
            <hr>
            <div class="form-group">
                <input type="button" class="transition-animation btn-add-image" value="Add">
            </div>
        </form>
    </div>

    <footer id="footer">
        <div class="footer-bottom">
            &copy; 
        </div>
    </footer>

    <script src="https://cdn.socket.io/4.0.1/socket.io.min.js" integrity="sha384-LzhRnpGmQP+lOvWruF/lgkcqD+WDVt9fU3H4BWmwP5u5LTmkUGafMcpZKNObVMLU" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/p5.min.js" integrity="sha512-gQVBYBvfC+uyor5Teonjr9nmY1bN+DlOCezkhzg4ShpC5q81ogvFsr5IV4xXAj6HEtG7M1Pb2JCha97tVFItYQ==" crossorigin="anonymous"></script>
    <script src="./src/app.js" type="module"> </script>

    <noscript>
        <style>html{display:none;}</style>
        <meta http-equiv="refresh" content="0.0;url=../connect.php">
    </noscript>
</body>

</html>