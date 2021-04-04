class TextDrawer{
    constructor(mtext,x,y){
        this.mText = mtext;;
        this.position = {X:x,Y:y};
        this.positionOrentation = {X:x,Y:y};
    }
    sketch(size){
        push();
        textAlign(CENTER, CENTER);
        textFont(font);
        textSize(size*1.2);
        fill(0, 102, 153);
        noStroke();
        // stroke(255,0,0);
        strokeWeight(20);
        let x,y;
        if(this.parent)
        {
            if(this.parent._type == "Column")
            {
                x = this.position.X;
                y = this.position.Y + (this.parent.Height/2)  - (this.height/2);
            }
            else
            {
                x = this.position.X + (this.parent.Width/2) - (this.width/2);
                y = this.position.Y;
            }

        }
        else
        {
            x = this.position.X;
            y = this.position.Y;
        }
        if(chkorentaion)
            text(this.mText, this.positionOrentation.X, this.positionOrentation.Y);
        else
            text(this.mText, x, y);
        pop();
    }
}