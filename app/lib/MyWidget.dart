

import 'package:flutter/material.dart';
import 'package:prototype_v1/main.dart';
import 'package:prototype_v1/myMaterial.dart';
class MyWidgetFull {

  static Widget switchWidget(var widgetJson) {var x;
  if(widgetJson!=null)
    {if(widgetJson["type"]!=null) x=widgetJson["type"];else x="";}else x="";

        switch(x)
        {
          case "Text":return new MyText(widgetJson);break;
          case "FlatButton":return new MyFlatButton(widgetJson);break;
          case "Flat":return new MyFlatButton(widgetJson);break;
          // case "Column":return new MyColumn(widgetJson);break;
          // case "Row":return new MyRow(widgetJson);break;
          case "Image":return new MyImage(widgetJson);break;
          case "Input":return new MyTextField(widgetJson);break;
          case "CircleAvatar" :return new MyAvatar(widgetJson);break;
          case "List":return new MyList(widgetJson);break;
          case "ListTile":return new MyListTile(widgetJson);break;
          default : return Container(margin: EdgeInsets.all(5),);
        }


  }


}
class ControlWidgetsByName
{
  static List<AbstractWidget> widgetList =new List<AbstractWidget>();
  static List<String>names=new List<String>();
  static addWidgetToTheList(AbstractWidget x, String y)
  {
   if (names.contains(y))widgetList[names.indexOf(y)]=x;else{widgetList.add(x);names.add(y);}
  }
  static AbstractWidget getWidgetByName(String x)
  {
    return widgetList[names.indexOf(x)];
  }
  static String getContentByName(String x)
  {
    return widgetList[names.indexOf(x)].content;
  }
  static String getTypeByName(String x)
  {
    return widgetList[names.indexOf(x)].widgetJson["Type"];
  }
}