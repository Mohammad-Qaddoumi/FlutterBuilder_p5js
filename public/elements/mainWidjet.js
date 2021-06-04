class MainWidjet
{
    constructor(point,_type) 
    {
        this.X = point.X;
        this.Y = point.Y;
        this.width = 99;
        this.height = 45;
        this._type = _type;
        this.color = [0, 102, 153];
    }

    get text_X () 
    {
        return this.X + ((this.width - (this._type.length * this.textFontSize  * 0.9 / 1.85)) / 2);
    }
    get text_Y ()
    {
        return this.Y + (this.height * 0.28);
    }
    get textFontSize () 
    {
        let fontSize = this.height * 0.4 ;
        while(this._type.length * fontSize  / 1.85 > this.width)
        {
            fontSize -= 1;
        }
        return fontSize;
    }

    sketch(p5) 
    {        
        p5.push();
        p5.rect(this.X, this.Y, this.width, this.height);
        p5.textSize(this.textFontSize * 0.9);
        p5.fill(this.color[0],this.color[1],this.color[2]);
        p5.noStroke();
        p5.text(this._type, this.text_X , this.text_Y);
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
    const widjets = ["Input","Image","FlatButton","Text","CircleAvatar","List","ListTile"];
    let x = 8, y = 30;
    for(let i=0;i<widjets.length;i++)
    {
        mainWidjets.push(new MainWidjet({ X: x, Y: y  }, widjets[i]));
        y+=50;    
    }
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