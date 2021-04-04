class Column extends Grid{
    static count = 1;
    constructor(point) {
        super(point);
        this._type = "Column";
        this.name = `Column${Column.count++}`;
        this.index = -1;
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
        if(!showBar) return;
        let mx = max(this.children.length,1);
        mx = 1;
        let rGap = this.Width ;
        let cGap = this.Height / mx;
        push();
        stroke(255,165,0);
        for (let i = 0; i <= 1; i++) {
            line(this.X + rGap * i, this.Y, this.X + rGap * i, this.Y + this.Height);
        }
        for (let j = 0; j <= mx; j++) {
            line(this.X, this.Y + cGap * j,this.X + this.Width, this.Y + cGap * j);
        }
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