import Grid from './grid.js';
export default class Row extends Grid{
    constructor(point) 
    {
        super(point,false,"Row",[118,119,81]);
    }

    get Width() 
    {
        let width;
        if(this.parent )
            if(this.parent._type == 'Row')
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
            if( this.parent._type == 'Row')
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

}