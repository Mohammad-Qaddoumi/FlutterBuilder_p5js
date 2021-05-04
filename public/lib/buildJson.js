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
        if(screens[j].appBar)
        {
            mJSON[`screen${j}`][`appBar`] = screens[j].appBar.text;
            mJSON[`screen${j}`][`appBarColor`] = screens[j].appBar.backgroundColor;
            mJSON[`screen${j}`][`appBarTextColor`] = screens[j].appBar.textColor;
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
        collection[`child${i+1}`].X                 = children[i].X;
        collection[`child${i+1}`].Y                 = children[i].Y;
        collection[`child${i+1}`]._width            = children[i].width;
        collection[`child${i+1}`]._height           = children[i].height;
        collection[`child${i+1}`]["type"]           =  children[i]._type;
        collection[`child${i+1}`]["name"]           =  children[i].name;
        collection[`child${i+1}`]["content"]        =  children[i].text;
        collection[`child${i+1}`]["colorFromRGB"]   =  children[i].foregroundColor;
        collection[`child${i+1}`]["backgroundColor"]=  children[i].backgroundColor;
        collection[`child${i+1}`]["fontSize"]       =  Math.floor(children[i].fontSize);
        collection[`child${i+1}`]["id"]             =  children[i].Id;
        if(selectedScreen){
            collection[`child${i+1}`]["position"]       =  setElementPosition( p5 , children[i] , selectedScreen);
            collection[`child${i+1}`].width             =  getCalculatedWidth( p5 , children[i] , selectedScreen);
            collection[`child${i+1}`].height            =  getCalculatedHeight( p5 , children[i] , selectedScreen);
        }
        if(children[i].events)
            collection[`child${i+1}`]["onPress"]    =  children[i].events.join(';');
        if(children[i].img)
            collection[`child${i+1}`]["imageType"] = children[i].img.imageType;
    }
    return collection;
}

function setElementPosition(p5,selected,selectedScreen)
{
    const x = ( selected.X - p5.screens[selectedScreen].midPoint.X_zero ) / p5.screens[selectedScreen].midPoint.W;
    const y = ( selected.Y - p5.screens[selectedScreen].midPoint.Y_zero ) / p5.screens[selectedScreen].midPoint.H;
    return [
        Math.ceil(x * 100) / 100 ,
        Math.ceil(y * 100) / 100
    ];
}
function getCalculatedWidth(p5,selected,selectedScreen)
{
    let w = selected.width / p5.screens[selectedScreen].width;
    return Math.ceil(w * 100) / 100;
}
function getCalculatedHeight(p5,selected,selectedScreen)
{
    let h = selected.height / p5.screens[selectedScreen].height;
    return Math.ceil(h * 100) / 100;
}