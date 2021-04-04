class AppBar extends Widjet 
{
    constructor(point, width, height, name) 
    {
        super(point,true,name);
        this.width = width;
        this.height = height;
        this._type = "AppBar";
    }
}