class FlatButton extends Widjet 
{

    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Flat","Click");
    }

    sketch() 
    {
        
        this.move();

        strokeWeight(2);
        stroke(0);
        rectMode(CORNER);
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        rect(this.X, this.Y, this.width, this.height);
        
        fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        textSize(this.textFontSize);
        text(this.text,this.text_X, this.text_Y);
        
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

