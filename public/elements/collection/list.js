import Element from '../Element.js';
import config from '../../lib/config.js';
import CircleAvatar from '../widjet/circle.js';
export default class List extends Element
{
    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y, W : width, H : height} ,true , `List${config.count++}`,"List",[100,100,100]);

        this.children = [
            // new CircleAvatar({ X: 9, Y: 9 }, 40, 40)
        ];
        this.noBackground = false;
        this.selectedIndex = 0;
    }
    sketch(p5) 
    {
        p5.strokeWeight(3);
        p5.stroke(0,255,0);
        p5.rectMode(p5.CORNER);
        p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        p5.rect(this.X, this.Y, this.width, this.height);
        let x = this.X + 2;
        let y = this.Y + 2;
        let w = this.Width - 4;
        for(let i=0;i<this.children.length;i++)
        {
            p5.push();
            if(y + this.children[i].height > this.Y + this.Height)
            {
                y -= 42;
                p5.stroke(255,0,0);
                p5.strokeWeight(3);
                p5.textSize(31);
                p5.fill(255,0,0);
                let d = Math.abs(this.Y + this.height - y)/2;
                p5.text("...",x + w /3,this.Y + this.Height - d);
                p5.pop();
                break;
            }
            this.children[i].sketch(p5,{x,y,w, h : this.children[i].height});
            p5.pop();
            y += this.children[i].height + 2;
        }        
    }
    isInside(p5) 
    {
        if(    p5.mouseX < this.X 
            || p5.mouseY < this.Y 
            || p5.mouseX > this.X + this.width
            || p5.mouseY > this.Y + this.height
        )
            return false;
        return true;
    }
    superSketch(p5)
    {
        try{
            if(!this.canMove)
                p5.image(p5.lockImg,this.X,this.Y,20,25);
        }
        catch(e)
        {
            console.log(e);
        }
    }
}