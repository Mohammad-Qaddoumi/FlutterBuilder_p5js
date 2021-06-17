import 'dart:async';
import 'package:flutter/material.dart';
import 'package:prototype_v1/myMaterial.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:flutter/cupertino.dart';
import 'package:prototype_v1/MyWidget.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'myFunction.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
return MyApp2();  }
}


class MyApp2 extends State<MyApp> {
  static bool isResultComes=false;static String newStResult;static String oldStResult;bool count=true;
  static var result;static bool helper=true,finishedCheckingId=false;static bool idIsSaved=false;static String appId;static bool dumpFlag=false;
   static Timer t;static Widget p=CircularProgressIndicator(strokeWidth: 10,backgroundColor: Colors.lightBlueAccent,);static double height,width,appBarHeight=0;
   MyApp2() {if(finishedCheckingId==false)checkIfIdWasSaved();}
  @override
  Widget build(BuildContext context) {
    if(helper && finishedCheckingId)MyTimer();
    // TODO: implement createState
   return MaterialApp(debugShowCheckedModeBanner: false,title: "kk",home:(finishedCheckingId||dumpFlag)?(idIsSaved?(isResultComes?Screen.firstScreen(result["screen0"]):
   Center(child:MyApp2.p)):new AppId(this)):Center(child:MyApp2.p));
  }
  getContent() async{helper=false;oldStResult=newStResult;
    var data={"App_Id" : appId};
    var phpURL="https://less-code.000webhostapp.com/recieve.php";

    var get = await http.post(phpURL,body: data);
    newStResult=get.body;if(newStResult!=oldStResult && oldStResult!=null)reLoadApp();
    result = jsonDecode(get.body);isResultComes=true;

    if(count)setState(() {count=false;});

  }
  MyTimer()
  {helper=false;
  t=Timer.periodic(Duration(seconds: 2), (timer) {whatShouldBeExecute();});
  }
  void whatShouldBeExecute() {
    getContent();
  }

  void reLoadApp() {
    t.cancel();count=true;helper=true;finishedCheckingId=false;dumpFlag=true;
    MyApp x=new MyApp();
    Navigator.pushReplacement(ScreenStack.screenStack.last.context, MaterialPageRoute(builder: (context){
         return x;
            }));
  }
Future<void> checkIfIdWasSaved({String id})
  async {
    SharedPreferences prefs=await SharedPreferences.getInstance();
    if (prefs.getString('Dev_id')!=null) {
      idIsSaved = true;appId = prefs.getString('Dev_id');

    }else
      {await prefs.setString('Dev_id', id);appId=id;}
    finishedCheckingId=true;

    setState(() {});

}

}

class AppId extends StatelessWidget
{TextField t1;MyApp2 m;
AppId(this.m);

  @override
  Widget build(BuildContext context) {MyApp2.t.cancel();
    t1=TextField(controller: new TextEditingController(),onSubmitted: (String s){MyApp2.idIsSaved=true;m.checkIfIdWasSaved(id: s);m.MyTimer();},style: TextStyle(fontSize: 18,color: Colors.white),decoration: InputDecoration(labelText: "Please enter your Id",border: OutlineInputBorder(borderRadius: BorderRadius.circular(10.0)),));
    // TODO: implement build
    return Scaffold(backgroundColor: Colors.blueAccent,body:Center(child: Column(mainAxisAlignment: MainAxisAlignment.center,children: [
      Text("CodeLess",style: TextStyle(color: Colors.white,fontSize: 45,fontStyle: FontStyle.italic),),t1

    ],),
      ));
  }


}

