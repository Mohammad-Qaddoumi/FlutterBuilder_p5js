import UUID from '../lib/idgenerator.js';
export default class Element 
{
    constructor(point,drag = false,name = "",type = "",bc)
    {
        this.Id = UUID.generate();
        this.X = point.X;
        this.Y = point.Y;
        this.width = point.W;
        this.height = point.H;
        this.drag = drag;
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

    sketch(p5) 
    {
        throw new Error("Method 'sketch()' must be implemented.");
    }
    
    move(p5) 
    {
        if(    !this.drag 
            || (p5.pmouseX === p5.mouseX && p5.pmouseY === p5.mouseY) 
            || !p5.mouseIsPressed
            || !this.canMove
        ) return;

        this.moved = true;
        this.X = p5.mouseX - p5.X_D;
        this.Y = p5.mouseY - p5.Y_D;
        p5.socket.emit('moving',ROOM_ID, JSON.stringify({
            EMAIL,
            Id : this.Id,
            X : this.X,
            Y : this.Y
        }));
    }
}

