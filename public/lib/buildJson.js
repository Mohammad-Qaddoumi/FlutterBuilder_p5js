import config from './config.js';

export default function buildJSON(p5)
{
    let screens = p5.screens;
    let mJSON = {};
    mJSON['count'] = config.count;
    mJSON[`numberOfScreens`] = `${screens.length}`;
    for( let j = 0 ; j < screens.length ; j++ )
    {
        mJSON[`screen${j}`] = {};
        mJSON[`screen${j}`]["id"] = screens[j].Id;
        mJSON[`screen${j}`]["name"] = screens[j].name;
        if(screens[j].menu_list)
            mJSON[`screen${j}`]["menu"] = "on";
        else
            mJSON[`screen${j}`]["menu"] = "off";
        if(screens[j].appBar)
        {
            mJSON[`screen${j}`][`appBar`] = screens[j].appBar.text;
            mJSON[`screen${j}`][`appBarColor`] = screens[j].appBar.backgroundColor;
            mJSON[`screen${j}`][`appBarTextColor`] = screens[j].appBar.foregroundColor;
            mJSON[`screen${j}`]["appBarName"] = screens[j].appBar.name;
        } 

        mJSON[`screen${j}`]["screenColor"] = screens[j].backgroundColor; 

        mJSON[`screen${j}`]["body"] = getChildsAsJson( p5, screens[j].children , j );

        mJSON[`screen${j}`][`unSortedWidjets`] = getChildsAsJson(p5, screens[j].unSortedWidjets);

    }
    return mJSON;
}

function getChildsAsJson( p5, children , selectedScreen )
{
    let collection = {};
    collection["childrenNumber"] = children.length;
    for(let i = 0; i < children.length; i++)
    {
        collection[`child${i+1}`] = {};
        // if(children[i]._type === "Input")
        // {
        //     collection[`child${i+1}`]["type"]     =  children[i]._type;
        //     collection[`child${i+1}`]["content"]  =  children[i].text;
        //     collection[`child${i+1}`]["position"] =  setElementPosition( p5 , children[i] , selectedScreen);
        //     collection[`child${i+1}`]["onPress"]  =  children[i].events.join(';');
        //     continue;
        // }
        collection[`child${i+1}`].X                 = children[i].X;
        collection[`child${i+1}`].Y                 = children[i].Y;
        collection[`child${i+1}`]._width            = children[i].width;
        collection[`child${i+1}`]._height           = children[i].height;
        collection[`child${i+1}`]["type"]           = children[i]._type;
        collection[`child${i+1}`]["name"]           = children[i].name;
        collection[`child${i+1}`]["content"]        = children[i].text;
        collection[`child${i+1}`]["colorFromRGB"]   = children[i].foregroundColor;
        collection[`child${i+1}`]["backgroundColor"]= children[i].backgroundColor;
        collection[`child${i+1}`]["fontSize"]       = Math.floor(children[i].fontSize);
        collection[`child${i+1}`]["id"]             = children[i].Id;
        collection[`child${i+1}`]["canMove"]        = children[i].canMove;
        if(!isNaN(selectedScreen)){
            collection[`child${i+1}`]["position"]   = setElementPosition( p5 , children[i] , selectedScreen);
            collection[`child${i+1}`].width         = getCalculatedWidth( p5 , children[i] , selectedScreen);
            collection[`child${i+1}`].height        = getCalculatedHeight( p5 , children[i] , selectedScreen);
        }
        if(children[i].events)
        {
            let event = [];
            for(let j=0;j<children[i].events.length;j++)
            {
                if(children[i].events[j].startsWith("push"))
                {
                    let replace = false;
                    if(children[i].events[j].startsWith("pushAndReplacement"))
                        replace = true;
                    const myRe = /^push(AndReplacement)?\((?<id>(\w|\d|\-)+)\)$/g;
                    const str = myRe.exec(children[i].events[j]);
                    const id = str.groups.id;
                    for(let k=0;k<p5.screens.length;k++)
                    {
                        if(p5.screens[k].Id === id)
                        {
                            if(!replace)
                                event.push(`push(screen${k})`);
                            else
                                event.push(`pushAndReplacement(screen${k})`);
                            break;
                        }
                    }
                }
                else if(children[i].events[j].length > 6)
                    event.push(children[i].events[j]);
            }
            let eventCollection = event.join(';') + ";";
            if(eventCollection.startsWith(";"))
                eventCollection = eventCollection.substring(1);
            if(eventCollection.length === 0)
                collection[`child${i+1}`]["onPress"]    = "null();";
            else
                collection[`child${i+1}`]["onPress"]    = eventCollection;
        }
        else
            collection[`child${i+1}`]["onPress"]    = "null();";
        if(children[i].img)
            collection[`child${i+1}`]["imageType"]  = children[i].img.imageType;
        else if(children[i]._type === "CircleAvatar")
        {
            collection[`child${i+1}`].nameIndex = children[i].nameIndex;
            collection[`child${i+1}`].nameId = children[i].nameId;
        }
        else if(children[i]._type === "ListTile")
            collection[`child${i+1}`].subContent = children[i].subContent ;
        else if (children[i]._type === "List")
        {
            // collection[`child${i+1}`].numOfChilds = children[i].children.length;
            collection[`child${i+1}`] = { ...collection[`child${i+1}`], 
                                          ...getChildsAsJson(p5,children[i].children)};
        }
        
    }
    return collection;
}

function setElementPosition(p5,selected,selectedScreen)
{
    const W = p5.screens[selectedScreen].width / 2;
    const H = p5.screens[selectedScreen].height / 2;
    const X_zero = W + p5.screens[selectedScreen].X;
    const Y_zero = H + p5.screens[selectedScreen].Y;

    let x =  ( selected.X /*+ (selected.width / 2)*/ - X_zero ) / W - 0.00000000001;
    let y = -( selected.Y /*+ (selected.height/ 2)*/ - Y_zero ) / H + 0.00000000001;

    if(y < 0)
    {
        y = -( selected.Y + (selected.height) - Y_zero ) / H + 0.00000000001;
    }
    if(x > 0)
    {
        x =  ( selected.X + (selected.width)  - X_zero ) / W - 0.00000000001;
    }

    if(selected._type === "Input")
        x = 0.000001;
    return [x, y];
}

function getCalculatedWidth(p5,selected,selectedScreen)
{
    let w = selected.width / p5.screens[selectedScreen].width;
    return Math.ceil(w * 100) / 100 - 0.00000000001;
}
function getCalculatedHeight(p5,selected,selectedScreen)
{
    let h = selected.height / p5.screens[selectedScreen].height;
    return Math.ceil(h * 100) / 100 - 0.00000000001;
}

