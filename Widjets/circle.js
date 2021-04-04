class Circle extends Widjet {
    constructor(point, radius, name) {
        super(point,true,name);
        this.width = radius;
        this.height = radius;
        this._type = "Circle";
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
        ellipseMode(CORNER);
        if(chkorentaion && this.setOrientation)
            ellipse(this.X_O, this.Y_O, this.width, this.height);
        else 
            ellipse(this.X, this.Y, this.width, this.height);
        this.text.sketch(this.width * 0.15);
    }
    isInside() {
        if(chkorentaion && this.setOrientation)
        {
            let distance = dist(mouseX, mouseY, this.X_O, this.Y_O);
            if (distance < this.width / 2)
                return true;
        }
        else
        {    
            let distance = dist(mouseX, mouseY, this.X, this.Y);
            if (distance < this.width / 2)
                return true;
        }
        return false;
    }
}