import Element from '../Element.js';
import config from '../../lib/config.js';
export default class Screen extends Element
{
    constructor(point,drag = false,type = "Screen",bgC = [210,208,221]) 
    {
        super(point ,drag , `${type}${config.count++}`,type,bgC);

        this.children = [];
        this.noBackground = false;
        this.menu_list = false;
    }

    sketch(p5)
    {
        let h,y;
        if(this.appBar)
        {
            y = this.appBar.Y;
            h = this.appBar.Height + this.Height;
        }
        else
        {
            y = this.Y;
            h = this.Height;
        }
        
        p5.push();
        p5.noStroke();
        if(!this.noBackground)
        {
            p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
            p5.rect(this.X,y,this.Width,h,9);
        }
        else{
            p5.noFill();
            p5.rect(this.X,y,this.Width,h,9);
        }
        p5.pop();

        for(let i = 0; i < this.children.length; i++)
        {
            p5.push();
            this.children[i].sketch(p5);
            this.children[i].superSketch(p5);
            p5.pop();
        }

        // TODO :  Just draw a Three lines and use it as List .....
        if(this.menu_list)
        {

        }
        
    }

    isInside(p5) 
    {
        if(    p5.mouseX - 5 < this.X 
            || p5.mouseY - 5 < this.Y 
            || p5.mouseX + 5 > this.X + this.Width
            || p5.mouseY + 5 > this.Y + this.Height
        )
            return false;
        return true;
    }
}
