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
        for (let p of mainParticleArray) {
            if (mouseIsPressed && p.isInside()) {
                let newWidjet = null;
                if (p._type == "Circle") {
                    newWidjet = new Circle({ X: p.X, Y: p.Y }, p.width-15, `Widjet${count++}`);
                } else if (p._type == "Rect") {
                    newWidjet = new Rectangle({ X: p.X, Y: p.Y }, p.width-15, p.height-15, `Widjet${count++}`);
                } else if (p._type == "Text") {
                    newWidjet = new Text({ X: p.X, Y: p.Y }, p.width-15, p.height-15, `Widjet${count++}`, "Text");
                } else if (p._type == "Row") {
                    newWidjet = new Row({X : p.X, Y: p.Y,W:p.width-15 , H: p.height-15 ,X_O:p.X, Y_O: p.Y,W_O:p.width-15 , H_O: p.height-15});
                } else if (p._type == "Column"){
                    newWidjet = new Column({X : p.X, Y: p.Y,W:p.width-15 , H: p.height-15 ,X_O:p.X, Y_O: p.Y,W_O:p.width-15 , H_O: p.height-15});
                }
                selected = newWidjet;
                if (newWidjet) 
                {
                    newWidjet.drag = true;
                    unSortedWidjets.push(newWidjet);
                    foundItemFlag = true;
                    addTheScreenElement();
                    // print("new",newWidjet);
                    break;
                }
            }
        }
    }
    if (!foundItemFlag) {
        selected = screensArray[selectedScreen];
    }
    // print(selected);
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