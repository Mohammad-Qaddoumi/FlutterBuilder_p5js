import pressed from './lib/mousePressed.js';
import release from './lib/mouseRelease.js';
import config from './lib/config.js';
import main from './elements/mainWidjet.js';
import events from './lib/events.js';
import Row from './elements/grid/row.js';

function sketch(p5)
{
    
    p5.preload = () => {
        p5.screens = [];
        p5.selectedScreen = 0;
        p5.mainWidjets = [];
        p5.screens.push(new Row(config.gridPoints));
        p5.screens[0].unSortedWidjets = [];
        p5.screens[0].backgroundColor = [0,0,0];
        p5.screens[p5.selectedScreen].canMove = false;
        p5.selected = p5.screens[p5.selectedScreen];
        p5.lockSelected = false;
        main.createMainWidjet(p5.mainWidjets);
        p5.img = p5.loadImage('./assets/phone.png');
        p5.font = p5.loadFont("./assets/Anonymous Pro.ttf");
        p5.updateison = true;
        events.setEvents(p5);

        p5.txtUpdating = {
            text : "Loading...🛺",
            X : 120, 
            Y : 15
        };
    
        p5.showBar = false;
        p5.X_D = 0;
        p5.Y_D = 0;
    };
    p5.setup = () => {
        p5.cnv = p5.createCanvas(config.canvasWidth, config.canvasHeight);
        p5.frameRate(120);
        p5.cnv.position(0,0,'absolute');
        events.changeTheSelectedProperty(p5);
        setTimeout( () => {
            p5.updateison = false;
            document.querySelector('.container').style.display = 'flex';
        },1000);
        p5.socket = io.connect('http://localhost:3000');
        p5.socket.on('mouse', data => {
          console.log("Got: " + data.x + " " + data.y);
        });
        p5.socket.emit('mouse',"Sending to the server");
    };
    p5.draw = () => draw(p5);
    p5.mousePressed = () => pressed(p5);
    p5.mouseReleased = () => release.released(p5);
}
function sketch2(p5)
{
    p5.preload = () => {
        p5.modelPhone = p5.loadModel('./assets/phone2.obj', true);
        p5.spin = 0;
        // updateText = createGraphics(200, 200);
        // updateText.fill(255);
        // updateText.background(0);
        // updateText.textAlign(CENTER);
        // updateText.textSize(30);
        // updateText.text('Update', 50, 50);
        p5.bg_phone_forModel = p5.loadImage('./assets/Corp-phone2.png');
    }
    p5.setup = () => {
        p5.cnv = p5.createCanvas(config.canvasWidth, config.canvasHeight, p5.WEBGL);
        p5.frameRate(120);
        p5.cnv.position(0,0,'absolute');
        // p5.noLoop();
        // setTimeout( () => {
        //     p5.clear();
        // },0);
    }
    p5.draw = () => {
        p5.clear();
        if(p5.parent && !p5.parent.updateison) return;
        // translate(mouseX - width/2, mouseY - height/2);
        p5.rotateX(p5.spin);
        p5.rotateY(p5.spin * 1.3);
        p5.rotateZ(p5.spin * 0.7);
        p5.texture(p5.bg_phone_forModel);
        p5.scale(2);
        p5.noStroke();
        // texture(img);
        // texture(updateText);
        // box(75,170,2);
        p5.model(p5.modelPhone);
        p5.spin += 0.03;
    }
}

// let  updateText;
function draw( p5 ) 
{
    p5.clear();
    p5.textAlign(p5.LEFT,p5.TOP);
    if (p5.updateison) 
    {
        p5.push();
        p5.textSize(50);
        p5.fill(0, 102, 153);
        p5.noStroke();
        p5.text(p5.txtUpdating.text, p5.txtUpdating.X + 10 , p5.txtUpdating.Y + 15);
        p5.pop();
    }
    else 
    {
        // p5.translate(p5.width / -2, p5.height / -2, 0);
        p5.push();


        p5.textFont(p5.font);
        p5.push();
        p5.fill(255,0,0);
        p5.stroke(255,0,0);
        p5.strokeWeight(7);
        p5.line(config.vline.x1, config.vline.y1, config.vline.x2, config.vline.y2);
        p5.pop();

        p5.push();
        // if (chkorentaion) {
        //     p5.imageMode(p5.CENTER);
        //     p5.translate(650, -200);
        //     p5.rotate(p5.PI / 2.0);
        //     p5.image(p5.img, 500, 240, 285, 612);
        // }
        // else
            p5.image(p5.img, 255, 0, 285, 612);
        p5.pop();

        p5.push();
        main.drawMainShapes(p5);
        p5.pop();

        p5.push();
        p5.screens[p5.selectedScreen].sketch(p5);
        p5.pop();
        if(p5.screens[p5.selectedScreen].appBar)
            p5.screens[p5.selectedScreen].appBar.sketch(p5);
        
        for(let item of p5.screens[p5.selectedScreen].unSortedWidjets){
            p5.push();
            item.sketch(p5);
            p5.pop();
        }    
        // // noLoop();
        // print(frameRate());

        p5.pop();
    }

}

// const socket;
const stopModel = new p5(sketch2,'sketch');
setTimeout( () => {
    const mainSketch = new p5(sketch, 'sketch');
    mainSketch.stopModel = stopModel;
    stopModel.parent = mainSketch;
},1000);