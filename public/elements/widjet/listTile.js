import Widjet from './widjet.js';

export default class ListTile extends Widjet
{
    constructor(point, width, height)
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"ListTile","Enter your text");
        this.foregroundColor = [125,125,125];
        this.subContent = "subContent";
    }
    sketch(p5,fromList) 
    {
        let x,y,h,w;
        let tx,ty,ts;
        if(fromList)
        {
            x = fromList.x;
            y = fromList.y;
            h = fromList.h;
            w = fromList.w;
            ts = h * 0.4 ;
            while(this.text.length * ts  / 1.85 > w)
                ts -= 1;
            tx = x + ((w - (this.text.length * ts / 1.85)) / 2);
            ty = y + (h * 0.28);
        }
        else 
        {
            x = this.X;
            y = this.Y;
            w = this.width;
            h = this.height;
            ts = this.textFontSize;
            tx = this.text_X;
            ty = this.text_Y;
        }

        p5.strokeWeight(2);
        p5.stroke(0);
        p5.rectMode(p5.CORNER);
        p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        p5.rect(x, y, w, h);

        p5.fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        p5.textSize(ts);
        p5.text(this.text,tx, ty);

        //TODO : sketch subcontent

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