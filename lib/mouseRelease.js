function released() 
{
    if (selected === null) return;
    selected.drag = false;
    // print("release",selected);
    if(selected.moved) 
    {
        selected.moved = false;
        if(selected.parent)
        {
            let index = selected.children.findIndex(e => e.Id === selected.Id);
            selected.parent.children.splice(index, 1);
            // selected.parent.reIndex(selected.index);
            selected.parent = null;
            // selected.index = -1;
        }
        let found = Grid.setTheWidjetParent(selected, screensArray[selectedScreen]);
        if(found) 
        {
            if(unSortedWidjets.includes(selected))
                unSortedWidjets.pop(selected);
        }
        else if(!unSortedWidjets.includes(selected))
        {
            unSortedWidjets.push(selected);
        }
        restTheCoordinates( screensArray[selectedScreen].children );
    }
    // print( screensArray[selectedScreen], unSortedWidjets );
    changeTheSelectedProperty();
}

function restTheCoordinates( items )
{
    if ( items.length > 0 )
    { 
        items[0].X = items[0].parent.X + 2 ; 
        items[0].Y = items[0].parent.Y + 2 ;
        
        // if(items[0].parent.Id === screensArray[selectedScreen].Id)
        // {
        //     items[0].width = items[0].parent.Width - 4;
        //     items[0].height = items[0].parent.Height - 4;
        // }
        // else
        // {
        // } 
        if(items[0] instanceof Grid)
        {
            // items[0].width = items[0].Width - 4;
            // items[0].height = items[0].Height - 4;
            restTheCoordinates( items[0].children );
        }
        // else if (items[0] instanceof Widjet)
        // {
        //     if(items[0].parent)
        //     {
        //         if(items[0].parent._type == "Column")
        //         {
        //             items[0].Y += (items[0].parent.Height/2)  - (items[0].height/2);
        //         }
        //         else
        //         {
        //             items[0].X += (items[0].parent.Width/2) - (items[0].width/2);
        //         }
        //     }
        // }
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
            // items[i].width  = items[i].Width  - 4; 
            // items[i].height = items[i].Height - 4; 
            restTheCoordinates( items[i].children );
        }
        // else if (items[i] instanceof Widjet)
        // {
        //     if(items[i].parent)
        //     {
        //         if(items[i].parent._type == "Column")
        //         {
        //             items[i].Y += (items[i].parent.Height/2)  - (items[i].height/2);
        //         }
        //         else
        //         {
        //             items[i].X += (items[i].parent.Width/2) - (items[i].width/2);
        //         }
        //     }
        // }
    }
    for( let i of items )
    {
        if( i instanceof Widjet )
        {
            if(i.parent)
            {
                if(i.parent._type == "Column")
                {
                    i.Y += (i.parent.Height/2)  - (i.height/2);
                }
                else
                {
                    i.X += (i.parent.Width/2) - (i.width/2);
                }
                i.text.position.X = i.X - (i.width / 2) + 5;
                i.text.position.Y = i.Y;
                i.text.positionOrentation.X = i.X_O - (i.width / 2) + 5;
                i.text.positionOrentation.Y = i.Y_O;
            } 
        }
    }
}

