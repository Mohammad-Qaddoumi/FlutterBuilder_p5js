import mousePressed from './mousePressed.js';
import events from './events.js';
import WidjetBuilder from '../elements/WidjetBuilder.js';
import released from './mouseRelease.js';
import Partner from '../elements/team/partner.js';
import buildJSON from './buildJson.js';
import parseJson from './parseJson.js';
import config from './config.js';
import {loadSavedImage} from './base64Encode.js';

export default function buildSocketConnection(p5)
{
    // TODO: Work on multi user for one project.......
    p5.socket = io.connect('https://flutter-server-with-p5.herokuapp.com/');
    // p5.socket = io.connect('http://localhost:3000');
    p5.partners = [];
    p5.socket.emit('join-room', ROOM_ID,{EMAIL,USER_NAME,X:0,Y:0}); 
    setInterval( () => {
        p5.socket.emit('mouse',ROOM_ID,JSON.stringify({
            EMAIL,
            X:p5.mouseX,
            Y:p5.mouseY,
            USER_NAME
        }));
    },100);
    p5.socket.on('mouse', data => {
        if(data)
        {
            data = JSON.parse(data);  
            if(data.EMAIL === EMAIL)return;
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].X = data.X;
                p5.partners[index].Y = data.Y;
            }
        }
    });
    p5.socket.on('selected' , data => {
        if(data){ 
            data = JSON.parse(data);
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected = mousePressed.foundTargetSelected(p5,data.Id);
            }
        }
    });
    p5.socket.on('selectedScreen' , data => {
        if(data){ 
            data = JSON.parse(data);
            p5.selectedScreen = data.screen_number;
            p5.selected = p5.screens[p5.selectedScreen];
            document.querySelector('.screen-collection').value = p5.selectedScreen;
            for(let i=0;i<p5.partners.length;i++)
                p5.partners[i].selected = p5.screens[p5.selectedScreen];
        }
    });
    p5.socket.on('stopped', data => {
        if(data)
        {
            released( p5 , data);
        }
    }); 
    p5.socket.on('newScreen', data => {
        if(data)
        {
            events.addNewScreen(p5,data.Id);
            for(let i=0;i<p5.partners.length;i++)
                p5.partners[i].selected = p5.screens[p5.selectedScreen];
        }
    }); 
    p5.socket.on('addAppBar', data => {
        if(data)
        {
            if( events.addAppBar(p5,data.Id) )
            {
                for(let i=0;i<p5.partners.length;i++)
                    p5.partners[i].selected = p5.screens[p5.selectedScreen];

            }
        }
    }); 
    p5.socket.on('deleteItem', data => {
        if(data)
        {
            let index = p5.screens[p5.selectedScreen].children.findIndex(e => e.Id === data.Id);
            if(index >= 0)
                p5.screens[p5.selectedScreen].children.splice(index, 1);
            else
            {
                index = p5.screens[p5.selectedScreen].unSortedWidjets.findIndex(e => e.Id === data.Id); 
                if(index >= 0)
                    p5.screens[p5.selectedScreen].unSortedWidjets.splice(index, 1);
            }
            if(data.appBar)
            {
                p5.screens[p5.selectedScreen].appBar = undefined;
                p5.screens[p5.selectedScreen].Y = config.gridPoints.Y;
                p5.screens[p5.selectedScreen].height = config.gridPoints.H;
            }
            p5.selected = p5.screens[p5.selectedScreen];
            for(let i=0;i<p5.partners.length;i++)
            {
                p5.partners[i].selected = p5.selected;
            }
        }
    }); 
    p5.socket.on('deleteScreen', data => {
        if(data)
        {
            if(p5.screens.length === 1)
            {
                let index = p5.screens.findIndex(t => t.Id === data.Id);
                if(index === -1)
                {
                    events.addNewScreen(p5,data.Id);
                    p5.selectedScreen = 0;
                    p5.screens.splice(0,1);
                }
            }
            else 
            {
                p5.screens.splice(data.selectedScreen,1);
                p5.selectedScreen = 0;
            }
            p5.selected = p5.screens[p5.selectedScreen];
            for(let i=0;i<p5.partners.length;i++)
            {
                p5.partners[i].selected = p5.selected;
            }
            events.changeTheSelectedProperty(p5);
            events.resetScreens(p5);
            events.addTheScreenElement(p5);
        }
    }); 
    p5.socket.on('addImage', data => {
        if(data)
        {
            let index = p5.screens[p5.selectedScreen].children.findIndex(e => e.Id === data.Id);
            if(index >= 0)
            {
                p5.screens[p5.selectedScreen].children[index].text = data.url;
                p5.screens[p5.selectedScreen].children[index].img.imageType = data.type;
                loadSavedImage(p5,{Id:data.Id , type : data.type},p5.screens[p5.selectedScreen].children[index]);
            }
            else{
                index = p5.screens[p5.selectedScreen].unSortedWidjets.findIndex(t => t.Id === data.Id);
                if(index >= 0)
                {
                    p5.screens[p5.selectedScreen].children[index].text = data.url;
                    p5.screens[p5.selectedScreen].children[index].img.imageType = data.type;
                    loadSavedImage(p5,{Id:data.Id , type : data.type},p5.screens[p5.selectedScreen].unSortedWidjets[index]);
                }
            }
        }
    });
    p5.socket.on('backgroundColor', data => {
        if(data)
        {
            const index = p5.partners.findIndex(t=> t.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected.backgroundColor = data.bc;
            }
        }
    });
    p5.socket.on('foregroundColor', data => {
        if(data)
        {
            const index = p5.partners.findIndex(t=> t.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected.foregroundColor = data.bc;
            }
        }
    });
    p5.socket.on('fontSize', data => {
        if(data)
        {
            const index = p5.partners.findIndex(t=> t.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected.fontSize = data.fontSize;
            }
        }
    });
    p5.socket.on('Itemtext', data => {
        if(data)
        {
            const index = p5.partners.findIndex(t=> t.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected.text = data.text;
            }
        }
    });
    p5.socket.on('txtName', data => {
        if(data)
        {
            const index = p5.partners.findIndex(t=> t.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected.name = data.name;
            }
        }
    });
    p5.socket.on('canMove', data => {
        if(data)
        {
            const index = p5.partners.findIndex(t=> t.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected.canMove = data.canMove;
            }
        }
    });
    p5.socket.on('boxWidth', data => {
        if(data)
        {
            const index = p5.partners.findIndex(t=> t.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected.width = data.width;
            }
        }
    });
    p5.socket.on('boxHeight', data => {
        if(data)
        {
            const index = p5.partners.findIndex(t=> t.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected.height = data.height;
            }
        }
    });

    p5.socket.on('newItem', data => {
        if(data)
        {
            data = JSON.parse(data);
            if(data.EMAIL === EMAIL)return;
            let item = p5.mainWidjets.findIndex( t => t._type === data.type);
            let newItem = WidjetBuilder.Build(p5.mainWidjets[item]);
            newItem.Id = data.Id;
            p5.screens[p5.selectedScreen].unSortedWidjets.push(newItem);
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if( index !== -1 )
            {
                p5.partners[index].selected = newItem;
            }
            events.addTheScreenElement(p5);
        }
    });
    p5.socket.on('moving', data => {
        if(data)
        {
            data = JSON.parse(data);
            if(data.EMAIL === EMAIL)return;
            const index = p5.partners.findIndex( i => i.email === data.EMAIL );
            if( index !== -1  && data.Id === p5.partners[index].selected.Id)
            {
                p5.partners[index].selected.X = data.X;
                p5.partners[index].selected.Y = data.Y;
                p5.partners[index].selected.moved = true;
            }
        }
    });
    p5.socket.on('user-connected', data => {
        if(data)
        {
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if( index !== -1 ) return; 
            if(data.EMAIL === EMAIL)return;
            const newPartner = new Partner(
                data.USER_NAME,
                data.EMAIL
            );
            newPartner.X = data.X;
            newPartner.Y = data.Y;
            newPartner.selected = p5.screens[p5.selectedScreen];
            p5.partners.push(newPartner);
            let newDesign = buildJSON(p5);
            p5.socket.emit('DESIGN' , ROOM_ID, newDesign);
            p5.socket.emit('usersList',ROOM_ID, getUserList(p5));
        }
    });
    p5.socket.once('DESIGN', data => {
        const OldDesign = DESIGN;
        try{
            DESIGN = data;
            parseJson(p5);
        }
        catch{
            DESIGN = OldDesign;
        }
    });
    p5.socket.once('usersList', data => {
        try{
            if(data)
            {
                for(let i=0;i<data.length;i++)
                {
                    if(data[i].email === EMAIL)continue;
                    const index = p5.partners.findIndex( t => t.email === data[i].email);
                    if( index !== -1 ) continue;
                    const newPartner = new Partner(
                        data[i].name,
                        data[i].email
                    );
                    newPartner.X = data[i].X;
                    newPartner.Y = data[i].Y;
                    p5.partners.push(newPartner);
                    if(!data.Id) continue;
                    let selectedItem = p5.screens[p5.selectedScreen].children.findIndex(t => t.Id === data[i].Id);
                    if(selectedItem !== -1)
                        newPartner.selected = p5.screens[p5.selectedScreen].children[selectedItem];
                    else{
                        selectedItem = p5.screens[p5.selectedScreen].unSortedWidjets.findIndex(t => t.Id === data[i].Id);
                        if(selectedItem !== -1)
                            newPartner.selected = p5.screens[p5.selectedScreen].unSortedWidjets[selectedItem];
                        else
                            newPartner.selected = p5.screens[p5.selectedScreen];
                    }
                }
            }
        }
        catch(e){
            console.log(e);
            console.log(e.message);
        }
    });
    p5.socket.on('disconnect-user', data => {
        if(data)
        {
            if(data.EMAIL === EMAIL)return;
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if(index !== -1)
            {
                p5.partners.splice(index,1);
            }
        }
    });
}

function getUserList(p5) 
{
    let userList = Array.from({length: p5.partners.length});
    let count = 1;
    userList[0] = {
        name : USER_NAME,
        email : EMAIL,
        X : p5.mouseX,
        Y : p5.mouseY,
        Id : p5.selected ? p5.selected.Id : ''
    };
    for(let item of p5.partners)
    {
        userList[count++] = {
            name : item.name,
            email : item.email,
            X : item.X,
            Y : item.Y,
            Id : item.selected ? item.selected.Id : ''
        };
    }
    return userList;
}
