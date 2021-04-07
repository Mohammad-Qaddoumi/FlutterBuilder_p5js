function pressed()
{
    if (mouseX < 0 || mouseX > canvasWidth)
        return;
    if (mouseY < 0 || mouseY > canvasHeight)
        return;
    let foundItemFlag = false;

    for(let i = 0; i < screens[selectedScreen].children.length; i++)
    {
        if(screens[selectedScreen].children[i] instanceof Grid && screens[selectedScreen].children[i].isInside())
        {
            foundItemFlag = foundPressedElement(screens[selectedScreen].children[i]);
            break;
        }
        else if(screens[selectedScreen].children[i].isInside())
        {
            foundItemFlag = true;
            screens[selectedScreen].children[i].drag = true;
            selected = screens[selectedScreen].children[i];
            break;
        }
    }
    if(!foundItemFlag)
    {
        for(let i=0; i< unSortedWidjets.length;i++)
        {
            if(unSortedWidjets[i] instanceof Grid)
            {
                foundItemFlag = foundPressedElement(unSortedWidjets[i]);
                if(foundItemFlag) break;
            }
            else if (unSortedWidjets[i].isInside())
            {
                foundItemFlag = true;
                unSortedWidjets[i].drag = true;
                selected = unSortedWidjets[i];
                break;
            }
        }
    }
    if(!foundItemFlag)
    {
        for (let w of mainParticleArray) 
        {
            if (mouseIsPressed && w.isInside()) 
            {
                selected = WidjetBuilder.Build(w);
                selected.drag = true;
                unSortedWidjets.push(selected);
                foundItemFlag = true;
                addTheScreenElement();
                break;
            }
        }
    }
    if(!foundItemFlag && screens[selectedScreen].appBar && screens[selectedScreen].appBar.isInside())
    {
        foundItemFlag = true;
        selected = screens[selectedScreen].appBar;
    }
    if (!foundItemFlag) 
    {
        selected = screens[selectedScreen];
    }
    changeTheSelectedProperty();
    X_D = mouseX - selected.X;
    Y_D = mouseY - selected.Y;
}
function foundPressedElement(item)
{
    let found = false;
    for(let i = 0; i < item.children.length; i++)
    {
        if( item.children[i] instanceof Grid && item.children[i].isInside() )
        {
            found = foundPressedElement(item.children[i]);
            if(found) break;
        }
        else if (item.children[i].isInside())
        {
            found = true;
            selected = item.children[i];
            selected.drag = true;
            break;
        }
    }
    if (!found && item.isInside())
    {
        found = true;
        selected = item;
        selected.drag = true;
    }
    return found;
}
