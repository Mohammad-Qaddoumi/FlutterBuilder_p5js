
function preload() {

    // screensArray.push(new Grid(gridPoints));
    screensArray.push(new Row(gridPoints));
    screensArray[0].unSortedWidjets = [];
    unSortedWidjets = screensArray[selectedScreen].unSortedWidjets;
    screensArray[selectedScreen].canMove = false;
    createMainWidjet();
    img = loadImage('assets/phone.png');
    font = loadFont("./assets/AnonymousPro-Regular.ttf");

    setEvents();
    
    // modelPhone = loadModel('./assets/Nexus5x.obj',true);
    modelPhone = loadModel('./assets/phone2.obj', true);
    txtUpdating = new TextDrawer("Updating...", -100, -260);
    // updateText = createGraphics(200, 200);
    // updateText.fill(255);
    // updateText.background(0);
    // updateText.textAlign(CENTER);
    // updateText.textSize(30);
    // updateText.text('Update', 50, 50);
    bg_phone_forModel = loadImage('./assets/Corp-phone2.png');
}

function setup() {
    let cnv = createCanvas(canvasWidth, canvasHeight, WEBGL);
    frameRate(120);
    changeTheSelectedProperty();
}

// let  updateText;
function draw() {
    clear();
    if (updateison) {
        push();
        txtUpdating.sketch(50);
        // ambientLight(100);
        // directionalLight(255,255,255,0,0,1);
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
        // image(bg_phone,-100,-200,80,200);
        pop();
    }
    else {
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

        screensArray[selectedScreen].sketch();
        // noLoop();
        // print(frameRate());
    }
}


function mousePressed() {
    pressed();   
}

function mouseReleased() {
    released();   
}
