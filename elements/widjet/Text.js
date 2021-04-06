class Text extends Widjet
{

    constructor(point, width, height)
    {
        super({X : point.X , Y : point.Y, W : width, H : height},true,"Text");
        this.text = "Text";
        this.userSize = 40;
    }

    sketch()
    {
        
        this.move();

        // noStroke();
        // rectMode(CENTER);
        // rect(this.X, this.Y, this.width, this.height);
        textAlign(LEFT,TOP);
        textFont(font);
        textSize(this.userSize);
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