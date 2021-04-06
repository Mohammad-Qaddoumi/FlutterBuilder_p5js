class TextDrawer
{
    constructor(mtext)
    {
        this.mText = mtext;
        this.parent = null;
        this.color = [0, 102, 153];
    }
    sketch(size)
    {
        // textAlign(CENTER, CENTER);
        textAlign(LEFT,TOP);
        textFont(font);
        textSize(size*1.2);
        fill(this.color[0],this.color[1],this.color[2]);
        noStroke();
        text(this.mText, this.parent.X + 10 , this.parent.Y + 15);
    }
}
