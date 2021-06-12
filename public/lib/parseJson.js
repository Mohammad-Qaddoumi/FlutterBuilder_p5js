import Screen from "../elements/collection/screen.js";
import AppBar from "../elements/widjet/appBar.js";
import FlatButton from "../elements/widjet/flatButton.js";
import ImageWidjet from "../elements/widjet/image.js";
import CircleAvatar from "../elements/widjet/circle.js";
import Input from "../elements/widjet/input.js";
import Text from "../elements/widjet/Text.js";
import config from './config.js';
import events from '../lib/events.js';
import { loadSavedImage } from './base64Encode.js';
import ListTile from "../elements/widjet/listTile.js";
import List from "../elements/collection/list.js";
import Menu from "../elements/collection/menu.js";

export default function parseJson(p5) {
    p5.screens = [];
    p5.selectedScreen = 0;
    if (Object.keys(DESIGN).length !== 0) 
    {
        for (let i = 0; i < DESIGN.numberOfScreens; i++) 
        {
            let screen = new Screen(config.gridPoints);
            screen.unSortedWidjets = [];
            screen.canMove = false;
            screen.name = DESIGN[`screen${i}`]["name"];
            if (DESIGN[`screen${i}`]) {
                screen.Id = DESIGN[`screen${i}`]["id"];
                if (DESIGN[`screen${i}`].menu === "on")
                    screen.menu_list = true;
                if (DESIGN[`screen${i}`][`appBar`]) {
                    screen.appBar = new AppBar({ X: config.gridPoints.X, Y: config.gridPoints.Y }, config.gridPoints.W, config.gridPoints.H * 0.09);
                    screen.size = (config.gridPoints.H - (config.gridPoints.H * 0.09)) / config.gridPoints.H;
                    screen.Y = config.gridPoints.Y + (config.gridPoints.H * 0.09);
                    screen.height -= config.gridPoints.H * 0.09;
                    screen.appBar.text = DESIGN[`screen${i}`][`appBar`];
                    screen.appBar.backgroundColor = DESIGN[`screen${i}`][`appBarColor`];
                    screen.appBar.foregroundColor = DESIGN[`screen${i}`][`appBarTextColor`];
                    screen.appBar.name = DESIGN[`screen${i}`]["appBarName"];
                }
                screen.backgroundColor = DESIGN[`screen${i}`]["screenColor"];
                screen.children = getchildren(DESIGN[`screen${i}`].body, p5);
                screen.unSortedWidjets = getchildren(DESIGN[`screen${i}`].unSortedWidjets, p5);

            }
            p5.screens.push(screen);
        }
        if (DESIGN['count'])
            config.count = DESIGN['count'];
        if(DESIGN["menu"])
        {
            p5.menu = new Menu({X:0,Y:0},0,0);
            p5.menu.children = getchildren( DESIGN["menu"] , p5 );
        }
        else
            p5.menu = new Menu({X:0,Y:0},0,0);
    }
    else {
        p5.screens.push(new Screen(config.gridPoints));
        p5.screens[0].unSortedWidjets = [];
        p5.screens[p5.selectedScreen].canMove = false;
        p5.menu = new Menu({X:0,Y:0},0,0);
    }

    p5.selected = p5.screens[p5.selectedScreen];
    p5.lockSelected = false;
    events.changeTheSelectedProperty(p5);
    events.resetScreens(p5);
}
function getchildren(children, p5) {
    if (children.childrenNumber === 0) return [];
    let childs = Array(children.childrenNumber).fill(t => {});
    for (let i = 0; i < children.childrenNumber; i++) {
        if (children[`child${i + 1}`]) {
            try {
                if (children[`child${i + 1}`].type === "Text") {
                    childs[i] = new Text({ X: children[`child${i + 1}`].X, Y: children[`child${i + 1}`].Y }, children[`child${i + 1}`]._width, children[`child${i + 1}`]._height);
                    childs[i].text = children[`child${i + 1}`]["content"];
                }
                else if (children[`child${i + 1}`].type === "FlatButton") {
                    childs[i] = new FlatButton({ X: children[`child${i + 1}`].X, Y: children[`child${i + 1}`].Y }, children[`child${i + 1}`]._width, children[`child${i + 1}`]._height);
                    childs[i].text = children[`child${i + 1}`]["content"];
                }
                else if (children[`child${i + 1}`].type === "Image") {
                    childs[i] = new ImageWidjet({ X: children[`child${i + 1}`].X, Y: children[`child${i + 1}`].Y }, children[`child${i + 1}`]._width, children[`child${i + 1}`]._height);
                    childs[i].text = children[`child${i + 1}`]["content"];
                    childs[i].img.imageType = children[`child${i + 1}`]["imageType"];
                    try {
                        loadSavedImage(p5, { Id: children[`child${i + 1}`]["id"], type: childs[i].img.imageType }, childs[i]);
                    }
                    catch (e) {
                        childs[i].img.error = e;
                    }
                }
                else if (children[`child${i + 1}`].type === "Input") {
                    childs[i] = new Input({ X: children[`child${i + 1}`].X, Y: children[`child${i + 1}`].Y }, children[`child${i + 1}`]._width, children[`child${i + 1}`]._height);
                    childs[i].text = children[`child${i + 1}`]["content"];
                }
                else if (children[`child${i + 1}`].type === "ListTile") {
                    childs[i] = new ListTile({ X: children[`child${i + 1}`].X, Y: children[`child${i + 1}`].Y }, children[`child${i + 1}`]._width, children[`child${i + 1}`]._height);
                    childs[i].text = children[`child${i + 1}`]["content"];
                    childs[i].subContent = children[`child${i + 1}`]["subContent"];
                }
                else if (children[`child${i + 1}`].type === "List") {
                    childs[i] = new List({ X: children[`child${i + 1}`].X, Y: children[`child${i + 1}`].Y }, children[`child${i + 1}`]._width, children[`child${i + 1}`]._height);
                    childs[i].text = children[`child${i + 1}`]["content"];
                    // let len = children[`child${i + 1}`].childrenNumber;
                    // let childJson = {};
                    // for(let k=0;i<len;k++)
                    //     childJson = { ...childJson ,...children[`child${i + 1}`][`child${k + 1}`] };
                    // childJson = { ...childJson ,childrenNumber : len };
                    // childs[i].children = getchildren(childJson,p5);
                    childs[i].children = getchildren(children[`child${i + 1}`], p5);
                }
                else if (children[`child${i + 1}`].type === "CircleAvatar") {
                    childs[i] = new CircleAvatar({ X: children[`child${i + 1}`].X, Y: children[`child${i + 1}`].Y }, children[`child${i + 1}`]._width, children[`child${i + 1}`]._height);
                    childs[i].text = children[`child${i + 1}`]["content"];
                    childs[i].nameIndex = children[`child${i + 1}`].nameIndex;
                    childs[i].nameId = children[`child${i + 1}`].nameId;
                }
                else{
                    console.log("error in childs " + i);
                    continue;
                }
                childs[i].name = children[`child${i + 1}`]["name"];
                childs[i].foregroundColor = children[`child${i + 1}`]["colorFromRGB"];
                childs[i].backgroundColor = children[`child${i + 1}`]["backgroundColor"];
                childs[i].fontSize = children[`child${i + 1}`]["fontSize"];
                childs[i].Id = children[`child${i + 1}`]["id"];
                childs[i].canMove = children[`child${i + 1}`]["canMove"];
                if (children[`child${i + 1}`]["onPress"]) {
                    childs[i].events = children[`child${i + 1}`]["onPress"].split(';');
                    if(childs[i].events[0] === "null();")
                    {
                        childs[i].events = [];
                    }
                    else
                        for (let j = 0; j < childs[i].events.length; j++) 
                        {
                            if (childs[i].events[j].startsWith("push")) 
                            {
                                let replace = false;
                                if(childs[i].events[j].startsWith("pushAndReplacement"))
                                    replace = true;
                                const myRe = /^push(AndReplacement)?\((?<id>(\w|\d|\-)+)\)$/g;
                                const str = myRe.exec(childs[i].events[j]);
                                const name = str.groups.id;
                                const num = name.substring(6);
                                if(!replace)
                                    childs[i].events[j] = `push(${DESIGN[`screen${num}`]["id"]})`;
                                else
                                    childs[i].events[j] = `pushAndReplacement(${DESIGN[`screen${num}`]["id"]})`;
                            }
                            else if(childs[i].events[j] < 6)
                            {
                                childs[i].events.splice(j,1);
                                j--;
                            }
                        }
                }
                childs[i].drag = false;
                childs[i].moved = false;
            } catch (e) {
                console.log(e);
            }
        }
    }

    return childs;
}
