import CircleAvatar from './widjet/circle.js';
import FlatButton from './widjet/flatButton.js';
import Text from './widjet/Text.js';
import ImageWidjet from './widjet/image.js';
import Input from './widjet/input.js';
import List from './List/list.js';
import ListTile from './widjet/listTile.js';
export default class WidjetBuilder 
{
    static Build(element)
    {
        let widget = null;
        if(element._type)
        {
            switch(element._type)
            {
                case "FlatButton":
                {
                    widget = new FlatButton({ X: element.X, Y: element.Y }, 99, 40);
                    break;
                }
                case "Text":
                {
                    widget = new Text({ X: element.X, Y: element.Y }, element.width-15, element.height-15);
                    break;
                }
                case "Image":
                {
                    widget = new ImageWidjet({ X: element.X, Y: element.Y }, 99, 40);
                    break;
                }
                case "Input":
                {
                    widget = new Input({ X: element.X, Y: element.Y }, 261, 40);
                    let newName = widget.name.replaceAll(" ","");
                    widget.name = newName;
                    let oldName = "someName";
                    setTimeout(async ()=>{
                        let url = "https://less-code.000webhostapp.com/add_inputsNames.php";
                        let response = await fetch(url,{
                            method : 'POST',
                            body : JSON.stringify( {app_id : APP_ID,old_columnName:oldName,new_columnName:newName}, null, 0)
                        });
                        let result = await response.text();
                        // console.log(result);
                    },0);
                    break;
                }
                case "CircleAvatar":
                {
                    widget = new CircleAvatar({ X: element.X, Y: element.Y }, 40, 40);
                    break;
                }
                case "List":
                {
                    widget = new List({ X: element.X, Y: element.Y }, 157, 205);
                    break;
                }
                case "ListTile":
                {
                    widget = new ListTile({ X: element.X, Y: element.Y }, 153, 40);
                    break;
                }
            }
        }
        return widget;
    }
}