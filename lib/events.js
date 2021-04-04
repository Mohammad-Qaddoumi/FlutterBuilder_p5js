function setEvents()
{
    
    const dlebtn = document.querySelector('.btnDelete');
    dlebtn.addEventListener('click', e => {
        if (selected === null) return;
        let r = confirm(`Do you want to delete ${selected.name}?`);
        if (!r) return;
        if(selected.parent)
        {
            
        }
        // let index = screensArray[selectedScreen].children.findIndex(e => e.Id === selected.Id);
        // screensArray[selectedScreen].children.splice(index, 1);
        selected = null;
        changeTheSelectedProperty();
        addTheScreenElement();
    });

    const updbtn = document.querySelector('.btnUpdate');
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

    // const z_index = document.querySelector('.zIndex');
    // z_index.addEventListener('input', e => {
    //     if (selected === null) return;
    //     selected.z_index = z_index.value;
    //     screensArray[selectedScreen].children = screensArray[selectedScreen].children.sort((a, b) => a.z_index - b.z_index);
    // });

    const uSize = document.querySelector('.userSize');
    uSize.addEventListener('input', e => {
        if (uSize.value - 0 < 10)
            uSize.value = 10;
        else if (uSize.value - 0 > 99)
            uSize.value = 99;
        if(selected && selected instanceof Grid)
        {
            selected.size = uSize.value / 100;
            restTheCoordinates( screensArray[selectedScreen].children );
        }
        // if (selected === null) return;
        // if (selected instanceof Text) {
        //     let len = selected.text.mText.length;
        //     //fNew = fOld * hNew / hOld
        //     //fN = fO * sqrt(wN / wO)
        //     let oldFont = selected.userSize - 0;
        //     let newFont = uSize.value - 0;
        //     // let oldHeight = selected.height-0;
        //     let oldWidth = selected.width - 0;
        //     // let newHeight = newFont * oldHeight / oldFont;
        //     let newWidth = newFont * oldWidth / oldFont;
        //     selected.userSize = newFont;
        //     // newWidth = newFont + 150;
        //     selected.width = newWidth;
        //     // newHeight = max(68*len/4,newHeight);
        //     newHeight = newFont + 5;
        //     selected.height = newHeight;
        //     // print(oldWidth,newWidth,oldHeight, newHeight);
        //     // print(textWidth(selected.text.mText));
        // }
    });

    const innerText = document.querySelector('.inner-Text');
    innerText.addEventListener('input', e => {
        if (selected === null) return;
        selected.text.mText = innerText.value;
        cText = innerText.value;
    });

    const txtName = document.querySelector('.txtName');
    txtName.addEventListener('input', e => {
        if (selected === null) return;
        selected.name = txtName.value;
        const s = document.querySelector('.selectedItem');
        s.innerHTML = `SelectedItem: ${selected.name}`;
    });

    const checkOrentaion = document.querySelector('.oriantaion');
    checkOrentaion.addEventListener('click', e => {
        chkorentaion = checkOrentaion.checked;
    });

    const showBars = document.querySelector('#showBars');
    showBars.addEventListener('click', e => {
        showBar = showBars.checked;
    });

    const lock = document.querySelector('#lock');
    showBars.addEventListener('click', e => {
        if(selected instanceof Grid)
            selected.canMove = lock.checked;
    });

    const showP = document.querySelector('.btnShowProperties');
    const showT = document.querySelector('.btnShowTree');
    const container = document.querySelector('.container');
    const treeDiv = document.querySelector('.treeDiv');
    showP.addEventListener('click', e => {
        container.style.display = 'flex';
        treeDiv.style.display = 'none';
        document.querySelector('.btnAddScreen').style.display = 'none';
    });
    showT.addEventListener('click', e => {
        treeDiv.style.display = 'flex';
        container.style.display = 'none';
        document.querySelector('.btnAddScreen').style.display = 'flex';
    });
    treeDiv.style.display = 'none';

    const slcScreen = document.getElementsByClassName('screen-value');
    for (let s of slcScreen) {
        s.addEventListener('click', e => {
            selectedScreen = s.dataset.value - 0;
            showT.innerHTML = "Screen " + (selectedScreen + 1);
            addTheScreenElement();
            rows = screensArray[selectedScreen].rows;
            columns = screensArray[selectedScreen].columns;
            rowGap = screensArray[selectedScreen].width;
            columnGap = screensArray[selectedScreen].height;
            document.querySelector('.gridRow').value = screensArray[selectedScreen].rows;
            document.querySelector('.gridColumn').value = screensArray[selectedScreen].columns;
        });
    }

    const btnAddScreen = document.querySelector('.btnAddScreen');
    btnAddScreen.addEventListener('click', e => {
        // screensArray.push(new Grid(gridPoints));
        screensArray.push(new Row(gridPoints));
        
        const screensTag = document.querySelector('.screens');
        const newScreen = document.createElement('a');
        newScreen.addEventListener('click', e => {
            selectedScreen = newScreen.dataset.value - 0;
            showT.innerHTML = "Screen " + (selectedScreen + 1);
            addTheScreenElement();
            // rows = screensArray[selectedScreen].rows;
            // columns = screensArray[selectedScreen].columns;
            // rowGap = screensArray[selectedScreen].width;
            // columnGap = screensArray[selectedScreen].height;
            document.querySelector('.gridRow').value = screensArray[selectedScreen].rows;
            document.querySelector('.gridColumn').value = screensArray[selectedScreen].columns;
        });
        newScreen.setAttribute('href', '#');
        newScreen.dataset.value = screensArray.length - 1;
        newScreen.innerText = "Screen " + screensArray.length;
        screensTag.appendChild(newScreen);
        newScreen.className += "list-item screen-value";
        selectedScreen = screensArray.length - 1;
        screensArray[selectedScreen].canMove = false;
        showT.innerHTML = "Screen " + (selectedScreen + 1);
    });
   
        // // const rE = document.querySelector('.gridColumn');
        // rows = rE.value - 0;
        // if (this.rows > 6) {
        //     rE.setAttribute("max", 6);
        //     rE.value = 6;
        //     this.rows = 6;
        // } else if (this.rows < 1) {
        //     rE.setAttribute("min", 1);
        //     rE.value = 1;
        //     this.rows = 1;
        // }
        // const cE = document.querySelector('.gridRow');
        // this.columns = cE.value - 0;
        // if (columns > 6) {
        //     cE.setAttribute("max", 6);
        //     cE.value = 6;
        //     columns = 6;
        // } else if (columns < 1) {
        //     cE.setAttribute("min", 1);
        //     cE.value = 1;
        //     columns = 1;
        // }
        // screensArray[selectedScreen].columns = columns;
        // screensArray[selectedScreen].rows = rows;
}


function removeAllChildNodes(e) {
    var child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}


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

function changeTheSelectedProperty() {
    if(selected === null)
    {
        document.querySelector('.locked').style.display = 'none';
        return;
    }else
        document.querySelector('.locked').style.display = 'block';
    const uSize = document.querySelector('.userSize');
    uSize.value = selected.size * 100;

    const type = document.querySelector('.itemType');
    let s = document.querySelector('.selectedItem');
    // if(selected.Id = screensArray[selectedScreen].Id)
    // {
        
    // }

    // const z_index = document.querySelector('.zIndex');
    // const innerText = document.querySelector('.inner-Text');
    // const txtName = document.querySelector('.txtName');
    // const itemId = document.querySelector('.itemId');
    // if (selected === null) {
    //     type.innerHTML = `Type: NoSelection`;
    //     innerText.value = "";
    //     s.innerHTML = "SelectedItem: NONE";
    //     txtName.value = "";
    //     z_index.value = 0;
    //     itemId.innerHTML = "";
    //     return;
    // }
    s.innerHTML = `SelectedItem: ${selected.name}`;
    type.innerHTML = `Type: ${selected._type}`;
    // z_index.value = selected.z_index;
    // innerText.value = selected.text.mText;
    // txtName.value = selected.name;
    // itemId.innerHTML = `Id:${selected.Id}`;
}