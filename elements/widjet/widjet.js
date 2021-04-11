import Element from '../Element.js';
import config from '../../lib/config.js';
export default class Widjet extends Element
{

    constructor(point,drag,type,text = "") 
    {
        super(point,drag,`${type} ${config.count++}`,type ,[0,102,153]);

        this.text = text;

        this.foregroundColor = [255, 255, 255];

        this.size = 0.2;
        if (this.constructor == Widjet) 
        {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    get text_X () 
    {
        return this.X + ((this.width - (this.text.length * this.textFontSize / 1.85)) / 2);
    }
    get text_Y ()
    {
        return this.Y + (this.height * 0.28);
    }
    get textFontSize () 
    {
        let fontSize = this.height * 0.4 ;
        while(this.text.length * fontSize  / 1.85 > this.width)
        {
            fontSize -= 1;
        }
        return fontSize;
    }
    
}
