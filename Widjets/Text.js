class Text extends Widjet{
    constructor(point, width, height,name,text){
        super(point,true,name);
        this.width = width;
        this.height = height;
        this.text = text;
        this.userSize = 40;
        this._type = "Text";
    }
    sketch()
    {
        if (mouseIsPressed)
        {
            this.move();
        }   
        // noStroke();
        // rectMode(CENTER);
        // rect(this.X, this.Y, this.width, this.height);
        textAlign(CENTER, CENTER);
        textFont(font);
        textSize(this.userSize*1.2);
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        text(this.text, this.X, this.Y);
        /*
            let base = height * 0.75;
            let scalar = 0.8; // Different for each font

            textSize(32); // Set initial text size
            let asc = textAscent() * scalar; // Calc ascent
            line(0, base - asc, width, base - asc);
            text('dp', 0, base); // Draw text on baseline

            textSize(64); // Increase text size
            asc = textAscent() * scalar; // Recalc ascent
            line(40, base - asc, width, base - asc);
            text('dp', 40, base); // Draw text on baseline
         */
    }
    isInside() {
        if(chkorentaion && this.setOrientation)
        {
            if(mouseX < this.X_O - (this.width/2))
                return false;
            if(mouseY < this.Y_O - (this.height/2))
                return false;
            if(mouseX > this.X_O + this.width/2)
                return false;
            if(mouseY > this.Y_O + this.height/2)
                return false;
        }
        else
        {
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