function preload() 
{
    // screensArray.push(new Grid(gridPoints));
    screensArray.push(new Row(gridPoints));
    screensArray[0].unSortedWidjets = [];
    screensArray[0].backgroundColor = [0,0,0];
    unSortedWidjets = screensArray[selectedScreen].unSortedWidjets;
    screensArray[selectedScreen].canMove = false;
    selected = screensArray[selectedScreen];
    createMainWidjet();
    img = loadImage('./assets/phone.png');
    font = loadFont("./assets/AnonymousPro-Regular.ttf");

    setEvents();
    
    modelPhone = loadModel('./assets/phone2.obj', true);
    txtUpdating = new TextDrawer("Updating...", -100, -260);
    txtUpdating.parent = {X : -250, Y : -300};
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
// let word = "First word";
// let fontSize = 32;
// let  updateText;
function draw() 
{
    clear();
    if (updateison) 
    {
        push();
        txtUpdating.sketch(50);
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
        screensArray[selectedScreen].sketch();
        pop();
        
        // noLoop();
        // print(frameRate());
        // print(dist(selected.X, selected.Y,mouseX,mouseY));
    }
    // fill(0,102,153);
    // textFont(font);
    // text("")
    // let theight = fontSize + 4;
    
    // let base = height * 0.75;
    // let scalar = 0.8; // Different for each font

    // textSize(fontSize); // Set initial text size
    // let asc = textAscent() * scalar; // Calc ascent
    // print(textAscent());
    // // print(asc);
    // line(0, base - asc, width, base - asc);
    // text('dp' + word, 0, base); // Draw text on baseline

    // textSize(fontSize); // Increase text size
    // asc = textAscent() * scalar; // Recalc ascent
    // print(textAscent());
    // textAlign(LEFT,TOP);
    // line(40, base - asc, width, base - asc);
    
    // text(word, 40, base); // Draw text on baseline
    // noFill();
    // let h = fontSize * 1.1;
    // let w = word.length * fontSize / 1.85 + 1;
    // print(h,w);
    // rect(39,base,w,h);

}

function mousePressed() 
{
    pressed();   
}

function mouseReleased() 
{
    released();   
}
