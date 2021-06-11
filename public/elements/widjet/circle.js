import Widjet from './widjet.js';
export default class CircleAvatar extends Widjet 
{

    constructor(point, radius) 
    {
        super({X : point.X , Y : point.Y, W : radius, H : radius},true,"CircleAvatar","Click");
        this.nameIndex = 0;
        this.nameId = "0";
    }

    sketch(p5,fromList) 
    {
        let x,y,h,w;
        // let tx,ty,ts;
        if(fromList)
        {
            x = this.X = ( fromList.x + fromList.w / 2 ) - ( this.height / 2 );
            y = this.Y = fromList.y;
            // h = this.height;
            w = this.height;
            // ts = h * 0.4 ;
            // while(this.text.length * ts  / 1.85 > w)
            //     ts -= 1;
            // tx = x + ((w - (this.text.length * ts / 1.85)) / 2);
            // ty = y + (h * 0.28);
        }
        else 
        {
            x = this.X;
            y = this.Y;
            w = this.width;
            h = this.height;
            // ts = this.textFontSize;
            // tx = this.text_X;
            // ty = this.text_Y;
        }
        p5.strokeWeight(2);
        p5.stroke(0);
        p5.ellipseMode(p5.CORNER);
        p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        // p5.ellipse(x, y, w, h);
        p5.ellipse(x, y, w, w);
        
        // p5.fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        // p5.textSize(ts);
        // p5.text(this.text,tx, ty);

    }
    isInside(p5) 
    {
        let distance = p5.dist(p5.mouseX, p5.mouseY, this.X + this.width / 2, this.Y + this.width / 2);
        if (distance <= this.width / 2)
            return true;        
        return false;
    }
}