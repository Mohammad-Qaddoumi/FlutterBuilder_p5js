import Element from '../Element.js';
import config from '../../lib/config.js';
export default class Grid extends Element
{
    constructor(point,drag = false,type = "Grid") 
    {
        super(point ,drag , `${type} ${config.count++}`,type,[100,100,100]);

        this.children = [];
        this.size = 0.3333333;
        this.noBackground = false;
        this.alignHorizontal = 1;
        this.alignVertical   = 1;
        if (this.constructor == Grid) 
        {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    sketch(p5)
    {
        this.move(p5);
        
        p5.push();
        if(!p5.showBar)
        {
            p5.stroke(0);
            p5.strokeWeight(3);
        }
        else 
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

    static setTheWidjetParent(item, parent) {
        let x,y;
        x = item.X;
        y = item.Y;
        let found = false;
        
        for(let i = parent.children.length - 1 ; i >= 0 ; i--)
        {
            if(parent.children[i].Id === item.Id)
                continue;
            if(parent.children[i] instanceof Grid )
            {
                if( x >= parent.children[i].X &&
                    y >= parent.children[i].Y &&
                    x <= parent.children[i].X+parent.children[i].Width && 
                    y <= parent.children[i].Y+parent.children[i].Height )
                {
                    found = Grid.setTheWidjetParent(item, parent.children[i]);
                    if(found)break;
                }
            }
            else if(parent.children[i].X + parent.children[i].Width <= x && 
                    parent.children[i].Y + parent.children[i].Height <= y)
            {
                // parent.children.splice(i,0,item);
                parent.children.push(item);
                // item.index = parent.children.length-1;
                // item.index = i;
                item.parent = parent;
                // parent.reIndex(i);
                found = true;
                break;
            }
        }
        if(!found) 
        {
            if(x >= parent.X && y >= parent.Y &&
                x <= parent.X+parent.Width && y <= parent.Y+parent.Height
                && parent.Id !== item.Id)
            {
                found = true;
                parent.children.push(item);
                // item.index = parent.children.length - 1;
                item.parent = parent;
            }            
        }
        return found;
    }
}
