import CircleAvatar from './widjet/circle.js';
import FlatButton from './widjet/flatButton.js';
import Text from './widjet/Text.js';
import ImageWidjet from './widjet/image.js';
import Input from './widjet/input.js';
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
                    break;
                }
                case "CircleAvatar":
                {
                    widget = new CircleAvatar({ X: element.X, Y: element.Y }, 40, 40);
                    break;
                }
            }
        }
        return widget;
    }
}