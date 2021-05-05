import Widjet from "./widjet.js";

export default class Input extends Widjet
{
    constructor(point, width, height)
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Input","Enter your text here");
        this.curserDrawer = null;
        this.flip = 0;
    }

    get text_X () 
    {
        return this.X + (this.width * 0.03);
    }

    fix_X_position(p5)
    {
        if(Math.abs(this.X - p5.screens[p5.selectedScreen].X) <= 31)
        this.X = p5.screens[p5.selectedScreen].X;
    }

    sketch(p5) 
    {
        p5.strokeWeight(1);
        p5.stroke(0);
        p5.rectMode(p5.CORNER);
        p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        p5.rect(this.X, this.Y, this.width, this.height, 15);
        
        p5.fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        p5.textSize(this.textFontSize);
        p5.text(this.text,this.text_X, this.text_Y);

        if(this.flip % 23 === 0)
        {   
            p5.stroke(255,255,255);
            p5.strokeWeight(3);
            p5.line(this.text_X - 1 , this.Y + 11 , this.text_X - 1 , this.Y + this.height - 11);
            this.flip += 1;
        }
        else 
            this.flip += 1;

        if(!this.canMove)
            p5.image(p5.lockImg,this.X,this.Y,20,25);
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
}