
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import 'MyWidget.dart';
import 'main.dart';
import 'myFunction.dart';


class Screen extends StatefulWidget
{static int screenNowDisplayed;Screen s;int screenNumFromJson;static Drawer drawer;Function setStateFun;
  int screenNum;var screenJsonFile;static int screensNumber=1;BuildContext context;

  Screen(var subJson,int screenNumFromJson)
  {this.screenNumFromJson=screenNumFromJson;
    screenNum=screensNumber;
    screensNumber++;
    this.screenJsonFile=subJson;
    Screen s=this;ScreenStack.add(s);
  }
static getContextHeightAndWidth(BuildContext c)
{
  MyApp2.width=MediaQuery.of(c).size.width;
  MyApp2.height=MediaQuery.of(c).size.height;
}
 static Widget firstScreen(var screenObject)
{
  initializeScreens();
  if(ScreenStack.screenStack.length>0)ScreenStack.screenStack.clear();
  return Screen(screenObject,0);
}
static initializeScreens()
{
  int i=0;screensNumber=1;
  ScreenStack.screenStack.clear();Screen.buildDrawer();
}

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return ScreenFull(screenJsonFile,screenNum,s);
  }

  static void buildDrawer() {
   Screen.drawer=(MyApp2.result["menu"]!=null)?Drawer(elevation: 5,child:MyList(MyApp2.result["menu"])):null;
  }

}
class ScreenFull extends State<Screen>
{
  var screenJsonFile;var bodyJson;int screenNum;List<int> screenColor;int lastScreen=Screen.screenNowDisplayed;
  AppBar appBar;Screen s;static List<double> widgetPosition=new List<double>(2);bool menuIsVisible=false;
  ScreenFull(var subJson,int screenNum,Screen s)
  {
    this.s=s;
    this.screenNum=screenNum;
    screenJsonFile=subJson;bodyJson=screenJsonFile["body"];
    screenColor=(screenJsonFile["screenColor"]!=null)?screenJsonFile["screenColor"].cast<int>():[68,138,255];
    appBar=createAppBar();if(screenJsonFile["menu"]!= null && screenJsonFile["menu"]=="on")menuIsVisible=true;

  }


  @override
  Widget build(BuildContext context) {ScreenStack.screenStack.last.setStateFun=(){setState(() {});};
    if (ScreenStack.screenStack.length==1)
      Screen.getContextHeightAndWidth(context);
    ScreenStack.screenStack.last.context=context;ScreenStack.screenStack.last.screenNum=screenNum;
    List<Widget>l=new List<Widget>();
    l=getWidgets();
    // TODO: implement build
    return WillPopScope(child: Scaffold(backgroundColor:Color.fromARGB(255, screenColor[0], screenColor[1], screenColor[2]) ,appBar: this.appBar,
      body:ListView(children: [Container(height: MyApp2.height-MyApp2.appBarHeight*1.5,child: new Stack(children: l,),)],),drawer: (this.menuIsVisible)?Screen.drawer:null),
    onWillPop: () async{ScreenStack.remove();return true;},);
  }
  AppBar createAppBar() {
    if(screenJsonFile["appBar"]!=null) {
      String appBarContent = screenJsonFile["appBar"];
      List<int> appBarColor=(screenJsonFile["appBarColor"]!=null)?screenJsonFile["appBarColor"].cast<int>():[68,138,255];
      AppBar a=AppBar(backgroundColor:Color.fromARGB(255, appBarColor[0], appBarColor[1], appBarColor[2]), title: Container(alignment: Alignment.center,child: Text(appBarContent),));
      MyApp2.appBarHeight=a.preferredSize.height;
      return a;
    }else return null;
  }


  List<Widget> getWidgets()
  {
    int i=1;List<Widget>widgetList=new List<Widget>();double x,y;
    while(bodyJson["child$i"]!=null)
      { Widget w=MyWidgetFull.switchWidget(bodyJson["child$i"]);y=convertToXY(bodyJson["child$i"]["position"][1]);x=bodyJson["child$i"]["position"][0];
      widgetList.add(Container(alignment: Alignment(x,y),child: w,));
        i++;
      }
    return widgetList;
  }

  double convertToXY(var position)
  {
    if(position<0)
      return position.abs();else { return -position; }
  }
}

//////////////////////////////////
abstract class AbstractWidget extends State<StatefulWidget>
{
  String content;List<double> position;var widgetJson;TextStyle textStyle;Color _backgroundColor;List<int> colorFromRGB,backgroundColor;
  double fontSize;double height,width;String name;
  AbstractWidget(this.widgetJson)
  {
    this.backgroundColor=(widgetJson["backgroundColor"]!=null)?widgetJson["backgroundColor"].cast<int>():[255,255,255];
    this.content=widgetJson["content"];
    this.fontSize=(widgetJson["fontSize"]!=null)?widgetJson["fontSize"].toDouble():18.0;
    this.colorFromRGB=(widgetJson["color"]!=null)?widgetJson["color"].cast<int>():[25,25,25];
    this.textStyle=TextStyle(fontSize: this.fontSize,color: Color.fromARGB(255, this.colorFromRGB[0], this.colorFromRGB[1],this.colorFromRGB[2]));
    this._backgroundColor=(this.backgroundColor!=null)?Color.fromARGB(255, this.backgroundColor[0], this.backgroundColor[1],this.backgroundColor[2]):null;
    this.height=(widgetJson["height"]!=null)?getHeight(double.parse(widgetJson["height"].toString())):null;
    this.width=(widgetJson["width"]!=null)?getWidth(double.parse(widgetJson["width"].toString())):null;
    this.name=(widgetJson["Name"]!=null)?widgetJson["Name"].toString():"null";
  }
  @override
  Widget build(BuildContext context);
  double getHeight(double parse) {return MyApp2.height*parse;}
  double getWidth(double parse) {return MyApp2.width*parse;}
  static String textFieldSearch(String name){String s=MyTextFieldFull.textFieldStack[MyTextFieldFull.names.indexOf(name,0)].txtContent;return (s==null)?"":s;}
}
/////////////////Text////////////////////
class MyText extends StatefulWidget
{var subJson;MyText(this.subJson);
  @override
  State<StatefulWidget> createState() {return new MyTextFull(subJson);}}
class MyTextFull extends AbstractWidget
{
  MyTextFull(subJson) : super(subJson);
  @override
  Widget build(BuildContext context) {ControlWidgetsByName.addWidgetToTheList(this,this.name);
  // TODO: implement build
  return new Container(height: this.height,width: this.width,color:this._backgroundColor,
    child: Text(this.content,textAlign: TextAlign.center,
  style:this.textStyle ,),);
  }}
/////////////////FlatButton////////////////////

class MyFlatButton extends StatefulWidget
{
  var subJson;List<String> stringFunction;List<Function> fun;
  MyFlatButton(this.subJson);
  @override
  State<StatefulWidget> createState() {
    if(subJson["onPress"]!=null) {String s=subJson["onPress"];stringFunction=s.split(";");stringFunction.removeLast();}
    fun=stringFunction.map((e) => new MyFunction(e).function).toList();
    // TODO: implement createState
    return new MyFlatButtonFull(subJson,
        onPress: (subJson["onPress"]!=null)? (){for(int i=0;i<fun.length;i++){fun[i].call();if(stringFunction[i]=="validation()"||stringFunction[i]=="insertion()"){
        if(i+1<fun.length)MyFunction.storedFunction=fun[i+1];break;}}}
            :new MyFunction("null()").function);
  }
}

class MyFlatButtonFull extends AbstractWidget
{ Function onPress;static List<String>l=new List<String>();static MyFlatButtonFull lastButtonClicked;
  MyFlatButtonFull(subJson, {this.onPress}) : super(subJson);
  @override
  Widget build(BuildContext context) {l.add(this.content);ControlWidgetsByName.addWidgetToTheList(this,this.name);
    // TODO: implement build

    return new   Container(height: this.height,width: this.width,child: RaisedButton(elevation: 5,onPressed:(){lastButtonClicked=this;
      onPress.call();},color:this._backgroundColor,
        child:Text(this.content,textAlign: TextAlign.center, style: this.textStyle)));
  }}
////////////////image
class MyImage extends StatefulWidget
{var subJson;Image m;
MyImage(this.subJson){m=Image.network(subJson["content"],fit: BoxFit.fill);}
@override
State<StatefulWidget> createState() {return new MyImageFull(subJson,m);}}
class MyImageFull extends AbstractWidget
{Image m;
  MyImageFull(subJson,this.m) : super(subJson);
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Container(color:this._backgroundColor,height:this.height,width:this.width,
      child: m);
  }}
  ////TextField

class MyTextField extends StatefulWidget
{var subJson;MyTextField(this.subJson);
@override
State<StatefulWidget> createState() {return new MyTextFieldFull(subJson);}}
class MyTextFieldFull extends AbstractWidget
{int screenNowDisplayedFromJson;static List<MyTextFieldFull> textFieldStack= new List<MyTextFieldFull>();static List<String>names=new List<String>();
String textFieldName,txtContent;
  MyTextFieldFull(subJson) : super(subJson){textFieldName=subJson['Name'];}
  @override
  Widget build(BuildContext context) {

    if(names.isNotEmpty){if(!names.contains(textFieldName)){names.add(textFieldName);textFieldStack.add(this);}else
      {textFieldStack[names.indexOf(textFieldName)]=this;}}else{names.add(textFieldName);textFieldStack.add(this);}
    screenNowDisplayedFromJson=ScreenStack.screenStack.last.screenNumFromJson;ControlWidgetsByName.addWidgetToTheList(this,this.name);
    // TODO: implement build
    return new Container(
      child: TextField(onChanged: (s){txtContent=s;},decoration: InputDecoration(labelText: this.content,border: OutlineInputBorder(borderRadius: BorderRadius.circular(10.0)),)));
   // TextField(controller: new TextEditingController(),onSubmitted: (String s){MyApp2.idIsSaved=true;m.checkIfIdWasSaved(id: s);m.MyTimer();},style: TextStyle(fontSize: 18,color: Colors.white),decoration: InputDecoration(labelText: "Please enter your Id",border: OutlineInputBorder(borderRadius: BorderRadius.circular(10.0)),));
  }}
////Avatar
class MyAvatar extends StatefulWidget
{var subJson;MyAvatar(this.subJson);
@override
State<StatefulWidget> createState() {return new MyAvatarFull(subJson);}}
class MyAvatarFull extends AbstractWidget
{  String name;
  MyAvatarFull(subJson) : super(subJson){name=subJson['Name'];}
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return new Container(alignment: Alignment.center,height: this.height,width: this.width,
      child: Column(children: [  CircleAvatar(minRadius: 45,
        backgroundColor: this._backgroundColor,
        child: Icon(Icons.person_pin, size: 45,),),
        Container(alignment: Alignment.center,
            child: Text((AbstractWidget.textFieldSearch(name)), style: this.textStyle,
              textAlign: TextAlign.center,))],),);
  }}

  class MyList extends StatefulWidget
  {var subjson;MyList(this.subjson);
  @override
  State<StatefulWidget> createState() {return MyListFull(subjson);}
  }
class MyListFull extends AbstractWidget
{List<Widget>l=new List<Widget>();var subJson;
  MyListFull(this.subJson) : super(subJson){getList(subJson);}
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Container(height: this.height,width: this.width,color: this._backgroundColor,child: ListView(children: MyListFull.getList(subJson),),);
  }
    static List<Widget> getList(subJson)
    {
      int i=1;List<Widget>widgetList=new List<Widget>();
      while(subJson["child$i"]!=null)
      { Widget w=MyWidgetFull.switchWidget(subJson["child$i"]);
      widgetList.add(Container(margin: EdgeInsets.only(top: 2,bottom: 2),child: w),);
      i++;
      }
      return widgetList;
    }
}

class MyListTile extends StatefulWidget
{var subJson;MyListTile(this.subJson);List<String> stringFunction;List<Function> fun;
@override
State<StatefulWidget> createState() {
  if(subJson["onPress"]!=null) {String s=subJson["onPress"];stringFunction=s.split(";");stringFunction.removeLast();}
  fun=stringFunction.map((e) => new MyFunction(e).function).toList();
  return MyListTileFull(subJson,
      onPress: (subJson["onPress"]!=null)? (){for(int i=0;i<fun.length;i++){fun[i].call();if(stringFunction[i]=="validation()"||stringFunction[i]=="insertion()"){
        if(i+1<fun.length)MyFunction.storedFunction=fun[i+1];break;}}}
          :new MyFunction("null()").function);}
}
class MyListTileFull extends AbstractWidget
{ Function onPress;String subTitle;
  MyListTileFull(subJson,{this.onPress}) : super(subJson);
  @override
  Widget build(BuildContext context) {subTitle=(this.widgetJson["subContent"]!=null)?this.widgetJson["subContent"]:"";
  // TODO: implement build
  ControlWidgetsByName.addWidgetToTheList(this,this.name);
  return Card(shadowColor: Colors.black,elevation: 10.0,child:
  Container(height: this.height,width: this.width,child: ListTile(dense: true,onTap:this.onPress,title: Text(content,textAlign: TextAlign.center,style:this.textStyle),subtitle:Text(subTitle,style:
  TextStyle(color: Color.fromARGB(255, this.colorFromRGB[0], this.colorFromRGB[1],this.colorFromRGB[2])),),),),
    color: Color.fromARGB(120, this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]),
    margin: EdgeInsets.only(left: 0,right: 0,top: 0,bottom: 0),);

  }
}

  //////// column
// class MyColumn extends StatefulWidget
// {
//   var subJson;
//   MyColumn(this.subJson);
//   @override
//   State<StatefulWidget> createState() {
//     // TODO: implement createState
//     return new MyColumnFull(subJson["children"],subJson["content"], fontSize:(subJson["fontSize"]!=null)?double.parse(subJson["fontSize"].toString()).toDouble():18.0,
//         colorFromRGB: (subJson["color"]!=null)?subJson["color"].cast<int>():[0,0,0],size:(subJson["size"]!=null)?int.parse(subJson["size"].toString()):1);
//   }
// }

// class MyColumnFull extends AbstractWidget
// { List<Widget> children=new List<Widget>();var columnJson;
// MyColumnFull(this.columnJson,content, {fontSize=18,colorFromRGB,size}) : super(columnJson,content,size:size,backgroundColor:null,fontSize:fontSize,colorFromRGB:colorFromRGB);
// @override
// Widget build(BuildContext context) {
//   getChildren();
//   // TODO: implement build
//   return new   Column(children: children);
// }
//
//   void getChildren()
//   {
//         int i=1;if(children.isNotEmpty)children.clear();
//         while(i<=columnJson["childrenNumber"])
//           {
//             bool helper=true; if (columnJson["child$i"]==null)helper=false;
//             children.add(Expanded(flex:(columnJson["child$i"]!=null)?int.parse(columnJson["child$i"]["size"].toString()):1,
//               child:Container(margin: EdgeInsets.all(3),color: Colors.blueAccent,alignment:(helper)?((columnJson["child$i"]["position"]!=null)?Alignment(double.parse(columnJson["child$i"]["position"][0].toString()),alig_ng_to_pos_or_pos_to_ng((double.parse(columnJson["child$i"]["position"][1].toString())))):Alignment(0.0,0.0)):Alignment(0.0,0.0),
//                 child: MyWidgetFull.switchWidget(columnJson["child$i"]),) ,));
//             i++;
//           }
//   }
//
//   double alig_ng_to_pos_or_pos_to_ng(double d)
//   {if(d<0)
//     return d.abs();else { return -d; }
//   }
// }
//
// ///// row
//
// class MyRow extends StatefulWidget
// {
//   var subJson;
//   MyRow(this.subJson);
//   @override
//   State<StatefulWidget> createState() {
//     // TODO: implement createState
//     return new MyRowFull(subJson["children"],subJson["content"], fontSize:(subJson["fontSize"]!=null)?double.parse(subJson["fontSize"].toString()).toDouble():18.0,
//         colorFromRGB: (subJson["color"]!=null)?subJson["color"].cast<int>():[0,0,0]);
//   }
// }
//
// class MyRowFull extends AbstractWidget
// { List<Widget> children=new List<Widget>();var rowJson;
// MyRowFull(this.rowJson,content, {fontSize=18,colorFromRGB,size}) : super(content,rowJson,size:size,backgroundColor:null,fontSize:fontSize,colorFromRGB:colorFromRGB);
// @override
// Widget build(BuildContext context) {
//   getChildren();
//   // TODO: implement build
//   return new   Row(children: children);
// }
//
// void getChildren()
// {
//   int i=1;if(children.isNotEmpty)children.clear();
//   while(i<=rowJson["childrenNumber"])
//   {
//     bool helper=true; if (rowJson["child$i"]==null)helper=false;
//     children.add(Expanded(flex:(rowJson["child$i"]!=null)?int.parse(rowJson["child$i"]["size"].toString()):1,
//       child:Container(margin: EdgeInsets.all(3),color: Colors.blueAccent,alignment:(helper)?((rowJson["child$i"]["position"]!=null)?Alignment(double.parse(rowJson["child$i"]["position"][0].toString()),alig_ng_to_pos_or_pos_to_ng((double.parse(rowJson["child$i"]["position"][1].toString())))):Alignment(0.0,0.0)):Alignment(0.0,0.0),
//         child: MyWidgetFull.switchWidget(rowJson["child$i"]),) ,));
//     i++;
//   }
// }
//
// double alig_ng_to_pos_or_pos_to_ng(double d)
// {if(d<0)
//   return d.abs();else { return -d; }
// }
// }
