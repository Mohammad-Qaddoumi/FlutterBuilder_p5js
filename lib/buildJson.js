function buildJSON(screens)
{
    let mJSON = {};
    for( let j = 0 ; j < screens.length ; j++ )
    {
        mJSON[`screen${j}`] = {
            appBar : {},
            body : {
                "type": "Row",
                "size": "100",
                "children": getChildsAsJson(screens[j].children)
            }
        };
        mJSON[`unSortedWidjets${j}`] = { ...JSON.parse( JSON.stringify(screens[j].unSortedWidjets) ) };
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
        child[`child${i+1}`]["size"] = `${collection[i].size * 100}`;

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
        fontSize     : `${text.userSize}`,
        id           : `${text.Id}`,
        index        : `${text.index}`
    };
}
function buildRectJson(re)
{
    return {
        name         : `${re.name}`,
        content      : `${re.text.mText}`,
        id           : `${re.Id}`,
        index        : `${re.index}`,
        width        : `${re.width}`,
        height       : `${re.height}`
    };
}
function buildCircleJson(cicle)
{
    return {
        name         : `${cicle.name}`,
        content      : `${cicle.text.mText}`,
        id           : `${cicle.Id}`,
        index        : `${cicle.index}`,
        radius       : `${cicle.width}`,
    };
}