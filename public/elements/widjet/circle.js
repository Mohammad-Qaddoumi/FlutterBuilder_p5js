import Widjet from './widjet.js';
export default class Circle extends Widjet 
{

    constructor(point, radius) 
    {
        super({X : point.X , Y : point.Y, W : radius, H : radius},true,"Circle","Click");
    }

    sketch(p5) 
    {

        this.move(p5);

        p5.strokeWeight(2);
        p5.stroke(0);
        p5.ellipseMode(p5.CORNER);
        p5.fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        p5.ellipse(this.X, this.Y, this.width, this.height);
        
        p5.fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        p5.textSize(this.textFontSize);
        p5.text(this.text,this.text_X, this.text_Y);
    }
    isInside(p5) 
    {
        let distance = dist(p5.mouseX, p5.mouseY, this.X + this.width / 2, this.Y + this.width / 2);
        if (distance <= this.width / 2)
            return true;        
        return false;
    }
}