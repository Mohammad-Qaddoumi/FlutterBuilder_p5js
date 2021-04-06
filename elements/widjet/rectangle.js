class Rectangle extends Widjet 
{

    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Rect");
    }

    sketch() 
    {
        
        this.move();

        strokeWeight(2);
        stroke(0);
        rectMode(CORNER);
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        rect(this.X, this.Y, this.width, this.height);
        this.text.sketch(this.width * 0.15);
    }

    isInside() 
    {
        if(    mouseX < this.X 
            || mouseY < this.Y 
            || mouseX > this.X + this.width
            || mouseY > this.Y + this.height
        )
            return false;
        return true;
    }
}

