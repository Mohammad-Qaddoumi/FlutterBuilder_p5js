import Screen from "../elements/screen/screen.js";
import AppBar from "../elements/widjet/appBar.js";
import FlatButton from "../elements/widjet/flatButton.js";
import ImageWidjet from "../elements/widjet/image.js";
import Text from "../elements/widjet/Text.js";
import config from './config.js';
import {loadSavedImage} from './base64Encode.js';

export default function parseJson(p5)
{
    p5.screens = [];

    p5.selectedScreen = 0;
    if(Object.keys(DESIGN).length !== 0)
    {
        for(let i=0; i < DESIGN.numberOfScreens; i++)
        {
            let screen = new Screen(config.gridPoints);
            screen.unSortedWidjets = [];
            screen.backgroundColor = [0,0,0];
            screen.canMove = false;
            screen.name = DESIGN[`screen${i}`]["name"];
            if(DESIGN[`screen${i}`])
            {
                screen.Id = DESIGN[`screen${i}`]["id"];
                if(DESIGN[`screen${i}`][`appBar`])
                {
                    screen.appBar = new AppBar({X : config.gridPoints.X , Y : config.gridPoints.Y},config.gridPoints.W,config.gridPoints.H * 0.09);
                    screen.size = (config.gridPoints.H - (config.gridPoints.H * 0.09)) / config.gridPoints.H;
                    screen.Y = config.gridPoints.Y + (config.gridPoints.H * 0.09);
                    screen.height -= config.gridPoints.H * 0.09;
                    screen.appBar.text = DESIGN[`screen${i}`][`appBar`] ;
                    screen.appBar.backgroundColor = DESIGN[`screen${i}`][`appBarColor`] ;
                    screen.appBar.foregroundColor = DESIGN[`screen${i}`][`appBarTextColor`] ;
                    screen.appBar.name = DESIGN[`screen${i}`]["appBarName"];
                }
                screen.backgroundColor = DESIGN[`screen${i}`]["screenColor"];
                screen.children = getchildren( DESIGN[`screen${i}`].body , p5 );
                screen.unSortedWidjets = getchildren( DESIGN[`screen${i}`].unSortedWidjets , p5 );

            }
            p5.screens.push(screen);
        }
        if(DESIGN['count'])
            config.count = DESIGN['count'];     
    }
    else 
    {
        p5.screens.push(new Screen(config.gridPoints));
        p5.screens[0].unSortedWidjets = [];
        p5.screens[0].backgroundColor = [0,0,0];
        p5.screens[p5.selectedScreen].canMove = false;
    }
    p5.selected = p5.screens[p5.selectedScreen];
    p5.lockSelected = false;
}
function getchildren( children , p5 )
{
    if(children.childrenNumber === 0 ) return [] ;
    let childs = Array(children.childrenNumber).fill(t => undefined);
    for(let i=0; i < children.childrenNumber ; i++)
    {
        if(children[`child${i+1}`])
        {
            try{
                if(children[`child${i+1}`].type === "Text")
                {
                    childs[i] = new Text({X:children[`child${i+1}`].X,Y:children[`child${i+1}`].Y},children[`child${i+1}`]._width,children[`child${i+1}`]._height);
                    childs[i].text = children[`child${i+1}`]["content"]; 
                }
                else if (children[`child${i+1}`].type === "FlatButton")
                {
                    childs[i] = new FlatButton({X:children[`child${i+1}`].X,Y:children[`child${i+1}`].Y},children[`child${i+1}`]._width,children[`child${i+1}`]._height);
                    childs[i].text = children[`child${i+1}`]["content"]; 
                }
                else if (children[`child${i+1}`].type === "Image")
                {
                    childs[i] = new ImageWidjet({X:children[`child${i+1}`].X,Y:children[`child${i+1}`].Y},children[`child${i+1}`]._width,children[`child${i+1}`]._height);
                    childs[i].text = children[`child${i+1}`]["content"];
                    childs[i].img.imageType = children[`child${i+1}`]["imageType"];
                    try{
                        loadSavedImage(p5,{Id:children[`child${i+1}`]["id"] , type : childs[i].img.imageType},childs[i]);
                    }
                    catch(e){
                        childs[i].img.error = e;
                    }
                }
                childs[i].name = children[`child${i+1}`]["name"];  
                childs[i].foregroundColor = children[`child${i+1}`]["colorFromRGB"];  
                childs[i].backgroundColor = children[`child${i+1}`]["backgroundColor"];  
                childs[i].fontSize = children[`child${i+1}`]["fontSize"];
                childs[i].Id = children[`child${i+1}`]["id"];   
                childs[i].canMove = children[`child${i+1}`]["canMove"];   
                if(children[`child${i+1}`]["onPress"])
                    childs[i].events = children[`child${i+1}`]["onPress"].split(';');  
                childs[i].drag = false;
                childs[i].moved = false;
            }catch(e)
            {
                console.log(e);
            }
        }
    }

    return childs;
}