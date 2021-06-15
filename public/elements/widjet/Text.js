import Widjet from './widjet.js';
export default class Text extends Widjet
{

    constructor(point, width, height)
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Text");
        this.text = "Text";
    }

    get Width()
    {
        return this.text.length * this.fontSize / 1.85 + 1;
    }
    get Height()
    {
        return this.fontSize * 1.1;
    }

    sketch(p5,fromList)
    {       
        let x,y,h,w,fontSize;
        if(fromList)
        {
            x = this.X = fromList.x;
            y = this.Y = fromList.y;
            h = this.Height + 2;
            this.height = 5 + this.Height;
            w = this.width = fromList.w;
            fontSize = 19;
        }
        else 
        {
            x = this.X;
            y = this.Y;
            w = this.Width;
            h = this.Height;
            fontSize = this.fontSize;
        }
        p5.fill(this.backgroundColor[0],this.backgroundColor[1],this.backgroundColor[2]);
        p5.rect(x - 1, y ,w,h + 3);

        p5.textSize(fontSize);
        p5.fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        p5.text(this.text, x + 3, y + 3);

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
