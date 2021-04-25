import mousePressed from './mousePressed.js';
import events from './events.js';
import WidjetBuilder from '../elements/WidjetBuilder.js';
import release from './mouseRelease.js';
import Partner from '../elements/team/partner.js';
import buildJSON from './buildJson.js';
import parseJson from './parseJson.js';

export default function buildSocketConnection(p5)
{
    // TODO: Work on multi user for one project.......
    // p5.socket = io.connect('https://flutter-server-with-p5.herokuapp.com/');
    p5.socket = io.connect('http://localhost:3000');
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
    p5.socket.on('stopped', data => {
        if(data)
        {
            // data = JSON.parse( data );
            release.released( p5 , data);
        }
    }); 
    p5.socket.on('newItem', data => {
        if(data)
        {
            data = JSON.parse(data);
            let item = p5.mainWidjets.findIndex( t => t._type === data.type);
            let newItem = WidjetBuilder.Build(p5.mainWidjets[item]);
            // newItem.drag = true;
            newItem.Id = data.Id;
            p5.screens[p5.selectedScreen].unSortedWidjets.push(newItem);
            if(data.EMAIL === EMAIL)return;
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
    // p5.socket.on('unDragged', data => {
    //     if(data)
    //     {
    //         // data = JSON.parse(data);
    //         if(data.EMAIL === EMAIL)return;
    //         const index = p5.partners.findIndex( i => i.email === data.EMAIL);
    //         if( index !== -1 )
    //         {
    //             if(p5.partners[index].selected)
    //                 p5.partners[index].selected.drag = false;
    //         }
    //     }
    // });
    p5.socket.on('user-connected', data => {
        if(data)
        {
            // console.log(data);
            // data = JSON.parse(data);
            console.log('user-connected');
            console.log(data);
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if( index !== -1 ) return; 
            if(data.EMAIL === EMAIL)return;
            const newPartner = new Partner(
                data.USER_NAME,
                data.EMAIL
            );
            newPartner.X = data.X;
            newPartner.Y = data.Y;
            p5.partners.push(newPartner);
            console.log('userAdded');
            console.log(p5.partners);
            let newDesign = buildJSON(p5);
            // console.log(newDesign);
            p5.socket.emit('DESIGN' , ROOM_ID, newDesign);
            p5.socket.emit('usersList',ROOM_ID, getUserList(p5));
        }
    });
    let newest = false;
    p5.socket.on('DESIGN', data => {
        if(newest) return;
        const OldDesign = DESIGN;
        try{
            DESIGN = data;
            parseJson(p5);
        }
        catch{
            DESIGN = OldDesign;
        }
        newest = true;
    });
    let getList = false;
    p5.socket.on('usersList', data => {
        if(getList) return;
        getList = true;
        try{
            if(data)
            {
                // data = JSON.parse(data);
                console.log('Add usersList');
                console.log(data);
                for(let i=0;i<data.length;i++)
                {
                    if(data[i].email === EMAIL)continue;
                    console.log(data[i]);
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
                console.log('new user list');
                console.log(p5.partners);
            }
        }
        catch(e){
            console.log(e);
            console.log(e.message);
            // DESIGN = OldDesign;
        }
    });
    p5.socket.on('disconnect-user', data => {
        if(data)
        {
            // data = JSON.parse(data);
            if(data.EMAIL === EMAIL)return;
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if(index !== -1)
            {
                p5.partners.splice(index,1);
            }
        }
        console.log('deleting user');
        console.log(p5.partners);
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
    // console.log(`user array ${userList}`);
    return userList;
}
