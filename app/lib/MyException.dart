import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:prototype_v1/myFunction.dart';
import 'package:prototype_v1/myMaterial.dart';

import 'MyWidget.dart';

class MyException extends StatefulWidget {
  static String widgetName;
  MyException(String s){widgetName=s;}
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return MyExceptionFull();
  }
}
class MyExceptionFull extends State<MyException>
{ String s=MyException.widgetName;
int screenNumber=ScreenStack.screenStack.last.screenNumFromJson;
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(backgroundColor: Colors.red,body: Column(children: [Expanded(child: Container(margin: EdgeInsets.only(top: 20),child:
    Text("Code Less Handle Errors",
      style: TextStyle(color: Colors.lightBlueAccent,fontSize: 45,fontStyle: FontStyle.italic),textAlign: TextAlign.center,),)),
    Expanded(flex: 5,child: Container(margin:EdgeInsets.only(top: 10),child: Column(children: [Container(margin: EdgeInsets.only(left: 15),alignment: Alignment.topLeft,child: Text("1 Error Detected :",textAlign: TextAlign.left,style: TextStyle(fontWeight: FontWeight.bold,color: Colors.yellow,fontSize: 18)
    ),),Divider(height: 4,color: Colors.lightBlueAccent,),Container(margin: EdgeInsets.all( 15),child: Text("The widget with name ->&$s<- in screen number :->$screenNumber<- should reference to another widget OR the widget which references to is not loaded yet ! ",style: TextStyle(fontWeight: FontWeight.bold,color: Colors.yellow,fontSize: 18)
    ),)
      ,Divider(height: 4,color: Colors.lightBlueAccent,),Container(alignment: Alignment.centerLeft,margin: EdgeInsets.all( 15),child: Text("Solution :",style: TextStyle(fontWeight: FontWeight.bold,color: Colors.yellow,fontSize: 18)
      ),),Container(alignment:Alignment.topLeft,margin: EdgeInsets.all( 15),child: Text("Just make sure that there is a widget named ->$s<- AND it was loaded before you make a reference .",style: TextStyle(fontWeight: FontWeight.bold,color: Colors.yellow,fontSize: 18)
      ),)],),alignment:Alignment.topLeft,),)
    ],),);
  }


}
