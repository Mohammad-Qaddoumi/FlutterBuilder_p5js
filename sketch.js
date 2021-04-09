function preload() 
{
    screens.push(new Row(gridPoints));
    screens[0].unSortedWidjets = [];
    screens[0].backgroundColor = [0,0,0];
    unSortedWidjets = screens[selectedScreen].unSortedWidjets;
    screens[selectedScreen].canMove = false;
    selected = screens[selectedScreen];
    createMainWidjet();
    img = loadImage('./assets/phone.png');
    font = loadFont("./assets/AnonymousPro-Regular.ttf");

    setEvents();
    
    modelPhone = loadModel('./assets/phone2.obj', true);
    txtUpdating = {
        text : "Updating...",
        X : -250, 
        Y : -300
    }
    // updateText = createGraphics(200, 200);
    // updateText.fill(255);
    // updateText.background(0);
    // updateText.textAlign(CENTER);
    // updateText.textSize(30);
    // updateText.text('Update', 50, 50);
    bg_phone_forModel = loadImage('./assets/Corp-phone2.png');

}

function setup() 
{
    let cnv = createCanvas(canvasWidth, canvasHeight, WEBGL);
    frameRate(120);
    changeTheSelectedProperty();
}
// let  updateText;
function draw() 
{
    clear();
    textAlign(LEFT,TOP);
    textFont(font);
    if (updateison) 
    {
        push();

        textSize(50);
        fill(0, 102, 153);
        noStroke();
        text(txtUpdating.text, txtUpdating.X + 10 , txtUpdating.Y + 15);

        // translate(mouseX - width/2, mouseY - height/2);
        rotateX(spin);
        rotateY(spin * 1.3);
        rotateZ(spin * 0.7);
        texture(bg_phone_forModel);
        scale(2);
        noStroke();
        // texture(img);
        // texture(updateText);
        // box(75,170,2);
        model(modelPhone);
        spin += 0.03;

        pop();
    }
    else 
    {
        translate(width / -2, height / -2, 0);
        
        push();
        fill(255,0,0);
        stroke(255,0,0);
        strokeWeight(7);
        line(vline.x1, vline.y1, vline.x2, vline.y2);
        pop();

        push();
        if (chkorentaion) {
            imageMode(CENTER);
            translate(650, -200);
            rotate(PI / 2.0);
            image(img, 500, 240, 285, 612);
        }
        else
            image(img, 255, 0, 285, 612);
        pop();

        push();
        drawMainShapes();
        pop();

        for(let item of unSortedWidjets){
            push();
            item.sketch();
            pop();
        }    
        push();
        screens[selectedScreen].sketch();
        pop();
        if(screens[selectedScreen].appBar)
            screens[selectedScreen].appBar.sketch();
        
        // // noLoop();
        // print(frameRate());
    }

}

function mousePressed() 
{
    pressed();   
}

function mouseReleased() 
{
    released();   
}
