import Text from '../elements/widjet/Text.js';
import Input from '../elements/widjet/input.js';
import ImageWidjet from '../elements/widjet/image.js';
import CircleAvatar from '../elements/widjet/circle.js';
import List from '../elements/collection/list.js';
import AppBar from '../elements/widjet/appBar.js';
import ListTile from '../elements/widjet/listTile.js';

const dlebtn = document.querySelector('.btnDelete');
const uSize = document.querySelector('.userSize');
const sizeName = document.querySelector('.size-name');
const innerText = document.querySelector('.inner-Text');
const iText = document.querySelector('.innerText');
const txtName = document.querySelector('.txtName');
const lock = document.querySelector('#lock');
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
const btnAddImage = document.querySelector('#btnAddImage');

const rgbToHex = (r, g, b) => '#' + [r, g, b]
                .map(x => x.toString(16).padStart(2, '0')).join('');

export function changeProperty(p5) 
{
    if(!p5.selected) return;
    widthAndHeight.style.display = 'none';
    document.querySelector('.divName').style.display = 'flex';
    document.querySelector('.inputs-name').style.display = 'none';
    document.querySelector('.divSubcontent').style.display = 'none';
    document.querySelector('.list-widjet-tools').style.display = 'none';
    txtName.style.display = 'flex';
    document.querySelector('.hide-in-list').style.display = 'block';
    bgCV.value = rgbToHex(p5.selected.backgroundColor[0], p5.selected.backgroundColor[1], p5.selected.backgroundColor[2]);
    backgroundColor.style.display = 'flex';
    foregroundColor.style.display = 'flex';
    btnAddImage.style.display = 'none';
    if (p5.selected.Id === p5.screens[p5.selectedScreen].Id)
    {
        document.querySelector('.locked').style.display = 'none';
        document.querySelector('#btnEditEvents').style.display = 'none';
        document.querySelector('.screenaction').style.display = 'block';
        document.querySelector('.menu-list input').checked = p5.screens[p5.selectedScreen].menu_list;
        if(p5.screens[p5.selectedScreen].appBar)
            btnAppbar.style.display = 'none';
        else
            btnAppbar.style.display = 'flex';
        document.querySelector('.size').style.display = 'none';
        dlebtn.style.display = 'none';
        foregroundColor.style.display = 'none';
        slcItem.innerText = `SelectedItem: ${p5.selected.name}`;
        type.innerText = `Type: Screen`;
        iText.style.display = 'none';
    }
    else
    {
        document.querySelector('.screenaction').style.display = 'none';
        document.querySelector('.percentage').style.display = 'flex';
        document.querySelector('#btnEditEvents').style.display = 'flex';
        iText.style.display = 'none';
        dlebtn.style.display = 'block';
        document.querySelector('.locked').style.display = 'flex';
        lock.checked= !p5.selected.canMove;
        document.querySelector('.size').style.display = 'flex';
        slcItem.innerText = `SelectedItem: ${p5.selected.name}`;
        type.innerText = `Type: ${p5.selected._type}`;
        if(p5.selected.foregroundColor)
            fgCV.value = rgbToHex(p5.selected.foregroundColor[0], p5.selected.foregroundColor[1], p5.selected.foregroundColor[2]);
    
        if(p5.selected instanceof Text)
        {
            backgroundColor.style.display = 'none';
            document.querySelector('#btnEditEvents').style.display = 'none';
            uSize.value = p5.selected.fontSize;
            sizeName.innerText = "Font Size : ";
            document.querySelector('.percentage').style.display = "none";
            iText.style.display = 'flex';
            innerText.value = p5.selected.text;
        }
        else if (p5.selected instanceof AppBar)
        {
            iText.style.display = 'flex';
            document.querySelector('#btnEditEvents').style.display = 'none';
            innerText.value = p5.selected.text;
            document.querySelector('.size').style.display = 'none';
            document.querySelector('.locked').style.display = 'none';
            document.querySelector('#btnEditEvents').style.display = 'none';
        }
        else if (p5.selected instanceof ImageWidjet)
        {
            backgroundColor.style.display = 'none';
            foregroundColor.style.display = 'none';
            document.querySelector('#btnEditEvents').style.display = 'none';
            btnAddImage.style.display = 'flex';
            document.querySelector('.size').style.display = 'none';
            widthAndHeight.style.display = 'flex';
            boxWidth.value = p5.selected.width;
            boxHeight.value = p5.selected.height;
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
        if(p5.selected instanceof CircleAvatar)
        {
            foregroundColor.style.display = 'none';
            document.querySelector('#btnEditEvents').style.display = 'none';
            iText.style.display = 'none';
            let b = widthAndHeight.querySelectorAll('*');
            b[0].innerText = 'Radius';
            b[2].style.display = 'none';
            b[3].style.display = 'none';
            txtName.style.display = 'none';
            document.querySelector('.inputs-name').style.display = 'flex';
            fillWithInputNames(p5);
        }
        else
        {
            let b = widthAndHeight.querySelectorAll('*');
            b[0].innerText = 'Width:';
            b[2].style.display = 'flex';
            b[3].style.display = 'flex';
            txtName.style.display = 'flex';
        }
        if(p5.selected._type === "Menu")
        {
            document.querySelector('.locked').style.display = 'none';
            document.querySelector('.divName').style.display = 'none';
            document.querySelector('#btnEditEvents').style.display = 'none';
            document.querySelector('.list-widjet-tools').style.display = 'flex';
            iText.style.display = 'none';
            foregroundColor.style.display = 'none';
            widthAndHeight.style.display = 'none';
            fillListChilds(p5);
        }
        else if(p5.selected instanceof List)
        {
            iText.style.display = 'none';
            foregroundColor.style.display = 'none';
            document.querySelector('#btnEditEvents').style.display = 'none';
            document.querySelector('.list-widjet-tools').style.display = 'flex';
            fillListChilds(p5);
        }
        if(p5.selected instanceof Input)
        {    
            widthAndHeight.style.display = 'none';
            backgroundColor.style.display = 'none';
            foregroundColor.style.display = 'none';   
        }
        else if(p5.selected instanceof ListTile)
        {
            document.querySelector('.divSubcontent').style.display = 'flex';
            document.querySelector('#subcontent').value = p5.selected.subContent;
        }
    }
    txtName.value = p5.selected.name;
}

export function fillListChilds(p5)
{
    document.querySelector('.childs-property').style.display = 'none';
    const input = document.querySelector('.list-childs-name');
    removeAllChildNodes(input);
    input.append(new Option("Select Element", "0",true,true));
    for(let i=0;i<p5.selected.children.length;i++)
    {
        input.append(new Option(p5.selected.children[i].name, p5.selected.children[i].Id));
    }
}

function fillWithInputNames(p5)
{
    const input = document.querySelector('.inputs-name');
    removeAllChildNodes(input);
    const name = p5.selected.name;
    const names = [];
    for(let i=0;i<p5.screens.length;i++)
    {
        const screen = p5.screens[i];
        for(let j=0;j<screen.children.length;j++)
        {
            if(screen.children[j]._type === "Input")
                names.push({name : screen.children[j].name , Id : screen.children[j].Id , index : i});
            else if(screen.children[j]._type === "List")
            {
                for(let k=0;k<screen.children[j].children.length;k++)
                {
                    if(screen.children[j].children[k]._type === "Input")
                        names.push({name : screen.children[j].children[k] , Id : screen.children[j].children[k] , index : k});
                }
            }
        }
        for(let j=0;j<screen.unSortedWidjets.length;j++)
        {
            if(screen.unSortedWidjets[j]._type === "Input")
                names.push({name : screen.unSortedWidjets[j].name , Id : screen.unSortedWidjets[j].Id , index : ""+i});
        }
    }
    // TODO : adds input from the menu ... 
    if(names.length === 0)
    {
        input.append(new Option(name, p5.selected.nameId, true, true));
    }
    else
        for(let i=0;i<names.length;i++)
        {
            let option;
            if(names[i].name === name)
            {
                option = new Option(name, names[i].Id, true, true);
            }
            else
            {
                option = new Option(names[i].name, names[i].Id);
            }
            option.dataset.value = names[i].index;
            input.append(option);
        }
}

function removeAllChildNodes(e) 
{
    let child = e.lastElementChild;
    while (child) 
    {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}