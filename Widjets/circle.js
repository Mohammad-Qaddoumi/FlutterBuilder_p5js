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
        strokeWeight(2);
        stroke(0);
        ellipseMode(CORNER);
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        if(chkorentaion && this.setOrientation)
            ellipse(this.X_O, this.Y_O, this.width, this.height);
        else 
            ellipse(this.X, this.Y, this.width, this.height);
        this.text.sketch(this.width * 0.15);
        strokeWeight(5);
        stroke(255);
        // line(this.X, this.Y,this.X + this.width,this.Y );
    }
    isInside() {
        // if(chkorentaion && this.setOrientation)
        // {
        //     let distance = dist(mouseX, mouseY, this.X_O, this.Y_O);
        //     if (distance <= this.width)
        //         return true;
        // }
        // else
        // {    
        //     let distance = dist(mouseX, mouseY, this.X, this.Y);
        //     if (distance <= this.width)
        //         return true;
        // }
        // return false;
        if(mouseX < this.X - (this.width/2))
            return false;
        if(mouseY < this.Y - (this.height/2))
            return false;
        if(mouseX > this.X + this.width/2)
            return false;
        if(mouseY > this.Y + this.height/2)
            return false;
        return true;
    }
}