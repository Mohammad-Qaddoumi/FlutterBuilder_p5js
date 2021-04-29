import sketchs from './sketch.js';

window.onload = async () => {
    if(window.location.href.includes('000webhostapp'))
    {
        const body = window.document.children[0].children[1];
        const index = body.children.length - 2;
        const div = body.children[index];
        div.style.display = 'none';
    }
    footerPosition();
}
function footerPosition()
{
    const sketch = document.querySelector("#sketch");
    const details = document.querySelector(".details");
    let result;
    if (sketch.offsetTop !== details.offsetTop)
    {
        document.body.style.setProperty('--mainContant', `${sketch.offsetHeight + details.offsetHeight}px`);
        const mainContant_height = document.querySelector('.mainContant').offsetHeight;
        const header_height = document.querySelector('header').offsetHeight;
        result = mainContant_height + header_height;
    } 
    else 
    {
        result = sketch.offsetHeight;
    }
    document.body.style.setProperty('--mainContant', `Max(calc(100vh - 110px), ${result}px)`);
}
window.onresize = footerPosition;


let app;
const stopModel = new p5(sketchs.sketch2,'sketch');
setTimeout( () => {
    app = new p5(sketchs.sketch, 'sketch');
    app.stopModel = stopModel;
    stopModel.parent = app;
},1000);
