import Element from '../Element.js';
import config from '../../lib/config.js';
export default class Grid extends Element
{
    constructor(point,drag = false,type = "Grid",bgC = [100,100,100]) 
    {
        super(point ,drag , `${type} ${config.count++}`,type,bgC);

        this.children = [];
        this.size = 0.3333333;
        this.noBackground = false;
        // this.midPoint = point.midPoint;
        this.parent = null;
    }

    sketch(p5)
    {
        // this.move(p5);
        
        p5.push();
        // if(!p5.showBar)
        // {
        //     p5.stroke(0);
        //     p5.strokeWeight(3);
        // }
        // else 
            p5.noStroke();
        if(!this.noBackground)
        {
            p5.push();
            p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
            p5.rect(this.X,this.Y,this.Width,this.Height);
            p5.pop();
        }
        else{
            p5.push();
            p5.noFill();
            p5.rect(this.X,this.Y,this.Width,this.Height);
            p5.pop();
        }
        p5.pop();

        for(let i = 0; i < this.children.length; i++)
        {
            p5.push();
            this.children[i].sketch(p5);
            p5.pop();
        }
        
    }

    isInside(p5) 
    {
        if(    p5.mouseX < this.X 
            || p5.mouseY < this.Y 
            || p5.mouseX > this.X + this.Width
            || p5.mouseY > this.Y + this.Height
        )
            return false;
        return true;
    }
}
