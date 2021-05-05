import Widjet from './widjet.js';
export default class AppBar extends Widjet 
{
    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"AppBar","Title");
        this.canMove = false;
        this.fontSize = 20;
    }

    sketch(p5) 
    {
        p5.push();

        p5.rectMode(p5.CORNER);
        p5.noStroke();
        p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        p5.rect(this.X, this.Y, this.width, this.height,7);

        p5.fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        p5.textSize(this.textFontSize);
        p5.text(this.text, this.text_X, this.text_Y);

        p5.pop();
    }
    get text_X () 
    {
        return this.X + ((this.width - (this.text.length * this.textFontSize / 1.85)) / 2);
    }

    get textFontSize () 
    {
        return this.fontSize;
    }

    get text_Y ()
    {
        return this.Y + (this.height * 0.2);
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