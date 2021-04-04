async function loadDoc(json) {
    let url = window.location.href + "";
    if (url.includes('127.0.0.1')) {
        url = "http://localhost:8080/graduationProject/save.php";
    } else {
        url = "https://less-code.000webhostapp.com/DragAndDropWithP5/save.php";
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
        return response.text();
    }
    catch(err){
        // console.log(err);
        return undefined;
    }
}