import Widjet from "./widjet.js";

export default class ImageWidjet extends Widjet
{
    constructor(point, width, height)
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Image","");
        this.img = {
            loading : true,
            error : "",
            name : "",
            originalURL : "",
            newURL: "",
            p5Image : null
        };
    }
    sketch(p5) 
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
            p5.push();
            p5.noFill();
            p5.stroke(255,255,255);
            p5.rect(this.X,this.Y,this.width,this.height);
            p5.pop();
        }
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