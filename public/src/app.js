import sketchs from './sketch.js';

window.onload = async () => {
    if(window.location.href.includes('000webhostapp'))
    {
        const body = window.document.children[0].children[1];
        const index = body.children.length - 2;
        const div = body.children[index];
        div.style.display = 'none';
    }
}

let app;
const stopModel = new p5(sketchs.sketch2,'sketch');
setTimeout( () => {
    app = new p5(sketchs.sketch, 'sketch');
    app.stopModel = stopModel;
    stopModel.parent = app;
},1000);
