class AppBar extends Widjet 
{
    constructor(point, width, height) 
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"AppBar");
        this.text = "Title";//"appBarColor": [100,100,100],
        this.textColor = [255,255,255];
        this.canMove = false;
    }

    sketch() 
    {

        this.move();

        push();
        rectMode(CORNER);
        noStroke();
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        rect(this.X, this.Y, this.width, this.height);

        fill(this.textColor[0], this.textColor[1], this.textColor[2]);
        textAlign(LEFT,TOP);
        textFont(font);
        textSize(30);
        let x = (this.width - (this.text.length * 30 / 1.85)) / 2;
        let y = this.height * 0.2;
        text(this.text, this.X + x, this.Y + y);
        pop();
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