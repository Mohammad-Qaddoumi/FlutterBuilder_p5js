export default class Partner
{
    constructor(name,email)
    {
        this.name = name;
        this.email = email;
        this.X = 0;
        this.Y = 0;
        this.selected  = null;
        this.fontSize = 15;
        this.width = 21;
        this.height = 25;
    }
    get text_X () 
    {
        return this.X + ((this.width - (this.name.length * this.textFontSize / 1.85)) / 2);
    }
    get textFontSize () 
    {
        return this.fontSize;
    }
    get text_Y ()
    {
        return this.Y + this.height + 4;
    }
    sketch(p5)
    {
        p5.push();
        p5.image(p5.cursorImg,this.X,this.Y,this.width,this.height);
        p5.stroke(0);
        p5.fill(125,125,125);
        p5.textSize(this.textFontSize);
        p5.text(this.name, this.text_X, this.text_Y);
        p5.pop();
    }
}
