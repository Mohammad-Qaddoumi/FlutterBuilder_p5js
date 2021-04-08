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

function setEvents()
{
    bgCV.addEventListener('input', e => {
        selected.backgroundColor = hexToRgb(e.target.value);
    });
    fgCV.addEventListener('input', e => {
        selected.foregroundColor = hexToRgb(e.target.value);
    });

    dlebtn.addEventListener('click', e => {
        if(selected.Id === screens[selectedScreen].Id) return;
        if (!confirm(`Do you want to delete ${selected.name}?`)) return;
        if(selected.parent)
        {
            let index = selected.parent.children.findIndex(e => e.Id === selected.Id);
            if(index >= 0)
                selected.parent.children.splice(index, 1);
        }
        else
        {
            let index = unSortedWidjets.findIndex(e => e.Id === selected.Id); 
            if(index >= 0)
                unSortedWidjets.splice(index, 1);
        }
        selected = screens[selectedScreen];
        restTheCoordinates( screens[selectedScreen].children );
        changeTheSelectedProperty();
        addTheScreenElement();
    });
    
    updbtn.addEventListener('click', async e => {
        e.preventDefault();
        updateison = true;
        let result = await saveAsJson();
        setTimeout(() => {
            updateison = false;
            !result ? alert('Error😢 while trying to update💔!!!') : print(`${result}`);
            spin = 0;
        }, 2000);

    });

    uSize.addEventListener('input', e => {
        if (selected === null) return;
        if(selected.Id === screens[selectedScreen].Id) return;
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
        if(selected instanceof Grid)
        {
            selected.size = uSize.value / 100;
            restTheCoordinates( screens[selectedScreen].children );
        }
        else if(selected instanceof Text)
        {
            selected.fontSize = uSize.value - 0;
            restTheCoordinates( screens[selectedScreen].children );
        }
        

    });
  
    innerText.addEventListener('input', e => {
        if (selected === null) return;
        if(selected.Id === screens[selectedScreen].Id) return;
        if(!(selected instanceof Grid))
        {
            selected.text = innerText.value;
        }
    });
  
    txtName.addEventListener('input', e => {
        if (selected === null) return;
        if(selected.Id === screens[selectedScreen].Id) return;
        selected.name = txtName.value;
        const s = document.querySelector('.selectedItem');
        s.innerHTML = `SelectedItem: ${selected.name}`;
    });

    showBars.addEventListener('click', e => {
        showBar = showBars.checked;
    });

    lock.addEventListener('click', e => {
        if (selected === null) return;
        if(selected.Id === screens[selectedScreen].Id) return;
        selected.canMove = lock.checked;
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
            selectedScreen = s.dataset.value - 0;
            unSortedWidjets = screens[selectedScreen].unSortedWidjets;
            sc.value = selectedScreen;
            selected = screens[selectedScreen];
            addTheScreenElement();
            changeTheSelectedProperty() ;
        });
    }
    
    btnAppbar.addEventListener('click', () => {
        if(screens[selectedScreen].appBar) return;
        screens[selectedScreen].appBar = new AppBar({X : gridPoints.X , Y : gridPoints.Y},gridPoints.W,gridPoints.H * 0.1);
        screens[selectedScreen].size = (gridPoints.H - (gridPoints.H * 0.1)) / gridPoints.H;
        screens[selectedScreen].Y = gridPoints.Y + (gridPoints.H * 0.1);
        screens[selectedScreen].height -= gridPoints.H * 0.1;
        restTheCoordinates( screens[selectedScreen].children );
    });

    btnAddScreen.addEventListener('click', e => {
        // screens.push(new Grid(gridPoints));
        screens.push(new Row(gridPoints));
        selectedScreen = screens.length - 1;
        selected = screens[selectedScreen];
        screens[selectedScreen].unSortedWidjets = [];
        screens[selectedScreen].backgroundColor = [0,0,0];
        unSortedWidjets = screens[selectedScreen].unSortedWidjets;
        screens[selectedScreen].canMove = false;

        const screensTag = document.querySelector('.screens');
        const newScreen = document.createElement('a');
        newScreen.addEventListener('click', e => {
            selectedScreen = newScreen.dataset.value - 0;
            selected = screens[selectedScreen];
            unSortedWidjets = screens[selectedScreen].unSortedWidjets;
            sc.value = selectedScreen;
            addTheScreenElement();
            changeTheSelectedProperty() ;
        });
        newScreen.setAttribute('href', '#');
        newScreen.dataset.value = screens.length - 1;
        newScreen.innerText = "Screen " + screens.length;
        screensTag.appendChild(newScreen);
        newScreen.className += "list-item screen-value";

        const option = document.createElement('option')
        option.value = selectedScreen;
        option.innerText = `Screen ${selectedScreen + 1}`;
        sc.appendChild(option);
        sc.value = selectedScreen;

        changeTheSelectedProperty();
        // showT.innerHTML = "Screen " + (selectedScreen + 1);
    });

    sc.addEventListener('input', (e) => {
        selectedScreen = sc.value - 0;
        selected = screens[selectedScreen];
        unSortedWidjets = screens[selectedScreen].unSortedWidjets;
        addTheScreenElement();
        changeTheSelectedProperty() ;
    });

    boxWidth.addEventListener('input', e =>{
        if (selected === null) return;
        if (selected.Id === screens[selectedScreen].Id) return;
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
        selected.width = boxWidth.value - 0;
    });
    boxHeight.addEventListener('input', e =>{
        if (selected === null) return;
        if (selected.Id === screens[selectedScreen].Id) return;
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
        selected.height = boxHeight.value - 0;
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
    var child = e.lastElementChild;
    while (child) 
    {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}

//TODO: Fix the tree elements .........................
function addTheScreenElement() {
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

function changeTheSelectedProperty() 
{
    widthAndHeight.style.display = 'none';
    bgCV.value = rgbToHex(selected.backgroundColor[0], selected.backgroundColor[1], selected.backgroundColor[2]);
    backgroundColor.style.display = 'flex';
    foregroundColor.style.display = 'flex';
    if (selected === null || selected.Id === screens[selectedScreen].Id)
    {
        document.querySelector('.locked').style.display = 'none';
        document.querySelector('.screenaction').style.display = 'block';
        document.querySelector('.size').style.display = 'none';
        dlebtn.style.display = 'none';
        foregroundColor.style.display = 'none';
        slcItem.innerText = `SelectedItem: Screen ${selectedScreen + 1}`;
        type.innerText = `Type: Screen_"Row"`;
        iText.style.display = 'none';
        
    }
    else
    {
        document.querySelector('.screenaction').style.display = 'none';
        iText.style.display = 'none';
        dlebtn.style.display = 'block';
        document.querySelector('.locked').style.display = 'flex';
        document.querySelector('.locked').checked = !selected.canMove;
        document.querySelector('.size').style.display = 'flex';
        slcItem.innerText = `SelectedItem: ${selected.name}`;
        type.innerText = `Type: ${selected._type}`;
    
        if(selected instanceof Text)
        {
            backgroundColor.style.display = 'none';
            uSize.value = selected.fontSize;
            sizeName.innerText = "Font Size : ";
            iText.style.display = 'flex';
            innerText.value = selected.text;
            fgCV.value = rgbToHex(selected.foregroundColor[0], selected.foregroundColor[1], selected.foregroundColor[2]);
        }
        else if(selected instanceof Grid)
        {
            uSize.value = Math.floor(selected.size * 100);
            sizeName.innerText = "Size : ";
            foregroundColor.style.display = 'none';
        }
        else if (selected instanceof AppBar)
        {
            iText.style.display = 'flex';
            foregroundColor.style.display = 'none';
            innerText.value = selected.text;
            document.querySelector('.size').style.display = 'none';
            document.querySelector('.locked').style.display = 'none';
        }
        else
        {
            document.querySelector('.size').style.display = 'none';
            fgCV.value = rgbToHex(selected.foregroundColor[0], selected.foregroundColor[1], selected.foregroundColor[2]);
            iText.style.display = 'flex';
            widthAndHeight.style.display = 'flex';
            innerText.value = selected.text;
            boxWidth.value = selected.width;
            boxHeight.value = selected.height;
        }

    }
    itemId.innerText = `Id:${selected.Id}`;
    txtName.value = selected.name;
    
}
