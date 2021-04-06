function buildJSON(screens)
{
    let mJSON = {};
    for( let j = 0 ; j < screens.length ; j++ )
    {
        mJSON[`screen${j}`] = {};

        if(screens[j].appBar)
        {
            mJSON[`screen${j}`][`appBar`] = screens[j].appBar.text;
            mJSON[`screen${j}`][`appBarColor`] = screens[j].appBar.backgroundColor;
            mJSON[`screen${j}`][`appBarTextColor`] = screens[j].appBar.textColor;
        } 

        mJSON[`screen${j}`]["screenColor"] = screens[j].backgroundColor; 

        mJSON[`screen${j}`]["body"] = {
                "type": "Row",
                "size": Math.floor(screens[j].size * 100),
                "children": getChildsAsJson(screens[j].children)
            };

        // mJSON[`screen${j}`][`unSortedWidjets`] = { ...JSON.parse( JSON.stringify(screens[j].unSortedWidjets) ) };

    }
    print(mJSON);
    return mJSON;
}

function getChildsAsJson(collection)
{
    let child = {
        "childrenNumber": collection.length
    };
    for(let i = 0; i < collection.length; i++)
    {
        child[`child${i+1}`] = {};
        child[`child${i+1}`]["type"] = collection[i]._type;
        child[`child${i+1}`]["size"] = `${Math.floor(collection[i].size * 100)}`;

        if(collection[i]._type == "Column" || collection[i]._type == "Row")
        {
            child[`child${i+1}`]["children"] = getChildsAsJson(collection[i].children);
        }
        else if (collection[i]._type == "Text")
        {
            child[`child${i+1}`] = { ...child[`child${i+1}`] , ...buildTextJson(collection[i]) };
        }
        else if (collection[i]._type == "Rect")
        {
            child[`child${i+1}`] = { ...child[`child${i+1}`] , ...buildRectJson(collection[i]) };
        }
        else if (collection[i]._type == "Circle")
        {
            child[`child${i+1}`] = { ...child[`child${i+1}`] , ...buildCircleJson(collection[i]) };
        }
    }
    return child;
}
function buildTextJson(text)
{
    return {
        name         : `${text.name}`,
        content      : `${text.text}`,
        colorFromRGB : [`${0}`,`${0}`,`${0}`],
        fontSize     : `${Math.floor(text.fontSize)}`,
        id           : `${text.Id}`,
    };
}
function buildRectJson(re)
{
    return {
        name         : `${re.name}`,
        content      : `${re.text.mText}`,
        id           : `${re.Id}`,
        width        : `${Math.floor(re.width)}`,
        height       : `${Math.floor(re.height)}`
    };
}
function buildCircleJson(cicle)
{
    return {
        name         : `${cicle.name}`,
        content      : `${cicle.text.mText}`,
        id           : `${cicle.Id}`,
        radius       : `${Math.floor(cicle.width)}`,
    };
}