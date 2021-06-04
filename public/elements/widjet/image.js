import Widjet from "./widjet.js";

export default class ImageWidjet extends Widjet
{
    constructor(point, width, height)
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Image","");
        this.img = {
            loading : true,
            error : "",
            imageType : "",
            // name : "",
            // newURL: "",
            p5Image : null
        };
    }
    sketch(p5,fromList) 
    {
        if(!this.img.loading && ! this.img.error)
        {
            try{
                p5.image(this.img.p5Image,this.X,this.Y,this.width,this.height);
            }
            catch(e)
            {
                this.img.error = e;
                console.log(e);
            }
        }
        else
        {
            let x,y,h,w;
            if(fromList)
            {
                x = fromList.x;
                y = fromList.y;
                h = fromList.h;
                w = fromList.w;
            }
            else 
            {
                x = this.X;
                y = this.Y;
                w = this.width;
                h = this.height;
            }
            p5.push();
            p5.noFill();
            p5.stroke(255,255,255);
            p5.rect(x,y,w,h);
            p5.pop();
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
}