class MainWidjet{
    constructor(point,_type) 
    {
        this.X = point.X;
        this.Y = point.Y;
        this.width = 65;
        this.height = 45;
        this._type = _type;
        this.text = new TextDrawer(_type,this.X,this.Y);
    }
    sketch() 
    {
        rect(this.X, this.Y, this.width, this.height);
        push();
        this.text.sketch(this.width * 0.2);
        pop();
    }
    isInside() {
        if(mouseX < this.X - (this.width/2))
            return false;
        if(mouseY < this.Y - (this.height/2))
            return false;
        if(mouseX > this.X + this.width/2)
            return false;
        if(mouseY > this.Y + this.height/2)
            return false;        
        return true;
    }
}
function createMainWidjet()
{
    // mainParticleArray.push(new MainWidjet({ X: 44, Y: 30 }, "AppBar"));
    mainParticleArray.push(new MainWidjet({ X: 44, Y: 80  }, "Column"));
    mainParticleArray.push(new MainWidjet({ X: 44, Y: 130 }, "Row"));
    mainParticleArray.push(new MainWidjet({ X: 44, Y: 180 }, "Circle"));
    mainParticleArray.push(new MainWidjet({ X: 44, Y: 230 }, "Rect"));
    mainParticleArray.push(new MainWidjet({ X: 44, Y: 280 }, "Text"));


}
function drawMainShapes()
{
    rectMode(CENTER);
    fill(255,255,255,255);
    strokeWeight(3);
    stroke(0);
    for( let i = 0 ; i < mainParticleArray.length ; i++ )
    {
        mainParticleArray[i].sketch();
    }
}
