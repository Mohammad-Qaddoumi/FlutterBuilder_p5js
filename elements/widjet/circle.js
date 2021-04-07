class Circle extends Widjet 
{

    constructor(point, radius) 
    {
        super({X : point.X , Y : point.Y, W : radius, H : radius},true,"Circle","Click");
    }

    sketch() 
    {

        this.move();

        strokeWeight(2);
        stroke(0);
        ellipseMode(CORNER);
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        ellipse(this.X, this.Y, this.width, this.height);
        
        fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        textSize(this.textFontSize);
        text(this.text,this.text_X, this.text_Y);
    }
    isInside() 
    {
        let distance = dist(mouseX, mouseY, this.X + this.width / 2, this.Y + this.width / 2);
        if (distance <= this.width / 2)
            return true;        
        return false;
    }
}