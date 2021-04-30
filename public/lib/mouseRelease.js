import events from './events.js';

function released(p5,data) 
{
    let selected = p5.selected;
    if(data)
    {
        const index = p5.partners.findIndex( i => i.email === data.EMAIL );
        if( index !== -1  && data.EMAIL !== EMAIL)
        {
            selected = p5.partners[index].selected;
        }
    }
    if (!selected) return;
    selected.drag = false;
    if(p5.selected.moved) 
    {
        selected.moved = false;
        p5.socket.emit('stopped',ROOM_ID,{EMAIL});
        let index = p5.screens[p5.selectedScreen].children.findIndex(e => e.Id === selected.Id);
        if(index !== -1)
            p5.screens[p5.selectedScreen].children.splice(index, 1);
        else 
        {
            index = p5.screens[p5.selectedScreen].unSortedWidjets.findIndex(e => e.Id === selected.Id);
            if(index !== -1)
                p5.screens[p5.selectedScreen].unSortedWidjets.splice(index, 1);
        }
        if(p5.screens[p5.selectedScreen].isInside(p5))
        {
            p5.screens[p5.selectedScreen].children.push(selected);
            setElementPosition(p5 , selected);
        }
        else 
        {
            p5.screens[p5.selectedScreen].unSortedWidjets.push(selected);
        }
    }
    events.changeTheSelectedProperty(p5);
}

function setElementPosition(p5,selected)
{
    if(selected.Id === p5.screens[p5.selectedScreen].Id) return;
    let x = selected.X ;
    let y = selected.Y ;
    let s_x = ( x - p5.screens[p5.selectedScreen].midPoint.X_zero ) / p5.screens[p5.selectedScreen].midPoint.W;
    selected.position[0] = s_x;
    let s_y = ( y - p5.screens[p5.selectedScreen].midPoint.Y_zero ) / p5.screens[p5.selectedScreen].midPoint.H;
    selected.position[1] = s_y;
}

export default {
    released,
    setElementStation: setElementPosition
}