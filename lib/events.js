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
const type = document.querySelector('.itemType');
const slcItem = document.querySelector('.selectedItem');
const itemId = document.querySelector('.itemId');
const widthAndHeight = document.querySelector('.widthAndHeight');
const boxWidth = document.querySelector('.width');
const boxHeight = document.querySelector('.height');
const btnAppbar = document.querySelector('.btnAppbar');

function setEvents()
{
    //TODO: fix the delete btn problems..........................
    dlebtn.addEventListener('click', e => {
        print(screensArray[selectedScreen]);
        if(selected.Id === screensArray[selectedScreen].Id) return;
        if (!confirm(`Do you want to delete ${selected.name}?`)) return;
        if(selected.parent)
        {
            let index = selected.parent.children.findIndex(e => e.Id === selected.Id);
            print(index);
            if(index < 0){
                index = selected.parent.unSortedWidjets.findIndex(e => e.Id === selected.Id); 
                if(index >= 0)
                    selected.parent.unSortedWidjets.splice(index, 1);
            }else{
                selected.parent.children.splice(index, 1);
            }
        }
        print(screensArray[selectedScreen]);
        selected = screensArray[selectedScreen];
        restTheCoordinates( screensArray[selectedScreen].children );
        // let index = screensArray[selectedScreen].children.findIndex(e => e.Id === selected.Id);
        // screensArray[selectedScreen].children.splice(index, 1);
        changeTheSelectedProperty();
        addTheScreenElement();
    });
    
    updbtn.addEventListener('click', async e => {
        updateison = true;
        let json = buildJSON(screensArray);
        json = JSON.stringify(json, null, 4);
        let result = await loadDoc(json);
        setTimeout(() => {
            updateison = false;
            !result ? alert('Error while trying to update!!!') : print(`${result}`);
            spin = 0;
        }, 3000);
    });

    uSize.addEventListener('input', e => {
        if (selected === null) return;
        if(selected.Id === screensArray[selectedScreen].Id) return;
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
            restTheCoordinates( screensArray[selectedScreen].children );
        }
        else if(selected instanceof Text)
        {
            selected.fontSize = uSize.value - 0;
            restTheCoordinates( screensArray[selectedScreen].children );
        }
        

    });
  
    innerText.addEventListener('input', e => {
        if (selected === null) return;
        if(selected.Id === screensArray[selectedScreen].Id) return;
        if(selected instanceof Text || selected instanceof AppBar)
        {
            selected.text = innerText.value;
        }

        // selected.text.mText = innerText.value;
        // cText = innerText.value;

    });
  
    txtName.addEventListener('input', e => {
        if (selected === null) return;
        if(selected.Id === screensArray[selectedScreen].Id) return;
        selected.name = txtName.value;
        const s = document.querySelector('.selectedItem');
        s.innerHTML = `SelectedItem: ${selected.name}`;
    });

    showBars.addEventListener('click', e => {
        showBar = showBars.checked;
    });

    lock.addEventListener('click', e => {
        if (selected === null) return;
        if(selected.Id === screensArray[selectedScreen].Id) return;
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
            showT.innerHTML = "Screen " + (selectedScreen + 1);
            unSortedWidjets = screensArray[selectedScreen].unSortedWidjets;
            addTheScreenElement();
            changeTheSelectedProperty() ;
        });
    }
    
    btnAppbar.addEventListener('click', () => {
        if(screensArray[selectedScreen].appBar) return;
        screensArray[selectedScreen].appBar = new AppBar({X : gridPoints.X , Y : gridPoints.Y},gridPoints.W,gridPoints.H * 0.1);
        screensArray[selectedScreen].size = (gridPoints.H - (gridPoints.H * 0.1)) / gridPoints.H;
        screensArray[selectedScreen].Y = gridPoints.Y + (gridPoints.H * 0.1);
        screensArray[selectedScreen].height -= gridPoints.H * 0.1;
        restTheCoordinates( screensArray[selectedScreen].children );
    });

    btnAddScreen.addEventListener('click', e => {
        // screensArray.push(new Grid(gridPoints));
        screensArray.push(new Row(gridPoints));
        selectedScreen = screensArray.length - 1;
        selected = screensArray[selectedScreen];
        screensArray[selectedScreen].unSortedWidjets = [];
        screensArray[selectedScreen].backgroundColor = [0,0,0];
        unSortedWidjets = screensArray[selectedScreen].unSortedWidjets;
        screensArray[selectedScreen].canMove = false;

        const screensTag = document.querySelector('.screens');
        const newScreen = document.createElement('a');
        newScreen.addEventListener('click', e => {
            selectedScreen = newScreen.dataset.value - 0;
            selected = screensArray[selectedScreen];
            // showT.innerHTML = "Screen " + (selectedScreen + 1);
            addTheScreenElement();
            changeTheSelectedProperty() ;
        });
        newScreen.setAttribute('href', '#');
        newScreen.dataset.value = screensArray.length - 1;
        newScreen.innerText = "Screen " + screensArray.length;
        screensTag.appendChild(newScreen);
        newScreen.className += "list-item screen-value";
        changeTheSelectedProperty();
        // showT.innerHTML = "Screen " + (selectedScreen + 1);
    });

    boxWidth.addEventListener('input', e =>{
        if (selected === null) return;
        if (selected.Id === screensArray[selectedScreen].Id) return;
        if(boxWidth.value - 0 < 10)
        {
            boxWidth.value = 10;
            return;
        }
        else if( boxWidth.value - 0 > 99)
        {
            boxWidth.value = 99;
            return;
        }
        selected.width = boxWidth.value - 0;
    });
    boxHeight.addEventListener('input', e =>{
        if (selected === null) return;
        if (selected.Id === screensArray[selectedScreen].Id) return;
        if(boxHeight.value - 0 < 10)
        {
            boxHeight.value = 10;
            return;
        }
        else if( boxHeight.value - 0 > 99)
        {
            boxHeight.value = 99;
            return;
        }
        selected.height = boxHeight.value - 0;
    });
}


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
    // for (let i = 0; i < screensArray[selectedScreen].children.length; i++) {
    //     let div = document.createElement('div');
    //     // let a = document.createElement('a');
    //     div.className += ' list-item screen-value';
    //     div.innerText = screensArray[selectedScreen].children[i].name;
    //     scrnChilds.appendChild(div);
    // }
    // selected = null;
    // changeTheSelectedProperty();
}

function changeTheSelectedProperty() 
{
    widthAndHeight.style.display = 'none';
    
    if (selected === null || selected.Id === screensArray[selectedScreen].Id)
    {
        document.querySelector('.locked').style.display = 'none';
        document.querySelector('.size').style.display = 'none';
        slcItem.innerText = `SelectedItem: Screen ${selectedScreen + 1}`;
        type.innerText = `Type: Screen_"Row"`;
        iText.style.display = 'none';
        
    }
    else
    {
        iText.style.display = 'none';
        document.querySelector('.locked').style.display = 'flex';
        document.querySelector('.locked').checked = !selected.canMove;
        document.querySelector('.size').style.display = 'flex';
        slcItem.innerText = `SelectedItem: ${selected.name}`;
        type.innerText = `Type: ${selected._type}`;
    
        if(selected instanceof Text)
        {
            uSize.value = selected.fontSize;
            sizeName.innerText = "Font Size : ";
            iText.style.display = 'flex';
            innerText.value = selected.text;
        }
        else if(selected instanceof Grid)
        {
            uSize.value = Math.floor(selected.size * 100);
            sizeName.innerText = "Size : ";
        }
        else if (selected instanceof AppBar)
        {
            iText.style.display = 'flex';
            innerText.value = selected.text;
            document.querySelector('.size').style.display = 'none';
            document.querySelector('.locked').style.display = 'none';
        }
        else
        {
            document.querySelector('.size').style.display = 'none';
            iText.style.display = 'flex';
            widthAndHeight.style.display = 'flex';
            innerText.value = selected.text.mText;
            boxWidth.value = selected.width;
            boxHeight.value = selected.height;
        }

    }
    itemId.innerText = `Id:${selected.Id}`;
    txtName.value = selected.name;
    
}
