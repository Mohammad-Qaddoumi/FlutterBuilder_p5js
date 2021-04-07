class AppBar extends Widjet 
{
    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"AppBar","Title");
        this.canMove = false;
        this.fontSize = 30;
    }

    sketch() 
    {

        this.move();

        push();

        rectMode(CORNER);
        noStroke();
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        rect(this.X, this.Y, this.width, this.height);

        fill(this.foregroundColor[0], this.foregroundColor[1], this.foregroundColor[2]);
        textSize(this.textFontSize);
        text(this.text, this.text_X, this.text_Y);

        pop();
    }
    get text_X () 
    {
        return this.X + ((this.width - (this.text.length * this.textFontSize / 1.85)) / 2);
    }

    get textFontSize () 
    {
        return this.fontSize;
    }

    get text_Y ()
    {
        return this.Y + (this.height * 0.2);
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