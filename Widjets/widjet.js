class Widjet 
{
    constructor(point,drag,name) 
    {
        this.Id = UUID.generate();
        this.parent = null;
        this.X = point.X;
        this.Y = point.Y;
        this.X_O = point.X;
        this.Y_O = point.Y;
        this.drag = drag;
        this.name = name;
        this.text = new TextDrawer("",this.X,this.Y);
        this.backgroundColor = [0,102,153];
        this.setOrientation = false;
        this.size = 0.2;
        this.moved = false;
    }

    get Width() {return this.width;}
    get Height() {return this.height;}
    
    move() 
    {
        if(!this.drag || (pmouseX === mouseX && pmouseY === mouseY)) return;
        this.moved = true;
        if(chkorentaion)
        {
            this.setOrientation = true;
        }

        if(!this.setOrientation)
        {
            this.X = mouseX;
            this.Y = mouseY;
            this.X_O = this.X;
            this.Y_O = this.Y;
        }else{
            if(chkorentaion){
                this.X_O = mouseX;
                this.Y_O = mouseY;
            }
            else{
                this.X = mouseX;
                this.Y = mouseY;
            }
        }
    }
}
