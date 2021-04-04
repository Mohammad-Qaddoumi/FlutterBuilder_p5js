class Grid 
{
    constructor(point,drag = false) 
    {
        this.Id = UUID.generate();
        this.X = point.X;
        this.Y = point.Y;
        this.width = point.W;
        this.height = point.H;
        this.X_O = point.X_O;
        this.Y_O = point.Y_O;
        this.width_O = point.W_O;
        this.height_O = point.H_O;
        this.children = [];
        this.size = 0.3333333;
        this.children_O = [];
        this.drag = drag;
        this.name = "";
        this.parent = null;
        this.setOrientation = false;
        this._type = "Grid";
        this.backgroundColor = [100,100,100];
        this.noBackground = true;
        this.moved = false;
        this.canMove = true;
    }

    get Width()
    {
        return this.width;
    }
    get Height()
    {
        return this.height;
    }

    move() 
    {
        if(!this.drag || (pmouseX === mouseX && pmouseY === mouseY)) return;
        if(!this.canMove)
            return;
        this.moved = true;
        // print(this,this.moved);
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
    static setTheWidjetParent(item, parent) {
        let x,y;
        x = item.X;
        y = item.Y;
        let found = false;
        
        for(let i = parent.children.length - 1 ; i >= 0 ; i--)
        {
            if(parent.children[i].Id === item.Id)
                continue;
            if(parent.children[i] instanceof Grid )
            {
                if( x >= parent.children[i].X &&
                    y >= parent.children[i].Y &&
                    x <= parent.children[i].X+parent.children[i].Width && 
                    y <= parent.children[i].Y+parent.children[i].Height )
                {
                    found = Grid.setTheWidjetParent(item, parent.children[i]);
                    if(found)break;
                }
            }
            else if(parent.children[i].X + parent.children[i].Width <= x && 
                    parent.children[i].Y + parent.children[i].Height <= y)
            {
                // parent.children.splice(i,0,item);
                parent.children.push(item);
                // item.index = parent.children.length-1;
                // item.index = i;
                item.parent = parent;
                // parent.reIndex(i);
                found = true;
                break;
            }
        }
        if(!found) 
        {
            if(x >= parent.X && y >= parent.Y &&
                x <= parent.X+parent.Width && y <= parent.Y+parent.Height
                && parent.Id !== item.Id)
            {
                found = true;
                parent.children.push(item);
                // item.index = parent.children.length - 1;
                item.parent = parent;
            }            
        }
        return found;
    }
}
