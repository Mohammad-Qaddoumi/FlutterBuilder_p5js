import config from './config.js';
import WidjetBuilder from '../elements/WidjetBuilder.js';
import Grid from '../elements/grid/grid.js';
import events from './events.js';

function pressed(p5)
{
    if(p5.lockSelected) return;
    if (p5.mouseX < 0 || p5.mouseX > config.canvasWidth)
        return;
    if (p5.mouseY < 0 || p5.mouseY > config.canvasHeight)
        return;
    let foundItemFlag = false;
    let newItem = false;
    for(let i = 0; i < p5.screens[p5.selectedScreen].children.length; i++)
    {
        if(p5.screens[p5.selectedScreen].children[i] instanceof Grid && p5.screens[p5.selectedScreen].children[i].isInside(p5))
        {
            foundItemFlag = foundPressedElement(p5.screens[p5.selectedScreen].children[i],p5);
            break;
        }
        else if(p5.screens[p5.selectedScreen].children[i].isInside(p5))
        {
            foundItemFlag = true;
            p5.screens[p5.selectedScreen].children[i].drag = true;
            p5.selected = p5.screens[p5.selectedScreen].children[i];
            break;
        }
    }
    if(!foundItemFlag)
    {
        for(let i=0; i< p5.screens[p5.selectedScreen].unSortedWidjets.length;i++)
        {
            if(p5.screens[p5.selectedScreen].unSortedWidjets[i] instanceof Grid)
            {
                foundItemFlag = foundPressedElement(p5.screens[p5.selectedScreen].unSortedWidjets[i],p5);
                if(foundItemFlag) break;
            }
            else if (p5.screens[p5.selectedScreen].unSortedWidjets[i].isInside(p5))
            {
                foundItemFlag = true;
                p5.screens[p5.selectedScreen].unSortedWidjets[i].drag = true;
                p5.selected = p5.screens[p5.selectedScreen].unSortedWidjets[i];
                break;
            }
        }
    }
    if(!foundItemFlag)
    {
        for (let w of p5.mainWidjets) 
        {
            if (p5.mouseIsPressed && w.isInside(p5)) 
            {
                p5.selected = WidjetBuilder.Build(w);
                p5.selected.drag = true;
                p5.screens[p5.selectedScreen].unSortedWidjets.push(p5.selected);
                foundItemFlag = true;
                events.addTheScreenElement(p5,true);
                newItem = true;
                p5.socket.emit('newItem',ROOM_ID,JSON.stringify({
                    EMAIL,
                    "type": p5.selected._type,
                    "Id"  : p5.selected.Id
                }));
                break;
            }
        }
    }
    if(!foundItemFlag && p5.screens[p5.selectedScreen].appBar && p5.screens[p5.selectedScreen].appBar.isInside(p5))
    {
        foundItemFlag = true;
        p5.selected = p5.screens[p5.selectedScreen].appBar;
    }
    if (!foundItemFlag) 
    {
        p5.selected = p5.screens[p5.selectedScreen];
    }
    if(!newItem)
    {
        p5.socket.emit('selected',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
    }
    events.changeTheSelectedProperty(p5);
    p5.X_D = p5.mouseX - p5.selected.X;
    p5.Y_D = p5.mouseY - p5.selected.Y;
}

function foundPressedElement(item , p5)
{
    let found = false;
    for(let i = 0; i < item.children.length; i++)
    {
        if( item.children[i] instanceof Grid && item.children[i].isInside(p5) )
        {
            found = foundPressedElement(item.children[i],p5);
            if(found) break;
        }
        else if (item.children[i].isInside(p5))
        {
            found = true;
            p5.selected = item.children[i];
            p5.selected.drag = true;
            break;
        }
    }
    if (!found && item.isInside(p5))
    {
        found = true;
        p5.selected = item;
        p5.selected.drag = true;
    }
    return found;
}

function foundTargetSelected(p5,Id)
{
    if( p5.screens[p5.selectedScreen].Id === Id )
    {
        return p5.screens[p5.selectedScreen];
    }
    for(let i=0; i < p5.screens[p5.selectedScreen].children.length ;i++)
    {
        let item = p5.screens[p5.selectedScreen].children[i];
        if( item.Id === Id )
        {
            // item.drag = true;
            return item;
        }
    }
    for(let j=0;j<p5.screens[p5.selectedScreen].unSortedWidjets.length;j++)
    {
        let i = p5.screens[p5.selectedScreen].unSortedWidjets[j];
        if( i.Id === Id )
        {
            // i.drag = true;
            return i;
        }
    }
    if(p5.screens[p5.selectedScreen].appBar 
        && p5.screens[p5.selectedScreen].appBar.Id === Id)
        return p5.screens[p5.selectedScreen].appBar;
    return p5.screens[p5.selectedScreen];
}

export default {
    pressed,
    foundTargetSelected
};
