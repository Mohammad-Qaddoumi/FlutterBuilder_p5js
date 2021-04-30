import Grid from '../elements/grid/grid.js';
import AppBar from '../elements/widjet/appBar.js';
import Text from '../elements/widjet/Text.js';
import config from './config.js';
import release from './mouseRelease.js';
import saveAsJson from './ajax.js';
import binaryToBase64 from './base64Encode.js';

const dlebtn = document.querySelector('.btnDelete');
const updbtn = document.querySelector('.btnUpdate');
const uSize = document.querySelector('.userSize');
const sizeName = document.querySelector('.size-name');
const innerText = document.querySelector('.inner-Text');
const iText = document.querySelector('.innerText');
const txtName = document.querySelector('.txtName');
const showBars = document.querySelector('#showBars');
const lock = document.querySelector('#lock');
const showProperty = document.querySelector('#property');
const showTree = document.querySelector('#tree');
const container = document.querySelector('.container');
const treeDiv = document.querySelector('.treeDiv');
const slcScreen = document.getElementsByClassName('screen-value');
const btnAddScreen = document.querySelector('.btnAddScreen');
const sc = document.querySelector('.screen-collection');
const type = document.querySelector('.itemType');
const slcItem = document.querySelector('.selectedItem');
const widthAndHeight = document.querySelector('.widthAndHeight');
const boxWidth = document.querySelector('.width');
const boxHeight = document.querySelector('.height');
const btnAppbar = document.querySelector('.btnAppbar');
const backgroundColor = document.querySelector('.backgroundColor');
const bgCV = document.querySelector('.backgroundColor > input');
const foregroundColor = document.querySelector('.foreColor');
const fgCV = document.querySelector('.foreColor > input');
// const aligment_H =  document.querySelector('.horizontal');
// const aligment_V =  document.querySelector('.vertical');
const image_BG = document.querySelector('#image-BG');

function setEvents(p5)
{
    // TODO: Add debouncing to the events...
    // https://stackoverflow.com/questions/52892333/javascript-generic-async-await-debounce
    // https://davidwalsh.name/javascript-debounce-function
    /**
    let debounceTimeout;
    watch(() => searchTerm.value, () => {
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
            getResults();
            }, 100);
    });
    */
    

    image_BG.addEventListener('input', e => {
        binaryToBase64(p5,image_BG.files);
    });

    bgCV.addEventListener('input', e => {
        p5.selected.backgroundColor = hexToRgb(e.target.value);
    });
    fgCV.addEventListener('input', e => {
        p5.selected.foregroundColor = hexToRgb(e.target.value);
    });

    dlebtn.addEventListener('click', e => {
        if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        if(p5.selected.Id === p5.screens[p5.selectedScreen].appBar.Id)return;
        if (!confirm(`Do you want to delete ${p5.selected.name}?`)) return;
        let index = p5.screens[p5.selectedScreen].children.findIndex(e => e.Id === p5.selected.Id);
        if(index >= 0)
        {
            p5.screens[p5.selectedScreen].children.splice(index, 1);
            p5.socket.emit('deleteItem',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
        }    
        else
        {
            index = p5.screens[p5.selectedScreen].unSortedWidjets.findIndex(e => e.Id === p5.selected.Id); 
            if(index >= 0){
                p5.screens[p5.selectedScreen].unSortedWidjets.splice(index, 1);
                p5.socket.emit('deleteItem',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
            }
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
        if (uSize.value - 0 < 10)
        {
            uSize.value = 10; 
            return;
        }
        else if (uSize.value - 0 > 99)
        {
            uSize.value = 99;
            return;
        }
        if(p5.selected instanceof Grid)
        {
            p5.selected.size = uSize.value / 100;
            release.restTheCoordinates( p5.screens[p5.selectedScreen].children );
        }
        else if(p5.selected instanceof Text)
        {
            p5.selected.fontSize = uSize.value - 0;
            release.restTheCoordinates( p5.screens[p5.selectedScreen].children );
        }
        

    });
  
    innerText.addEventListener('input', e => {
        if (p5.selected === null) return;
        if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        if(!(p5.selected instanceof Grid))
        {
            p5.selected.text = innerText.value;
        }
    });
  
    txtName.addEventListener('input', e => {
        if (p5.selected === null) return;
        if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        p5.selected.name = txtName.value;
        const s = document.querySelector('.selectedItem');
        s.innerHTML = `SelectedItem: ${p5.selected.name}`;
    });

    showBars.addEventListener('click', e => {
        p5.showBar = showBars.checked;
    });

    lock.addEventListener('click', e => {
        if (p5.selected === null) return;
        if(p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        p5.selected.canMove = !lock.checked;
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
        if(boxWidth.value - 0 < 10)
        {
            boxWidth.value = 10;
            return;
        }
        else if( boxWidth.value - 0 > 199)
        {
            boxWidth.value = 199;
            return;
        }
        p5.selected.width = boxWidth.value - 0;
    });
    boxHeight.addEventListener('input', e =>{
        if (p5.selected === null) return;
        if (p5.selected.Id === p5.screens[p5.selectedScreen].Id) return;
        if(boxHeight.value - 0 < 10)
        {
            boxHeight.value = 10;
            return;
        }
        else if( boxHeight.value - 0 > 199)
        {
            boxHeight.value = 199;
            return;
        }
        p5.selected.height = boxHeight.value - 0;
    });
    addTheScreenElement(p5);
}

const rgbToHex = (r, g, b) => '#' + [r, g, b]
                .map(x => x.toString(16).padStart(2, '0')).join('');
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

function addNewScreen(p5,id)
{
    p5.screens.push(new Grid(config.gridPoints));
    p5.selectedScreen = p5.screens.length - 1;
    p5.selected = p5.screens[p5.selectedScreen];
    if(id) 
        p5.selected.Id = id;
    else
        p5.socket.emit('newScreen',ROOM_ID,JSON.stringify({EMAIL,Id:p5.selected.Id}));
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
    newScreen.innerText = "Screen " + p5.screens.length;
    screensTag.appendChild(newScreen);
    newScreen.className += "list-item screen-value";
    const option = document.createElement('option');
    option.value = p5.selectedScreen;
    option.innerText = `Screen ${p5.selectedScreen + 1}`;
    sc.appendChild(option);
    sc.value = p5.selectedScreen;
    changeTheSelectedProperty(p5);
    addTheScreenElement(p5);
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

function changeTheSelectedProperty(p5) 
{
    if(!p5.selected) return;
    widthAndHeight.style.display = 'none';
    bgCV.value = rgbToHex(p5.selected.backgroundColor[0], p5.selected.backgroundColor[1], p5.selected.backgroundColor[2]);
    backgroundColor.style.display = 'flex';
    foregroundColor.style.display = 'flex';
    if (p5.selected.Id === p5.screens[p5.selectedScreen].Id)
    {
        document.querySelector('.locked').style.display = 'none';
        document.querySelector('.screenaction').style.display = 'block';
        document.querySelector('.size').style.display = 'none';
        dlebtn.style.display = 'none';
        foregroundColor.style.display = 'none';
        slcItem.innerText = `SelectedItem: Screen ${p5.selectedScreen + 1}`;
        type.innerText = `Type: Screen`;
        iText.style.display = 'none';
    }
    else
    {
        document.querySelector('.screenaction').style.display = 'none';
        document.querySelector('.percentage').style.display = 'flex';
        iText.style.display = 'none';
        dlebtn.style.display = 'block';
        document.querySelector('.locked').style.display = 'flex';
        lock.checked= !p5.selected.canMove;
        document.querySelector('.size').style.display = 'flex';
        slcItem.innerText = `SelectedItem: ${p5.selected.name}`;
        type.innerText = `Type: ${p5.selected._type}`;
        fgCV.value = rgbToHex(p5.selected.foregroundColor[0], p5.selected.foregroundColor[1], p5.selected.foregroundColor[2]);
    
        if(p5.selected instanceof Text)
        {
            backgroundColor.style.display = 'none';
            uSize.value = p5.selected.fontSize;
            sizeName.innerText = "Font Size : ";
            document.querySelector('.percentage').style.display = "none";
            iText.style.display = 'flex';
            innerText.value = p5.selected.text;
        }
        else if (p5.selected instanceof AppBar)
        {
            iText.style.display = 'flex';
            innerText.value = p5.selected.text;
            document.querySelector('.size').style.display = 'none';
            document.querySelector('.locked').style.display = 'none';
        }
        else
        {
            document.querySelector('.size').style.display = 'none';
            iText.style.display = 'flex';
            widthAndHeight.style.display = 'flex';
            innerText.value = p5.selected.text;
            boxWidth.value = p5.selected.width;
            boxHeight.value = p5.selected.height;
        }

    }
    txtName.value = p5.selected.name;
}

export default {
    setEvents,
    addTheScreenElement,
    changeTheSelectedProperty,
    addNewScreen,
    addAppBar
}
