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
    }

    sketch_menu(p5)
    {
        if(this.menu_list)
        {
            p5.push();

            p5.fill(100,100,100);
            p5.strokeWeight(3);
            p5.stroke(100,100,100);
            let x,y,w;
            if(p5.screens[p5.selectedScreen].appBar)
            {    
                x = p5.screens[p5.selectedScreen].appBar.X + 10;
                y = p5.screens[p5.selectedScreen].appBar.Y + 10;
            }
            else 
            {
                x = p5.screens[p5.selectedScreen].X + 10;
                y = p5.screens[p5.selectedScreen].Y + 10;
            }
            w = p5.screens[p5.selectedScreen].Width * 0.17;
            
            p5.line(x, y, x + w, y);
            p5.line(x, y + 7, x + w, y + 7);
            p5.line(x, y + 14, x + w, y + 14);

            p5.pop();
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
