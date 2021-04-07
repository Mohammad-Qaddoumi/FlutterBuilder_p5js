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

        // noFill();
        // rect(this.X - 1, this.Y ,this.Width,this.Height);

        textSize(this.fontSize);
        fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        text(this.text, this.X, this.Y);

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
