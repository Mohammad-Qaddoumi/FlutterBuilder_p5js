import Widjet from './widjet.js';
export default class Text extends Widjet
{

    constructor(point, width, height)
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Text");
        this.text = "Text";
        this.fontSize = 40;
    }

    get Width()
    {
        return this.text.length * this.fontSize / 1.85 + 1;
    }
    get Height()
    {
        return this.fontSize * 1.1;
    }

    sketch(p5)
    {       
        this.move(p5);

        // noFill();
        // rect(this.X - 1, this.Y ,this.Width,this.Height);

        p5.textSize(this.fontSize);
        p5.fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        p5.text(this.text, this.X, this.Y);

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
