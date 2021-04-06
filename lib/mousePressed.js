function pressed()
{
    if (mouseX < 0 || mouseX > canvasWidth)
        return;
    if (mouseY < 0 || mouseY > canvasHeight)
        return;
    let foundItemFlag = false;

    for(let i = 0; i < screensArray[selectedScreen].children.length; i++)
    {
        if(screensArray[selectedScreen].children[i] instanceof Grid && screensArray[selectedScreen].children[i].isInside())
        {
            foundItemFlag = foundPressedElement(screensArray[selectedScreen].children[i]);
            break;
        }
        else if(screensArray[selectedScreen].children[i].isInside())
        {
            foundItemFlag = true;
            screensArray[selectedScreen].children[i].drag = true;
            selected = screensArray[selectedScreen].children[i];
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
    if(!foundItemFlag && screensArray[selectedScreen].appBar && screensArray[selectedScreen].appBar.isInside())
    {
        foundItemFlag = true;
        selected = screensArray[selectedScreen].appBar;
    }
    if (!foundItemFlag) 
    {
        selected = screensArray[selectedScreen];
    }
    changeTheSelectedProperty();
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
