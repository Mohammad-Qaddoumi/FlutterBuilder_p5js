export default async function binaryToBase64(p5,selectedfile,url) 
{
    let imageFile,result;
    try{
        if(selectedfile && selectedfile.length > 0)
        {
            imageFile = selectedfile[0];
            // p5.selected.img.name = imageFile;
            result = encodeImageFileAsURL(p5,imageFile);
        }
        else if(url)
        {
            // const data = await fetch(url,{cors: '*'});
            // imageFile = await data.blob();
            // p5.selected.img.url = url;
            // imageFile = url;
            result = convertImgToBase64(p5,url);
        }
        else
        {
            throw new Exception('Error Wrong inputs');
        }
    }
    catch(e)
    {
        console.log(e);
        return true;
    }

    // result = await loadImages(imageFile,p5).then(setImageData).catch( e => false ); 
    console.log("<>",result,"</>");
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

function convertImgToBase64(p5,url,outputFormat){
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
        let canvas = document.createElement('CANVAS');
        let ctx = canvas.getContext('2d');
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        let dataURL = canvas.toDataURL(outputFormat || 'image/png');
        const img2  = p5.createImg(dataURL,'error');
        img2.hide();
        p5.selected.img.p5Image = img2;
        p5.selected.img.loading = false;
        p5.selected.img.error = "";
        canvas = null; 
    };
    img.src = url;
    return false;
}

function encodeImageFileAsURL(p5,fileToLoad){
    const fileReader = new FileReader();
    fileReader.onload = function(fileLoadedEvent) {
        const img2  = p5.createImg(fileLoadedEvent.target.result,'error');
        img2.hide();
        p5.selected.img.p5Image = img2;
        p5.selected.img.loading = false;
        p5.selected.img.error = "";
    }
    fileReader.readAsDataURL(fileToLoad);
    return false;
}