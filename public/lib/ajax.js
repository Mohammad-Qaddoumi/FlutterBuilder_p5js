import buildJSON from './buildJson.js';

export default async function saveAsJson(p5) 
{
    const data = JSON.stringify( buildJSON(p5), null, 2 );
    if ((window.location.href).includes('127.0.0.1') || (window.location.href).includes('localhost')) 
    {
        return data; 
    }
    try
    {
        const url = "https://less-code.000webhostapp.com/save.php";
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
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