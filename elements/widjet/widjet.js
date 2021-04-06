class Widjet extends Element
{

    constructor(point,drag,type) 
    {
        super(point,drag,`${type} ${count++}`,type ,[0,102,153]);

        this.text = new TextDrawer("",this.X,this.Y);
        this.text.parent = this;
        this.size = 0.2;
    }

    get Width() {return this.width;}
    get Height() {return this.height;}
    
}
