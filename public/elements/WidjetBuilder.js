import Circle from './widjet/circle.js';
import FlatButton from './widjet/flatButton.js';
import Text from './widjet/Text.js';
import Row from './grid/row.js';
import Column from './grid/column.js';
export default class WidjetBuilder 
{
    static Build(element)
    {
        let widget = null;
        if(element._type)
        {
            switch(element._type)
            {
                case "Circle":
                {
                    widget = new Circle({ X: element.X, Y: element.Y }, element.width-15);
                    break;
                }
                case "Flat":
                {
                    widget = new FlatButton({ X: element.X, Y: element.Y }, 99, 40);
                    break;
                }
                case "Text":
                {
                    widget = new Text({ X: element.X, Y: element.Y }, element.width-15, element.height-15);
                    break;
                }
                case "Row":
                {
                    widget = new Row({X : element.X, Y: element.Y,W:element.width-15 , H: element.height-15 });
                    break;
                }
                case "Column": 
                {  
                    widget = new Column({X : element.X, Y: element.Y,W:element.width-15 , H: element.height-15 });
                    break;
                }
            }
        }
        return widget;
    }
}