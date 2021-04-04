class Column extends Grid{
    static count = 1;
    constructor(point) {
        super(point);
        this._type = "Column";
        this.name = `Column${Column.count++}`;
    }

    get Width() 
    {
        let width;
        if(this.parent )
            if(this.parent._type == 'Column')
            {
                width = this.parent.Width * this.size;
            }
            else 
            {
                width = this.parent.Width - 4;
            }
        else
            width = this.width;
        return width;
    }
    get Height() 
    { 
        let height;
        if(this.parent )
            if( this.parent._type == 'Column')
            {
                height = this.parent.Height - 4;
            }
            else 
            {
                height = this.parent.Height * this.size;
            }
        else
            height = this.height;
        return height;
    }

    sketch(){
        if(mouseIsPressed)
            this.move();
        
        for(let i = 0; i < this.children.length; i++)
        {
            push();
            this.children[i].sketch();
            pop();
        }
        push();
        if(!showBar)
            stroke(0);
        else 
            noStroke();
        fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
        rect(this.X,this.Y,this.Width,this.Height);
        pop();
    }

    isInside() {
        if(chkorentaion && this.setOrientation){
            if(mouseX < this.X_O || mouseY < this.Y_O
                || mouseX > this.X_O + this.width_O 
                || mouseY > this.Y_O + this.height_O
            )
                return false;
        }
        else{
            if(mouseX < this.X 
                || mouseY < this.Y 
                || mouseX > this.X + this.Width
                || mouseY > this.Y + this.Height
            )
                return false;
        }
        return true;
    }

}