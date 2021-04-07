async function saveAsJson(json) {
    let url = window.location.href + "";
    if (url.includes('127.0.0.1') || url.includes('8080')) {
        url = "http://localhost:8080/graduationProject/save.php";
    } else {
        url = "https://less-code.000webhostapp.com/Design/save.php";
    }
    try
    {
        const response = await fetch(url, {
            method: 'POST', 
            mode: 'cors', 
            cache: 'no-cache', 
            credentials: 'same-origin', 
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', 
            referrerPolicy: 'no-referrer',
            body: json 
        });
        const text = await response.text();
        
        if (url.includes('localhost')) 
        {
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:8080/graduationProject/testjson/savejson.php",false);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.send(JSON.stringify(buildJSON(),null,1));
            print(xhttp.responseText);
        }
        return text;
    }
    catch(err){
        // console.log(err);
        return undefined;
    }
}