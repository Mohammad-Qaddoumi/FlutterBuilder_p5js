import List from './list.js';


export default class Menu extends List
{
    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y},  width,  height);
        this.name = this._type =  "Menu";
        this.canMove = false;
        this.backgroundColor = [39,170,144];
    }
    sketch(p5) 
    {
        p5.push();
        p5.noStroke();
        p5.rectMode(p5.CORNER);
        p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        let X,Y,H;
        if(p5.screens[p5.selectedScreen].appBar)
        {
            X = p5.screens[p5.selectedScreen].appBar.X;
            Y = p5.screens[p5.selectedScreen].appBar.Y;
            H = p5.screens[p5.selectedScreen].appBar.height + p5.screens[p5.selectedScreen].height; 
        }
        else 
        {
            X = p5.screens[p5.selectedScreen].X;
            Y = p5.screens[p5.selectedScreen].Y;
            H = p5.screens[p5.selectedScreen].height;
        }
        let W = p5.screens[p5.selectedScreen].width * 0.85;
        p5.rect(X, Y, W, H);
        let x = X + 2;
        let y = Y + 2;
        let w = W - 4;
        for(let i=0;i<this.children.length;i++)
        {
            p5.push();
            if(y + this.children[i].height > Y + H)
            {
                y -= 42;
                p5.stroke(255,0,0);
                p5.strokeWeight(3);
                p5.textSize(31);
                p5.fill(255,0,0);
                let d = Math.abs(Y + H - y)/2;
                p5.text("...",x + w /3,Y + H - d);
                p5.pop();
                break;
            }
            this.children[i].sketch(p5,{x,y,w, h : this.children[i].height});
            p5.pop();
            y += this.children[i].height + 2;
        }   
        p5.pop();     
    }
    isInside(p5) 
    {
        let X,Y,W,H;
        if(p5.screens[p5.selectedScreen].appBar)
        {
            X = p5.screens[p5.selectedScreen].appBar.X;
            Y = p5.screens[p5.selectedScreen].appBar.Y;
        }
        else
        {
            X = p5.screens[p5.selectedScreen].X;
            Y = p5.screens[p5.selectedScreen].Y;
        }
        if(p5.selected.Id === this.Id)
        {
            W = p5.screens[p5.selectedScreen].width * 0.85;
            H = p5.screens[p5.selectedScreen].height + p5.screens[p5.selectedScreen].appBar.height;
        }
        else 
        {
            X = X + 10;
            Y = Y + 10;
            W = p5.screens[p5.selectedScreen].Width * 0.17;
            H = 15;
        }
        if(    p5.mouseX < X 
            || p5.mouseY < Y 
            || p5.mouseX > X + W
            || p5.mouseY > Y + H
        )
            return false;
        return true;
    }
}