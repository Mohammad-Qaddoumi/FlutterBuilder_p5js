<?php

$data = file_get_contents('php://input',true);
$json = json_decode($data,true);
$sql = "";
if (count((array)$json) === 0){
    $sql = "SELECT design_json FROM `apps` WHERE app_id=25 AND email='moh@lesscode.com'";
}
elseif(isset($_POST['app_id']))
{
    $app_id = $_POST['app_id'];
    $sql = "SELECT design_json FROM `apps` WHERE app_id=$app_id AND email='moh@lesscode.com'";
}
else 
{
    $app_id = $json["app_id"];
    $sql = "SELECT design_json FROM `apps` WHERE app_id=$app_id AND email='moh@lesscode.com'";
}
$db_name     = "id16371250_maindata";
$sql_name    = "id16371250_qualityfirst";
$sql_pass    = "FirstQuality#43";
$server_name = "localhost";

$con = mysqli_connect($server_name, $sql_name, $sql_pass, $db_name);
$result = $con->query($sql);
$row = $result->fetch_assoc();
echo $row["design_json"];




// echo '{"screen0" :{"appBar":"page1","appBarColor":[100,100,100],"screenColor":[150,150,150],
//       "body":{
//           "child1":{"type":"Text","onPress":"null()","content": "txt1","position":[0.0,0.0]}
//           ,"child2":{"type":"FlatButton","onPress":"null()","content": "Click4454654654654654654\n6546546546","position":[1.0,1.0]}
//           ,"child3":{"type":"Text","onPress":"null()","content": "txt3","position":[-1.0,-1.0]}  
//           ,"child4":{"type":"Text","onPress":"null()","content": "txt4","position":[0.0,0.60]}   
//           ,"child5":{"type":"Text","onPress":"null()","content": "txt5","position":[0.0,0.20]}   
//           ,"child6":{"type":"Text","onPress":"null()","content": "txt6","position":[0.0,0.40]} 
//           ,"child7":{"type":"Text","onPress":"null()","content": "txt7","position":[-0.40,0.25]}
//           }
//       }}';


//   echo '{"screen0" : 
//       {"appBar":"page1","appBarColor":[100,100,100],"screenColor":[0,0,150],
//       "body":{ "color":[100,100,10],"fontSize":14,"type":"Column","content":"click","backgroundColor":[10,200,10],
//                   "children":{
//                       "childrenNumber": 2,
                      
//                          "child1": {"type": "FlatButton","onPress":"null()",
//                          "size":70, "name": "Flat 5","backgroundColor":[10,200,10],
//                          "content": "Click", "id": "d51f4a2d-2bc3-4353-a737-88efbe5e8e3f", "width": "99", "height": "40",
//                          "station":[0.0,1.0]
//                                   },
                                   
//                           "child2":{"type": "FlatButton","onPress":"null()",
//                                           "size":30, "name": "Flat 5","backgroundColor":[10,200,10],
//                                           "content": "Click", "id": "d51f4a2d-2bc3-4353-a737-88efbe5e8e3f", "width": "99", "height": "40",
//                                          "station":[0,0]
//                                   } 
//                              }
           
//               } 
//       }
      
//         }';
  
//   '{"screen0": {"appBar":"Page11","appBarColor":[100,100,100],"screenColor":[0,0,150],
//               "body":{ "color":[100,100,10],"size":30,"type":"FlatButton","onPress":"push(screen2);","content":"click","backgroundColor":[10,200,10]  } 
//  },
//  "screen1": {"appBar":"page2","appBarColor":[0,0,0],"screenColor":[0,0,0],
//               "body":{ "color":[100,100,10],"size":30,"type":"FlatButton","onPress":"push(screen2);","content":"hh","backgroundColor":[10,10,200]  } 
//  },
//  "screen2": {"appBar":"pagee3","appBarColor":[0,222,0],"screenColor":[0,0,180],
//               "body":{"type": "Row", "size": "70", "children": {"childrenNumber": 2,
// "child1": {"type": "FlatButton","onPress":"null()", "size": "20", "name": "Flat 5","backgroundColor":[10,200,10], "content": "Click", "id": "d51f4a2d-2bc3-4353-a737-88efbe5e8e3f", "width": "99", "height": "40"},
//                   "child2": {"type": "Column", "size": "80", "children": {"childrenNumber": 2,
// "child1": {"type": "FlatButton","onPress":"null()", "size": "20", "name": "Flat 5","backgroundColor":[10,200,10], "content": "", "id": "d51f4a2d-2bc3-4353-a737-88efbe5e8e3f", "width": "99", "height": "40"},
//                   "child2": {"type": "FlatButton","onPress":"null()", "size": "80", "name": "Flat 5","backgroundColor":[10,200,10], "content": "Click h", "id": "d51f4a2d-2bc3-4353-a737-88efbe5e8e3f", "width": "99", "height": "40"}
//               }}
//               }}}}
//       ';                

// {"screen0": {"appBar":"myApp","appBarColor":[0,0,0],"screenColor":[0,0,0],
//               "body":{ "color":[100,100,10],"size":30,"type":"FlatButton","onPress":"push(screen1);","content":"page1t1","backgroundColor":[10,200,10]  } 
//  },
//  "screen1": {"appBar":"myApp","appBarColor":[0,0,0],"screenColor":[0,0,0],
//               "body":{   "type":"column",
//                          "size":100,
//                          "children":{ "childrenNumber":2,
//                                       "child1":{ "size":30,"type":"text","content":"page2t1"  },
//                                       "child2":{ "size":70,"type":"text","content":"page2t2"  }   
//                                     }
//                     }  
//  }
//  }

?>
