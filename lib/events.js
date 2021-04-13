import Row from '../elements/grid/row.js';
import AppBar from '../elements/widjet/appBar.js';
import Text from '../elements/widjet/Text.js';
import Grid from '../elements/grid/grid.js';
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
const itemId = document.querySelector('.itemId');
const widthAndHeight = document.querySelector('.widthAndHeight');
const boxWidth = document.querySelector('.width');
const boxHeight = document.querySelector('.height');
const btnAppbar = document.querySelector('.btnAppbar');
const backgroundColor = document.querySelector('.backgroundColor');
const bgCV = document.querySelector('.backgroundColor > input');
const foregroundColor = document.querySelector('.foreColor');
const fgCV = document.querySelector('.foreColor > input');
const aligment_H =  document.querySelector('.horizontal');
const aligment_V =  document.querySelector('.vertical');
const image_BG = document.querySelector('#image-BG');

function setEvents(p5)
{
    // TODO: Add debouncing to the events...
    // https://stackoverflow.com/questions/52892333/javascript-generic-async-await-debounce
    // https://davidwalsh.name/javascript-debounce-function
    
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
        if (!confirm(`Do you want to delete ${p5.selected.name}?`)) return;
        if(p5.selected.parent)
        {
            let index = p5.selected.parent.children.findIndex(e => e.Id === p5.selected.Id);
            if(index >= 0)
                p5.selected.parent.children.splice(index, 1);
        }
        else
        {
            let index = p5.screens[p5.selectedScreen].unSortedWidjets.findIndex(e => e.Id === p5.selected.Id); 
            if(index >= 0)
                p5.screens[p5.selectedScreen].unSortedWidjets.splice(index, 1);
        }
        p5.selected = p5.screens[p5.selectedScreen];
        release.restTheCoordinates( p5.screens[p5.selectedScreen].children );
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
        !result ? alert('Error😢 while trying to update💔!!!') : print(`${result}`);
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
        p5.selected.canMove = lock.checked;
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
            selected = p5.screens[p5.selectedScreen];
            addTheScreenElement(p5);
            changeTheSelectedProperty(p5) ;
        });
    }
    
    btnAppbar.addEventListener('click', () => {
        if(p5.screens[p5.selectedScreen].appBar) return;
        p5.screens[p5.selectedScreen].appBar = new AppBar({X : config.gridPoints.X , Y : config.gridPoints.Y},config.gridPoints.W,config.gridPoints.H * 0.1);
        p5.screens[p5.selectedScreen].size = (config.gridPoints.H - (config.gridPoints.H * 0.1)) / config.gridPoints.H;
        p5.screens[p5.selectedScreen].Y = config.gridPoints.Y + (config.gridPoints.H * 0.1);
        p5.screens[p5.selectedScreen].height -= config.gridPoints.H * 0.1;
        p5.selected = p5.screens[p5.selectedScreen].appBar;
        release.restTheCoordinates( p5.screens[p5.selectedScreen].children );
        changeTheSelectedProperty( p5 );
    });

    btnAddScreen.addEventListener('click', e => {
        // screens.push(new Grid(gridPoints));
        p5.screens.push(new Row(config.gridPoints));
        p5.selectedScreen = p5.screens.length - 1;
        p5.selected = p5.screens[p5.selectedScreen];
        p5.screens[p5.selectedScreen].unSortedWidjets = [];
        p5.screens[p5.selectedScreen].backgroundColor = [0,0,0];
        p5.screens[p5.selectedScreen].canMove = false;

        const screensTag = document.querySelector('.screens');
        const newScreen = document.createElement('a');
        newScreen.addEventListener('click', e => {
            p5.selectedScreen = newScreen.dataset.value - 0;
            p5.selected = p5.screens[p5.selectedScreen];
            sc.value = p5.selectedScreen;
            addTheScreenElement(p5);
            changeTheSelectedProperty(p5) ;
        });
        newScreen.setAttribute('href', '#');
        newScreen.dataset.value = p5.screens.length - 1;
        newScreen.innerText = "Screen " + p5.screens.length;
        screensTag.appendChild(newScreen);
        newScreen.className += "list-item screen-value";

        const option = document.createElement('option')
        option.value = p5.selectedScreen;
        option.innerText = `Screen ${p5.selectedScreen + 1}`;
        sc.appendChild(option);
        sc.value = p5.selectedScreen;

        changeTheSelectedProperty(p5);
        // showT.innerHTML = "Screen " + (selectedScreen + 1);
    });

    sc.addEventListener('input', (e) => {
        p5.selectedScreen = sc.value - 0;
        p5.selected = p5.screens[p5.selectedScreen];
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
    document.querySelector('#horizontal').addEventListener('input', (e) => {
        if(p5.selected instanceof Grid)
        {
            console.log(e.target.value);
        }
    });
    document.querySelector('#vertical').addEventListener('input', (e) => {
        if(p5.selected instanceof Grid)
        {
            console.log(e.target.value);
        }
    });
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

//TODO: Fix the tree elements .........................
function addTheScreenElement(p5) {
    // const scrnChilds = document.querySelector('.childs');
    // removeAllChildNodes(scrnChilds);
    // for (let i = 0; i < screens[selectedScreen].children.length; i++) {
    //     let div = document.createElement('div');
    //     // let a = document.createElement('a');
    //     div.className += ' list-item screen-value';
    //     div.innerText = screens[selectedScreen].children[i].name;
    //     scrnChilds.appendChild(div);
    // }
    // selected = null;
    // changeTheSelectedProperty();
}

function changeTheSelectedProperty(p5) 
{
    widthAndHeight.style.display = 'none';
    bgCV.value = rgbToHex(p5.selected.backgroundColor[0], p5.selected.backgroundColor[1], p5.selected.backgroundColor[2]);
    backgroundColor.style.display = 'flex';
    foregroundColor.style.display = 'flex';
    if (p5.selected === null || p5.selected.Id === p5.screens[p5.selectedScreen].Id)
    {
        document.querySelector('.locked').style.display = 'none';
        document.querySelector('.screenaction').style.display = 'block';
        document.querySelector('.size').style.display = 'none';
        dlebtn.style.display = 'none';
        foregroundColor.style.display = 'none';
        slcItem.innerText = `SelectedItem: Screen ${p5.selectedScreen + 1}`;
        type.innerText = `Type: Screen_"Row"`;
        iText.style.display = 'none';
        aligment_H.style.display = 'flex';
        aligment_V.style.display = 'flex';
        
    }
    else
    {
        document.querySelector('.screenaction').style.display = 'none';
        document.querySelector('.percentage').style.display = 'flex';
        iText.style.display = 'none';
        dlebtn.style.display = 'block';
        document.querySelector('.locked').style.display = 'flex';
        document.querySelector('.locked').checked = !p5.selected.canMove;
        document.querySelector('.size').style.display = 'flex';
        slcItem.innerText = `SelectedItem: ${p5.selected.name}`;
        type.innerText = `Type: ${p5.selected._type}`;
        aligment_H.style.display = 'none';
        aligment_V.style.display = 'none';
    
        if(p5.selected instanceof Text)
        {
            backgroundColor.style.display = 'none';
            uSize.value = p5.selected.fontSize;
            sizeName.innerText = "Font Size : ";
            document.querySelector('.percentage').style.display = "none";
            iText.style.display = 'flex';
            innerText.value = p5.selected.text;
            fgCV.value = rgbToHex(p5.selected.foregroundColor[0], p5.selected.foregroundColor[1], p5.selected.foregroundColor[2]);
        }
        else if(p5.selected instanceof Grid)
        {
            uSize.value = Math.floor(p5.selected.size * 100);
            sizeName.innerText = "Size : ";
            foregroundColor.style.display = 'none';
            aligment_H.style.display = 'flex';
            aligment_V.style.display = 'flex';
        }
        else if (p5.selected instanceof AppBar)
        {
            iText.style.display = 'flex';
            foregroundColor.style.display = 'none';
            innerText.value = p5.selected.text;
            document.querySelector('.size').style.display = 'none';
            document.querySelector('.locked').style.display = 'none';
        }
        else
        {
            document.querySelector('.size').style.display = 'none';
            fgCV.value = rgbToHex(p5.selected.foregroundColor[0], p5.selected.foregroundColor[1], p5.selected.foregroundColor[2]);
            iText.style.display = 'flex';
            widthAndHeight.style.display = 'flex';
            innerText.value = p5.selected.text;
            boxWidth.value = p5.selected.width;
            boxHeight.value = p5.selected.height;
        }

    }
    itemId.innerText = `Id:${p5.selected.Id}`;
    txtName.value = p5.selected.name;
    
}
export default {
    setEvents,
    addTheScreenElement,
    changeTheSelectedProperty
}