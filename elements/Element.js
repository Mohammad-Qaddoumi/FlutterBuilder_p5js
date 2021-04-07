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
        this.canMove = true;
        if (this.constructor == Element) 
        {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    get Width()
    {
        return this.width;
    }
    get Height()
    {
        return this.height;
    }

    sketch() 
    {
        throw new Error("Method 'sketch()' must be implemented.");
    }
    
    move() 
    {
        if(    !this.drag 
            || (pmouseX === mouseX && pmouseY === mouseY) 
            || !mouseIsPressed
            || !this.canMove
        ) return;

        this.moved = true;
        this.X = mouseX - X_D;
        this.Y = mouseY - Y_D;
    }
}

