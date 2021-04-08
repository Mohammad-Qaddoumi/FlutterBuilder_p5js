async function saveAsJson() 
{
    if ((window.location.href).includes('127.0.0.1')) 
    {
        try
        {
            const response = await fetch(
                "http://localhost:8080/graduationProject/testjson/savejson.php", 
                {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:  JSON.stringify( buildJSON(), null, 2 )  
                }
            );
            const text = await response.text();
            return text;
        }
        catch(e) 
        {
            print(e.message);
            return undefined;
        }
    } 
    else 
    {
        const url = "https://less-code.000webhostapp.com/Design/save.php";
        try
        {
            const response = await fetch(url, {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body:  JSON.stringify( buildJSON(), null, 1 )  
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
}