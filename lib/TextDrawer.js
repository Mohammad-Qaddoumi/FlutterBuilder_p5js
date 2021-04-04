class TextDrawer{
    constructor(mtext,x,y){
        this.mText = mtext;;
        this.position = {X:x,Y:y};
        this.positionOrentation = {X:x,Y:y};
        this.color = [0, 102, 153];
    }
    sketch(size){
        textAlign(CENTER, CENTER);
        textFont(font);
        textSize(size*1.2);
        fill(this.color[0],this.color[1],this.color[2]);
        noStroke();
        if(chkorentaion)
            text(this.mText, this.positionOrentation.X, this.positionOrentation.Y);
        else
            text(this.mText, this.position.X, this.position.Y);
    }
}