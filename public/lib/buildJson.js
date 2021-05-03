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

        if(screens[j].appBar)
        {
            mJSON[`screen${j}`][`appBar`] = screens[j].appBar.text;
            mJSON[`screen${j}`][`appBarColor`] = screens[j].appBar.backgroundColor;
            mJSON[`screen${j}`][`appBarTextColor`] = screens[j].appBar.textColor;
        } 

        mJSON[`screen${j}`]["screenColor"] = screens[j].backgroundColor; 

        mJSON[`screen${j}`]["body"] = getChildsAsJson( {}, screens[j].children );

        mJSON[`screen${j}`][`unSortedWidjets`] = getChildsAsJson({}, screens[j].unSortedWidjets );

    }
    return mJSON;
}

function getChildsAsJson( collection, children )
{
    collection["childrenNumber"] = children.length;
    for(let i = 0; i < children.length; i++)
    {
        const position  = [
            Math.ceil(children[i].position[0] * 100) / 100 ,
            Math.ceil(children[i].position[1] * 100) / 100
        ];
        collection[`child${i+1}`] = {};
        collection[`child${i+1}`].X = children[i].X;
        collection[`child${i+1}`].Y = children[i].Y;
        collection[`child${i+1}`]._width = children[i].width;
        collection[`child${i+1}`]._height = children[i].height;
        collection[`child${i+1}`]["type"]           =  children[i]._type;
        collection[`child${i+1}`]["name"]           =  children[i].name;
        collection[`child${i+1}`]["content"]        =  children[i].text;
        collection[`child${i+1}`]["colorFromRGB"]   =  children[i].foregroundColor;
        collection[`child${i+1}`]["backgroundColor"]=  children[i].backgroundColor;
        collection[`child${i+1}`]["fontSize"]       =  Math.floor(children[i].fontSize);
        collection[`child${i+1}`]["id"]             =  children[i].Id;
        collection[`child${i+1}`]["position"]       =  position;
        if(children[i].events)
            collection[`child${i+1}`]["onPress"]    =  children[i].events.join(';');
        if(children[i].img)
            collection[`child${i+1}`]["imageType"] = children[i].img.imageType;
    }
    return collection;
}
