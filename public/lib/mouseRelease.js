import events from './events.js';

function released(p5) 
{
    if (p5.selected === null) return;
    p5.selected.drag = false;
    p5.socket.emit('unDragged',p5.selected.Id);
    if(p5.selected.moved) 
    {
        p5.selected.moved = false;
        p5.socket.emit('stopped','false');
        if(p5.selected.parent)
        {
            let index = p5.selected.parent.children.findIndex(e => e.Id === p5.selected.Id);
            p5.selected.parent.children.splice(index, 1);
            p5.selected.parent = null;
        }
        let found = false;
        if(p5.screens[p5.selectedScreen].isInside(p5))
        {
            found = true;
            p5.screens[p5.selectedScreen].children.push(p5.selected);
            p5.selected.parent = p5.screens[p5.selectedScreen];
            setElementStation(p5);
        }
        if(found) 
        {
            if(p5.screens[p5.selectedScreen].unSortedWidjets.includes(p5.selected))
                p5.screens[p5.selectedScreen].unSortedWidjets.pop(p5.selected);
        }
        else if(!p5.screens[p5.selectedScreen].unSortedWidjets.includes(p5.selected))
        {
            p5.screens[p5.selectedScreen].unSortedWidjets.push(p5.selected);
        }
    }
    events.changeTheSelectedProperty(p5);
}

function setElementStation(p5)
{
    let x = p5.selected.X ;
    let y = p5.selected.Y ;
    let s_x = ( x - p5.screens[p5.selectedScreen].midPoint.X_zero ) / p5.screens[p5.selectedScreen].midPoint.W;
    p5.selected.position[0] = s_x;
    let s_y = ( y - p5.screens[p5.selectedScreen].midPoint.Y_zero ) / p5.screens[p5.selectedScreen].midPoint.H;
    p5.selected.position[1] = s_y;
}

export default {
    released,
    setElementStation
}