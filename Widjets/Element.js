class Element 
{
    constructor(point,drag = false,name = "",type = "",bc)
    {
        this.Id = UUID.generate();
        this.X = point.X;
        this.Y = point.Y;
        this.width = point.W;
        this.height = point.H;
        this.drag = drag;
        this.parent = null;
        this.name = name;
        this.moved = false;
        this._type = type;
        this.backgroundColor = bc;
        if (this.constructor == Element) 
        {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    sketch() 
    {
        throw new Error("Method 'sketch()' must be implemented.");
    }
    move() 
    {
        if(!this.drag || (pmouseX === mouseX && pmouseY === mouseY) || !mouseIsPressed) return;
        this.moved = true;
        this.X = mouseX;
        this.Y = mouseY;
    }
}

