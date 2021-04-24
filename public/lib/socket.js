import mousePressed from './mousePressed.js';
import events from './events.js';
import WidjetBuilder from '../elements/WidjetBuilder.js';
import release from './mouseRelease.js';
import Partner from '../elements/team/partner.js';
import buildJSON from './buildJson.js';

export default function buildSocketConnection(p5)
{
    // TODO: Work on multi user for one project.......
    // const peer = new Peer('someid', {
    //     host: 'localhost',
    //     port: 9000,
    //     path: '/myapp'
    //   });
    // p5.socket = io.connect('https://flutter-server-with-p5.herokuapp.com/');
    p5.socket = io.connect('http://localhost:3000');
    p5.partners = [];

    // setInterval( () => {
    //     p5.socket.emit('mouse',ROOM_ID,JSON.stringify({
            //EMAIL,
    //         X:p5.mouseX,
    //         Y:p5.mouseY,
    //         USER_NAME
    //     }));
    // },200);

    // [EMAIL,USER_NAME,APP_ID,ROOM_ID,DESIGN]
    p5.socket.emit('join-room', ROOM_ID,{EMAIL,USER_NAME,X:0,Y:0}); 

    p5.socket.on('mouse', data => {
        if(data)
        {
            data = JSON.parse(data);  
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
            newItem.drag = true;
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
            const index = p5.partners.findIndex( i => i.email === data.EMAIL );
            if( index !== -1  && data.Id === p5.partners[index].selected.Id)
            {
                p5.partners[index].selected.X = data.X;
                p5.partners[index].selected.Y = data.Y;
                p5.partners[index].selected.moved = true;
            }
        }
    });
    p5.socket.on('unDragged', data => {
        if(data)
        {
            // data = JSON.parse(data);
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if( index !== -1 )
            {
                if(p5.partners[index].selected)
                    p5.partners[index].selected.drag = false;
            }
        }
    });
    p5.socket.on('user-connected', data => {
        if(data)
        {
            // console.log(data);
            // data = JSON.parse(data);
            const index = p5.partners.findIndex( i => i.email === data.EMAIL);
            if( index !== -1 ) return; 
            const newPartner = new Partner(
                data.USER_NAME,
                data.EMAIL
            );
            newPartner.X = data.X;
            newPartner.Y = data.Y;
            p5.partners.push(newPartner);
            p5.socket.emit('DESIGN' , ROOM_ID, JSON.stringify( buildJSON(p5), null, 2 ));
            p5.socket.emit('usersList',ROOM_ID, getUserList(p5));
        }
    });
    let newest = false;
    p5.socket.on('DESIGN', data => {
        if(newest) return;
        const OldDesign = DESIGN;
        try{
            DESIGN = JSON.parse(data);
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
                data = JSON.parse(data);
                for(let i=0;i<data.lenght;i++)
                {
                    const newPartner = new Partner(
                        data[i].USER_NAME,
                        data[i].EMAIL
                    );
                    newPartner.X = data[i].X;
                    newPartner.Y = data[i].Y;
                    p5.partners.push(newPartner);
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
        catch{
            // DESIGN = OldDesign;
        }
    });
    p5.socket.on('disconnect-user', data => {

    });
}

function getUserList(p5) 
{
    let userList = Array.from({length: p5.partners.lenght});
    for(let i = 0 ; i < p5.partners.lenght; i++)
    {
        userList[i] = {
            name : p5.partners[i].name,
            email : p5.partners[i].email,
            X : p5.partners[i].X,
            Y : p5.partners[i].Y,
            Id : p5.partners[i].selected.Id
        };
    }
    return userList;
}
