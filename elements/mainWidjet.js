class MainWidjet
{
    constructor(point,_type) 
    {
        this.X = point.X;
        this.Y = point.Y;
        this.width = 65;
        this.height = 45;
        this._type = _type;
        this.color = [0, 102, 153];
    }

    sketch() 
    {        
        push();
        rect(this.X, this.Y, this.width, this.height);
        textSize(this.width * 0.25);
        fill(this.color[0],this.color[1],this.color[2]);
        noStroke();
        text(this._type, this.X + 10 , this.Y + 15);
        pop();
    }

    isInside() 
    {
        if(    mouseX < this.X 
            || mouseY < this.Y 
            || mouseX > this.X + this.width
            || mouseY > this.Y + this.height
        )
            return false;
        return true;
    }

}
function createMainWidjet()
{
    mainParticleArray.push(new MainWidjet({ X: 11, Y: 30  }, "Column"));
    mainParticleArray.push(new MainWidjet({ X: 11, Y: 80  }, "Row"));
    mainParticleArray.push(new MainWidjet({ X: 11, Y: 130 }, "Flat"));
    mainParticleArray.push(new MainWidjet({ X: 11, Y: 180 }, "Text"));
    // mainParticleArray.push(new MainWidjet({ X: 11, Y: 230 }, "Circle"));


}
function drawMainShapes()
{
    fill(255,255,255,255);
    strokeWeight(3);
    stroke(0);
    rectMode(CORNER);
    for( let i = 0 ; i < mainParticleArray.length ; i++ )
    {
        mainParticleArray[i].sketch();
    }
}
