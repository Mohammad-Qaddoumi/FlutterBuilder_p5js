class Grid extends Element
{
    constructor(point,drag = false,type = "Grid") 
    {
        super(point ,drag , `${type} ${count++}`,type,[100,100,100]);

        this.children = [];
        this.size = 0.3333333;
        this.noBackground = true;
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

    sketch()
    {
        this.move();
        
        if(!showBar)
        {
            stroke(0);
            strokeWeight(3);
        }
        else 
            noStroke();
        if(!this.noBackground)
        {
            push();
            fill(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
            rect(this.X,this.Y,this.Width,this.Height);
            pop();
        }
        else{
            push();
            noFill();
            rect(this.X,this.Y,this.Width,this.Height);
            pop();
        }
        

        for(let i = 0; i < this.children.length; i++)
        {
            push();
            this.children[i].sketch();
            pop();
        }
        
    }

    move() 
    {
        if(!this.drag || (pmouseX === mouseX && pmouseY === mouseY)) return;
        if(!this.canMove)
            return;
        this.moved = true;
        this.X = mouseX;
        this.Y = mouseY;
    }


    isInside() 
    {
        if(    mouseX < this.X 
            || mouseY < this.Y 
            || mouseX > this.X + this.Width
            || mouseY > this.Y + this.Height
        )
            return false;
        return true;
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
