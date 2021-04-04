class Rectangle extends Widjet {
    constructor(point, width, height, name) {
        super(point,true,name);
        this.width = width;
        this.height = height;
        this._type = "Rect";
    }
    sketch() {
        if (mouseIsPressed)
        {
            this.move();
            this.text.position.X = this.X - (this.width / 2) + 5;
            this.text.position.Y = this.Y;
            this.text.positionOrentation.X = this.X_O - (this.width / 2) + 5;
            this.text.positionOrentation.Y = this.Y_O;
        }
        strokeWeight(3);
        stroke(0);
        rectMode(CORNER);
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        if(chkorentaion && this.setOrientation)
            rect(this.X_O, this.Y_O, this.width, this.height);
        else
            rect(this.X, this.Y, this.width, this.height);
        this.text.sketch(this.width * 0.15);
    }
    isInside() {
        if(chkorentaion && this.setOrientation){
            if(mouseX < this.X_O - (this.width/2))
                return false;
            if(mouseY < this.Y_O - (this.height/2))
                return false;
            if(mouseX > this.X_O + this.width/2)
                return false;
            if(mouseY > this.Y_O + this.height/2)
                return false;
        }
        else{
            if(mouseX < this.X - (this.width/2))
                return false;
            if(mouseY < this.Y - (this.height/2))
                return false;
            if(mouseX > this.X + this.width/2)
                return false;
            if(mouseY > this.Y + this.height/2)
                return false;
        }
        return true;
    }
}

