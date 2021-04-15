class MainWidjet
{
    constructor(point,_type) 
    {
        this.X = point.X;
        this.Y = point.Y;
        this.width = 75;
        this.height = 45;
        this._type = _type;
        this.color = [0, 102, 153];
    }

    sketch(p5) 
    {        
        p5.push();
        p5.rect(this.X, this.Y, this.width, this.height);
        p5.textSize(this.width * 0.25);
        p5.fill(this.color[0],this.color[1],this.color[2]);
        p5.noStroke();
        p5.text(this._type, this.X + 9 , this.Y + 15);
        p5.pop();
    }

    isInside(p5) 
    {
        if(    p5.mouseX < this.X 
            || p5.mouseY < this.Y 
            || p5.mouseX > this.X + this.width
            || p5.mouseY > this.Y + this.height
        )
            return false;
        return true;
    }

}
function createMainWidjet(mainWidjets)
{
    mainWidjets.push(new MainWidjet({ X: 11, Y: 30  }, "Column"));
    mainWidjets.push(new MainWidjet({ X: 11, Y: 80  }, "Row"));
    mainWidjets.push(new MainWidjet({ X: 11, Y: 130 }, "Flat"));
    mainWidjets.push(new MainWidjet({ X: 11, Y: 180 }, "Text"));
    // mainParticleArray.push(new MainWidjet({ X: 11, Y: 230 }, "Circle"));


}
function drawMainShapes(p5)
{
    p5.fill(255,255,255,255);
    p5.strokeWeight(3);
    p5.stroke(0);
    p5.rectMode(p5.CORNER);
    for( let i = 0 ; i < p5.mainWidjets.length ; i++ )
    {
        p5.mainWidjets[i].sketch(p5);
    }
}
export default {
    createMainWidjet,
    drawMainShapes
}