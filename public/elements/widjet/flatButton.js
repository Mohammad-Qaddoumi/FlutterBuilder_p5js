import Widjet from './widjet.js';
export default class FlatButton extends Widjet 
{

    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"FlatButton","Click");
    }

    sketch(p5,fromList) 
    {
        let x,y,h,w;
        let tx,ty,ts;
        if(fromList)
        {
            x = this.X = fromList.x;
            y = this.Y = fromList.y;
            // h = fromList.h;
            h = this.height;
            w = this.width = fromList.w;
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

