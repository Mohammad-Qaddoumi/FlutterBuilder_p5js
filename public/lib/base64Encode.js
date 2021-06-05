import {saveImage} from './ajax.js';

export default async function binaryToBase64(p5,selectedfile,url,selected) 
{
    let imageFile,result;
    try{
        if(selectedfile && selectedfile.length > 0)
        {
            imageFile = selectedfile[0];
            result = encodeImageFileAsURL(p5,imageFile,selected);
        }
        else if(url)
        {
            result = convertImgToBase64(p5,url,selected);
        }
        else
        {
            throw new Error('Error Wrong or empty inputs');
        }
    }
    catch(e)
    {
        console.log(e);
        return true;
    }
    return result;
}


function convertImgToBase64(p5,url,saveToServer){
    let selected;
    if(saveToServer)
        selected = saveToServer;
    else
        selected = p5.selected;
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = async () => {
        let canvas = document.createElement('CANVAS');
        let ctx = canvas.getContext('2d');
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        let dataURL = canvas.toDataURL('image/png');
        if(!saveToServer)
        {
            await save(dataURL,selected.Id,selected);
            const type = (dataURL.split(';')[0]).split('/')[1];
            selected.img.imageType = type;
            selected.text = `https://less-code.000webhostapp.com/appImagesFile/${APP_ID}/${selected.Id}.${type}`;
            p5.socket.emit('addImage',ROOM_ID,{EMAIL,Id:selected.Id,type:type,
                url:selected.text});
        }
        const img2  = p5.createImg(dataURL,'error');
        img2.hide();
        selected.img.p5Image = img2;
        selected.img.loading = false;
        selected.img.error = "";
        canvas = null; 
    };
    img.onerror = (e) => {
        selected.img.error = e;
    };
    img.src = url;
    return false;
}

function encodeImageFileAsURL(p5,fileToLoad,saveToServer){
    let selected;
    if(saveToServer)
        selected = saveToServer;
    else
        selected = p5.selected;
    const fileReader = new FileReader();
    console.log(selected);
    fileReader.onload = async fileLoadedEvent => {
        const img2  = p5.createImg(fileLoadedEvent.target.result,'error');
        if(!saveToServer)
        {        
            await save(fileLoadedEvent.target.result,selected.Id,selected);
            const type = (fileLoadedEvent.target.result.split(';')[0]).split('/')[1];
            console.log(selected);
            selected.img.imageType = type;
            selected.text = `https://less-code.000webhostapp.com/appImagesFile/${APP_ID}/${selected.Id}.${type}`;
            p5.socket.emit('addImage',ROOM_ID,{EMAIL,Id:selected.Id,type:type,
                url:selected.text});
        }
        img2.hide();
        selected.img.p5Image = img2;
        selected.img.loading = false;
        selected.img.error = "";
    };
    fileReader.onerror = (e) => {
        selected.img.error = e;
    };
    fileReader.readAsDataURL(fileToLoad);
    return false;
}

async function save(base64,img_id,selected){
    if (!( await saveImage(base64,img_id) ))
    {
        selected.img.error = "Error";
    }
}

export async function loadSavedImage(p5,data,selected)
{
    let url = "https://less-code.000webhostapp.com/loadImage.php";
    let response = await fetch(url,{
        method : 'POST',
        body : JSON.stringify( {app_id : APP_ID,img_id:data.Id,type:data.type}, null, 0)
    });
    let base64Text = await response.text();
    const img  = p5.createImg(base64Text,'error');
    img.hide();
    selected.img.p5Image = img;
    selected.img.loading = false;
    selected.img.error = "";
} 