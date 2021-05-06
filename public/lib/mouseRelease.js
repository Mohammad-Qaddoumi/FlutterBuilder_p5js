// import events from './events.js';

export default function released(p5,data) 
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
        if(selected._type === "Input")
        {
            selected.fix_X_position(p5);
        }
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
        }
        else 
        {
            p5.screens[p5.selectedScreen].unSortedWidjets.push(selected);
        }
    }
    // events.changeTheSelectedProperty(p5);
}
