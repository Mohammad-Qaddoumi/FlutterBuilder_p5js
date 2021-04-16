import mousePressed from './mousePressed.js';
import events from './events.js';
import WidjetBuilder from '../elements/WidjetBuilder.js';
import release from './mouseRelease.js';

export default function buildSocketConnection(p5)
{
    // TODO: Work on multi user for one project.......
    p5.socket = io.connect('https://flutter-server-with-p5.herokuapp.com/');
    // p5.socket = io.connect('http://localhost:3000');
    p5.t_X = 0;
    p5.t_Y = 0;
    setInterval( () => {
        p5.socket.emit('mouse',JSON.stringify({
            X:p5.mouseX,
            Y:p5.mouseY,
            useName : _userName
        }));
    },200);
    p5.socket.on('mouse', data => {
        if(data)
        {
            data = JSON.parse(data);  
            p5.t_X = data.X;
            p5.t_Y = data.Y;
        }
    });
    p5.socket.on('selected' , data => {
        if(data){
            data = JSON.parse(data);
            console.log('selected',data);
            mousePressed.foundTargetSelected(p5,data.Id);
        }
    });
    p5.socket.on('stopped', data => {
        if(data)
        {
            release.released( p5 );
        }
    });
    p5.socket.on('newItem', data => {
        if(data)
        {
            data = JSON.parse(data);
            let newItem = p5.mainWidjets.findIndex( t => t._type === data.type);
            p5.selected = WidjetBuilder.Build(p5.mainWidjets[newItem]);
            p5.selected.drag = true;
            p5.selected.Id = data.Id;
            p5.screens[p5.selectedScreen].unSortedWidjets.push(p5.selected);
            events.addTheScreenElement(p5);
        }
    });
    p5.socket.on('moving', data => {
        if(data)
        {
            data = JSON.parse(data);
            if(data.Id === p5.selected.Id){
                p5.selected.X = data.X;
                p5.selected.Y = data.Y;
                p5.selected.moved = true;
            }
        }
    });
    p5.socket.on('unDragged', data => {
        if(data)
        {
            p5.selected.drag = false;
        }
    });
}