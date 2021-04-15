import Widjet from './widjet.js';
export default class FlatButton extends Widjet 
{

    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Flat","Click");
    }

    sketch(p5) 
    {
        
        this.move(p5);

        p5.strokeWeight(2);
        p5.stroke(0);
        p5.rectMode(p5.CORNER);
        p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        p5.rect(this.X, this.Y, this.width, this.height);
        
        p5.fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        p5.textSize(this.textFontSize);
        p5.text(this.text,this.text_X, this.text_Y);
        
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

