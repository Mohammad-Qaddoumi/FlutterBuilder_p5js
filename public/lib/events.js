import Screen from '../elements/screen/screen.js';
import AppBar from '../elements/widjet/appBar.js';
import config from './config.js';
import saveAsJson from './ajax.js';
import binaryToBase64 from './base64Encode.js';
import UUID from './idgenerator.js';
import {changeProperty,fillListChilds} from './property.js';
import ListTile from '../elements/widjet/listTile.js';
import FlatButton from '../elements/widjet/flatButton.js';
import ImageWidjet from '../elements/widjet/image.js';

const dlebtn = document.querySelector('.btnDelete');
const updbtn = document.querySelector('.btnUpdate');
const uSize = document.querySelector('.userSize');
const innerText = document.querySelector('.inner-Text');
const txtName = document.querySelector('.txtName');
const lock = document.querySelector('#lock');
const showProperty = document.querySelector('#property');
const showTree = document.querySelector('#tree');
const container = document.querySelector('.container');
const treeDiv = document.querySelector('.treeDiv');
const slcScreen = document.getElementsByClassName('screen-value');
const btnAddScreen = document.querySelector('.btnAddScreen');
const sc = document.querySelector('.screen-collection');
const boxWidth = document.querySelector('.width');
const boxHeight = document.querySelector('.height');
const btnAppbar = document.querySelector('.btnAppbar');
const bgCV = document.querySelector('.backgroundColor > input');
const fgCV = document.querySelector('.foreColor > input');
const image_BG = document.querySelector('#image-BG');
const btnAddImage = document.querySelector('#btnAddImage');

let debounceTimeout_size,
debounceTimeout_innerText,
debounceTimeout_name,
debounceTimeout_width,
debounceTimeout_height,
debounceTimeout_bc,
debounceTimeout_fc;

function setEvents(p5)
{    
    document.querySelector('.cancel-events').addEventListener('click', e => {
        document.querySelector('.form-events').style.display = 'none';
        p5.lockSelected = false;
    });
    document.querySelector('#btnEditEvents').addEventListener('click', e => {
        document.querySelector('.form-events').style.display = 'flex';
        editEvents(p5);
        p5.lockSelected = true;
    });
    document.querySelector('.screens-list').addEventListener('input',e=>{
        if(document.querySelector('#pushEvents').checked)
        {
            for(let i=0;i<p5.selected.events.length;i++)
            {
                if(p5.selected.events[i].startsWith("push"))
                {
                    p5.selected.events[i] = `push(${e.target.value})`;
                    p5.socket.emit('add-push',ROOM_ID,{Id : p5.selected.Id , EMAIL,push:`push(${e.target.value})`} );
                }
            }
        }
    });
    document.querySelector('#pushEvents').addEventListener('input',e=>{
        if(e.target.checked)
        {
            const scren = document.querySelector('.screens-list');
            p5.selected.events.push(`push(${scren.value})`);
            p5.socket.emit('add-push',ROOM_ID,{Id : p5.selected.Id , EMAIL,push:`push(${scren.value})`} );
        }
        else
        {
            const index = p5.selected.events.findIndex(t => t.startsWith("push"));
            if(index !== -1)
            {
                p5.selected.events.splice(index,1);
                p5.socket.emit('delete-push',ROOM_ID,{Id : p5.selected.Id , EMAIL} );
            }
        }
    });
    document.querySelector('#submit-events').addEventListener('input',e=>{
        if(e.target.checked)
        {
            let index =p5.selected.events.findIndex(t => t.startsWith("submit"));
            if(index === -1)
            {
                p5.selected.events.push(`submit()`);
                p5.socket.emit('add-submit',ROOM_ID,{Id : p5.selected.Id , EMAIL,submit:`submit()`} );
            } 
        }
        else
        {
            const index = p5.selected.events.findIndex(t => t.startsWith("submit"));
            if(index !== -1)
            {
                p5.selected.events.splice(index,1);
                p5.socket.emit('delete-submit',ROOM_ID,{Id : p5.selected.Id , EMAIL});
            }
        }
    });
    document.querySelector('#calculate-events').addEventListener('input',e=>{
        if(e.target.checked)
        {
            let index =p5.selected.events.findIndex(t => t.startsWith("calc"));
            if(index === -1)
            {
                p5.selected.events.push(`calculate()`);
                p5.socket.emit('add-calculate',ROOM_ID,{Id : p5.selected.Id , EMAIL,calculate:`calculate()`} );
            } 
        }
        else
        {
            const index = p5.selected.events.findIndex(t => t.startsWith("calculate"));
            if(index !== -1)
            {
                p5.selected.events.splice(index,1);
                p5.socket.emit('delete-calculate',ROOM_ID,{Id : p5.selected.Id , EMAIL});
            }
        }
    });
    document.querySelector('#valid-insert-evnets').addEventListener('input',e=>{
        if(e.target.checked)
        {
            let index = p5.selected.events.findIndex(t => t.startsWith("valid") || t.startsWith("insert"));
            let event;
            if(document.querySelector('#toggleButton17').checked)
            {
                event = "insertion()";
            }
            else
            {
                event = "validation()";
            }

            if(index === -1)
                p5.selected.events.push(event);
            else
                p5.selected.events[index] = event;
            
            p5.socket.emit('add-insert-validate',ROOM_ID,{Id : p5.selected.Id , EMAIL,add:event} );
        }
        else
        {
            const index = p5.selected.events.findIndex(t => t.startsWith("validation") || t.startsWith("insertion"));
            if(index !== -1)
            {
                p5.selected.events.splice(index,1);
                p5.socket.emit('delete-valid-insert',ROOM_ID,{Id : p5.selected.Id , EMAIL});
            }
        }
    });
    document.querySelector('#toggleButton17').addEventListener('input',e=>{
        if(!document.querySelector('#valid-insert-evnets').checked)
            return;
        if(e.target.checked)
        {
            let index = p5.selected.events.findIndex(t => t.startsWith("insertion") || t.startsWith("validation"));
            if(index === -1)
            {
                p5.selected.events.push("insertion()");    
            }
            else
            {
                p5.selected.events[index] = "insertion()";
            }
            p5.socket.emit('add-insert-validate',ROOM_ID,{Id : p5.selected.Id , EMAIL,add:`insertion()`});
        }
        else
        {
            const index = p5.selected.events.findIndex(t => t.startsWith("insertion"));
            if(index !== -1)
            {
                p5.selected.events.splice(index,1);
                p5.socket.emit('delete-valid-insert',ROOM_ID,{Id : p5.selected.Id , EMAIL,insert:true});
            }
        }
    });
    document.querySelector('#toggleButton16').addEventListener('input',e=>{
        if(!document.querySelector('#valid-insert-evnets').checked)
            return;
        if(e.target.checked)
        {
            let index = p5.selected.events.findIndex(t => t.startsWith("insertion") || t.startsWith("validation"));
            if(index === -1)
            {
                p5.selected.events.push("validation()");    
            }
            else
            {
                p5.selected.events[index] = "validation()";
            }
            p5.socket.emit('add-insert-validate',ROOM_ID,{Id : p5.selected.Id , EMAIL,add:`validation()`});
        }
        else
        {
            const index = p5.selected.events.findIndex(t => t.startsWith("validation"));
            if(index !== -1)
            {
                p5.selected.events.splice(index,1);
                p5.socket.emit('delete-valid-insert',ROOM_ID,{Id : p5.selected.Id , EMAIL,valid:true});
            }
        }
    });

    //TODO: change the selected inside the list ... 
    document.querySelector('.list-childs-name').addEventListener('input', e => {
        if(e.target.value === "0")
        {

        }
        else
        {
            for(let i=0;i<p5.selected.children.length;i++)
            {
                if(e.target.value === p5.selected.children[i].Id)
                {

                }
            }
        }
    });
    document.querySelector('.add-element').addEventListener('click', e => {
        const value = document.querySelector('#add-element').value;
        if(value === "0")
        {
            p5.selected.children.push(new ListTile({ X: 9, Y: 9 }, 99, 40));
        }
        else if(value === "1")
        {
            p5.selected.children.push(new FlatButton({ X: 9, Y: 9 }, 99, 40));
        }
        else if(value === "2")
        {
            p5.selected.children.push(new ImageWidjet({ X: 9, Y: 9 }, 99, 40));
        }
        fillListChilds(p5);
    });

    document.querySelector('.menu-list input').addEventListener('input', e => {
        p5.screens[p5.selectedScreen].menu_list = e.target.checked;
        p5.socket.emit('change-menu-list',ROOM_ID,{index : p5.selectedScreen , EMAIL,value:e.target.checked});
    });

    document.querySelector('.inputs-name').addEventListener('input', e => {
        let text ;
        let options = document.querySelector('.inputs-name').options;
        for(let i=0;i<options.length;i++)
        {
            if(options[i].value === e.target.value)
            {
                text = options[i].innerText;
                p5.selected.nameIndex = options[i].dataset.value;
                p5.selected.nameId = e.target.value;
                break;
            }
        }
        p5.selected.name = text;
        p5.socket.emit('txtName',ROOM_ID,{EMAIL, name:p5.selected.name,
            nameIndex:p5.selected.nameIndex, nameId:p5.selected.nameId });
        document.querySelector('.selectedItem').innerHTML = `SelectedItem: ${p5.selected.name}`;
    });

    btnAddImage.addEventListener('click', e => {
        document.querySelector('.form-add-image').style.display = 'flex';
        p5.lockSelected = true;
    });
    document.querySelector('.cancel-image').addEventListener('click',e => {
        document.querySelector('.form-add-image').style.display = 'none';
        document.querySelector('.form-add-image > form').reset();
        image_BG.disabled  = true;
        document.querySelector('.image-url-box').disabled  = false;
        p5.lockSelected = false;
    });
    document.querySelector('#rdo-2').addEventListener('change', e => {
        document.querySelector('.image-url-box').disabled  = false;
        image_BG.disabled  = true;
    });
    document.querySelector('#rdo-3').addEventListener('change', e => {
        document.querySelector('.image-url-box').disabled  = true;
        image_BG.disabled  = false;
    });
    document.querySelector('.btn-add-image').addEventListener('click',async e => {
        p5.updateison = true;
        p5.stopModel.loop();
        p5.lockSelected = true;
        p5.txtUpdating.text = "Loading img ...✨";
        document.querySelector('.form-add-image').style.display = 'none';
        const radios = document.getElementsByName('choice');
        let result ;
        if (radios[0].checked && radios[0].value == "1") 
        {
            const url = document.querySelector('.image-url-box').value;
            result = await binaryToBase64(p5,null,url);
        }
        else{
            result = await binaryToBase64(p5,image_BG.files);
        }
        document.querySelector('.form-add-image > form').reset();
        image_BG.disabled  = true;
        if(result)
        {   
            alert("Can't load the image ...");
        }
        p5.updateison = false;
        p5.lockSelected = false;
        p5.txtUpdating.text = "Updating...🛺";
        p5.stopModel.noLoop();
    });

    bgCV.addEventListener('input', e => {
        clearTimeout(debounceTimeout_bc);
        debounceTimeout_bc = setTimeout( ()=>{
            p5.selected.backgroundColor = hexToRgb(e.target.value);
            p5.socket.emit('backgroundColor',ROOM_ID,{EMAIL,bc:p5.selected.backgroundColor});
        },200);
    });
    fgCV.addEventListener('input', e => {
        clearTimeout(debounceTimeout_fc);
        debounceTimeout_fc = setTimeout( ()=>{
            p5.selected.foregroundColor = hexToRgb(e.target.value);
            p5.socket.emit('foregroundColor',ROOM_ID,{EMAIL,bc:p5.selected.foregroundColor});
        },200);
    });

    dlebtn.addEventListener('click', e => {
        if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        // if(p5.selected.Id === p5.screens[p5.selectedScreen].appBar.Id)return;
        if (!confirm(`Do you want to delete ${p5.selected.name}?`)) return;
        let index = p5.screens[p5.selectedScreen].children.findIndex(e => e.Id === p5.selected.Id);
        if(index >= 0)
        {
            p5.screens[p5.selectedScreen].children.splice(index, 1);
            p5.socket.emit('deleteItem',ROOM_ID,{EMAIL,Id:p5.selected.Id});
        }    
        else
        {
            index = p5.screens[p5.selectedScreen].unSortedWidjets.findIndex(e => e.Id === p5.selected.Id); 
            if(index >= 0){
                p5.screens[p5.selectedScreen].unSortedWidjets.splice(index, 1);
                p5.socket.emit('deleteItem',ROOM_ID,{EMAIL,Id:p5.selected.Id});
            }
        }
        if(p5.screens[p5.selectedScreen].appBar && p5.selected.Id === p5.screens[p5.selectedScreen].appBar.Id)
        {
            p5.screens[p5.selectedScreen].appBar = undefined;
            p5.screens[p5.selectedScreen].Y = config.gridPoints.Y;
            p5.screens[p5.selectedScreen].height = config.gridPoints.H;
            p5.socket.emit('deleteItem',ROOM_ID,{EMAIL,Id:p5.selected.Id,appBar:true});
        }
        p5.selected = p5.screens[p5.selectedScreen];
        p5.socket.emit('selected',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
        changeTheSelectedProperty(p5);
        addTheScreenElement(p5);
    });
    
    updbtn.addEventListener('click', async e => {
        e.preventDefault();
        p5.txtUpdating.text = "Updating...🛺";
        p5.lockSelected = true;
        p5.updateison = true;
        p5.stopModel.loop();
        setTimeout(() => {
            p5.updateison = false;
            p5.stopModel.noLoop();
            p5.lockSelected = false;
        }, 2000);
        let result = await saveAsJson(p5);
        !result ? alert('Error😢 while trying to update💔!!!') : console.log(`${result}`);
    });

    uSize.addEventListener('input', e => {
        if (p5.selected === null) return;
        if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        clearTimeout(debounceTimeout_size);
        debounceTimeout_size = setTimeout(() => {
            if (uSize.value - 0 < 10)
            {
                uSize.value = 10; 
                // return;
            }
            else if (uSize.value - 0 > 99)
            {
                uSize.value = 99;
                // return;
            }
            // if(p5.selected instanceof Grid)
            // {
            //     p5.selected.size = uSize.value / 100;
            // }
            // else if(p5.selected instanceof Text)
            // {
                p5.selected.fontSize = uSize.value - 0;
                p5.socket.emit('fontSize',ROOM_ID,{EMAIL,fontSize:p5.selected.fontSize});
            // }
        }, 200);
    });
  
    innerText.addEventListener('input', e => {
        if (p5.selected === null) return;
        if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        clearTimeout(debounceTimeout_innerText);
        debounceTimeout_innerText = setTimeout(() => {
            if(!(p5.selected instanceof Screen))
            {
                p5.selected.text = innerText.value;
                p5.socket.emit('Itemtext',ROOM_ID,{EMAIL,text:p5.selected.text});
            }        
        }, 200);
    });
  
    txtName.addEventListener('input', e => {
        if (p5.selected === null) return;
        // if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        clearTimeout(debounceTimeout_name);
        debounceTimeout_name = setTimeout(() => {
            p5.selected.name = txtName.value;
            if(p5.selected.Id === p5.screens[p5.selectedScreen].Id)
            {
                // document.getElementsByName('stuff')[0].options[0].innerHTML = "Water";
                document.querySelector('.screen-collection').options[p5.selectedScreen].innerText = txtName.value;
                document.querySelectorAll('.screens > *')[p5.selectedScreen].innerText = txtName.value;
            }
            p5.socket.emit('txtName',ROOM_ID,{EMAIL,name:p5.selected.name});
            const s = document.querySelector('.selectedItem');
            s.innerHTML = `SelectedItem: ${p5.selected.name}`;
        }, 200);
    });

    lock.addEventListener('click', e => {
        if (p5.selected === null) return;
        if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        p5.selected.canMove = !lock.checked;
        p5.socket.emit('canMove',ROOM_ID,{EMAIL,canMove:p5.selected.canMove});
    });

    showProperty.addEventListener('click' , e => {
        if(showProperty.checked)
        {
            container.style.display = 'flex';
            treeDiv.style.display = 'none';
        }
    });
    showTree.addEventListener('click', e => {
        if(showTree.checked)
        {
            treeDiv.style.display = 'flex';
            container.style.display = 'none';
        }
    });
    
    for (let s of slcScreen) {
        s.addEventListener('click', e => {
            p5.selectedScreen = s.dataset.value - 0;
            sc.value = p5.selectedScreen;
            p5.selected = p5.screens[p5.selectedScreen];
            p5.socket.emit('selectedScreen',ROOM_ID,JSON.stringify({EMAIL,screen_number:p5.selectedScreen}));
            addTheScreenElement(p5);
            changeTheSelectedProperty(p5) ;
        });
    }
    
    btnAppbar.addEventListener('click', () => {
        addAppBar(p5);
    });

    btnAddScreen.addEventListener('click', e => {
        addNewScreen(p5);
    });

    sc.addEventListener('input', (e) => {
        p5.selectedScreen = sc.value - 0;
        p5.selected = p5.screens[p5.selectedScreen];
        p5.socket.emit('selectedScreen',ROOM_ID,JSON.stringify({EMAIL,screen_number:p5.selectedScreen}));
        addTheScreenElement(p5);
        changeTheSelectedProperty(p5) ;
    });

    boxWidth.addEventListener('input', e =>{
        if (p5.selected === null) return;
        if (p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        clearTimeout(debounceTimeout_width);
        debounceTimeout_width = setTimeout(() => {
            if(boxWidth.value - 0 < 10)
                boxWidth.value = 10;
            else if(boxWidth.value - 0 > p5.screens[p5.selectedScreen].width)
                boxWidth.value = p5.screens[p5.selectedScreen].width;
            p5.selected.width = boxWidth.value - 0;
            p5.socket.emit('boxWidth',ROOM_ID,{EMAIL,width:p5.selected.width});
        }, 200);
    });
    boxHeight.addEventListener('input', e => {
        if (p5.selected === null) return;
        if (p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        clearTimeout(debounceTimeout_height);
        debounceTimeout_height = setTimeout(() => {
            if(boxHeight.value - 0 < 10)
                boxHeight.value = 10;
            else if(boxHeight.value - 0 > p5.screens[p5.selectedScreen].height)
                boxHeight.value = p5.screens[p5.selectedScreen].height;
            p5.selected.height = boxHeight.value - 0;
            p5.socket.emit('boxHeight',ROOM_ID,{EMAIL,height:p5.selected.height});
        }, 200);
    });

    document.querySelector('.btnDeleteScreen').addEventListener('click', e => {
        if(p5.screens.length === 1)
        {
            addNewScreen(p5,UUID.generate());
            p5.socket.emit('deleteScreen',ROOM_ID,{EMAIL,selectedScreen:p5.selectedScreen,Id:p5.screens[0].Id});
            p5.selectedScreen = 0;
            p5.screens.splice(0,1);
        }
        else 
        {
            p5.socket.emit('deleteScreen',ROOM_ID,{EMAIL,selectedScreen:p5.selectedScreen});
            p5.screens.splice(p5.selectedScreen,1);
            p5.selectedScreen = 0;
        }
        p5.selected = p5.screens[p5.selectedScreen];
        // p5.socket.emit('selected',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
        changeTheSelectedProperty(p5);
        resetScreens(p5);
        addTheScreenElement(p5);
    });

    addTheScreenElement(p5);
}

const hexToRgb = hex =>
                hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
                            ,(m, r, g, b) => '#' + r + r + g + g + b + b)
                    .substring(1).match(/.{2}/g)
                    .map(x => parseInt(x, 16));

function removeAllChildNodes(e) 
{
    let child = e.lastElementChild;
    while (child) 
    {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

function editEvents(p5)
{
    // Push event ....
    const screens = document.querySelector('.screens-list');
    removeAllChildNodes(screens);
    const myRe = /^push\((\w|\d|\-)+\)$/g;
    let id = null;
    for(let i=0;i<p5.selected.events.length;i++)
    {
        if(p5.selected.events[i].startsWith("push("));
        {
            const str = myRe.exec(p5.selected.events[i])[0].substring(5);
            id = str.substring(0,str.length-1);
            break;
        }
    }
    for(let i=0;i<p5.screens.length;i++)
    {
        let option;
        if(id && p5.screens[i].Id === id)
            option = new Option(p5.screens[i].name, p5.screens[i].Id, true, true);
        else
            option = new Option(p5.screens[i].name, p5.screens[i].Id);
        screens.append(option);
    }
    if(id)
        document.querySelector('#pushEvents').checked = true;
    else
        document.querySelector('#pushEvents').checked = false;

    //Submit and Calculate Events ...
    document.querySelector('#submit-events').checked = false;
    document.querySelector('#calculate-events').checked = false;
    for(let i=0;i<p5.selected.events.length;i++)
        if(p5.selected.events[i].startsWith("submit"))
        {
            document.querySelector('#submit-events').checked = true;
        }
        else if(p5.selected.events[i].startsWith("calc"))
        {
            document.querySelector('#calculate-events').checked = true;
        }
    // Validate and Insert Events ...
    let index = p5.selected.events.findIndex(t => t.startsWith("valid") || t.startsWith("insert"));
    if(index === -1)
    {
        document.querySelector('#valid-insert-evnets').checked = false;   
    }
    else
    {
        document.querySelector('#valid-insert-evnets').checked = true;   
        if(p5.selected.events[index].startsWith("valid"))
            document.querySelector('#toggleButton16').checked = true;
        else
            document.querySelector('#toggleButton17').checked = true;
    }
}

function addNewScreen(p5,id)
{
    p5.screens.push(new Screen(config.gridPoints));
    p5.selectedScreen = p5.screens.length - 1;
    p5.selected = p5.screens[p5.selectedScreen];
    if(id) 
        p5.selected.Id = id;
    else
    {
        p5.socket.emit('newScreen',ROOM_ID,{EMAIL,Id:p5.selected.Id});
    }
    p5.screens[p5.selectedScreen].unSortedWidjets = [];
    p5.screens[p5.selectedScreen].backgroundColor = [0,0,0];
    p5.screens[p5.selectedScreen].canMove = false;
    const screensTag = document.querySelector('.screens');
    const newScreen = document.createElement('a');
    newScreen.addEventListener('click', e => {
        p5.selectedScreen = newScreen.dataset.value - 0;
        p5.selected = p5.screens[p5.selectedScreen];
        p5.socket.emit('selectedScreen',ROOM_ID,JSON.stringify({EMAIL,screen_number:p5.selectedScreen}));
        sc.value = p5.selectedScreen;
        addTheScreenElement(p5);
        changeTheSelectedProperty(p5) ;
    });
    newScreen.setAttribute('href', '#');
    newScreen.dataset.value = p5.screens.length - 1;
    // newScreen.innerText = "Screen " + p5.screens.length;
    newScreen.innerText = p5.screens[p5.screens.length-1].name;
    screensTag.appendChild(newScreen);
    newScreen.className += "list-item screen-value";
    const option = document.createElement('option');
    option.value = p5.selectedScreen;
    // option.innerText = `Screen ${p5.selectedScreen + 1}`;
    option.innerText = p5.screens[p5.screens.length-1].name;
    sc.appendChild(option);
    sc.value = p5.selectedScreen;
    changeTheSelectedProperty(p5);
    addTheScreenElement(p5);
}

function resetScreens(p5)
{
    const screensTag = document.querySelector('.screens');
    removeAllChildNodes(screensTag);
    removeAllChildNodes(sc);
    for(let i=0;i<p5.screens.length;i++)
    {
        const newScreen = document.createElement('a');
        newScreen.addEventListener('click', e => {
            p5.selectedScreen = newScreen.dataset.value - 0;
            p5.selected = p5.screens[p5.selectedScreen];
            p5.socket.emit('selectedScreen',ROOM_ID,JSON.stringify({EMAIL,screen_number:p5.selectedScreen}));
            sc.value = p5.selectedScreen;
            addTheScreenElement(p5);
            changeTheSelectedProperty(p5);
        });
        newScreen.setAttribute('href', '#');
        newScreen.dataset.value = i;
        // newScreen.innerText = `Screen ${i+1}`;
        newScreen.innerText = p5.screens[i].name;
        screensTag.appendChild(newScreen);
        newScreen.className += "list-item screen-value";
        const option = document.createElement('option');
        option.value = i;
        // option.innerText = `Screen ${i + 1}`;
        option.innerText = p5.screens[i].name;
        sc.appendChild(option);
    }
    sc.value = p5.selectedScreen;
}

function addAppBar(p5,id)
{
    if(p5.screens[p5.selectedScreen].appBar) return false;
    p5.screens[p5.selectedScreen].appBar = new AppBar({X : config.gridPoints.X , Y : config.gridPoints.Y},config.gridPoints.W,config.gridPoints.H * 0.09);
    p5.screens[p5.selectedScreen].size = (config.gridPoints.H - (config.gridPoints.H * 0.09)) / config.gridPoints.H;
    p5.screens[p5.selectedScreen].Y = config.gridPoints.Y + (config.gridPoints.H * 0.09);
    p5.screens[p5.selectedScreen].height -= config.gridPoints.H * 0.09;
    p5.selected = p5.screens[p5.selectedScreen].appBar;
    if(id) 
        p5.selected.Id = id;
    else
        p5.socket.emit('addAppBar',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
    changeTheSelectedProperty( p5 );
    return true;
}

function addTheScreenElement(p5,newItem = false) {
    const scrnChilds = document.querySelector('.childs');
    removeAllChildNodes(scrnChilds);
    for (let i = 0; i < p5.screens[p5.selectedScreen].children.length; i++) {
        let div = document.createElement('a');
        div.className += ' list-item screen-value';
        div.innerText = p5.screens[p5.selectedScreen].children[i].name;
        div.dataset.value = p5.screens[p5.selectedScreen].children[i].Id;
        div.addEventListener('click', e => {
            const index = p5.screens[p5.selectedScreen].children.findIndex( t => t.Id === e.target.dataset.value);
            if( index !== -1 )
            {
                p5.selected = p5.screens[p5.selectedScreen].children[index];
                changeTheSelectedProperty(p5);
                p5.socket.emit('selected',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
            }
        });
        scrnChilds.appendChild(div);
    }
    for(let i=0; i< p5.screens[p5.selectedScreen].unSortedWidjets.length;i++)
    {
        let div = document.createElement('a');
        div.className += ' list-item screen-value';
        div.innerText = p5.screens[p5.selectedScreen].unSortedWidjets[i].name;
        div.dataset.value = p5.screens[p5.selectedScreen].unSortedWidjets[i].Id;
        div.addEventListener('click', e => {
            const index = p5.screens[p5.selectedScreen].unSortedWidjets.findIndex( t => t.Id === e.target.dataset.value);
            if( index !== -1 )
            {
                p5.selected = p5.screens[p5.selectedScreen].unSortedWidjets[index];
                changeTheSelectedProperty(p5);
                p5.socket.emit('selected',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
            }
        });
        scrnChilds.appendChild(div);
    }
    if(!newItem)
    {
        p5.selected = p5.screens[p5.selectedScreen];
        p5.socket.emit('selected',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
        changeTheSelectedProperty(p5);
    }
}

function changeTheSelectedProperty(p5,selected)
{
    changeProperty(p5,selected) ;
}

export default {
    setEvents,
    addTheScreenElement,
    changeTheSelectedProperty,
    addNewScreen,
    addAppBar,
    resetScreens
}
