class Text extends Widjet
{

    constructor(point, width, height)
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Text");
        this.text = "Text";
        this.fontSize = 40;
    }

    get Width()
    {
        return this.text.length * this.fontSize / 1.85 + 1;
    }
    get Height()
    {
        return this.fontSize * 1.1;
    }

    sketch()
    {       
        this.move();
        textAlign(LEFT,TOP);
        textFont(font);
        textSize(this.fontSize);
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        text(this.text, this.X, this.Y);
        noFill();
        rect(this.X - 1, this.Y ,this.Width,this.Height);
    }

    isInside() 
    {
        if(    mouseX < this.X 
            || mouseY < this.Y 
            || mouseX > this.X + this.Width
            || mouseY > this.Y + this.Height
        )
            return false;
        return true;
    }
}
