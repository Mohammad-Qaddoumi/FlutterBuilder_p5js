import buildJSON from './buildJson.js';

export default async function saveAsJson(p5) 
{
    const data = JSON.stringify( buildJSON(p5), null, 0 );
    if ((window.location.href).includes('127.0.0.1') || (window.location.href).includes('localhost')) 
    {
        console.log(data);
    }
    try
    {
        const url = "https://less-code.000webhostapp.com/save.php";
        const response = await fetch(url, {
            method: 'POST', 
            body:  data  
        });
        const text = await response.text();
        return text;
    }
    catch(e)
    {
        print(e.message);
        return undefined;
    }
}

export async function saveImage(base64,img_id)
{
    const json = {
        base64 : base64,
        app_id : APP_ID,
        img_id : img_id
    }
    try
    {
        const url = "https://less-code.000webhostapp.com/saveImages.php";
        const response = await fetch(url, {
            method: 'POST', 
            body:  JSON.stringify( json, null, 0 )  
        });
        const text = await response.text();
        if(text === 'done')
            return true;
        else
            return false;
    }
    catch(e)
    {
        print(e.message);
        return false;
    }
}