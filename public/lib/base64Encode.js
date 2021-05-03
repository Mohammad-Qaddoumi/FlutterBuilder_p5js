import {saveImage} from './ajax.js';

export default async function binaryToBase64(p5,selectedfile,url,selected) 
{
    let imageFile,result;
    // console.log(url);
    try{
        if(selectedfile && selectedfile.length > 0)
        {
            imageFile = selectedfile[0];
            // p5.selected.img.name = imageFile;
            result = encodeImageFileAsURL(p5,imageFile);
        }
        else if(url)
        {
            // const data = await fetch(url,{
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // });
            // imageFile = await data.blob();
            // p5.selected.img.url = url;
            // imageFile = url;
            // const imgUrl = URL.createObjectURL(imageFile);
            // result = encodeImageFileAsURL(p5,imgUrl,selected);
            // result = convertImgToBase64(p5,imgUrl,selected);
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

    // result = await loadImages(imageFile,p5).then(setImageData).catch( e => false ); 
    return result;
}
// async function loadImages(imageFile,p5) {
//     return await new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = event => {
//             try{
//                 const data = event.target.result;
//                 console.log(data);
//                 const img = p5.createImg(data,'error');
//                 img.hide();
//                 resolve({img,p5});
//             }
//             catch(e){
//                 reject(e);
//             }
//         };
//         reader.readAsBinaryString(imageFile);
//     });
// }
// function setImageData(data)
// {
//     data.p5.selected.img.p5Image = data.img;
//     data.p5.selected.img.loading = false;
//     data.p5.selected.img.error = "";
//     return false;
// }

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
        let dataURL = canvas.toDataURL(outputFormat || 'image/png');
        if(!saveToServer)
        {
            await save(dataURL,selected.Id,selected);
            const type = (dataURL.split(';')[0]).split('/')[1];
            selected.img.imageType = type;
            selected.text = `https://less-code.000webhostapp.com/appImagesFile/${APP_ID}/${selected.Id}.${type}`;
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
    fileReader.onload = async fileLoadedEvent => {
        const img2  = p5.createImg(fileLoadedEvent.target.result,'error');
        if(!saveToServer)
        {        
            await save(fileLoadedEvent.target.result,selected.Id,selected);
            const type = (fileLoadedEvent.target.result.split(';')[0]).split('/')[1];
            selected.img.imageType = type;
            selected.text = `https://less-code.000webhostapp.com/appImagesFile/${APP_ID}/${selected.Id}.${type}`;
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

//TODO: save the image in the server...
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
        body : JSON.stringify( {app_id : APP_ID,img_id:data.Id,type:data.type}, null, 2)
    });
    let base64Text = await response.text();
    const img  = p5.createImg(base64Text,'error');
    img.hide();
    selected.img.p5Image = img;
    selected.img.loading = false;
    selected.img.error = "";
} 