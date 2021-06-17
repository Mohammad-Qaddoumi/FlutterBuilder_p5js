import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:prototype_v1/MyWidget.dart';
import 'package:prototype_v1/MyException.dart';
import 'package:prototype_v1/main.dart';
import 'myMaterial.dart';
import 'dart:async';
import 'package:prototype_v1/myMaterial.dart';
import 'dart:convert';
class MyFunction
{
  String fun;Function function;String funName;String funParameters;static Function storedFunction;
  MyFunction(String f)
  {
    this.fun=f;
    function=generateFunction();
  }
  Function generateFunction()
  {
    int x=this.fun.indexOf("(");int y=this.fun.indexOf(")");
    funParameters=this.fun.substring(x+1,y);funName=this.fun.substring(0,x);
    switch(funName)
    {
      case "push":return pushFun();break;
      case "insertion":return insertionFun();break;
      case "validation":return validation();break;
      case "concatenation":return concatenation();break;
      case "calculate":return calculate();break;
      default :return (){ScreenStack.screenStack.last.setStateFun.call();};
    }

     return(){};
  }

  Function pushFun()
  {
    int indexOfTheScreenInScreenList=int.parse(funParameters.substring(funParameters.indexOf("n")+1,funParameters.length));

    return (){
      Navigator.push(ScreenStack.screenStack.last.context, MaterialPageRoute(builder: (context){
    return new Screen(MyApp2.result["screen$indexOfTheScreenInScreenList"],indexOfTheScreenInScreenList);
}));
    };
  }

  Function insertionFun()
  {
    Function f=() async {
      String column="";String data="";BuildContext c1;
      for(int i=0;i<MyTextFieldFull.textFieldStack.length;i++)
      if(MyTextFieldFull.textFieldStack[i].screenNowDisplayedFromJson==ScreenStack.screenStack.last.screenNumFromJson)
        {String s=MyTextFieldFull.textFieldStack[i].textFieldName;String s1=MyTextFieldFull.textFieldStack[i].txtContent;
        column+="$s;";data+="$s1;";}column=column.substring(0,column.length-1);data=data.substring(0,data.length-1);
      var data1={"column" :column,"data":data,"App_id":MyApp2.appId};
      var phpURL="https://less-code.000webhostapp.com/insertion.php";
      await http.post(phpURL,body: data1);
      showDialog(context: ScreenStack.screenStack.last.context,builder: (BuildContext c){c1=c;return
        AlertDialog(content: Container(
          child: Text("Successfully",textAlign: TextAlign.center,style: TextStyle(fontSize: 17,color:Color.fromARGB(255, 1, 96, 100) ),),)
          ,actions: [FlatButton(onPressed: (){Navigator.pop(c1);storedFunction.call();}, child: Text("ok"))],);});

    };
    return f;
  }

  Function validation()
  {
    Function f=() async {
      BuildContext c1;


      String column="";String data="";List<String>columnList=new List<String>();List<String>dataList=new List<String>();
      for(int i=0;i<MyTextFieldFull.textFieldStack.length;i++)
        if(MyTextFieldFull.textFieldStack[i].screenNowDisplayedFromJson==ScreenStack.screenStack.last.screenNumFromJson)
        { String s=MyTextFieldFull.textFieldStack[i].textFieldName;String s1=MyTextFieldFull.textFieldStack[i].txtContent;
        column+="$s;";columnList.add(s);data+="$s1;";dataList.add(s1);}column=column.substring(0,column.length-1);data=data.substring(0,data.length-1);
      var data1={"column" :column,"data":data,"App_id":MyApp2.appId};
      var phpURL="https://less-code.000webhostapp.com/validation.php";
      var get = await http.post(phpURL,body: data1);
      var result = jsonDecode(get.body);bool helper=true;
      for(int i=0;i<columnList.length;i++)
        {if(result[columnList[i]]!=dataList[i]||result[columnList[i]]==null||dataList[i]==null||result[data]=="null")
        {showDialog(context: ScreenStack.screenStack.last.context,builder: (BuildContext c){c1=c;return
          AlertDialog(title:Text("Something wrong",textAlign: TextAlign.center,style: TextStyle(color: Colors.green),),content: Container(
          child: Text("Your input are not correct",textAlign: TextAlign.center,style: TextStyle(fontSize: 17,color:Color.fromARGB(255, 1, 96, 100) ),),)
          ,actions: [FlatButton(onPressed: (){Navigator.pop(c1);}, child: Text("ok"))],);});
       helper=false;break;}
        }if(helper)showDialog(context: ScreenStack.screenStack.last.context,builder: (BuildContext c){c1=c;return
        AlertDialog(content: Container(
          child: Text("Successfully",textAlign: TextAlign.center,style: TextStyle(fontSize: 17,color:Color.fromARGB(255, 1, 96, 100) ),),)
          ,actions: [FlatButton(onPressed: (){Navigator.pop(c1);storedFunction.call();}, child: Text("ok"))],);});

    };
    return f;
  }

  //https://less-code.000webhostapp.com/validation.php

  void phpCall() async{
  var data={"column" : "appId"};
  var phpURL="https://less-code.000webhostapp.com/recieve.php";

  await http.post(phpURL,body: data);


  }

  Function concatenation()
  {
     return (){List<String> names= new List<String>();
       for(int i=0;i<ControlWidgetsByName.names.length;i++)
     {
       if(ControlWidgetsByName.names[i].startsWith("&"))
       {
         String s=ControlWidgetsByName.names[i];
         String subS="";
          for(int j=0;j<s.length;j++)
          {
            if(s[j]=="&"&&subS.isNotEmpty)
              {names.add(subS);subS="";}
            else if(s[j]!="&")
              subS=subS+s[j];
          }names.add(subS);int x;
          try {
            for (int k = 0; k < names.length; k++) {x=k;
              var widgetType = ControlWidgetsByName
                  .getWidgetByName(names[k])
                  .widgetJson["type"];
              var curWidget = ControlWidgetsByName.getWidgetByName(s);
              switch (widgetType) {
                case "FlatButton":
                  if (MyFlatButtonFull.lastButtonClicked.name == names[k])
                    curWidget.content += names[k];
                  break;
                case "Input":
                  ControlWidgetsByName.widgetList[ControlWidgetsByName.names
                      .indexOf(ControlWidgetsByName.names[i])].content =
                      MyTextFieldFull.textFieldStack[MyTextFieldFull.names
                          .indexOf(names[k])].txtContent;
                  break;
                default :
                  curWidget.content = ControlWidgetsByName
                      .getWidgetByName(names[k])
                      .content;
              }
            }
          }catch(e)
          { Navigator.push(ScreenStack.screenStack.last.context, MaterialPageRoute(builder: (context){
            return new MyException(names[x]);
          }));}
       }
     }ScreenStack.screenStack.last.setStateFun.call();
     };
  }

  Function calculate() {
    return (){print("ss");};
  }
}
// Navigator.push(Screen.Screens[Screen.screenNowDisplayed].context, MaterialPageRoute(builder: (context){
// return Screen.Screens[indexOfTheScreenInScreenList];
// }))


class ScreenStack
{
  static List<Screen> screenStack=new List<Screen>();
  static add(Screen value)
  {
    if(ScreenStack.screenStack.isEmpty){ScreenStack.screenStack.add(value);}else if(ScreenStack.screenStack.last!=value)ScreenStack.screenStack.add(value);

  }
  static remove()
  {
    ScreenStack.screenStack.removeLast();
  }
}