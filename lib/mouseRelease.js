import Grid from '../elements/grid/grid.js';
import Widjet from '../elements/widjet/widjet.js';
import events from './events.js';

function released(p5) 
{
    if (p5.selected === null) return;
    if (p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
    p5.selected.drag = false;

    if(p5.selected.moved) 
    {
        p5.selected.moved = false;
        if(p5.selected.parent)
        {
            let index = p5.selected.parent.children.findIndex(e => e.Id === p5.selected.Id);
            p5.selected.parent.children.splice(index, 1);
            p5.selected.parent = null;
        }
        let found = Grid.setTheWidjetParent(p5.selected, p5.screens[p5.selectedScreen]);
        if(found) 
        {
            if(p5.screens[p5.selectedScreen].unSortedWidjets.includes(p5.selected))
                p5.screens[p5.selectedScreen].unSortedWidjets.pop(p5.selected);
        }
        else if(!p5.screens[p5.selectedScreen].unSortedWidjets.includes(p5.selected))
        {
            p5.screens[p5.selectedScreen].unSortedWidjets.push(p5.selected);
        }
        restTheCoordinates( p5.screens[p5.selectedScreen].children );
    }
    // print( screens[selectedScreen], unSortedWidjets );
    events.changeTheSelectedProperty(p5);
}

function restTheCoordinates( items )
{
    if( items.length == 0 ) return;
    // if(items[0].parent._type === "Row")
    // {

    // }
    // else 
    // {

    // }
    //Left Top
    if ( items.length > 0 )
    { 
        items[0].X = items[0].parent.X + 2 ; 
        items[0].Y = items[0].parent.Y + 2 ;

        if(items[0] instanceof Grid)
        {
            restTheCoordinates( items[0].children );
        }
    }
    for(let i = 1; i < items.length; i++)
    {
        if(items[i].parent._type == "Column")
        {
            items[i].X = items[i - 1].X + items[i - 1].Width + 2 ;
            items[i].Y = items[i - 1].Y ;  
        }
        else 
        {
            items[i].X = items[i - 1].X ;
            items[i].Y = items[i - 1].Y + items[i - 1].Height + 2 ;
        }   

        if(items[i] instanceof Grid)
        {
            restTheCoordinates( items[i].children );
        }
    }
    // Center
    for( let i of items )
    {
        if( i instanceof Widjet )
        {
            if(i.parent)
            {
                if(i.parent._type == "Column")
                {
                    i.Y += (i.parent.Height/2)  - (i.Height/2);
                }
                else
                {
                    i.X += (i.parent.Width/2) - (i.Width/2);
                }
            } 
        }
    }
    // 
}

export default {
    released,
    restTheCoordinates
}